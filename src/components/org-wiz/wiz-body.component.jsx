import React from "react";

const WizBody = ({
  step,
  subtitle,
  video = "https://www.youtube.com/embed/q4E9L0Ic8Bw",
}) => {
  return (
    <div className="block">
      <h3 className="subtitle">
        Step {step}: {subtitle}
      </h3>
      <div className="container">
        <p className="block">
          Watch this introductory video on how to approach this section
        </p>
        <div className="container columns is-centered">
          <div className="column is-half is-centered">
            {/*<figure className="image is-16by9">
              <iframe
                className="has-ratio"
                width="320"
                height="180"
                src={video}
                allowFullScreen
                title="Intro Video"
              ></iframe>
  </figure>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizBody;
