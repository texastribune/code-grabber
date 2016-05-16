/* global $ */

// To import all:
// import {copied, slugify, escapeCode, returnCode} from './includes/utils.js'

export function copied(x) {
  var parent = $('#'+ x).closest('.copy--wrapper'),
      tooltip = parent.find('.copy--tooltip');

  $('.copy--tooltip').hide();
  tooltip.css('display', 'inline-block');
}

export function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export function returnCode(codeBlock, id) {
  var codeEscaped = codeBlock.replace(/\</g, '&lt;');

  $('#' + id + '_preview').html(codeBlock);
  $('#' + id).html(codeEscaped);

  // Trigger hidden clipboard button to copy code block
  $('#' + id + '_clipboard').trigger('click');
}
