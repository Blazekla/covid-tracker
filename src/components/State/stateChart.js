import React, { useState, useEffect } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import { stateLabelValues } from "../../data/stateLabel";
import ComposedChart from "../common/composedChart";
import SmallComposedChart from "../common/smallComposedChart";

function LineChartComponent(props) {
  const [totalCases, setTotalCases] = useState(null);
  const [selectedState, setSelectedState] = useState("TX");
  const [selectedType, setSelectedType] = useState("newCases");
  const [lineChart, setLineChart] = useState(false);
  const [barChart, setBarChart] = useState(true);
  const [toggle, setToggle] = useState(false);

  const today = DateTime.local().minus({ day: 1 }).toFormat("LLL d");
  useEffect(() => {
    async function fetchTotals() {
      try {
        const data = await axios.get(
          `https://api.covidtracking.com/v1/states/${selectedState}/daily.json`
        );
        // const cdcData = await axios.get(
        //   `https://data.cdc.gov/resource/9mfq-cb36.json`,
        //   {
        //     params: {
        //       $limit: 50000,
        //     },
        //     headers: {
        //       "X-App-Token": process.env.REACT_APP_TEST,
        //     },
        //   }
        // );

        data.data.forEach((item) => {
          item.date = DateTime.fromISO(item.date).toFormat("LLL d");
        });
        setTotalCases(data.data.reverse());
      } catch (error) {
        console.log("error fetching api data: ", error);
      }
    }

    fetchTotals();
  }, [selectedState]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleLineChartChange = (e) => {
    setLineChart(!lineChart);
  };

  const handleBarChartChange = (e) => {
    setBarChart(!barChart);
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
            // minified={props.display}
          />
        ) : (
          <div style={{ height: "200px" }}>placeholder...waiting</div>
        )}
        <button onClick={() => setToggle(!toggle)}>Click here</button>
      </div>
      {toggle ? (
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-30 z-50">
          <div className="flex flex-col items-center my-12">
            {totalCases ? (
              <h1 className="text-white p-4">Totals in {selectedState}</h1>
            ) : (
              <h1 className="text-white p-4">Loading Data</h1>
            )}
            <button
              onClick={() => setToggle(!toggle)}
              className="text-white border-green-900 border"
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

export default LineChartComponent;
