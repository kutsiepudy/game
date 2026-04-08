let currentTrack = null;

export function playMusic(file) {
  if (currentTrack) {
      currentTrack.pause();
  }

  currentTrack = new Audio(file)
  currentTrack.loop = true
  currentTrack.play
}

export function stopMusic(currentTrack) {
  if (currentTrack) {
      currentTrack.pause();
      currentTrack.currentTime = 0;
  }
}

export function sfx(src) {
  let sound = new Audio(src);
  sound.play()
}
