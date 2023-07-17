import './style.css';
import WaveSurfer from 'wavesurfer.js';
import songs from './data/musicData.json';

const global = {
  interactionButtons: {
    nextButton: document.querySelector('.next_button'),
    prevButton: document.querySelector('.prev_button'),
    pauseButton: document.querySelector('.pause_button'),
  },
  overLays: {
    banner: document.querySelector('.banner'),
    bannerTitle: document.querySelector('.banner_title'),
  },
  variable: {
    currentSongIdx: 0,
  },
  config: {
    webSurfurConfig: {
      container: '#waveform',
      waveColor: '#495057',
      progressColor: '#adb5bd',
      autoCenter: true,
      height: 80,
    },
  },
};

let wavesurfer = WaveSurfer.create({
  ...global.config.webSurfurConfig,
  url: `/music/${songs[0].name}.mp3`,
});
global.overLays.bannerTitle.textContent = songs[0].name;
global.overLays.banner.style.backgroundImage = `linear-gradient(to top,rgba(0, 0, 0, 0.801),rgba(0, 0, 0, 0.5)),
    url('${songs[0].poster}')`;
wavesurfer.on('interaction', () => {
  wavesurfer.play();
});

//All Buttons listeners
global.interactionButtons.nextButton.addEventListener('click', () =>
  playNextSong('right')
);
global.interactionButtons.prevButton.addEventListener('click', () =>
  playNextSong('left')
);

const playNextSong = async direction => {
  //change song index logic
  let currentSongIndex = global.variable.currentSongIdx;
  direction === 'left' ? currentSongIndex-- : currentSongIndex++;
  currentSongIndex = Math.abs(currentSongIndex);
  global.variable.currentSongIdx = currentSongIndex;

  //Changing music instance
  wavesurfer.destroy();
  wavesurfer = WaveSurfer.create({ ...global.config.webSurfurConfig });
  await wavesurfer.load(
    `/music/${songs[currentSongIndex % songs.length].name}.mp3`
  );

  //change the banner
  global.overLays.banner.style.backgroundImage = `linear-gradient(to top,rgba(0, 0, 0, 0.801),rgba(0, 0, 0, 0.5)),
    url('${songs[currentSongIndex % songs.length].poster}')`;

  wavesurfer.play();
  wavesurfer.on('finish', () => playNextSong('right'));
};
