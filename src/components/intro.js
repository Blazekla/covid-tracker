import React from "react";

function Intro() {
  return (
    <div className="container mx-auto px-2 sm:px-4 text-center mt-16">
      <div className="text-white">
        This app currently consumes data from both{" "}
        <span>
          <a
            href="https://covidtracking.com/"
            aria-label="Go to covid traking project api source"
            className="text-white italic underline"
          >
            The Covid Tracking Project
          </a>
        </span>{" "}
        and the{" "}
        <span>
          <a
            href="https://disease.sh/"
            aria-label="Go to disease.sh api Source"
            className="text-white italic underline"
          >
            disease.sh
          </a>
        </span>{" "}
        API.
      </div>
      <div className="pt-4">
        <p className="text-white">
          Please select one of the navigation options to see the corresponding
          data.
        </p>
      </div>
    </div>
  );
}

export default Intro;
