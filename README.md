# Tribune Code Grabber

This repo uses the latest version of the Data Visuals app kit.

To start run, `npm install`. This project requires [Node v4.0.0](https://nodejs.org/en/blog/release/v4.0.0/). If you hit a syntax error on your initial attempts to serve the project locally, it's likely that you're trying to use an older version of node. Update node, completely remove your node_modules folder and re-run `npm install`.

## Instructions for adding or editing a component

The HTML for each component in Code Grabber is built using a Nunjucks [{% macro %}](https://mozilla.github.io/nunjucks/templating.html#macro) called `{{ copyBlock(id, formOptions, preview) }}` located in `app/templates/layouts/macros.html`. It takes three arguments:
+ `id`: A string to identify the component and the targeted clipboard. For customizable components, it's also used to locate the form in `main.js` and set its behaviors.
+ `formOptions`: The template will add a `<form>` tag around the options.
+ `preview`: Not required. If set to 'load', the template will include a dashed frame to preview the component.

Each group of components has a file in `app/templates/includes/` in which the parameters for these templates are set and then called. For example, here's how the `{{ copyBlock() }` is used in the `read_more.html` file:

```
<!-- formOptions  -->
{% set readmoreform %}
  <label>Headline</label>
  <input type="text" id="readmore_headline" value="" required>
  <label>Link to the story</label>
  <input type="text" id="readmore_link" value="" required>
{% endset %}

<!-- id, formOptions, preview -->
{{ macro.copyBlock('readmorecode', readmoreform, preview='load')}}

```

Each component has a function to build its codeBlock. For some components (readmore and twitterinline) that function is also used to initialized a preview on load, but for most, it's just called when the component's form is submitted. When the user submits the form, it picks up the variables, calls that component function with the variables to build a new codeBlock, then runs `returnCode(codeBlock, id)`. (The id must match the id assigned to the component in `{% copyBlock() %}`). The `returnCode()` function uses the id to push the updated codeBlock to the DOM in both the preview frame and the <code> block for that component, and then triggers a hidden clipboard copy button for that component. Afterwards, it triggers `copied(this.id)` to show the Copied! tooltip.

```
// build readmore codeBlock
function readmore(headlineSlug, link, headline) {
  var codeBlock = '<p class="readmore" style="font-style: italic; padding-top: .5em; padding-bottom: .5em; vertically-align: middle;"><span class="readmore--label" style="color: #111111; font-family: Helvetica,Arial,sans-serif; font-size: .9em; font-style: italic; font-weight: 800; margin: 0 1em 1em 0; text-decoration: none; text-transform: uppercase;">Read More</span><a onclick="ga(\'send\', \'event\', \'codegrabber\', \'click\', \'readmore\', \'' + headlineSlug + '\', {\'nonInteraction\': 1})" class="readmore_link" href="'+ link +'">'+ headline +'</a></p>';

  return codeBlock;
}

// submit readmore form
$('#readmorecode_form').submit(function(e) {
  var headline = $('#readmore_headline').val(),
      link = $('#readmore_link').val(),
      headlineSlug = slugify(headline),
      // assign output from readmore() to codeBlock
      codeBlock = readmore(headlineSlug, link, headline);

  // update DOM & copy element
  returnCode(codeBlock, 'readmorecode');

  // provide user feedback
  copied(this.id);

  e.preventDefault();
});
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
