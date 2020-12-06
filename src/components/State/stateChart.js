import React, { useState, useEffect } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import { stateLabelValues } from "../../data/stateLabel";
import ComposedChart from "../common/composedChart";

function LineChartComponent(props) {
  const [totalCases, setTotalCases] = useState(null);
  const [selectedState, setSelectedState] = useState("TX");
  const [selectedType, setSelectedType] = useState("newCases");
  const [lineChart, setLineChart] = useState(false);
  const [barChart, setBarChart] = useState(true);
  // const [areaChart, setAreaChart] = useState(false);

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
      {props.display ? (
        <div
          className="flex flex-col items-center my-12 "
          onClick={props.onClick}
        >
          {totalCases ? (
            <h1 className="text-white p-4">Totals in {selectedState}</h1>
          ) : (
            <h1 className="text-white p-4">Loading Data</h1>
          )}
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
                heightInput={props.height}
              />
            )}
          </div>
        </div>
      ) : (
        <div onClick={props.onClick} className="bg-pink-600">
          {totalCases && (
            <ComposedChart
              totalCases={totalCases}
              today={today}
              selectedType={selectedType}
              location={selectedState}
              lineToggle={lineChart}
              barToggle={barChart}
              heightInput={props.height}
            />
          )}
        </div>
      )}
    </>
  );
}

export default LineChartComponent;
