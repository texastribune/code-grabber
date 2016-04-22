/* global Clipboard, pym */

(function() {
  'use strict';

  var pymChild;

  function render() {
    if (pymChild) {
      pymChild.sendHeight();
    }
  }

  function load() {
    pymChild = new pym.Child({
      renderCallback: render
    });
  }

  var templateFrame = $('.preview--frame');

  // Add your JS here!
  $('#desktop').click(function() {
    templateFrame.width(640);
  });

  $('#mobile').click(function() {
    templateFrame.width(320);
  });

  $('#full').click(function() {
    templateFrame.width('100%');
  });
  
  function copied(x) {
    $('.copied').hide();
    $(x).find('.copied').css('display', 'inline-block');
  }

  $('#readmore_form').submit(function(e) {
    var headline = $('#readmore_headline').val(),
        link = $('#readmore_link').val(),
        headlineHTML = $('.readmore_headline'),
        headlineTextHTML = $('.readmore_headlineText'),
        linkHTML = $('.readmore_link'),
        linkTextHTML = $('.readmore_linkText');

    headlineHTML.html(headline);
    headlineTextHTML.html(headline);
    linkTextHTML.html(link);
    linkHTML.prop('href', link);

    $('#readmore_clipboard').trigger('click');
    copied(this);
    e.preventDefault();
  });

  $('#twitterinline_form').submit(function(e) {
    var shareSentence = $('#twitterinline_sentence').val(),
        shareHashtag = $('#twitterinline_hashtag').val(),
        shareSentenceHTML = $('.twitterinline_sentence'),
        shareSentenceEncodeHTML = $('.twitterinline_sentence_encode'),
        shareHashtagHTML = $('.twitterinline_hashtag'),
        shareSentenceLength = shareSentence.length,
        shareHashtagLength = shareHashtag.length,
        shareLength = shareSentenceLength + shareHashtagLength,
        shareSentenceLengthHTML = $('#twitterinline_sentence_length');
    
    shareSentenceEncodeHTML.html(encodeURI(shareSentence));
    shareSentenceHTML.html(shareSentence);

    if(shareLength >= 110) {
      $('#twitterinline_warning').removeClass('hidden');
      shareSentenceLengthHTML.html(shareLength);
    } else {
      $('#twitterinline_warning').addClass('hidden');
      shareSentenceLengthHTML.html(shareLength);
    }

    if(shareHashtag !== '') {
      shareHashtagHTML.html(shareHashtag);
    }

    $('#twitterinline_clipboard').trigger('click');
    copied(this);
    e.preventDefault();
  });

  $('#pullquote_form').submit(function(e) {
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
      positionHTML.html(' style="width: 100%"');
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

    $('#pullquote_clipboard').trigger('click');
    copied(this);
    e.preventDefault();
  });


  $('#photoEmbed_form').submit(function(e) {
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

    $('#photoEmbed_clipboard').trigger('click');
    copied(this);
    e.preventDefault();
  });

  $('#videoEmbed_form').submit(function(e) {
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
    
    $('#videoEmbed_clipboard').trigger('click');
    copied(this);
    e.preventDefault();
  });

  new Clipboard('.copy');

  window.onload = load;

  $('button.copy-button').click(function() {
    $('.copied').hide();
    $(this).next($('.copied')).css('display', 'inline-block');
  });

})();
