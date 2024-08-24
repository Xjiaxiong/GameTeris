import { ReducerType } from '../../types/globalType';
import constModule from '../../unit/const';
const { lastRecord } = constModule;

const initState = lastRecord && lastRecord.lock !== undefined ? !!lastRecord.lock : false;

const lock = (state = initState, action) => {
  switch (action.type) {
    case ReducerType.LOCK:
      return action.data;
    default:
      return state;
  }
};

export default lock;
