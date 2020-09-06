import { TreeTypeMap, TreeType } from "types";

export enum ActionTypes {
  SET_TREE = "SET_TREE",
  SET_EDITOR = "SET_EDITOR",
}

type SetTree = {
  type: ActionTypes.SET_TREE;
  payload: {
    deviceTreeTypeMap: TreeTypeMap;
    deviceTree: TreeType;
  };
};

type SetEditor = {
  type: ActionTypes.SET_EDITOR;
  payload: TreeType;
};

export type CommonActions = SetTree | SetEditor;
