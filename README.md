# Tribune Code Grabber

This repo uses the latest version of the Data Visuals app kit.

To start run, `npm install`. This project requires [Node v4.0.0](https://nodejs.org/en/blog/release/v4.0.0/). If you hit a syntax error on your initial attempts to serve the project locally, try updating your node version.

## Instructions for adding or editing a component

The HTML for each component in Code Grabber is built using a Nunjucks [{% macro %}](https://mozilla.github.io/nunjucks/templating.html#macro) called `{{ copyBlock(code, id, formOptions) }}` located in `app/templates/layouts/macros.html`. It takes three arguments:
+ `code`: The HTML code that will be generated and copied. If the component is customizable, it will also include `<span>` tags with class names that are targeted in the `main.js` to add or substitute HTML content when the form is submitted.
+ `id`: A string to identify the component and the targeted clipboard. For customizable components, it's also used to locate the form in `main.js` and set its behaviors.
+ `formOptions`: OPTIONAL - If you include formOptions, the template will add a `<form>` tag around the options. If its not included, it automatically creates a static element that you may copy with a button.

You may also use `{{ previewFrame(code) }}` to create a preview frame around your code block.

Each group of components has a file in `app/templates/includes/` in which the parameters for these templates are set and then called. For example, here's how the `{{ copyBlock() }` and `{{ previewFrame() }}` are used in the `read_more.html` file:

```
<!-- Set the "code" variable -->
{% set readmore %}
<p class="readmore"><span class="readmore--label">Read More</span><a onclick="ga('send', 'event', 'codegrabber', 'click', 'readmore', {'nonInteraction': 1})" class="readmore_link" href="http://texastribune.org"><span class="readmore_headline">Your headline</span></a></p>
{% endset %}

<!-- Set the "formOptions" variable -->
{% set readmoreform %}
  <label>Headline</label>
  <input type="text" id="readmore_headline" value="" required>
  <label>Link to the story</label>
  <input type="text" id="readmore_link" value="" required>
{% endset %}

<!-- Call variables and add an ID string  -->
{{ macro.previewFrame(readmore) }}
{{ macro.copyBlock(readmore, 'readmorecode', readmoreform)}}

```

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
