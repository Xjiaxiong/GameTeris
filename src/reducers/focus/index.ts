import { ReducerType } from '../../types/globalType';
import { isFocus } from '../../unit';

const initState = isFocus();
const focus = (state = initState, action) => {
  switch (action.type) {
    case ReducerType.FOCUS:
      return action.data;
    default:
      return state;
  }
};

export default focus;
