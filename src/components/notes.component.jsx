import React, { useContext, useEffect, useState } from 'react';

import LoadingScreen from './loading-screen/loading-screen.component';

import { OrgContext } from '../context/org.context';

function Notes() {
  //Context//////////////////////////////////////////////
  const { saveNote, notesObj } = useContext(OrgContext);

  const { notes, notesLoading } = notesObj;

  //Local States/////////////////////////////////////////
  const [localNotes, setLocalNotes] = useState('');
  const [noteStatus, setNoteStatus] = useState(false);

  //Local Sate Handlers
  const handleLocalNote = (event) => {
    setLocalNotes(event.target.value);
    setNoteStatus(true);
  };

  const handleSaveNote = () => {
    saveNote(localNotes);
    setNoteStatus((oldStatus) => !oldStatus);
  };

  //Use Effect/////////////////////////////////////////////////////
  useEffect(() => {
    notes && setLocalNotes(notes.note);
  }, [notes]);

  //Component return/////////////////////////////////////////////
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
