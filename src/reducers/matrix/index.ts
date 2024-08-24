import { List } from 'immutable';
import { ReducerType } from '../../types/globalType';
import { blankMatrix } from '../../unit/const';
import constModule from '../../unit/const';
const { lastRecord } = constModule;

const initState = lastRecord && Array.isArray(lastRecord.matrix) ?
  List(lastRecord.matrix.map(e => List(e))) : blankMatrix;

const matrix = (state = initState, action) => {
  switch (action.type) {
    case ReducerType.MATRIX:
      return action.data;
    default:
      return state;
  }
};

export default matrix;
