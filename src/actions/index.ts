import unit from '../unit';
import { ReducerType } from '../types/globalType';
import Block from '../unit/block';
import keyboard from './keyboard';

function getNextType() {
  return unit.getNextType();
}

function nextBlock(next = getNextType()) {
  return {
    type: ReducerType.NEXT_BLOCK,
    data: next,
  };
}

function moveBlock(option) {
  return {
    type: ReducerType.MOVE_BLOCK,
    data: option.reset === true ? null : new Block(option),
  };
}

function speedStart(n) {
  return {
    type: ReducerType.SPEED_START,
    data: n,
  };
}

function speedRun(n) {
  return {
    type: ReducerType.SPEED_RUN,
    data: n,
  };
}

function startLines(n) {
  return {
    type: ReducerType.START_LINES,
    data: n,
  };
}

function matrix(data) {
  return {
    type: ReducerType.MATRIX,
    data,
  };
}

function lock(data) {
  return {
    type: ReducerType.LOCK,
    data,
  };
}

function clearLines(data) {
  return {
    type: ReducerType.CLEAR_LINES,
    data,
  };
}

function points(data) {
  return {
    type: ReducerType.POINTS,
    data,
  };
}

function max(data) {
  return {
    type: ReducerType.MAX,
    data,
  };
}

function reset(data) {
  return {
    type: ReducerType.RESET,
    data,
  };
}

function drop(data) {
  return {
    type: ReducerType.DROP,
    data,
  };
}

function pause(data) {
  return {
    type: ReducerType.PAUSE,
    data,
  };
}

function music(data) {
  return {
    type: ReducerType.MUSIC,
    data,
  };
}

function focus(data) {
  return {
    type: ReducerType.FOCUS,
    data,
  };
}

export default {
  nextBlock,
  moveBlock,
  speedStart,
  speedRun,
  startLines,
  matrix,
  lock,
  clearLines,
  points,
  reset,
  max,
  drop,
  pause,
  keyboard,
  music,
  focus,
};
