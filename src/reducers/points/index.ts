import { ReducerType } from '../../types/globalType';
import { maxPoint } from '../../unit/const';
import constModule from '../../unit/const';
const { lastRecord } = constModule;
let initState = lastRecord && !isNaN(parseInt(lastRecord.points, 10)) ?
  parseInt(lastRecord.points, 10) : 0;

if (initState < 0) {
  initState = 0;
} else if (initState > maxPoint) {
  initState = maxPoint;
}

const points = (state = initState, action) => {
  switch (action.type) {
    case ReducerType.POINTS:
      return action.data > maxPoint ? maxPoint : action.data; // 最大分数
    default:
      return state;
  }
};

export default points;
