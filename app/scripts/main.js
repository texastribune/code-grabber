/* global $ */

import {copied, slugify, positionCheck, returnCode} from './includes/utils.js';

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

  returnCode(codeBlock, 'twitterinlinecode');
  copied(this.id);
  e.preventDefault();
});

function pullquote(type, text, speaker, color, position) {
  var codeBlock;

  if (type === 'quote') {
    codeBlock = '<div' + position + '><p class="story_quote--pull" style="border-bottom: 2px; border-left: 0; border-right: 0; border-top: 2px; border-color: ' + color + '; border-style: solid; color: #444; font-family: Georgia,Times,serif; font-size: 1.2em; font-style: italic; font-weight: 600; line-height: 1.3; padding-top: 1em; padding-bottom: 1em; margin-bottom: 0"><span>&ldquo;</span>' + text + '<span>&rdquo;</span><span style="display: block; font-family: Helvetica, Arial, sans-serif; font-size: .85em; font-style: normal; font-weight: 400; margin: .5em 0 0;">&mdash; ' + speaker + '</span></p></div>'
  } else {
    codeBlock = '<div' + position + '><p class="story_quote--pull" style="border-bottom: 2px; border-left: 0; border-right: 0; border-top: 2px; border-color: ' + color + '; border-style: solid; color: #444; font-family: Georgia,Times,serif; font-size: 1.2em; font-style: italic; font-weight: 600; line-height: 1.3; padding-top: 1em; padding-bottom: 1em; margin-bottom: 0">' + text + '</p></div>'
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
      colorVal = $('input[name=color]:checked').val(),
      color,
      positionVal = $('input[name=position]:checked').val(),
      position = positionCheck(positionVal),
      text = $('#pullquote_quote').val(),
      speaker = $('#pullquote_speaker').val();

  if (colorVal === 'bsp') {
    color = '#925352';
  } else {
    color = 'rgb(255, 194, 0)';
  }

  var codeBlock = pullquote(type, text, speaker, color, position);
  returnCode (codeBlock, 'pulltextcode');
  copied(this.id);

  e.preventDefault();
});


function photoEmbed(url, credit, caption, position) {
  var codeBlock = '<div' + position + '><a class="lightbox" href="' + url + '"><img src="' + url + '" alt="" width="312" /></a><div class="photo_links"><a class="lightbox enlarge" href="' + url + '">Enlarge</a>&nbsp;<cite>Photo by: ' + credit + '</cite></div><div class="photo_caption"><em>' + caption + '</em></div></div>';

  return codeBlock;
}

$('#photoembedcode_form').submit(function(e) {
  var positionVal = $('input[name=photoPosition]:checked').val(),
      url = $('#photoEmbed_URL').val(),
      credit = $('#photoEmbed_credit').val(),
      caption = $('#photoEmbed_caption').val(),
      position = positionCheck(positionVal, 'photo'),
      codeBlock = photoEmbed(url, credit, caption, position);

  returnCode(codeBlock, 'photoembedcode');
  copied(this.id);
  e.preventDefault();
});


function videoEmbed(video, host, width, height) {
  var codeBlock = '<div class="video story_relatedvideo" itemprop="associatedMedia" style="margin-bottom: 1.3em;"><div class="' + host + '"><iframe width="' + width + '" height="' + height + '"  src="' + video + '" frameborder="0" allowfullscreen></iframe></div></div>';

  return codeBlock;
}

$('#videoembedcode_form').submit(function(e) {
  var videoID = $('#videoID').val(),
      videoHost = $('input[name=videoHost]:checked').val(),
      width = $('#videoWidth').val(),
      height = $('#videoHeight').val(),
      video;

  if(videoHost === 'youtube') {
    video = 'https://www.youtube.com/embed/' + videoID;
  } else {
    video = 'https://player.vimeo.com/video/' + videoID;
  }

  var codeBlock = videoEmbed(video, videoHost, width, height);
  returnCode (codeBlock, 'videoembedcode');

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
