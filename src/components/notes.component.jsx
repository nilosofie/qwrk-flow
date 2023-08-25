import React, { useContext } from 'react';

import { UsersContext } from '../context/users.context';

function Notes() {
  const { notes, handleNote } = useContext(UsersContext);
  return (
    <div>
      <textarea
        name="notes-text"
        className="textarea "
        placeholder="..."
        value={notes}
        onChange={handleNote}
        rows="25"
      />
    </div>
  );
}

export default Notes;
