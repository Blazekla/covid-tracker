import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import ComposedChart from "../common/composedChart";
import USTable from "./usTable";

function USChart({ timeframe }) {
  const [totalCases, setTotalCases] = useState(null);
  const [selectedType, setSelectedType] = useState("newCases");
  const [lineChart, setLineChart] = useState(false);
  const [skeleton, setSkeleton] = useState(true);

  const today = DateTime.local().minus({ day: 1 }).toFormat("LLL d");
  useEffect(() => {
    async function fetchTotals() {
      try {
        setSkeleton(true);
        const data = await axios.get(
          `https://api.covidtracking.com/v1/us/${timeframe}.json`
        );

        setSkeleton(false);
        data.data.forEach((item) => {
          item.date = DateTime.fromISO(item.date).toFormat("LLL d");
        });
        setTotalCases(data.data.reverse());
      } catch (error) {
        console.log("error fetching api data: ", error);
      }
    }

    fetchTotals();
  }, [timeframe]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleLineChartChange = (e) => {
    setLineChart(!lineChart);
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

  return (
    <>
      <div className="flex flex-col items-center my-12 ">
        {totalCases ? (
          <h1 className="text-white p-8 text-lg">Totals in the US</h1>
        ) : (
          <h1 className="text-white p-8">Loading Data</h1>
        )}
        <div className="flex flex-wrap justify-center">
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
          {totalCases ? (
            <ComposedChart
              totalCases={totalCases}
              today={today}
              selectedType={selectedType}
              location="US"
              lineToggle={lineChart}
              barToggle={true}
              minified={true}
            />
          ) : (
            <div className="p-4  w-full mx-auto" style={{ height: "400px" }}>
              <div className="animate-pulse h-full bg-blue-100 w-full">
                <div className="flex rounded w-full h-full justify-between px-8 mx-auto items-end space-x-1">
                  <div className="bg-primary-light bg-opacity-40 w-1/12 h-1/6"></div>
                  <div className="bg-primary-light bg-opacity-40 w-1/12 h-4/6"></div>
                  <div className="bg-primary-light bg-opacity-40 w-1/12 h-3/6"></div>
                  <div className="bg-primary-light bg-opacity-40 w-1/12 h-5/6"></div>
                  <div className="bg-primary-light bg-opacity-40 w-1/12 h-4/6"></div>
                  <div className="bg-primary-light bg-opacity-40 w-1/12 h-4/6"></div>
                  <div className="bg-primary-light bg-opacity-40 w-1/12 h-2/6"></div>
                  <div className="bg-primary-light bg-opacity-40 w-1/12 h-5/6"></div>
                  <div className="bg-primary-light bg-opacity-40 w-1/12 h-4/6"></div>
                  <div className="bg-primary-light bg-opacity-40 w-1/12 h-4/6"></div>
                  <div className="bg-primary-light bg-opacity-40 w-1/12 h-2/6"></div>
                  <div className="bg-primary-light bg-opacity-40 w-1/12 h-5/6"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-4 flex flex-wrap flex-col items-center max-w-max mx-auto mb-12">
        <USTable
          totalCases={totalCases}
          sortedData={sortedData}
          sortedField={sortedField}
          handleTableHeaderClick={handleTableHeaderClick}
          skeleton={skeleton}
        />
      </div>
    </>
  );
}

export default USChart;
