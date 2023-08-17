import React from 'react';

const Popup = ({ trigger = true, children, closePopup }) => {
  return (
    trigger && (
      <div className="modal is-active">
        <div className="modal-background" onClick={closePopup}></div>
        <div className="modal-content">
          {children}
          <button
            className="modal-close is-large"
            onClick={closePopup}
          ></button>
        </div>
      </div>
    )
  );
};

export default Popup;
