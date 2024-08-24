import { ReducerType } from '../../types/globalType';
import constModule from '../../unit/const';
const { lastRecord } = constModule;

let initState = lastRecord && !isNaN(parseInt(lastRecord.startLines, 10)) ?
  parseInt(lastRecord.startLines, 10) : 0;
if (initState < 0 || initState > 10) {
  initState = 0;
}

const startLines = (state = initState, action) => {
  switch (action.type) {
    case ReducerType.START_LINES:
      return action.data;
    default:
      return state;
  }
};

export default startLines;
