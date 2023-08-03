import React, { useContext } from 'react';

import { UserDashContext } from '../context/user-dash.context';

function Notes() {
  const { notes, handleNote } = useContext(UserDashContext);
  return (
    <div>
      <textarea
        name="notes-text"
        className="textarea"
        placeholder="..."
        value={notes}
        onChange={handleNote}
        rows="10"
      />
    </div>
  );
}

export default Notes;
