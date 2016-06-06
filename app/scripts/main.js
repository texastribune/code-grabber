/* global $ */

import {copied, slugify, positionCheck, returnCode} from './includes/utils.js';

// Load clipboard.js
// add functionality to all .copy
import Clipboard from 'clipboard';
new Clipboard('.copy');

function readmore(headlineSlug, link, headline) {
  var codeBlock = '<ul class="op-related-articles" title="Read More" style="font-style: italic; margin-bottom: 1em; padding-top: .5em; padding-bottom: .5em; padding-left: 0; vertically-align: middle;"><li style="list-style-type: none;"><span style="color: #111111; display: inline; font-family: Helvetica,Arial,sans-serif; font-size: .9em; font-style: italic; font-weight: 800; margin: 0 1em 1em 0; text-decoration: none; text-transform: uppercase;">Read More </span><a onclick="ga(\'send\', \'event\', \'codegrabber\', \'click\', \'readmore\', \'' + headlineSlug + '\', {\'nonInteraction\': 1})" class="readmore_link" href="'+ link + '">'+ headline +'</a></li></ul>';

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

function festival(speaker, positionFloat, lastName) {
  var codeBlock = '<blockquote class="story_quote--pull media article_detail unprose' + positionFloat + 'border-bottom: 2px; border-left: 0; border-right: 0; border-top: 2px; border-color: #ffc200; border-style: solid; color: #444; font-family: Georgia,Times,serif; font-size: 1em; font-style: italic; font-weight: 400; line-height: 1.3; padding-top: 1em; padding-bottom: 1em;">' + speaker + ' is speaking at the 2016 Texas Tribune Festival. Find out more at <a onclick="ga(\'send\', \'event\', \'codegrabber\', \'click\', \'festival\', \'' + lastName + '\', {\'nonInteraction\': 1})" href="https://www.texastribune.org/festival/">texastribune.org/festival</a></blockquote>';

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

function pullquote(type, text, speaker, color, positionFloat) {
  var codeBlock;

  if (type === 'quote') {
    codeBlock = '<aside class="story_quote--pull media article_detail unprose' + positionFloat + 'border-bottom: 2px; border-left: 0; border-right: 0; border-top: 2px; border-color: ' + color + '; border-style: solid; color: #444; font-family: Georgia,Times,serif; font-size: 1.2em; font-style: italic; font-weight: 600; line-height: 1.3; padding-top: 1em; padding-bottom: 1em;"><span>&ldquo;</span>' + text + '<span>&rdquo;</span><cite><span style="display: block; font-family: Helvetica, Arial, sans-serif; font-size: .85em; font-style: normal; font-weight: 400; margin: .5em 0 0;">&mdash; ' + speaker + '</span></cite></aside>';
  } else {
    codeBlock = '<blockquote class="story_quote--pull media article_detail unprose' + positionFloat + 'border-bottom: 2px; border-left: 0; border-right: 0; border-top: 2px; border-color: ' + color + '; border-style: solid; color: #444; font-family: Georgia,Times,serif; font-size: 1.2em; font-style: italic; font-weight: 600; line-height: 1.3; padding-top: 1em; padding-bottom: 1em;">' + text + '</blockquote>';
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
      text = $('#pullquote_quote').val(),
      speaker = $('#pullquote_speaker').val(),
      positionFloat;

  if (colorVal === 'bsp') {
    color = '#925352';
  } else {
    color = 'rgb(255, 194, 0)';
  }

  if (positionVal === 'right') {
    positionFloat = ' float_right" style="';
  } else if (positionVal === 'left') {
    positionFloat = ' float_left" style="';
  } else {
    positionFloat = '" style="width: 100%;';
  }

  var codeBlock = pullquote(type, text, speaker, color, positionFloat);
  returnCode (codeBlock, 'pulltextcode');
  copied(this.id);

  e.preventDefault();
});


function photoEmbed(url, credit, caption, positionFloat) {
  var codeBlock = '<figure style="line-height: 1.3;" class="story_image--inline media article_detail unprose' +positionFloat + '><img src="' + url + '" style="width: 100%;" /><figcaption style="color: #4a4a4a; font-family: Helvetica, Arial, sans-serif; font-size: 0.8em;">' + caption + '<cite style="color: #222222; font-family: Helvetica, Arial, sans-serif; font-size: 0.7em; letter-spacing: 0.03em; padding-left: 1em; text-transform: uppercase;">' + credit + '</cite>'+ '</figcaption></figure>';

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
    positionFloat = '" style="width: 100%;"';
  }

  var url = $('#photoEmbed_URL').val(),
      credit = $('#photoEmbed_credit').val(),
      caption = $('#photoEmbed_caption').val(),
      codeBlock = photoEmbed(url, credit, caption, positionFloat);

  returnCode(codeBlock, 'photoembedcode');
  copied(this.id);
  e.preventDefault();
});


