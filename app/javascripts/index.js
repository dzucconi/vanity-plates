import loaded from 'imagesloaded';
import grab from './lib/grab';
import Promise from 'bluebird';

const CONFIG = {
  pause: 1000,
};

const STATE = {
  plates: [],
  plate: null,
};

const DOM = {
  app: document.getElementById('app'),
  stage: document.getElementById('stage'),
  notifications: document.getElementById('notifications'),
};

const isTouchDevice = () =>
  'ontouchstart' in window || 'onmsgesturechange' in window;

const play = (render, next) => {
  const { player } = next();
  const el = render();

  const exec = () => {
    DOM.stage.className = 'stage stage--loaded';

    player.isLoaded = true;

    player
      .once('end', () =>
        setTimeout(() =>
          play(render, next), CONFIG.pause));

    setTimeout(() =>
      player.play(), CONFIG.pause);
  };

  if (player.isLoaded) return exec();

  Promise
    // Load the image and sound
    .all([
      new Promise(resolve => player.once('load', resolve)),
      new Promise(resolve => loaded(el, resolve)),
    ])
    // Ready
    .then(exec);
};

const render = () => {
  DOM.stage.innerHTML = `
    <img src='images/${STATE.plate.src}' alt='${STATE.plate.word}'>
  `;

  DOM.stage.className = 'stage stage--loading';

  return DOM.stage;
};

const init = window.init = () =>
  play(render, () => grab(STATE));

export default () => {
  if (isTouchDevice()) {
    DOM.stage.innerHTML = `
      <div class='sound sound--mobile' ontouchstart='init()'>
        🔊
      </div>
    `;

    return;
  }

  init();

  DOM.notifications.innerHTML = `
    <div class='sound'>
      🔊
    </div>
  `;
};
