import { ThunkResult } from "types";
import { ActionTypes } from "./type";
import getData from "api/data";

export const setTree = (): ThunkResult<Promise<void>> => async (dispatch) => {
  const data = await getData();
  if (data?.api) {
    dispatch({
      type: ActionTypes.SET_TREE,
      payload: data.api,
    });
  }
};

export const updateEditor = (
  nesting: (string | number)[],
  value: string
): ThunkResult => (dispatch, getState) => {
  const UpdatedEditor = {
    ...(getState().common.deviceTreeEditor as object),
  };
  nesting.reduce(
    (prev, key, index) =>
      index + 1 !== nesting.length
        ? !prev[key]
          ? (prev[key] = {})
          : prev[key]
        : (prev[key] = value),
    UpdatedEditor
  );
  dispatch({
    type: ActionTypes.SET_EDITOR,
    payload: UpdatedEditor,
  });
};
