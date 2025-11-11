# Arcadia Bluffs

> Arcadia Bluffs Website

| Developer             | Hosting       | CMS     |
| --------------------- | ------------- | ------- |
| Eden Creative         | DigitalOcean  | Craft   |

## Sites

### Production [DO]

    Domain: arcadiabluffs.com
    IPv4: 

### Staging [DO]

    Domain: arcadiabluffs.edencreative.co
    IPv4: 

### Local

    Domain: arcadiabluffs.test

## Local Setup


After pulling updates to the repository, make sure to run the following to sync migrations and config changes:

    ```
    php craft project-config/apply
    ```

### Requirements

The project assumes you have Node.js and Gulp already installed.

To get Nodje.s you can download it from [nodejs.org](https://nodejs.org/).

Once node is installed you can install Gulp and Bower by running the following commands:

```
npm install -g gulp
```

### Getting Started

1. Create a new project folder and clone the repo.
    ```
    mkdir arcadiabluffs
    cd arcadiabluffs
    git clone git@github.com:edencreativeco/arcadiabluffs.git
    ```

2. Use Node version 19
    ```
    nvm use 19
    ```

3. Configure local CMS install
Duplicate `.env.example` in the project's root folder, renaming it to `.env`

Edit the .env file, replacing variables with your appropriate settings.

4. Install development dependencies
    
    ```
    npm install
    composer install
    ```


### Gulp Commands

```bash
# Starts a development server and watches for changes
gulp

# Builds and compiles for production
gulp build

# Cleans public asset folder
gulp clean

# Compiles stylesheets
gulp styles

# Compiles vendor scripts
gulp vendor

# Compiles JavaScripts
gulp scripts

# Compiles and minifies images via imagemin
gulp images

# Moves static files to the public directory
gulp files

# Moves custom fonts from `src/fonts` to `web/assets/fonts`
gulp fonts

# Moves static assets fonts from `src/static` to `web/assets/fonts`
gulp static
```

### Remote Storage
Run the following command to get imager transforms from remote server
Test it (staging  -> production)
rsync -navPhz serverpilot@143.244.174.122:/srv/users/serverpilot/apps/arcadiabluffs-0-prod/shared/imager/ ./web/imager
rsync -navPhz serverpilot@143.244.174.122:/srv/users/serverpilot/apps/arcadiabluffs-0-prod/shared/uploads/ ./web/uploads
rsync -navPhz serverpilot@143.244.174.122:/srv/users/serverpilot/apps/arcadiabluffs-0-prod/shared/storage/runtime/imager/ ./storage/runtime/imager

Do it
rsync -avPhz serverpilot@143.244.174.122:/srv/users/serverpilot/apps/arcadiabluffs-0-prod/shared/imager/ ./web/imager
rsync -avPhz serverpilot@143.244.174.122:/srv/users/serverpilot/apps/arcadiabluffs-0-prod/shared/uploads/ ./web/uploads
rsync -avPhz serverpilot@143.244.174.122:/srv/users/serverpilot/apps/arcadiabluffs-0-prod/shared/storage/runtime/imager/ ./storage/runtime/imager

going TO remote server:

rsync -navPhz ./web/imager/ serverpilot@143.244.174.122:/srv/users/serverpilot/apps/arcadiabluffs-1-stage/shared/imager
rsync -navPhz ./web/uploads/ serverpilot@143.244.174.122:/srv/users/serverpilot/apps/arcadiabluffs-1-stage/shared/uploads
rsync -navPhz ./storage/ serverpilot@143.244.174.122:/srv/users/serverpilot/apps/arcadiabluffs-1-stage/shared/storage


<!-- ## Migration

1) Need to remove forms from plugins in db, and remove sprout tables
    -delete vzAddress, vzUrl, CpSortCols from plugins table

2) Install plugins
3) Manually reassign field types
4) Manually fix "_1}}" content tables (except matrixcontent_diningoptions) -->