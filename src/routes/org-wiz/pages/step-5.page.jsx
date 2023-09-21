import React, { useContext } from 'react';

import { nanoid } from 'nanoid';

import ComplexStepPage from '../../../components/org-wiz/complex-step-page.component';

import List from '../../../components/org-wiz/list.org-wiz.component';

import { OrgTreeContext } from '../../../context/org-tree.context';

import { infrastrucBucket } from '../../../data/tree-root.data';

const Step5 = () => {
  const { localList, pushToBucket } = useContext(OrgTreeContext);

  const localListArr = localList(infrastrucBucket.id).map((item) => {
    const childListCopy = localList(item.id);

    const childListMap = childListCopy[0]
      ? childListCopy.map(({ name, id }) => ({ id: id, item: name }))
      : [];

    const addToChildArray = (childItem) => {
      const childArrObj = {
        parentId: item.id,
        id: nanoid(),
        name: childItem,
        title: childItem,
        children: [],
      };

      pushToBucket(childArrObj);
    };

    const listObject = {
      arr: childListMap,
      addToArray: addToChildArray,
      removeFromArray: () => {}, //Delete
      moveItemToSub: () => {}, // Move Item from main array to sub array
      sendItemToMain: () => {}, // Move Item from sub array to main array
      addItemToChild: () => {}, // Move Item from main array to sub array child
      addToArrayVis: true,
      removeFromArrayVis: false,
      moveItemToSubVis: false,
      sendItemToMainVis: false,
      addItemToChildVis: false,
    };

    return (
      <div className="column is-half">
        <List listObject={listObject} listLabel={item.name} />
      </div>
    );
  });

  console.log(localListArr[0]);
  return (
    <div>
      <ComplexStepPage
        localBucket={infrastrucBucket}
        video="https://www.youtube.com/embed/YE7VzlLtp-4"
        title="Infrastructure"
      />
      <br />
      <div className="container">
        <h3 className="subtitle">Infrastructure Departments</h3>
        {localListArr[0] ? (
          <div className="columns is-multiline">{localListArr}</div>
        ) : (
          <em>No Departments to Show</em>
        )}
      </div>
    </div>
  );
};

export default Step5;
