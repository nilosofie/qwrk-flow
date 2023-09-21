import { useState, createContext } from "react";

export const WizStepCountContext = createContext({
  wizStepCount: 0,
  incStep: () => {},
  decStep: () => {},
});

export const WizStepCountProvider = ({ children }) => {
  const [wizStepCount, setWizStepCount] = useState(1);

  const incStep = () => {
    wizStepCount !== 5 && setWizStepCount((curStep) => curStep + 1);
  };

  const decStep = () => {
    wizStepCount !== 1 && setWizStepCount((curStep) => curStep - 1);
  };

  const value = {
    wizStepCount,
    incStep,
    decStep,
  };

  return (
    <WizStepCountContext.Provider value={value}>
      {children}
    </WizStepCountContext.Provider>
  );
};
