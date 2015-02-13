// ==UserScript==
// @author James Edward Lewis II
// @namespace greasyfork.org
// @name Disable audio/video autoplay
// @description Ensures that HTML5 audio and video elements do not autoplay, based on http://diveintohtml5.info/examples/disable_video_autoplay.user.js
// @icon http://diveintohtml5.info/favicon.ico
// @include *
// @grant none
// @version 1.1
// @run-at document-end
// @copyright 2015 James Edward Lewis II
// ==/UserScript==
var arVideos = document.getElementsByTagName('video'), arAudio = document.getElementsByTagName('audio'), vl = arVideos.length, al=arAudio.length, loc = window.document.location.toString(), ytPlayer = document.getElementById('movie_player'), ytVars = (ytPlayer != null) ? ytPlayer.getAttribute('flashvars') : '', cb_load = function cb_load(fnc) { // Just for those who still use IE7Pro: IE8 and earlier do not support addEventListener
  'use strict';
  if (window.addEventListener) { // W3C model
    window.addEventListener('load', fnc, false);
    return true;
  } else if (window.attachEvent) { // Microsoft model
    return window.attachEvent('onload', fnc);
  } else { // Browser doesn't support W3C or MSFT model, go on with traditional
    if (typeof window.onload === 'function') {
      // Object already has a function on traditional
      // Let's wrap it with our own function inside another function
      fnc = (function wrap(f1, f2) {
        return function wrapped() {
          f1.apply(this, arguments);
          f2.apply(this, arguments);
        };
      }(window.onload, fnc));
    }
    window.onload = fnc;
    return true;
  }
  return false;
 }, i, stopVideo, stopOldYT;
for (i = vl - 1; i >= 0; i--) arVideos[i].autoplay = false;
for (i = al - 1; i >= 0; i--) arAudio[i].autoplay = false;

// attempted workaround for modern YouTube, except on playlists, based on https://greasyfork.org/en/scripts/6487-pause-all-html5-videos-on-load
if (!loc.match(/^https?\:\/\/(\w+\.)?youtube\.com\/watch\?.*list=[A-Z]/i)) {
  stopVideo = function stopVideo() {
    'use strict';
    var i;
    for (i = vl - 1; i >= 0; i--) {
      arVideos[i].pause();
      arVideos[i].currentTime = 0;
    }
    for (i = al - 1; i >= 0; i--) {
      arAudio[i].pause();
      arAudio[i].currentTime = 0;
    }
  };
  cb_load(stopVideo);
}

// attempted workaround for old Flash-based YouTube, for older browsers, based on http://userscripts-mirror.org/scripts/review/100858
if (loc.match(/https?\:\/\/(\w+\.)?youtube\.com\/.*/i) && loc.indexOf('list=') === -1 && !vl && ytVars) {
  stopOldYT = function stopOldYT() {
    'use strict';
    // in video page : profile page
    ytPlayer.setAttribute('flashvars', (loc.indexOf('/watch') !== -1) ? 'autoplay=0&' + ytVars : ytVars.replace(/autoplay=1/i, 'autoplay=0'));
    ytPlayer.src += (ytPlayer.src.indexOf('#') === -1) ? '#' : '&autoplay=0';
  };
  cb_load(stopOldYT);
}
