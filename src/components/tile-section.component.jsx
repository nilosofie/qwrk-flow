import React from 'react';

const TitleSection = ({ title, children }) => {
  return (
    <div>
      <div>
        <section className="hero is-small is-link">
          <div className="hero-body">
            <div className="container has-text-centered">
              <p className="title">{title}</p>
            </div>
          </div>
        </section>
        <br />
        {children}
      </div>
      <br />
    </div>
  );
};

export default TitleSection;
