/* global $ */

// Load clipboard.js
// add functionality to all .copy

import Clipboard from 'clipboard';
new Clipboard('.copy');

// Displays nearest "Copied!" checkmark
// to provide user feedback ON FORM SUBMIT
export function copied(x) {
  $('.copied').hide();
  $(x).find('.copied').css('display', 'inline-block');

  console.log('copied');
}

// Displays nearest "Copied!" checkmark
// to provide user feedback ON NON-FORM COMPONENTS
$('.copy--button').click(function() {
  var parent = $(this).closest('.copy--wrapper'),
      tooltip = parent.find('.copy--tooltip');

  $('.copy--tooltip').hide();
  tooltip.css('display', 'inline-block');
  console.log(tooltip);
});
