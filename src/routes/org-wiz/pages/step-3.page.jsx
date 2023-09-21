import React from 'react';

import BasicStepPage from '../../../components/org-wiz/basic-step-page.component';

import { leadConBucket } from '../../../data/tree-root.data';

const Step3 = () => {
  //return

  return (
    <div>
      <BasicStepPage
        title="Lead Conversion"
        video="https://www.youtube.com/embed/q4E9L0Ic8Bw"
        localBucket={leadConBucket}
      />
    </div>
  );
};

export default Step3;
