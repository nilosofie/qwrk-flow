import { createContext, useState } from 'react';

export const OrgContext = createContext({
  orgState: false,
  orgId: '',
});

export const OrgProvider = ({ children }) => {
  const [orgState, setOrgState] = useState(false);
  const [orgId, setOrgId] = useState('');

  const value = {
    orgId,
    orgState,
  };
  return <OrgContext.Provider value={value}>{children}</OrgContext.Provider>;
};
