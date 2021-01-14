import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import StateComposedChart from "./stateChart";
import { DateTime } from "luxon";
import { stateLabelValues } from "../../data/stateLabel";
import StateTable from "./stateTable";

function State() {
  const [totalCases, setTotalCases] = useState(null);
  const [selectedState, setSelectedState] = useState("TX");
  const [skeleton, setSkeleton] = useState(true);

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
          item.date = DateTime.fromISO(item.date).toFormat("LLL d yyyy");
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

  // ****** //
  const [sortedField, setSortedField] = useState(null);
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
  let sortedData = useMemo(() => {
    if (totalCases && sortedField !== null) {
      const data = [...totalCases];
      data.sort((a, b) => {
        if (a[sortedField.key] < b[sortedField.key]) {
          return sortedField.direction === "ascending" ? -1 : 1;
        }
        if (a[sortedField.key] > b[sortedField.key]) {
          return sortedField.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      return data;
    } else if (totalCases) {
      const data = [...totalCases];
      return data.reverse();
    } else {
      return null;
    }
  }, [sortedField, totalCases]);

  // ****** //

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
      <div className="px-4 flex flex-wrap flex-col items-center max-w-max mx-auto mb-12">
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
