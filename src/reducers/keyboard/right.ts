import { ReducerType } from '../../types/globalType';

const initState = false;

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ReducerType.KEY_RIGHT:
      return action.data;
    default:
      return state;
  }
};

export default reducer;
