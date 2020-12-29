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
          <caption className="table-caption text-white">Data</caption>
          <thead>
            <tr
            //  className="border-4 border-white "
            >
              <th
                className="sticky top-0 bg-yellow-300 px-2"
                onClick={() => handleTableHeaderClick("rawDate")}
              >
                Date
              </th>
              <th
                className="sticky top-0 bg-yellow-300 px-2"
                onClick={() => handleTableHeaderClick("totalTestResults")}
              >
                New Tests
              </th>
              <th
                className="sticky top-0 bg-yellow-300 px-2"
                onClick={() => handleTableHeaderClick("positiveIncrease")}
              >
                Cases
              </th>
              <th
                className="sticky top-0 bg-yellow-300 px-2"
                onClick={() => handleTableHeaderClick("negativeIncrease")}
              >
                Negative PCR Test
              </th>
              <th
                className="sticky top-0 bg-yellow-300 px-2"
                onClick={() => handleTableHeaderClick("hospitalizedCurrently")}
              >
                Currently hopitalized
              </th>
              <th
                className="sticky top-0 bg-yellow-300 px-2"
                onClick={() => handleTableHeaderClick("deathIncrease")}
              >
                Deaths
              </th>
              <th
                className="sticky top-0 bg-yellow-300 px-2"
                onClick={() => handleTableHeaderClick("totalTestResults")}
              >
                Total Test Results
              </th>
            </tr>
          </thead>
          {sortedData ? (
            <tbody className="text-white">
              {sortedData.map((cases) => {
                return (
                  <tr
                    key={cases.date}
                    className="text-right border-4 border-white hover:bg-indigo-400 hover:bg-opacity-40 "
                  >
                    <td className="text-left border-r-4 border-white px-1">
                      {cases.date}
                    </td>
                    <td className="border-r-4 border-white px-1">0</td>
                    <td className="border-r-4 border-white px-1">
                      {cases.positiveIncrease}
                    </td>
                    <td className="border-r-4 border-white px-1">0</td>
                    <td className="border-r-4 border-white px-1">0</td>
                    <td className="border-r-4 border-white px-1">
                      {cases.deathIncrease}
                    </td>
                    <td className="border-r-4 border-white px-1">0</td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="7">
                  <div className="animate-pulse h-6 bg-blue-100 w-full">
                    <div className="bg-blue-200 "></div>
                  </div>
                </td>
                {/* <td>
                  <div className="animate-pulse h-full bg-blue-100 w-full">
                    <div className="bg-blue-200 ">&nbsp;</div>
                  </div>
                </td> */}
              </tr>
              <tr>
                <td colSpan="7">
                  <div className="animate-pulse h-6 bg-blue-100 w-full">
                    <div className="bg-blue-200 "></div>
                  </div>
                </td>
                {/* <td>
                  <div className="animate-pulse h-full bg-blue-100 w-full">
                    <div className="bg-blue-200 ">&nbsp;</div>
                  </div>
                </td> */}
              </tr>
              <tr>
                <td colSpan="7">
                  <div className="animate-pulse h-6 bg-blue-100 w-full">
                    <div className="bg-blue-200 "></div>
                  </div>
                </td>
                {/* <td>
                  <div className="animate-pulse h-full bg-blue-100 w-full">
                    <div className="bg-blue-200 ">&nbsp;</div>
                  </div>
                </td> */}
              </tr>
              <tr>
                <td colSpan="7">
                  <div className="animate-pulse h-6 bg-blue-100 w-full">
                    <div className="bg-blue-200 "></div>
                  </div>
                </td>
                {/* <td>
                  <div className="animate-pulse h-full bg-blue-100 w-full">
                    <div className="bg-blue-200 ">&nbsp;</div>
                  </div>
                </td> */}
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default State;
