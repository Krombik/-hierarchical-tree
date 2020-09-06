import React, { FC, useEffect } from "react";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import { createSelector } from "reselect";
import { State, TreeType, TreeTypeMap, ThunkDispatcher } from "types";
import { useSelector, useDispatch } from "react-redux";
import { setTree, updateEditor } from "redux/common/actions";
import TextField from "@material-ui/core/TextField";

const renderTree = (
  item: TreeType,
  itemType: TreeTypeMap,
  itemEditor: TreeType,
  onEdit: (nesting: (string | number)[], value: string) => void,
  node = { id: 0 },
  nesting: (string | number)[] = []
) => {
  if (typeof item !== "object") {
    node.id += 2;
    return (
      <TreeItem
        nodeId={String(node.id - 1)}
        onLabelClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        label={
          typeof itemType !== "object" ? (
            <TextField
              type={itemType}
              label="value"
              value={typeof itemEditor === "object" ? item : itemEditor}
              onChange={(e) => {
                onEdit(nesting, e.currentTarget.value);
              }}
            />
          ) : (
            `value: ${item}`
          )
        }
      />
    );
  }
  node.id++;
  return Array.isArray(item)
    ? item.map((curr, index) => (
        <TreeItem key={index} nodeId={String(node.id)} label={`key: ${index}`}>
          {renderTree(
            curr,
            itemType[index] || {},
            itemEditor[index] || {},
            onEdit,
            node,
            [...nesting, index]
          )}
        </TreeItem>
      ))
    : Object.keys(item).map((key, index) => (
        <TreeItem key={index} nodeId={String(node.id)} label={`key: ${key}`}>
          {renderTree(
            item[key],
            itemType[key] || {},
            itemEditor[key] || {},
            onEdit,
            node,
            [...nesting, key]
          )}
        </TreeItem>
      ));
};

const selectData = createSelector(
  (state: State) => state.common.deviceTree,
  (state: State) => state.common.deviceTreeTypeMap,
  (state: State) => state.common.deviceTreeEditor,
  (deviceTree, deviceTreeTypeMap, deviceTreeEditor) => ({
    deviceTree,
    deviceTreeTypeMap,
    deviceTreeEditor,
  })
);

const Tree: FC = () => {
  const dispatch = useDispatch<ThunkDispatcher>();

  useEffect(() => {
    dispatch(setTree());
  }, []);

  const { deviceTree, deviceTreeTypeMap, deviceTreeEditor } = useSelector(
    selectData
  );

  const handleEdit = (nesting: (string | number)[], value: string) => {
    dispatch(updateEditor(nesting, value));
  };

  if (!deviceTree || !deviceTreeTypeMap) return <div>Loading...</div>;
  return (
    <TreeView disableSelection defaultCollapseIcon="-" defaultExpandIcon="+">
      {renderTree(deviceTree, deviceTreeTypeMap, deviceTreeEditor, handleEdit)}
    </TreeView>
  );
};

export default Tree;
