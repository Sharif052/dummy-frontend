import { SAVE_NASE } from "../types";
const initState = {
  list: [],
};
const reducer = (state = initState, actions:any) => {
  switch (actions.type) {
    case SAVE_NASE:
      return { ...state, list: actions.payload };
    default:
      return state;
  }
};
export default reducer;
