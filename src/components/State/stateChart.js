import React, { useState } from "react";
import { DateTime } from "luxon";
import { stateLabelValues } from "../../data/stateLabel";
import ChartModal from "../common/chartModal";
import SmallComposedChart from "../common/smallComposedChart";
import ChartSkeleton from "../chartSkeleton";

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
      <div className="bg-gray-900 m-4 rounded" style={{ width: "350px" }}>
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
          <ChartSkeleton columns={24} height={200} />
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
