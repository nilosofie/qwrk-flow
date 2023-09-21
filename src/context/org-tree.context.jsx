import { createContext, useState } from 'react';

import { nanoid } from 'nanoid';

import { treeRoot } from '../data/tree-root.data';

export const OrgTreeContext = createContext({
  actionList: [],
  addToActionList: () => {},
  removeFromActionList: () => {},
  bucketList: [],
  pushToBucket: () => {},
  removeFromBucket: () => {},
  validateBucketId: () => {},
  treeView: () => {},
  localList: () => {},
});

export const OrgTreeProvider = ({ children }) => {
  const [actionList, setActionList] = useState([]);
  const [bucketList, setBucketList] = useState([treeRoot]);

  const addToActionList = (valueToAdd, id = nanoid()) => {
    valueToAdd
      ? setActionList((old) => [...old, { id: id, item: valueToAdd }])
      : alert('Please add a action');
  };

  const removeFromActionList = (id) => {
    let newArr = actionList.filter((obj) => obj.id !== id);
    setActionList(newArr);
  };

  //Convert bucketList to BucketTree format
  const listToTree = (list) => {
    let map = {},
      node,
      roots = [],
      i;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId !== '0') {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  };

  //Push an object to the bucket list
  const pushToBucket = (object) => {
    const newBucketlist = [...bucketList];

    newBucketlist.push(object);
    setBucketList(newBucketlist);
  };

  //Remove an object from the bucket list
  const removeFromBucket = (id) => {
    let newBucketArr = bucketList
      .filter((obj) => obj.parentId !== id)
      .filter((obj) => obj.id !== id);

    setBucketList(newBucketArr);
  };

  //Check if an ID exists in the bucketList
  const validateBucketId = (id) => {
    let retVal = bucketList.find((obj) => obj.id === id);

    return retVal ? true : false;
  };

  const treeView = (arr) => {
    const newArr = [...arr];

    const newTree = listToTree(newArr);

    return newTree[0];
  };

  const localList = (id) => {
    const localList = bucketList.filter((obj) => obj.parentId === id);

    return localList;
  };

  //value
  const value = {
    actionList,
    addToActionList,
    removeFromActionList,
    bucketList,
    pushToBucket,
    removeFromBucket,
    validateBucketId,
    treeView,
    localList,
  };

  return (
    <OrgTreeContext.Provider value={value}>{children}</OrgTreeContext.Provider>
  );
};
