import React from "react";

function Intro() {
  return (
    <div className="container mx-auto px-2 sm:px-4">
      <div className="text-white">
        This app currently consumes the API from{" "}
        <a
          href="https://covidtracking.com/"
          aria-label="Go to API Source"
          className="text-indigo-500 italic underline"
        >
          The Covid Tracking Project
        </a>
        .
      </div>
      <div>
        <p className="text-white">
          Please select one of the options above to see the corresponding chart.
        </p>
      </div>
    </div>
  );
}

export default Intro;
