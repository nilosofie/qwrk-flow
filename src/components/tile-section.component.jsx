import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinimize, faMaximize } from '@fortawesome/free-solid-svg-icons';

import autoAnimate from '@formkit/auto-animate';

const TitleSection = ({ title, children }) => {
  const [childrenVis, setChildernVis] = useState(true);

  //--------Animation-----------
  const parentRef = useRef();

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);
  //---------------------------------

  const toggleChildrenVis = () => setChildernVis((oldState) => !oldState);

  const minmax = childrenVis ? (
    <FontAwesomeIcon icon={faMinimize} />
  ) : (
    <FontAwesomeIcon icon={faMaximize} />
  );
  return (
    <div>
      <div>
        <section
          className="hero is-small is-primary is-cursor-pointer"
          onClick={toggleChildrenVis}
        >
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="columns is-mobile">
                <span className="subtitle column">{title}</span>
                <span className="column is-1">{minmax}</span>
              </div>
            </div>
          </div>
        </section>
        <br />
        <div ref={parentRef}>
          {childrenVis && (
            <div ref={parentRef}>
              <div className="is-fullwidth">{children}</div>
            </div>
          )}
        </div>
      </div>
      <br />
    </div>
  );
};

export default TitleSection;
