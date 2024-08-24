import unit from '../../unit';
import { ReducerType } from '../../types/globalType';
import { blockType } from '../../unit/const';
import constModule from '../../unit/const';
const { lastRecord } = constModule;

const getNextType = unit.getNextType;


const initState = lastRecord && blockType.indexOf(lastRecord.next) !== -1 ?
  lastRecord.next : getNextType();
const parse = (state = initState, action) => {
  switch (action.type) {
    case ReducerType.NEXT_BLOCK:
      return action.data;
    default:
      return state;
  }
};

export default parse;
