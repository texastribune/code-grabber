# Tribune Code Grabber

This repo uses the latest version of the Data Visuals app kit.

## Quickstart

Run this command in your project's folder:

```sh
curl -fsSL https://github.com/texastribune/code-grabber/archive/master.tar.gz | tar -xz --strip-components=1
```

Next, `npm install`.

## Development

Run the following command to start the development server:

```sh
npm run serve
```

## Webpack

This kit uses the [webpack module bundler](https://webpack.github.io/).

## Connect to S3

To use the commands to deploy your project to Amazon S3, you'll need to add a profile to your ~/.aws/config. It should look something like this:

```
[profile newsapps]
aws_access_key_id=YOUR_UNIQUE_ID
aws_secret_access_key=YOUR_SECRET_ACCESS_KEY
```

## Deployment

Run these commands to build and deploy:

```
npm run build
npm run deploy
```

The project will deploy using the S3 bucket and slug found in your `config.js`.
