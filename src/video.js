/*eslint-disable*/
const GoPro = require('goproh4');
const path  = require('path');
const cam = new GoPro.Camera();
let fileName;

function getMedia() {

}

exports.videoSession = (req, res) => {

  // Set camera mode
  cam.mode(GoPro.Settings.Modes.Video, GoPro.Settings.Submodes.Video.Video)

  // Set camera resolution
  .then(function () {
      return cam.set(GoPro.Settings.VIDEO_RESOLUTION, GoPro.Settings.VideoResolution.R720);
  })

  // Set camera framerate
  .then(function () {
      return cam.set(GoPro.Settings.VIDEO_FPS, GoPro.Settings.VideoFPS.F120)
  })

  .then(function () {
    return cam.set(GoPro.Settings.VIDEO_FOV, GoPro.Settings.VIDEO_FOV.Narrow)
  })

  // Begin recording
  .then(function () {
      console.log('[video]', 'started');
      return cam.start();
  })

  // Wait 5
  .delay(5000)

  // Stop recording
  .then(function () {
      console.log('[video]', 'stopped');
      return cam.stop();
  })

  .then(function() {
    return cam.listMedia()
  })

  .then(function(result) {
    var lastDirectory = result.media[result.media.length - 1];
    var lastFile = lastDirectory.fs[lastDirectory.fs.length - 1];
      fileName = lastFile.n;
    var whereToSave = path.resolve(__dirname, `../public/videos/${fileName}`);
    return cam.getMedia(lastDirectory.d, lastFile.n, whereToSave)
  })

  .then(function(filename) {
    console.log(filename, '[saved]');
    res.send(fileName);
  });
}


