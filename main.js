import './style.css';
import WaveSurfer from 'wavesurfer.js';
const nextButton = document.querySelector('.next_button');
const prevButton = document.querySelector('.prev_button');
const banner = document.querySelector('.banner');

let currentSong = 0;
const songs = [
  {
    name: 'goodtime',
    poster:
      'https://images.pexels.com/photos/2932418/pexels-photo-2932418.jpeg?auto=compress&cs=tinysrgb&w=1260',
  },
  {
    name: 'ownparadise',
    poster:
      'https://images.pexels.com/photos/10495915/pexels-photo-10495915.jpeg?auto=compress&cs=tinysrgb&w=1260',
  },
  {
    name: 'theweekend',
    poster:
      'https://images.pexels.com/photos/4571219/pexels-photo-4571219.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];
const webSurfurConfig = {
  container: '#waveform',
  waveColor: '#495057',
  progressColor: '#adb5bd',
  autoCenter: true,
  height: 80,
};
let wavesurfer = WaveSurfer.create({
  ...webSurfurConfig,
  url: '/music/goodtime.mp3',
});

const playNextSong = async direction => {
  direction === 'left' ? currentSong-- : currentSong++;
  currentSong = Math.abs(currentSong);
  console.log(currentSong % 3);
  //create new instance
  wavesurfer.destroy();
  wavesurfer = WaveSurfer.create({ ...webSurfurConfig });
  await wavesurfer.load(`/music/${songs[currentSong % 3].name}.mp3`);

  //change the banner

  banner.style.backgroundImage = `linear-gradient(to top,rgba(0, 0, 0, 0.801),rgba(0, 0, 0, 0.5)),
    url('${songs[currentSong % 3].poster}')`;

  wavesurfer.play();
  wavesurfer.on('finish', () => playNextSong('right'));
};

wavesurfer.on('interaction', () => {
  wavesurfer.play();
});

nextButton.addEventListener('click', () => playNextSong('right'));
prevButton.addEventListener('click', () => playNextSong('left'));
