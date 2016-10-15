const fs = require('fs');
const Ivona = require('ivona-node');

const VOICE = { Gender: 'Male', Language: 'en-US', Name: 'Justin' };
const WORDS = ['3xthfun', '4 deux', '5 oclck', '6shotr', '8mpghwy', 'a redhed', 'almsgt2', 'birdfrk', 'bukworm', 'capt slo', 'chwbca', 'crex', 'cubssuc', 'dcptcon', 'dumblnd', 'fast lvn', 'gomomgo', 'gt gray', 'hapy me', 'hydurwf', 'ima pita', 'inocul8', 'judies', 'k9hemi', 'kestrel', 'lifes gd', 'lost n', 'lt n flfy', 'luv2owl', 'luvs2laf', 'masrati', 'merd tet', 'mssbhvn', 'myangel', 'notatoy', 'onurknz', 'profsor', 'rmsfan', 'roldabnz', 'rusaved', 'shrek', 'skygdes', 'snakeguy', 'so 4chn8', 'stryphe', 'tchpeace', 'uno ojo', 'unxpktd', 'wuat da', 'wuz hiz', 'xcapepod', 'y so srs', 'y u hatn', 'yadda-3x', 'yelovet'];

const wait = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

const ivona = new Ivona({
  accessKey: process.env.IVONA_ACCESS_KEY,
  secretKey: process.env.IVONA_SECRET_KEY
});

const getVoices = () =>
  new Promise(resolve =>
    ivona
      .listVoices()
      .on('complete', resolve)
  );

const speak = (text, voice) =>
  new Promise(resolve => {
    ivona
      .createVoice(text, { body: { voice: voice } })
      .pipe(fs.createWriteStream(`./app/assets/sounds/${text}.mp3`))
      .on('finish', () =>
        wait(250).then(resolve));
  });

const generate = (text) => {
  console.log(`Generating ${text}; spoken by ${VOICE}`);
  return speak(text, VOICE)
    .then(() => wait(25));
};

WORDS.reduce((promise, word) =>
    promise.then(() => generate(word)), Promise.resolve(true))
  .then(() => console.log('Done.'));
