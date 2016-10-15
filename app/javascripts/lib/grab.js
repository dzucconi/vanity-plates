import { knuthShuffle as shuffle } from 'knuth-shuffle';
import sounds from './sounds';
import plates from '../plates';

const grab = state => {
  if (state.plates.length === 0) {
    state.plates = shuffle(plates.slice(0));
  }

  const plate = state.plates.pop();

  if (state.plate === plate) {
    return grab(state);
  }

  state.plate = plate;
  state.player = sounds[plate.word]();

  return state;
};

export default grab;
