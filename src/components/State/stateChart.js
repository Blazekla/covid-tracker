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
          <div style={{ height: "200px", padding: "4rem" }}>
            loading data...
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
        />
      ) : null}
    </>
  );
}

export default StateChart;
