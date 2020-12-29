import React, { useState } from "react";
// import axios from "axios";
import { DateTime } from "luxon";
import { stateLabelValues } from "../../data/stateLabel";
// import ComposedChart from "../common/composedChart";
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

  return (
    <>
      <div className="bg-pink-600 m-4" style={{ width: "400px" }}>
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
                <div className="bg-blue-200 w-1/12 h-1/6"></div>
                <div className="bg-blue-200 w-1/12 h-4/6"></div>
                <div className="bg-blue-200 w-1/12 h-3/6"></div>
                <div className="bg-blue-200 w-1/12 h-5/6"></div>
                <div className="bg-blue-200 w-1/12 h-4/6"></div>
                <div className="bg-blue-200 w-1/12 h-4/6"></div>
                <div className="bg-blue-200 w-1/12 h-2/6"></div>
                <div className="bg-blue-200 w-1/12 h-5/6"></div>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between py-2 items-center">
          <div className="mx-4">{`Total ${display} in ${selectedState}`}</div>
          <button
            onClick={() => setToggle(!toggle)}
            className="mx-4  border-2 border-gray-700 rounded-md p-1"
          >
            Expand Chart
          </button>
        </div>
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
