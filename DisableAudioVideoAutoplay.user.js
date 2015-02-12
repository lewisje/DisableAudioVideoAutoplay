// ==UserScript==
// @author James Edward Lewis II
// @namespace greasyfork.org
// @name Disable audio/video autoplay
// @description Ensures that HTML5 audio and video elements do not autoplay, based on http://diveintohtml5.info/examples/disable_video_autoplay.user.js
// @icon http://diveintohtml5.info/favicon.ico
// @include *
// @grant none
// @version 1.0
// @run-at document-end
// @copyright 2015 James Edward Lewis II
// ==/UserScript==
var arVideos = document.getElementsByTagName('video'), arAudio = document.getElementsByTagName('audio'), i;
for (i = arVideos.length - 1; i >= 0; i--) arVideos[i].autoplay = false;
for (i = arAudio.length - 1; i >= 0; i--) arAudio[i].autoplay = false;
