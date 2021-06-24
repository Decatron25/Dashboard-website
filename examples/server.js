document.querySelector('body').addEventListener('click', function() {
  var context = new AudioContext();
  context.resume().then(() => {
    console.log('Playback resumed successfully');
  });
});
