import React, { useContext } from "react";

import {
  query,
  collection,
  getFirestore,
  where,
  orderBy,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import OrganizationChart from "@dabeng/react-orgchart";

import LoadingScreen from "./loading-screen/loading-screen.component";
import OrgNode from "./org-node/org-node.component";

import { OrgContext } from "../context/org.context";

function OrgEditor() {
  const { orgId } = useContext(OrgContext);

  const db = getFirestore();
  const listsQuery = orgId
    ? query(collection(db, "org", orgId, "lists"), orderBy("order"))
    : null;

  const [lists, listsLoading, listsError] = useCollectionData(listsQuery);

  const listsMap = lists?.map((list) => {
    return {
      parentId: list.parentId,
      id: list.listId,
      name: list.list,
      title: list.list,
      children: [],
    };
  });

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
      if (node.parentId !== "0") {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  };

  const treeView = (arr) => {
    const newArr = [...arr];

    const newTree = listToTree(newArr);

    return newTree[0];
  };

  return (
    <div>
      {listsLoading ? (
        <LoadingScreen />
      ) : (
        <OrganizationChart
          datasource={treeView(listsMap)}
          NodeTemplate={OrgNode}
          chartClass="org-chart"
        />
      )}
    </div>
  );
}

export default OrgEditor;
