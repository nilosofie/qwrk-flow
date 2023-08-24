import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ClickCard({ icon, children, onClick = () => {} }) {
  return (
    <div
      className="card is-equal-height shadow-md is-cursor-pointer transform is-duration-300 hover-shadow-xl hover-translate-y"
      onClick={onClick}
    >
      {icon && (
        <div className="card-image has-text-centered">
          <br />
          <figure className="image is4by3">
            <FontAwesomeIcon icon={icon} size="4x"></FontAwesomeIcon>
          </figure>
        </div>
      )}
      <div className="card-content">
        <div className="content has-text-centered">
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
}

export default ClickCard;
