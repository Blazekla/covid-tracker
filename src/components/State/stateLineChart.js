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
  // const [barChart, setBarChart] = useState(false);
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

  const handleChartChange = (e) => {
    console.log("value of linechart before: ", lineChart);
    console.log("value of checked box: ", e.target.checked);
    setLineChart(!lineChart);
    console.log("value of linechart after: ", lineChart);
  };

  return (
    <div className="flex flex-col items-center my-12 ">
      <div className="p-12">
        <select value={selectedState} onChange={handleStateChange}>
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
      <div>
        <select value={selectedType} onChange={handleTypeChange}>
          <option value="newCases">New Cases</option>
          <option value="newDeaths">New Deaths</option>
        </select>
      </div>

      <div>
        <input
          type="checkbox"
          name="chartcheck"
          checked={lineChart}
          onChange={handleChartChange}
        />
      </div>
      {totalCases ? (
        <h1 className="text-white p-8">Totals in {selectedState}</h1>
      ) : (
        <h1 className="text-white p-8">Loading Data</h1>
      )}
      <div className="container mx-auto px-2 sm:px-4 mb-16">
        {totalCases && (
          <ComposedChart
            totalCases={totalCases}
            today={today}
            selectedType={selectedType}
            location={selectedState}
          />
        )}
      </div>
    </div>
  );
}

export default LineChartComponent;
