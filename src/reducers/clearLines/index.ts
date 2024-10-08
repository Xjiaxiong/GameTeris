import { ReducerType } from '../../types/globalType';
import constModule from '../../unit/const';

const { lastRecord } = constModule;

let initState = lastRecord && !isNaN(parseInt(lastRecord.clearLines, 10)) ?
  parseInt(lastRecord.clearLines, 10) : 0;
if (initState < 0) {
  initState = 0;
}

const clearLines = (state = initState, action) => {
  switch (action.type) {
    case ReducerType.CLEAR_LINES:
      return action.data;
    default:
      return state;
  }
};

export default clearLines;

