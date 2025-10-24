// ============= IMPORTS ============= //
const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const sass = require('gulp-sass')(require('sass'));
// const cssnano = require('gulp-cssnano');
const cssnano = require('cssnano');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');

const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
// const babel = require('gulp-babel');
// const modernizr = require('gulp-modernizr');
const del = require('del');
const changed = require('gulp-changed');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
// const sequence = require('run-sequence');
const browserSync = require('browser-sync');
browserSync.create();
const nodemon = require('gulp-nodemon');
const reload = browserSync.reload;
const paths = require('./paths.js');
const fs = require('fs');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');


// =========== SET USER VARIABLES=========== //

const proxy = 'https://arcadia-new.test';

// ==========================================//

var onError = function (err) {
	notify.onError({
		title: "Error!",
		message: "<%= error.message %>",
		sound: "Frog"
	})(err);
	this.emit('end');
};

global.production = false;

function showErrors(err) {
	console.log(err.toString())
	this.emit('end')
}

// Cache Smash
// Set the cache smash number used to force css and js file reload on updates
/////////////////////////
function writeCacheSmash() {
	var timestamp = Math.round((new Date()).getTime());
	fs.writeFileSync('templates/_partials/cache-smash.twig', timestamp.toString());
}

// Browsersync config
/////////////////////////
const config = {
	browserSync: {
		notify: false,
		// Use the "server" option to browserSync an HTML site
		//  server: {
		//    baseDir: 'web/'
		//  }
		// ..or use the "proxy" option to serve up a PHP site
		proxy: proxy,
		// ws: true,
	},
	expressServer: {
		notify: false,
		proxy: 'localhost:3000',
		port: 3000,
	}
};

// Styles
/////////////////////////
gulp.task('styles', () => {

	return gulp.src(`${paths.styles.src}/*.scss`)
		.pipe(gulpif(!global.production, sourcemaps.init()))
		.pipe(sass())
		.on('error', showErrors)
		.pipe(autoprefixer(['last 2 versions', '> 5%'], {
			cascade: true
		}))
		.pipe(gulpif(!global.production, sourcemaps.write('maps')))
		.pipe(gulpif(global.production, postcss([cssnano()])))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(browserSync.stream({
			match: '**/*.css'
		}))
		.on('end', writeCacheSmash);
});


// Scripts
/////////////////////////
gulp.task('scripts', gulp.series(() => {
	return gulp.src(paths.scripts.files)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(webpackStream(webpackConfig), webpack)
		.pipe(gulpif(global.production, uglify({})))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe(browserSync.stream({
			match: '**/*.js'
		}))
		.on('end', writeCacheSmash);
}));


// vendor
/////////////////////////
gulp.task('vendor', gulp.series((cb) => {
	if (paths.vendor.length > 0) {
		gulp.src(paths.vendor)
			.pipe(concat('vendor.min.js'))
			.pipe(gulpif(global.production, uglify({})))
			.pipe(gulp.dest(paths.scripts.dest));
	};
	cb();
}));


// Clean
/////////////////////////
gulp.task('clean', (done) => {
	del(`${paths.styles.dest}/maps`);
	del(`${paths.scripts.dest}/maps`);
	done();
});


// Images
/////////////////////////
gulp.task('images', (done) => {
	gulp.src(`${paths.images.src}/**/*.{${paths.images.ext}}`)
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.mozjpeg({quality: 75, progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: false },
					{ removeUselessStrokeAndFill: false},
					{ cleanupIDs: true }
				]
			})
		]))
		.pipe(changed(paths.images.dest)) // Ignore unchanged files
		.pipe(gulp.dest(paths.images.dest));
	done();
});



// Videos
/////////////////////////
gulp.task('videos', () => {
    return gulp.src(`${paths.videos.src}/**`)
        .pipe(changed(paths.videos.dest)) // Ignore unchanged files
        .pipe(gulp.dest(paths.videos.dest));
});


// Static files
/////////////////////////
gulp.task('static', () => {
	return gulp.src(`${paths.static.src}/**`)
		.pipe(changed(paths.static.dest)) // Ignore unchanged files
		.pipe(gulp.dest(paths.static.dest));
});


// Font files
/////////////////////////
gulp.task('fonts', () => {
	return gulp.src(`${paths.fonts.src}/**/*.{${paths.fonts.ext}}`)
		.pipe(gulp.dest(paths.fonts.dest));
});



// Watch
/////////////////////////
function watchMe() {
	gulp.watch(
		`${paths.styles.src}/**/*.scss`,
		gulp.series('styles')
	);
	gulp.watch(
		[
			`${paths.scripts.src}/**/*.js`,
			`${paths.scripts.src}/**/*.vue`,
			`!${paths.scripts.src}/main.min.js`
		],
		gulp.series('scripts')
	);
	gulp.watch(
		`${paths.images.src}/**/*.{${paths.images.ext}}`,
		gulp.series('images')
	);
	gulp.watch(
		`${paths.videos.src}/**/*.{${paths.videos.ext}}`,
		gulp.series('videos')
	);
	gulp.watch([
		`${paths.scripts.src}/main.min.js`,
		`${paths.templates.src}/**/*.twig`,
	]).on('change', reload);
}

gulp.task('default', gulp.series((cb) => {
	browserSync.init(config.browserSync);
	watchMe();
	cb();
}));


// Express + Nodemon + Browsersync
/////////////////////////
gulp.task('nodemon', (cb) => {
	var started = false;
	return nodemon({
		script: `${paths.root.dest}/index.js`,
		ignore: `**/*`
	}).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('quick-server', gulp.series('nodemon'), () => {
	browserSync.init(config.expressServer);
	watchMe();
});


// Build
/////////////////////////
gulp.task('build', gulp.series(
	(cb) => {
		global.production = true;
		cb();
	},
	'clean',
	gulp.parallel('styles', 'scripts', 'vendor'),
	gulp.parallel('images', 'videos', 'static', 'fonts')
));
