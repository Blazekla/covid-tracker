import React, {
  useState,
  //  useEffect
} from "react";
// import axios from "axios";
import { DateTime } from "luxon";
import { stateLabelValues } from "../../data/stateLabel";
// import ComposedChart from "../common/composedChart";
import ChartModal from "../common/chartModal";
import SmallComposedChart from "../common/smallComposedChart";

function StateChart({ totalCases, selectedState, handleStateChange, display }) {
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
        {totalCases ? (
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
          <div
            className="border border-blue-400 shadow rounded-md p-4  w-full mx-auto"
            style={{ height: "200px" }}
          >
            <div className="animate-pulse flex flex-col h-full ">
              <div className="flex h-4/5">
                <div className="bg-blue-200 rounded h-full w-1/12"></div>
                <div className="bg-blue-200 rounded w-10/12 mx-auto"></div>
              </div>
              <div>
                <div className="bg-blue-200 rounded w-full h-8 mt-1"></div>
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
