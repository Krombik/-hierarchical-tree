import { ActionTypes, CommonActions } from "./type";
import { TreeTypeMap, TreeType } from "types";

type State = {
  deviceTreeTypeMap: TreeTypeMap | null;
  deviceTree: TreeType | null;
  deviceTreeEditor: TreeType;
};

const initialState: State = {
  deviceTreeTypeMap: null,
  deviceTree: null,
  deviceTreeEditor: {},
};

export default function reducer(
  state = initialState,
  action: CommonActions
): State {
  switch (action.type) {
    case ActionTypes.SET_TREE:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.SET_EDITOR:
      return {
        ...state,
        deviceTreeEditor: action.payload,
      };
    default:
      return state;
  }
}
