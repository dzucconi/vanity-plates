import { Howl } from 'howler';
import plates from '../plates';

const audio = {};

const player = word =>
  new Howl({
    src: [`sounds/${word}.mp3`],
  });

export default plates
  .reduce((memo, { word }) => {
    memo[word] = () =>
      audio[word] || (audio[word] = player(word));
    return memo;
  }, {});
