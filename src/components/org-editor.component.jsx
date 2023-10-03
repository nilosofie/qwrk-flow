import React, { useContext, useRef, useState } from "react";

import {
  query,
  collection,
  getFirestore,
  orderBy,
  where,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import OrganizationChart from "@dabeng/react-orgchart";

import LoadingScreen from "./loading-screen/loading-screen.component";
import OrgNode from "./org-node/org-node.component";

import { OrgContext } from "../context/org.context";
import { nanoid } from "nanoid";

function OrgEditor() {
  const { orgId } = useContext(OrgContext);

  //export options
  const [filename, setFilename] = useState("org-chart");
  const [fileextension, setFileextension] = useState("pdf");

  const orgchart = useRef();
  const exportTo = () => {
    setFilename(`OrgChart - ${orgId} - ${nanoid()}`);
    setFileextension("png");
    orgchart.current.exportTo(filename, fileextension);
  };

  //

  const db = getFirestore();
  const listsQuery = orgId
    ? query(
        collection(db, "org", orgId, "lists"),
        where("active", "==", true),
        orderBy("order")
      )
    : null;

  const [lists, listsLoading] = useCollectionData(listsQuery);

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

  const treeView = (arr = []) => {
    const newArr = [...arr];

    const newTree = listToTree(newArr);

    return newTree[0];
  };

  return (
    <div>
      {listsLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          <OrganizationChart
            datasource={treeView(listsMap)}
            NodeTemplate={OrgNode}
            chartClass="org-chart"
            ref={orgchart}
          />
          <button className="button" onClick={exportTo}>
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>
      )}
    </div>
  );
}

export default OrgEditor;
