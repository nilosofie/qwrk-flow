import React, { useContext } from 'react';
import Sublist from './sublist.component';
import { UserDashContext } from '../context/user-dash.context';

export default function Checklist({ listType }) {
  const { actionList, followUpList, recurringList } =
    useContext(UserDashContext);
  let subList = [];

  switch (listType) {
    case 'action': {
      subList = [...actionList];
      console.log(subList);
      break;
    }
    case 'follow-up':
      subList = [...followUpList];
      break;
    case 'recurring':
      subList = [...recurringList];
      break;
    default:
      subList = undefined;
  }

  const sublistMap = subList.map(({ sublistId, sublistName, sublistItems }) => (
    <Sublist
      key={sublistId}
      sublistId={sublistId}
      sublistName={sublistName}
      sublistItems={sublistItems}
    />
  ));
  return (
    <div className="box">
      <ul>{sublistMap}</ul>
    </div>
  );
}
