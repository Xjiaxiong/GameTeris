import { ReducerType } from '../../types/globalType';
import constModule from '../../unit/const';
const { lastRecord } = constModule;


const initState = lastRecord && lastRecord.drop !== undefined ? !!lastRecord.drop : false;

const drop = (state = initState, action) => {
  switch (action.type) {
    case ReducerType.DROP:
      return action.data;
    default:
      return state;
  }
};

export default drop;
