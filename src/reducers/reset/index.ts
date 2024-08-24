import { ReducerType } from '../../types/globalType';
import constModule from '../../unit/const';
const { lastRecord } = constModule;
console.log(`lastRecord`,lastRecord)
const initState = lastRecord && lastRecord.reset ? !!lastRecord.reset : false;
const reset = (state = initState, action) => {
  switch (action.type) {
    case ReducerType.RESET:
      return action.data;
    default:
      return state;
  }
};

export default reset;
