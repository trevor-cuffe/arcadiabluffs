const paths = {
  root: {
    src: 'src',
    dest: 'web'
  },
  styles: {
    src: 'src/styles',
    dest: 'web/assets/css',
    ext: ['sass', 'scss', 'css']
  },
  scripts: {
    files: [
      'src/scripts/main.js',
    ],
    src: 'src/scripts',
    dest: 'web/assets/js',
    ext: ['js', 'json']
  },
  vendor: [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/jquery-ui/dist/jquery-ui.js', // Add jQuery UI JavaScript
    'node_modules/parsleyjs/dist/parsley.js',
    'node_modules/slick-carousel/slick/slick.js',
    'src/scripts/lib/tabs.js',
    'node_modules/moment/moment.js'
  ],
  images: {
    src: 'src/images',
    dest: 'web/assets/img',
    ext: ['jpg', 'jpeg', 'png', 'svg', 'gif']
  },
  videos: {
    src: 'src/videos',
    dest: 'web/assets/videos',
    ext: ['mp4', 'ogm', 'webm']
  },
  templates: {
    src: 'templates',
    dest: '',
    ext: ['twig', 'html'],
    exclude: ['_layouts', '_includes', '_partials']
  },
  fonts: {
    src: 'src/fonts',
    dest: 'web/assets/fonts',
    ext: ['woff2', 'woff', 'eot', 'ttf', 'svg', 'otf']
  },
  static: {
    src: 'src/static',
    dest: 'web'
  }
};

module.exports = paths;
