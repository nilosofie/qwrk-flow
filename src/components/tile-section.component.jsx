import React, { useState, useEffect, useRef } from 'react';

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
  return (
    <div>
      <div>
        <section
          className="hero is-small is-dark is-cursor-pointer"
          onClick={toggleChildrenVis}
        >
          <div className="hero-body">
            <div className="container has-text-centered">
              <p className="subtitle">{title}</p>
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
