import React, { useContext } from 'react';

import Step1 from './step-1.page';
import Step2 from './step-2.page';
import Step3 from './step-3.page';
import Step4 from './step-4.page';
import Step5 from './step-5.page';

import { WizStepCountContext } from '../../../context/wiz-step-count.context';

const StepMain = () => {
  const { wizStepCount } = useContext(WizStepCountContext);

  switch (wizStepCount) {
    case 1:
      return Step1();
    case 2:
      return Step2();
    case 3:
      return Step3();
    case 4:
      return Step4();
    case 5:
      return Step5();
    default:
      return <h1>error</h1>;
  }
};

export default StepMain;
