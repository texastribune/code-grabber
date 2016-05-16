/* global $ */

import {copied, slugify, returnCode} from './includes/utils.js';

// Load clipboard.js
// add functionality to all .copy
import Clipboard from 'clipboard';
new Clipboard('.copy');

export function readmore(headlineSlug, link, headline) {
  var codeBlock = '<p class="readmore" style="font-style: italic; padding-top: .5em; padding-bottom: .5em; vertically-align: middle;"><span class="readmore--label" style="color: #111111; font-family: Helvetica,Arial,sans-serif; font-size: .9em; font-style: italic; font-weight: 800; margin: 0 1em 1em 0; text-decoration: none; text-transform: uppercase;">Read More</span><a onclick="ga(\'send\', \'event\', \'codegrabber\', \'click\', \'readmore\', \'' + headlineSlug + '\', {\'nonInteraction\': 1})" class="readmore_link" href="'+ link +'">'+ headline +'</a></p>';

  return codeBlock;
}

$('#readmorecode_form').submit(function(e) {
  var headline = $('#readmore_headline').val(),
      link = $('#readmore_link').val(),
      headlineSlug = slugify(headline),
      codeBlock = readmore(headlineSlug, link, headline);

  returnCode(codeBlock, 'readmorecode');
  copied(this.id);
  e.preventDefault();
});

function twitterinline(sentence, sentenceEncode, hashtag) {
  var codeBlock;

  if(hashtag) {
    codeBlock = '<a href=\"https://twitter.com/share?text=' + sentenceEncode + '&hashtags=' + hashtag + '\" onclick=\"ga(\'send\', \'event\', \'codegrabber\', \'click\', \'twitter-inline\', {\'nonInteraction\': 1})\">' + sentence + '<i style="margin-left: .5em;" class="fa fa-twitter"></i></a>';
  } else {
    codeBlock = '<a href=\"https://twitter.com/share?text=' + sentenceEncode + '\" onclick=\"ga(\'send\', \'event\', \'codegrabber\', \'click\', \'twitter-inline\', {\'nonInteraction\': 1})\">' + sentence + '<i style="margin-left: .5em;" class="fa fa-twitter"></i></a>';
  }

  return codeBlock;
}

$('#twitterinlinecode_form').submit(function(e) {
  var shareSentence = $('#twitterinline_sentence').val(),
      shareSentenceEncoded = encodeURI(shareSentence),
      shareHashtag = $('#twitterinline_hashtag').val().replace(/\s+/g, ''),
      codeBlock = twitterinline(shareSentence, shareSentenceEncoded, shareHashtag),
      shareSentenceLength = shareSentence.length,
      shareHashtagLength = shareHashtag.length,
      shareLength = shareSentenceLength + shareHashtagLength,
      shareSentenceLengthHTML = $('#twitterinline_sentence_length');

  if(shareLength >= 110) {
    $('#twitterinline_warning').removeClass('hidden');
    shareSentenceLengthHTML.html(shareLength);
  } else {
    $('#twitterinline_warning').addClass('hidden');
    shareSentenceLengthHTML.html(shareLength);
  }

  returnCode(codeBlock, 'twitterinlinecode')
  copied(this.id);
  e.preventDefault();
});


function initializePreviews() {
  var readmorecode = readmore('test', 'http://', 'This is a test headline'),
      twitterinlinecode = twitterinline('This is preview sentence', '', '');

  $('#readmorecode_preview').html(readmorecode);
  $('#twitterinlinecode_preview').html(twitterinlinecode);
}

initializePreviews();