function videoEmbed(video, width, height) {
  var codeBlock = '<figure class="op-social video story_relatedvideo" itemprop="associatedMedia" style="margin: 0 0 1em 0;"><div class="youtube"><iframe width="' + width + '" height="' + height + '"  src="' + video + '" frameborder="0" allowfullscreen></iframe></div></figure>';

  return codeBlock;
}

$('#videoembedcode_form').submit(function(e) {
  var videoID = $('#videoID').val(),
      width = $('#videoWidth').val(),
      height = $('#videoHeight').val(),
      video = 'https://www.youtube.com/embed/' + videoID;

  var codeBlock = videoEmbed(video, width, height);
  returnCode (codeBlock, 'videoembedcode');

  copied(this.id);

  e.preventDefault();
});

function seriesHeader(series) {
  var codeBlock;

  if (series === 'bsp') {
    codeBlock = '<figure class="story_series--header" style="border-top: 0; border-right: 0; border-left: 0; border-bottom: 2px; border-style: solid; border-color: #925352; padding-bottom: 1em; margin: 0 0 1em 0;"><a href="https://apps.texastribune.org/bordering-on-insecurity/" onclick="ga(\'send\', \'event\', \'codegrabber\', \'click\', \'border-series-header-logo\', {\'nonInteraction\': 1})"><img style="display: block; margin: 0 auto .75em; width: 210px;" src="https://static.texastribune.org/media/images/2016/01/29/TT-BSP_LogoA-sml.jpg" alt="Bordering on Insecurity Logo" /></a><figcaption style="line-height: 1.1; font-size: .9em; font-style: italic;">The Texas Tribune is taking a yearlong look at the issues of border security and immigration. This part of the project focuses on U.S. law enforcement corruption, which has undermined efforts to secure the border. <a href="https://apps.texastribune.org/bordering-on-insecurity/" target="_blank" onclick="ga(\'send\', \'event\', \'codegrabber\', \'click\', \'border-series-header-link\', {\'nonInteraction\': 1})">Sign up to get</a> story alerts.</figcaption></figure>';
  } else if (series === 'rough-patch') {
    codeBlock = '<figure class="story_series--header" style="border-top: 0; border-right: 0; border-left: 0; border-bottom: 2px; border-style: solid; border-color: #ffc200; padding-bottom: 1em; margin: 0 0 1em 0;"><a href="https://www.texastribune.org/projects/rough-patch/" onclick="ga(\'send\', \'event\', \'codegrabber\', \'click\', \'rough-patch-header-logo\', {\'nonInteraction\': 1})"><img style="display: block; margin: 0 auto .75em; width: 210px;" src="https://static.texastribune.org/media/images/2016/04/06/roughpatch-logo_sm.png" alt="Rough Patch Logo" /></a><figcaption style="line-height: 1.1; font-size: .9em; font-style: italic;">How plunging oil prices are reversing fortunes across Texas. Read <a href="https://www.texastribune.org/projects/rough-patch/" onclick="ga(\'send\', \'event\', \'codegrabber\', \'click\', \'rough-patch-header-link\', {\'nonInteraction\': 1})">all the stories</a> in this series.</figcaption></figure>';
  } else if (series === 'mental-health-matters') {
    codeBlock = '<figure class="story_series--header" style="border-top: 0; border-right: 0; border-left: 0; border-bottom: 2px; border-style: solid; border-color: #ffc200; padding-bottom: 1em; margin: 0 0 1em 0;"><a href="https://www.texastribune.org/projects/mental-health-matters/" onclick="ga(\'send\', \'event\', \'codegrabber\', \'click\', \'mental-health-header-logo\', {\'nonInteraction\': 1})"><img style="display: block; margin: 0 auto .75em; width: 210px;" src="https://s3.amazonaws.com/static.texastribune.org/media/logos/TTE-MHM_logo-sm.png" alt="Mental Health Matters Logo" /></a><figcaption style="line-height: 1.1; font-size: .9em; font-style: italic;">Throughout Mental Health Month in May, The Texas Tribune is partnering with Mental Health Channel and KLRU to focus on some of Texas’ biggest challenges in providing mental health care. See <a href="https://www.texastribune.org/projects/mental-health-matters" onclick="ga(\'send\', \'event\', \'codegrabber\', \'click\', \'mental-health-header-link\', {\'nonInteraction\': 1})">all the stories</a> in this series.</figcaption></figure>';
  }

  return codeBlock;
}

function initializePreviews() {
  var readmorecode = readmore('test', 'https://', 'This is a test headline'),
      twitterinlinecode = twitterinline('This is preview sentence', '', ''),
      festivalcode = festival('Steve Adler, Mayor of Austin', '" style="width: 100%;', 'preview');

  $('#readmorecode_preview').html(readmorecode);
  $('#twitterinlinecode_preview').html(twitterinlinecode);
  $('#festivalcode_preview').html(festivalcode);
}


$('#seriesheadercode_form').submit(function(e) {
  var series = $('input[name=series]:checked').val();

  var codeBlock = seriesHeader(series);
  returnCode (codeBlock, 'seriesheadercode');

  copied(this.id);

  e.preventDefault();
});

initializePreviews();
