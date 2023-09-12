import { createContext, useState, useEffect } from 'react';

export const OrgContext = createContext({
  orgState: false,
  orgId: '',
  updateOrgId: () => {},
});

export const OrgProvider = ({ children }) => {
  const [orgState, setOrgState] = useState(false);
  const [orgId, setOrgId] = useState('');

  const updateOrgId = (id) => setOrgId(id);

  useEffect(() => {
    orgId ? setOrgState(true) : setOrgState(false);
  }, [orgId]);

  const value = {
    orgId,
    orgState,
    updateOrgId,
  };
  return <OrgContext.Provider value={value}>{children}</OrgContext.Provider>;
};