$('#pullquotecode_form').submit(function(e) {
  var color = $('input[name=color]:checked').val(),
      colorHTML = $('.pullquote_color'),
      position = $('input[name=position]:checked').val(),
      positionHTML = $('.pullquote_position'),
      pullquoteQuote = $('#pullquote_quote').val(),
      pullquoteSpeaker = $('#pullquote_speaker').val(),
      pullquoteQuoteHTML = $('.pullquote_quoteHTML'),
      pullquoteSpeakerHTML = $('.pullquote_speakerHTML');

  if (position === 'right' ) {
    positionHTML.html(' class="article_detail unprose media float_right"');
  } else if (position === 'left') {
    positionHTML.html(' class="article_detail unprose media float_left"');
  } else {
    positionHTML.html(' style="width: 100%; margin-bottom: 1em"');
  }

  if (color === 'bsp') {
    colorHTML.html('#925352');
    $('.story_quote--pull').css('border-color', '#925352');
  } else {
    colorHTML.html('rgb(255, 194, 0)');
    $('.story_quote--pull').css('border-color', 'rgb(255, 194, 0)');
  }

  pullquoteQuoteHTML.html(pullquoteQuote);
  pullquoteSpeakerHTML.html(pullquoteSpeaker);

  $('#pullquotecode_clipboard').trigger('click');
  copied(this.id);

  e.preventDefault();
});

$('#textblockcode_form').submit(function(e) {
  var color = $('input[name=color]:checked').val(),
      colorHTML = $('.textblock_color'),
      position = $('input[name=position]:checked').val(),
      positionHTML = $('.textblock_position'),
      textblockText = $('#textblock_text').val(),
      textblocktextHTML = $('.textblock_textHTML');

  if (position === 'right' ) {
    positionHTML.html(' class="article_detail unprose media float_right"');
  } else if (position === 'left') {
    positionHTML.html(' class="article_detail unprose media float_left"');
  } else {
    positionHTML.html(' style="width: 100%; margin-bottom: 1em"');
  }

  if (color === 'bsp') {
    colorHTML.html('#925352');
    $('.story_quote--pull').css('border-color', '#925352');
  } else {
    colorHTML.html('rgb(255, 194, 0)');
    $('.story_quote--pull').css('border-color', 'rgb(255, 194, 0)');
  }

  textblocktextHTML.html(textblockText);

  $('#textblockcode_clipboard').trigger('click');
  copied(this.id);

  e.preventDefault();
});


$('#photoEmbedcode_form').submit(function(e) {
  var position = $('input[name=photoPosition]:checked').val(),
      positionHTML = $('.photoEmbed_position'),
      photoEmbedURL = $('#photoEmbed_URL').val(),
      photoEmbedCredit = $('#photoEmbed_credit').val(),
      photoEmbedCaption = $('#photoEmbed_caption').val(),
      photoEmbedURLHTML = $('.photoEmbed_URL'),
      photoEmbedCreditHTML = $('.photoEmbed_credit'),
      photoEmbedCaptionHTML = $('.photoEmbed_caption');

  if (position === 'right' ) {
    positionHTML.html(' class="article_detail unprose media float_right"');
  } else if (position === 'left') {
    positionHTML.html(' class="article_detail unprose media float_left"');
  } else {
    positionHTML.html(' class="article_detail unprose media" style="width: 100%"');
  }

  photoEmbedURLHTML.html(photoEmbedURL);
  photoEmbedCreditHTML.html(photoEmbedCredit);
  photoEmbedCaptionHTML.html(photoEmbedCaption);

  $('#photoEmbedcode_clipboard').trigger('click');
  copied(this.id);

  e.preventDefault();
});

$('#videoEmbedcode_form').submit(function(e) {
  var videoID = $('#videoID').val(),
      videoHost = $('input[name=videoHost]:checked').val(),
      videoWidth = $('#videoWidth').val(),
      videoHeight = $('#videoHeight').val();

  $('#videoEmbed_host').html(videoHost);

  if(videoWidth === '') {
    $('#videoEmbed_width').empty();
  } else {
    $('#videoEmbed_width').html(' width="' + videoWidth + '"');
  }

  if(videoHeight === '') {
    $('#videoEmbed_width').empty();
  } else {
    $('#videoEmbed_height').html(' height="' + videoHeight + '"');
  }

  if(videoHost === 'youtube') {
    $('#videoEmbed_ID').html('https://www.youtube.com/embed/' + videoID);
  } else {
    $('#videoEmbed_ID').html('https://player.vimeo.com/video/' + videoID);
  }

  $('#videoEmbedcode_clipboard').trigger('click');
  copied(this.id);

  e.preventDefault();
});
