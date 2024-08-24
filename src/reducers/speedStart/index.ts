import { ReducerType } from '../../types/globalType';
import constModule from '../../unit/const';
const { lastRecord } = constModule;


let initState = lastRecord && !isNaN(parseInt(lastRecord.speedStart, 10)) ?
  parseInt(lastRecord.speedStart, 10) : 1;
if (initState < 1 || initState > 6) {
  initState = 1;
}

const speedStart = (state = initState, action) => {
  switch (action.type) {
    case ReducerType.SPEED_START:
      return action.data;
    default:
      return state;
  }
};

export default speedStart;
