/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReducerType } from '../types/globalType';

function drop(data: any) {
  return {
    type: ReducerType.KEY_DROP,
    data,
  };
}

function down(data: any) {
  return {
    type: ReducerType.KEY_DOWN,
    data,
  };
}

function left(data: any) {
  return {
    type: ReducerType.KEY_LEFT,
    data,
  };
}

function right(data: any) {
  return {
    type: ReducerType.KEY_RIGHT,
    data,
  };
}

function rotate(data: any) {
  return {
    type: ReducerType.KEY_ROTATE,
    data,
  };
}

function reset(data: any) {
  return {
    type: ReducerType.KEY_RESET,
    data,
  };
}

function music(data: any) {
  return {
    type: ReducerType.KEY_MUSIC,
    data,
  };
}

function pause(data: any) {
  return {
    type: ReducerType.KEY_PAUSE,
    data,
  };
}

export default {
  drop,
  down,
  left,
  right,
  rotate,
  reset,
  music,
  pause,
};
