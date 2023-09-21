import React, { useContext } from 'react';

import { OrgTreeContext } from '../../../context/org-tree.context';

import WizBody from '../../../components/org-wiz/wiz-body.component';
import List from '../../../components/org-wiz/list.org-wiz.component';

const Step1 = () => {
  const { actionList, addToActionList, removeFromActionList } =
    useContext(OrgTreeContext);

  const actionListObject = {
    arr: actionList,
    addToArray: addToActionList,
    removeFromArray: removeFromActionList,
    addToArrayVis: true,
    removeFromArrayVis: true,
  };

  return (
    <div>
      <WizBody
        step="1"
        subtitle="Actions"
        video="https://www.youtube.com/embed/YE7VzlLtp-4"
      />
      <List
        listObject={actionListObject}
        listLabel="What needs to happen in your business?"
      />
    </div>
  );
};

export default Step1;
