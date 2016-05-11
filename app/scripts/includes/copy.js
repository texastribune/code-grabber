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
}

// Displays nearest "Copied!" checkmark
// to provide user feedback ON NON-FORM COMPONENTS
$('button.copy-button').click(function() {
  $('.copied').hide();
  $(this).next($('.copied')).css('display', 'inline-block');
});
