# Tribune Code Grabber Prototype

This prototype was built using the News Apps Graphic Kit.

## Quickstart

1) Clone this repo.

2) Download the packages: `npm install`.

3) To view the project and watch changes in a browser, start a local server: `gulp serve`

## Connecting to S3 for Deployment

To use the commands to deploy your project to Amazon S3, you'll need to add a [profile newsapps] to ~/.aws/config. It should look like this:

```
[profile newsapps]
aws_access_key_id=YOUR_UNIQUE_ID
aws_secret_access_key=YOUR_SECRET_ACCESS_KEY
```



Then you can run these commands to build and deploy:

```
gulp
npm run deploy
```

The package will deploy to moose.texastribune.org/code-grabber. To change the location, update the package.json file.

## Assets

The graphics kit comes with an empty app/assets folder for you to store images, fonts and data files. The kit works best if you add these files to app/assets/images, app/assets/fonts and app/assets/data. These files will automatically be ignored by github, if added to the proper folders, to prevent a storage overload and to keep files locally that may have sensitive information in an open source project.

If you need to pull assets from the deployed version of this project, run:

```sh
npm run assets/pull
```

There is also a command to push only raw assets to S3:
```sh
npm run assets/push
```

## Features

- Live reloading and viewing powered by [BrowserSync](http://www.browsersync.io/)
- Compiling of Sass/SCSS with [Ruby Sass](http://sass-lang.com/)
- CSS prefixing with [autoprefixer](https://github.com/postcss/autoprefixer)
- CSS sourcemaps with [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- CSS compression with [csso](https://github.com/css/csso)
- JavaScript linting with [jshint](http://jshint.com/)
- JavaScript compression with [uglifyjs](https://github.com/mishoo/UglifyJS2)
- Template compiling with [nunjucks](http://mozilla.github.io/nunjucks/)
- Image compression with [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin)
- Asset revisioning with [gulp-rev](https://github.com/sindresorhus/gulp-rev) and [gulp-rev-replace](https://github.com/jamesknelson/gulp-rev-replace)
- [pym.js](http://blog.apps.npr.org/pym.js/) included by default for easy embedding in hostile CMS environments