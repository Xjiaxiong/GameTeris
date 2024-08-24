import { ReducerType } from '../../types/globalType';
import constModule from '../../unit/const';
const { lastRecord } = constModule;

const initState = lastRecord && lastRecord.pause !== undefined ? !!lastRecord.pause : false;
const pause = (state = initState, action) => {
  switch (action.type) {
    case ReducerType.PAUSE:
      return action.data;
    default:
      return state;
  }
};

export default pause;
