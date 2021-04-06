import React, { useState } from "react";
import { DateTime } from "luxon";
import { stateLabelValues } from "../../data/stateLabel";
import ChartModal from "../common/chartModal";
import SmallComposedChart from "../common/smallComposedChart";

function StateChart({
  totalCases,
  selectedState,
  handleStateChange,
  display,
  loading,
}) {
  const [selectedType, setSelectedType] = useState("newCases");
  const [lineChart, setLineChart] = useState(false);
  const [barChart, setBarChart] = useState(true);
  const [toggle, setToggle] = useState(false);

  if (toggle) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }

  const today = DateTime.local().minus({ day: 1 }).toFormat("LLL d");

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleLineChartChange = (e) => {
    setLineChart(!lineChart);
  };

  const handleBarChartChange = (e) => {
    setBarChart(!barChart);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const displayMessage = () => {
    switch (display) {
      case "positiveIncrease":
        return `Daily Increase in ${selectedState}`;
      case "deathIncrease":
        return `Daily Deaths in ${selectedState}`;
      case "totalTestResultsIncrease":
        return `Daily Tests in ${selectedState}`;
      case "hospitalizedCurrently":
        return `Currently Hospitalized in ${selectedState}`;
      default:
        return `Data from ${selectedState}`;
    }
  };

  return (
    <>
      <div className="bg-gray-900 m-4 rounded" style={{ width: "400px" }}>
        <div className="flex justify-between py-2 items-center text-white">
          <div className="mx-4">{displayMessage()}</div>
          <button
            onClick={() => setToggle(!toggle)}
            className="mx-4 border-2 rounded-md p-1"
          >
            Expand Chart
          </button>
        </div>
        {totalCases && !loading ? (
          <SmallComposedChart
            totalCases={totalCases}
            today={today}
            selectedType={selectedType}
            location={selectedState}
            lineToggle={false}
            barToggle={true}
            heightInput={200}
            display={display}
          />
        ) : (
          <div className="p-4  w-full mx-auto" style={{ height: "200px" }}>
            <div className="animate-pulse h-full bg-blue-100 w-full">
              <div className="flex  rounded w-full h-full justify-between max-w-xs mx-auto items-end">
                <div className="bg-primary-light bg-opacity-40 w-1/12 h-1/6"></div>
                <div className="bg-primary-light bg-opacity-40 w-1/12 h-4/6"></div>
                <div className="bg-primary-light bg-opacity-40 w-1/12 h-3/6"></div>
                <div className="bg-primary-light bg-opacity-40 w-1/12 h-5/6"></div>
                <div className="bg-primary-light bg-opacity-40 w-1/12 h-4/6"></div>
                <div className="bg-primary-light bg-opacity-40 w-1/12 h-4/6"></div>
                <div className="bg-primary-light bg-opacity-40 w-1/12 h-2/6"></div>
                <div className="bg-primary-light bg-opacity-40 w-1/12 h-5/6"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      {toggle ? (
        <ChartModal
          totalCases={totalCases}
          selectedState={selectedState}
          handleToggle={handleToggle}
          handleStateChange={handleStateChange}
          stateLabelValues={stateLabelValues}
          selectedType={selectedType}
          handleTypeChange={handleTypeChange}
          barChart={barChart}
          handleBarChartChange={handleBarChartChange}
          lineChart={lineChart}
          handleLineChartChange={handleLineChartChange}
          today={today}
          display={display}
        />
      ) : null}
    </>
  );
}

export default StateChart;
