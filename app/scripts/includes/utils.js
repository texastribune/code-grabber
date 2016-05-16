/* global $ */

// To import all:
// import {copied, slugify, escapeCode, positionCheck, returnCode} from './includes/utils.js'

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

export function positionCheck(positionVal, type) {
  var position;

  if (positionVal === 'right' ) {
    position = ' class="article_detail unprose media float_right"';
  } else if (positionVal === 'left') {
    position = ' class="article_detail unprose media float_left"';
  } else {
    if (type === 'photo') {
      position = ' class="article_detail unprose media" style="width: 100%"';
    } else {
      position = ' style="width: 100%; margin-bottom: 1em"';
    }
  }

  return position;
}

export function returnCode(codeBlock, id) {
  var codeEscaped = codeBlock.replace(/\</g, '&lt;');

  $('#' + id + '_preview').html(codeBlock);
  $('#' + id).html(codeEscaped);

  // Trigger hidden clipboard button to copy code block
  $('#' + id + '_clipboard').trigger('click');
}
