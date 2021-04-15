import React, { useState, useEffect } from "react";
import axios from "axios";
import StateComposedChart from "./stateChart";
import { DateTime } from "luxon";
import { stateLabelValues } from "../../data/stateLabel";
import StateTable from "./stateTable";
import useSortHook from "../../utils/sortHook";

function State() {
  const [totalCases, setTotalCases] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [selectedState, setSelectedState] = useState("TX");
  const [skeleton, setSkeleton] = useState(true);
  const { handleTableHeaderClick, sortedData, sortedField } = useSortHook(
    totalCases,
    false
  );
  useEffect(() => {
    async function fetchTotals() {
      try {
        setSkeleton(true);
        setTotalCases(null);
        const data = await axios.get(
          `https://api.covidtracking.com/v1/states/${selectedState}/daily.json`
        );

        setSkeleton(false);
        data.data.forEach((item) => {
          item.rawDate = item.date;
          item.date = DateTime.fromISO(item.date).toFormat("LLL d");
        });

        setTotalCases(data.data);
        setChartData(data.data.reverse());
      } catch (error) {
        console.log("error fetching api data: ", error);
      }
    }

    fetchTotals();
  }, [selectedState]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const chartsDisplayed = [
    "positiveIncrease",
    "deathIncrease",
    "totalTestResultsIncrease",
    "hospitalizedCurrently",
  ];

  return (
    <div>
      <div className="my-12">
        <div className="flex flex-wrap justify-center">
          <div className="p-8 pb-12 sm:p-8">
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
        </div>
        <div className="flex flex-wrap justify-center">
          {chartsDisplayed.map((chart) => {
            return (
              <StateComposedChart
                key={chart}
                totalCases={chartData}
                selectedState={selectedState}
                handleStateChange={handleStateChange}
                display={chart}
                loading={skeleton}
              />
            );
          })}
        </div>
      </div>
      <div className="px-4 flex flex-wrap flex-col items-center mx-auto mb-12">
        <StateTable
          totalCases={totalCases}
          sortedData={sortedData}
          sortedField={sortedField}
          handleTableHeaderClick={handleTableHeaderClick}
          skeleton={skeleton}
        />
      </div>
    </div>
  );
}

export default State;
