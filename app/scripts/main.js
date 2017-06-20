/* global $ */

import {copied, slugify, positionCheck, returnCode} from './includes/utils.js';

// Load clipboard.js
// add functionality to all .copy
import Clipboard from 'clipboard';
new Clipboard('.copy');

function festival(speaker, positionFloat, lastName) {
  var codeBlock = '<blockquote class="story_quote--pull media article_detail unprose' + positionFloat + 'border-bottom: 2px; border-left: 0; border-right: 0; border-top: 2px; border-color: #ffc200; border-style: solid; color: #444; font-family: Georgia,Times,serif; font-size: 1em; font-style: italic; font-weight: 400; line-height: 1.3; padding-top: 1em; padding-bottom: 1em;"><span style="color: #111111; display: inline; font-family: Helvetica,Arial,sans-serif; font-size: .9em; font-style: italic; font-weight: 800; margin: 0 1em 1em 0; text-decoration: none; text-transform: uppercase;">Promotion: </span>' + speaker + ' is speaking at the 2016 Texas Tribune Festival. Find out more at <a onclick="ga(\'send\', \'event\', \'codegrabber\', \'click\', \'festival\', \'' + lastName + '\', {\'nonInteraction\': 1})" href="https://www.texastribune.org/festival/">texastribune.org/festival</a></blockquote>';

  return codeBlock;
}

$('#festivalcode_form').submit(function(e) {
  var speaker = $('select[name=festival-speaker] option:selected').val(),
      positionVal = $('input[name=festival_position]:checked').val(),
      festivalPosition,
      lastName = $('select[name=festival-speaker] option:selected').data('last');

  if (positionVal === 'right') {
    festivalPosition = ' float_right" style="';
  } else if (positionVal === 'left') {
    festivalPosition = ' float_left" style="';
  } else {
    festivalPosition = '" style="width: 100%;';
  }

  var codeBlock = festival(speaker, festivalPosition, lastName);
  returnCode(codeBlock, 'festivalcode');
  copied(this.id);
  e.preventDefault();
});

function pullquote(type, text, speaker, positionFloat) {
  var codeBlock;

  if (positionFloat !== null) {
    if (type === 'quote') {
      codeBlock = '<div class="' + positionFloat + '"><blockquote><p>&ldquo;' + text + '&rdquo;</p><cite class="story_quote--cite">&mdash; ' + speaker + '</cite></blockquote></div>';
    } else {
      codeBlock = '<div class="' + positionFloat + '"><blockquote><p>' + text + '</p></blockquote></div>';
    }
  } else {
    if (type === 'quote') {
      codeBlock = '<blockquote><p>&ldquo;' + text + '&rdquo;</p><cite class="story_quote--cite">&mdash; ' + speaker + '</cite></blockquote>';
    } else {
      codeBlock = '<blockquote><p>' + text + '</p></blockquote>';
    }
  }

  return codeBlock;
}

$('#pulltextcode_form').change(function(e) {
  var type = $('input[name=type]:checked').val();
  if (type === 'quote') {
    $('.quote-label').show();
    $('.speaker-label').show();
    $('.speaker-input').show();
    $('.text-label').hide();
  } else {
    $('.quote-label').hide();
    $('.speaker-label').hide();
    $('.speaker-input').hide();
    $('.text-label').show();
  }
});

$('#pulltextcode_form').submit(function(e) {
  var type = $('input[name=type]:checked').val(),
      positionVal = $('input[name=position]:checked').val(),
      text = $('#pullquote_quote').val(),
      speaker = $('#pullquote_speaker').val(),
      positionFloat;

  if (positionVal === 'right') {
    positionFloat = 'float_right';
  } else if (positionVal === 'left') {
    positionFloat = 'float_left';
  } else {
    positionFloat = null;
  }

  var codeBlock = pullquote(type, text, speaker, positionFloat);
  returnCode (codeBlock, 'pulltextcode');
  copied(this.id);

  e.preventDefault();
});


function photoEmbed(url, credit, caption, positionFloat) {
  var codeBlock = '<div class="' + positionFloat + '"><figure class="image_default"><img alt="' + caption + '"src="' + url + '"><figcaption class="image_default--caption">' + caption + '&nbsp;<i class="fa fa-camera"></i>&nbsp;' + credit + '</figcaption></figure></div>';

  return codeBlock;
}

$('#photoembedcode_form').submit(function(e) {
  var positionVal = $('input[name=photoPosition]:checked').val();
  var positionFloat;
  if (positionVal === 'right') {
    positionFloat = ' float_right"';
  } else if (positionVal === 'left') {
    positionFloat = ' float_left"';
  } else {
    positionFloat = '';
  }

  var url = $('#photoEmbed_URL').val(),
      credit = $('#photoEmbed_credit').val(),
      caption = $('#photoEmbed_caption').val(),
      codeBlock = photoEmbed(url, credit, caption, positionFloat);

  returnCode(codeBlock, 'photoembedcode');
  copied(this.id);
  e.preventDefault();
});


function videoEmbed(videoID, videoWidth, videoHeight) {
  var codeBlock = '<figure class="op-social story_relatedvideo" itemprop="associatedMedia" style="margin: 0 0 1em 0;"><div class="video"><div class="video--youtube"><iframe width="' + videoWidth + '" height="' + videoHeight + '" src="https://www.youtube.com/embed/' + videoID + '" frameborder="0" allowfullscreen></iframe></div></div></figure>';

  return codeBlock;
}

$('#videoembedcode_form').submit(function(e) {
  var videoID = $('#videoID').val(),
      videoWidth = $('#videoWidth').val(),
      videoHeight = $('#videoHeight').val();

  console.log(videoWidth);
  var codeBlock = videoEmbed(videoID, videoWidth, videoHeight);
  returnCode (codeBlock, 'videoembedcode');

  copied(this.id);

  e.preventDefault();
});

function initializePreviews() {
  var readmorecode = readmore('test', 'https://', 'This is a test headline'),
      twitterinlinecode = twitterinline('This is preview sentence', '', ''),
      festivalcode = festival('Austin Mayor Steve Adler', '" style="width: 100%;', 'preview');

  $('#twitterinlinecode_preview').html(twitterinlinecode);
  $('#festivalcode_preview').html(festivalcode);
}

initializePreviews();
