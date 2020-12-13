import React, {
  useState,
  //  useEffect
} from "react";
// import axios from "axios";
import { DateTime } from "luxon";
import { stateLabelValues } from "../../data/stateLabel";
import ComposedChart from "../common/composedChart";
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
        <div className="h-screen w-screen left-0 top-0 fixed z-50 flex flex-col justify-center bg-black bg-opacity-30">
          <div className="flex flex-col items-center my-12 bg-red-900">
            {totalCases ? (
              <h1 className="text-white p-4">Totals in {selectedState}</h1>
            ) : (
              <h1 className="text-white p-4">Loading Data</h1>
            )}
            <button
              onClick={handleToggle}
              className="text-white border-green-900 border p-2"
            >
              X
            </button>
            <div className="flex flex-wrap justify-center">
              <div className="p-2 sm:p-8">
                <select
                  value={selectedState}
                  onChange={handleStateChange}
                  className="rounded-full px-1"
                >
                  <option value="one" disabled>
                    Choose a State
                  </option>
                  {stateLabelValues.map((state) => {
                    return (
                      <option key={state.label} value={state.value}>
                        {state.label}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="p-2 sm:p-8">
                <select
                  value={selectedType}
                  onChange={handleTypeChange}
                  className="rounded-full px-1"
                >
                  <option value="newCases">New Cases</option>
                  <option value="newDeaths">New Deaths</option>
                </select>
              </div>
              <div className="text-white p-2 sm:p-8 flex flex-wrap justify-center">
                <div>
                  <label className="m-4" htmlFor="barchart">
                    Bar Chart:
                  </label>
                  <input
                    type="checkbox"
                    name="barchartcheck"
                    id="barchart"
                    checked={barChart}
                    onChange={handleBarChartChange}
                  />
                </div>
                <div>
                  <label className="m-4" htmlFor="7dayaverage">
                    7-Day Average:
                  </label>
                  <input
                    type="checkbox"
                    name="lineaveragechart"
                    id="7dayaverage"
                    checked={lineChart}
                    onChange={handleLineChartChange}
                  />
                </div>
              </div>
            </div>

            <div className="container mx-auto px-2 sm:px-4 mb-16">
              {totalCases && (
                <ComposedChart
                  totalCases={totalCases}
                  today={today}
                  selectedType={selectedType}
                  location={selectedState}
                  lineToggle={lineChart}
                  barToggle={barChart}
                  heightInput={400}
                  minified={true}
                />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default StateChart;
