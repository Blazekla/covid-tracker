import React, { useState, useEffect } from "react";
import axios from "axios";
import StateComposedChart from "./stateChart";
import { DateTime } from "luxon";
import { stateLabelValues } from "../../data/stateLabel";
import StateTable from "./stateTable";

function State() {
  const [totalCases, setTotalCases] = useState(null);
  const [selectedState, setSelectedState] = useState("TX");
  const [skeleton, setSkeleton] = useState(true);
  const [sortedField, setSortedField] = useState(null);

  useEffect(() => {
    async function fetchTotals() {
      try {
        setSkeleton(true);
        const data = await axios.get(
          `https://api.covidtracking.com/v1/states/${selectedState}/daily.json`
        );

        setSkeleton(false);
        data.data.forEach((item) => {
          item.rawDate = item.date;
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

  const handleTableHeaderClick = (name) => {
    requestSort(name);
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortedField &&
      sortedField.key === key &&
      sortedField.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortedField({ key, direction });
  };

  let sortedData = null;
  if (totalCases && sortedField !== null) {
    sortedData = [...totalCases];
    sortedData.sort((a, b) => {
      if (a[sortedField.key] < b[sortedField.key]) {
        return sortedField.direction === "ascending" ? -1 : 1;
      }
      if (a[sortedField.key] > b[sortedField.key]) {
        return sortedField.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  } else if (totalCases) {
    sortedData = [...totalCases];
    sortedData.reverse();
  }
  const chartsDisplayed = [
    "positiveIncrease",
    "deathIncrease",
    "totalTestResultsIncrease",
    "hospitalizedCurrently",
  ];
  return (
    <div>
      <div className="my-12">
        {totalCases ? (
          <h1 className="text-white p-4 text-center">
            Totals in {selectedState}
          </h1>
        ) : (
          <h1 className="text-white p-4 text-center">Loading Data</h1>
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
        </div>
        <div className="flex flex-wrap justify-center">
          {chartsDisplayed.map((chart) => {
            return (
              <StateComposedChart
                key={chart}
                totalCases={totalCases}
                selectedState={selectedState}
                handleStateChange={handleStateChange}
                display={chart}
                loading={skeleton}
              />
            );
          })}
        </div>
      </div>
      <div className="px-4 flex flex-wrap flex-col items-center max-w-max mx-auto">
        <StateTable
          totalCases={totalCases}
          sortedData={sortedData}
          handleTableHeaderClick={handleTableHeaderClick}
          skeleton={skeleton}
        />
      </div>
    </div>
  );
}

export default State;
