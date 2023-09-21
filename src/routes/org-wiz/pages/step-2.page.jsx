import React from 'react';

import BasicStepPage from '../../../components/org-wiz/basic-step-page.component';

import { leadGenBucket } from '../../../data/tree-root.data';

const Step2 = () => {
  //return

  return (
    <div>
      <BasicStepPage
        title="Lead Generation"
        localBucket={leadGenBucket}
        video="https://www.youtube.com/embed/q4E9L0Ic8Bw"
      />
    </div>
  );
};

export default Step2;
