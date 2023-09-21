import React from 'react';

import BasicStepPage from '../../../components/org-wiz/basic-step-page.component';
import { orderFulFillBucket } from '../../../data/tree-root.data';

const Step4 = () => {
  //return
  return (
    <div>
      <BasicStepPage
        localBucket={orderFulFillBucket}
        video="https://www.youtube.com/embed/YE7VzlLtp-4"
        title="Order Fulfillment"
      />
    </div>
  );
};

export default Step4;
