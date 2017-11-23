/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

window.onload = function () {

  var recordButton = document.querySelector('#record');
  var raffleButton = document.querySelector('#raffle');
  var playbackButton = document.querySelector('#playback');
  var video = document.getElementById('video');
  var url = '/record';
  var lastVideoSaved = void 0;
  var source = void 0;

  var $playbackSection = $('.section--playback'),
      $videoSection = $('.section--video'),
      $recordSection = $('.section--record'),
      $recordingSection = $('.section--recording'),
      $closeButton = $('#close');

  function sendRequest() {
    var posting = $.post(url);

    posting.done(function (data) {
      lastVideoSaved = 'videos/' + data;
      source = document.createElement('source');
      source.setAttribute('src', lastVideoSaved);
      video.appendChild(source);
      $recordingSection.fadeOut(300, function () {
        $playbackSection.fadeIn(300);
      });
    });
  }

  function animateValue(id, start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.getElementById(id);
    var timer = setInterval(function () {
      current += increment;
      obj.innerHTML = current;
      if (current == end) {
        clearInterval(timer);
        $('#countdown').fadeOut(300, function () {
          $recordingSection.fadeIn(300);
        });
        sendRequest();
      }
    }, stepTime);
  }

  function record(event) {
    event.preventDefault();
    $(this).fadeOut(300, function () {
      animateValue("countdown", 6, 0, 6000);
    });
  }

  function playVideo() {
    video.play();
    video.addEventListener('ended', function () {
      $closeButton.fadeIn(300);
    });
  }

  function playback() {
    video.playbackRate = 0.3;
    $playbackSection.fadeOut(300, function () {
      $videoSection.fadeIn(800, function () {
        playVideo();
      });
    });
  }

  recordButton.addEventListener('click', record);
  playbackButton.addEventListener('click', playback);
  $closeButton.on('click', function () {
    $videoSection.fadeOut(300, function () {
      location.reload();
      $recordSection.fadeIn(200);
    });
  });
}; /*eslint-disable*/

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map