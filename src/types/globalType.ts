/* eslint-disable @typescript-eslint/no-explicit-any */
import { List } from 'immutable';
export type BinaryMatrix = List<any>;
export enum ReducerType {
  PAUSE = 'PAUSE',
  MUSIC = 'MUSIC',
  MATRIX = 'MATRIX',
  NEXT_BLOCK = 'NEXT_BLOCK',
  MOVE_BLOCK = 'MOVE_BLOCK',
  START_LINES = 'START_LINES',
  MAX = 'MAX',
  POINTS = 'POINTS',
  SPEED_START = 'SPEED_START',
  SPEED_RUN = 'SPEED_RUN',
  LOCK = 'LOCK',
  CLEAR_LINES = 'CLEAR_LINES',
  RESET = 'RESET',
  DROP = 'DROP',
  KEY_DROP = 'KEY_DROP',
  KEY_DOWN = 'KEY_DOWN',
  KEY_LEFT = 'KEY_LEFT',
  KEY_RIGHT = 'KEY_RIGHT',
  KEY_ROTATE = 'KEY_ROTATE',
  KEY_RESET = 'KEY_RESET',
  KEY_MUSIC = 'KEY_MUSIC',
  KEY_PAUSE = 'KEY_PAUSE',
  FOCUS = 'FOCUS',
}