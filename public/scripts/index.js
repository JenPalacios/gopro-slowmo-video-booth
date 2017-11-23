/*eslint-disable*/
import '../sass/styles.sass';

window.onload = () => {

  const recordButton = document.querySelector('#record');
  const raffleButton = document.querySelector('#raffle');
  const playbackButton = document.querySelector('#playback');
  const video = document.getElementById('video');
  const url = '/record';
  let lastVideoSaved;
  let source;

  var $playbackSection  = $('.section--playback'),
      $videoSection     = $('.section--video'),
      $recordSection    = $('.section--record'),
      $recordingSection = $('.section--recording'),
      $closeButton      = $('#close');

  function sendRequest() {
    const posting = $.post(url);

    posting.done(function(data) {
      lastVideoSaved = `videos/${data}`;
      source = document.createElement('source');
      source.setAttribute('src', lastVideoSaved);
      video.appendChild(source);
      $recordingSection.fadeOut(300, function() {
        $playbackSection.fadeIn(300);
      });
    });
  }

  function animateValue(id, start, end, duration) {
      var range = end - start;
      var current = start;
      var increment = end > start? 1 : -1;
      var stepTime = Math.abs(Math.floor(duration / range));
      var obj = document.getElementById(id);
      var timer = setInterval(function() {
          current += increment;
          obj.innerHTML = current;
          if (current == end) {
              clearInterval(timer);
              $('#countdown').fadeOut(300, function() {
                $recordingSection.fadeIn(300);
              });
              sendRequest();
          }
      }, stepTime);
  }

  function record(event) {
    event.preventDefault();
    $(this).fadeOut(300, function() {
      animateValue("countdown", 6, 0, 6000);
    });
  }

  function playVideo() {
    video.play();
    video.addEventListener('ended', function() {
      $closeButton.fadeIn(300);
    });
  }

  function playback() {
    video.playbackRate = 0.3;
    $playbackSection.fadeOut(300, function(){
      $videoSection.fadeIn(800, function() {
        playVideo();
      });
    });
  }

  recordButton.addEventListener('click', record);
  playbackButton.addEventListener('click', playback);
  $closeButton.on('click', function() {
    $videoSection.fadeOut(300, function() {
      location.reload();
      $recordSection.fadeIn(200);
    });
  });

}








