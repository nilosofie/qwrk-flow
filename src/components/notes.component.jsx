import React, { useContext, useEffect, useState } from 'react';

import { OrgContext } from '../context/org.context';

import LoadingScreen from './loading-screen/loading-screen.component';

function Notes() {
  const { saveNote, notesObj } = useContext(OrgContext);

  const { notes, notesLoading } = notesObj;

  const [localNotes, setLocalNotes] = useState('');
  const [noteStatus, setNoteStatus] = useState(false);

  useEffect(() => {
    notes && setLocalNotes(notes.note);
  }, [notes]);

  const handleLocalNote = (event) => {
    setLocalNotes(event.target.value);
    setNoteStatus(true);
  };

  const handleSaveNote = () => {
    saveNote(localNotes);
    setNoteStatus((oldStatus) => !oldStatus);
  };

  return notesLoading ? (
    <LoadingScreen />
  ) : (
    <div>
      <textarea
        name="notes-text"
        className="textarea "
        placeholder="..."
        value={localNotes}
        onChange={handleLocalNote}
        rows="25"
      />
      <br />
      <button
        type="button"
        onClick={handleSaveNote}
        className="button is-fullwidth is-info"
        disabled={!noteStatus}
      >
        {!noteStatus ? 'Saved' : 'Changes not saved'}
      </button>
    </div>
  );
}

export default Notes;
