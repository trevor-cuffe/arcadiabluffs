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