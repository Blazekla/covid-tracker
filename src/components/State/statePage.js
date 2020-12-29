import React, { useState, useEffect } from "react";
import axios from "axios";
import StateComposedChart from "./stateChart";
import { DateTime } from "luxon";
import { stateLabelValues } from "../../data/stateLabel";

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
    console.log("key passed: ", key);
    if (
      sortedField &&
      sortedField.key === key &&
      sortedField.direction === "ascending"
    ) {
      direction = "descending";
    }
    console.log("values set: ", key, direction);
    setSortedField({ key, direction });
  };

  if (totalCases) {
    console.log("totalcases data: ", totalCases);
  }

  let sortedData = null;
  if (
    totalCases
    // && sortedField !== null
  ) {
    console.log("entered the needed if block");
    sortedData = [...totalCases];
    sortedData.reverse();
  }
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
          <StateComposedChart
            totalCases={totalCases}
            selectedState={selectedState}
            handleStateChange={handleStateChange}
            display="positiveIncrease"
            loading={skeleton}
          />
          <StateComposedChart
            totalCases={totalCases}
            selectedState={selectedState}
            handleStateChange={handleStateChange}
            display="deathIncrease"
            loading={skeleton}
          />
          <StateComposedChart
            totalCases={totalCases}
            selectedState={selectedState}
            handleStateChange={handleStateChange}
            display="totalTestResults"
            loading={skeleton}
          />
          <StateComposedChart
            totalCases={totalCases}
            selectedState={selectedState}
            handleStateChange={handleStateChange}
            display="hospitalizedCurrently"
            loading={skeleton}
          />
        </div>
      </div>
      <div className="px-4 flex flex-wrap flex-col items-center max-w-max mx-auto">
        <table
          className={`table-auto border-collapse overflow-x-auto block w-full ${
            totalCases && !skeleton ? "h-screen" : null
          } overflow-y-auto`}
        >
          <caption className="table-caption">Table</caption>
          <thead>
            <tr>
              <th
                className="sticky top-0 bg-yellow-300 px-1"
                onClick={() => handleTableHeaderClick("rawDate")}
              >
                Date
              </th>
              <th
                className="sticky top-0 bg-yellow-300 px-1"
                onClick={() => handleTableHeaderClick("totalTestResults")}
              >
                New Tests
              </th>
              <th
                className="sticky top-0 bg-yellow-300 px-1"
                onClick={() => handleTableHeaderClick("positiveIncrease")}
              >
                Cases
              </th>
              <th
                className="sticky top-0 bg-yellow-300 px-1"
                onClick={() => handleTableHeaderClick("negativeIncrease")}
              >
                Negative PCR Test
              </th>
              <th
                className="sticky top-0 bg-yellow-300 px-1"
                onClick={() => handleTableHeaderClick("hospitalizedCurrently")}
              >
                Currently hopitalized
              </th>
              <th
                className="sticky top-0 bg-yellow-300 px-1"
                onClick={() => handleTableHeaderClick("deathIncrease")}
              >
                Deaths
              </th>
              <th
                className="sticky top-0 bg-yellow-300 px-1"
                onClick={() => handleTableHeaderClick("totalTestResults")}
              >
                Total Test Results
              </th>
            </tr>
          </thead>
          {console.log("value of sortedData: ", sortedData)}
          {sortedData ? (
            <tbody>
              {sortedData.map((cases) => {
                return (
                  <tr
                    key={cases.date}
                    className="text-right border-b-8 border-indigo-300"
                  >
                    <td className="text-left">{cases.date}</td>
                    <td>0</td>
                    <td>{cases.positiveIncrease}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>{cases.deathIncrease}</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td>
                  <p>Loading data</p>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default State;
