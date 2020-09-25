import React, { useState, useEffect } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import LineChart from "../common/lineChart";
import BarChart from "../common/barChart";

function USLineChart({ timeframe }) {
  const [totalCases, setTotalCases] = useState(null);
  const [selectedType, setSelectedType] = useState("newCases");

  const today = DateTime.local().minus({ day: 1 }).toFormat("LLL d");
  useEffect(() => {
    async function fetchTotals() {
      try {
        const data = await axios.get(
          `https://api.covidtracking.com/v1/us/${timeframe}.json`
        );

        data.data.forEach((item) => {
          item.date = DateTime.fromISO(item.date).toFormat("LLL d");
        });
        setTotalCases(data.data);
      } catch (error) {
        console.log("error fetching api data: ", error);
      }
    }

    fetchTotals();
  }, [timeframe]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div className="flex flex-col items-center my-12 ">
      <div className="p-12">
        <div>
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="newCases">New Cases</option>
            <option value="newDeaths">New Deaths</option>
          </select>
        </div>
      </div>

      {totalCases ? <h1>Totals in US</h1> : "Loading Data"}
      <div className="container mx-auto px-2 sm:px-4">
        {totalCases && (
          <LineChart
            totalCases={totalCases}
            today={today}
            selectedType={selectedType}
            location="US"
          />
        )}
      </div>
      <div className="container mx-auto px-2 sm:px-4 mt-16 mb-16">
        {totalCases && (
          <BarChart
            totalCases={totalCases}
            today={today}
            selectedType={selectedType}
            location="US"
          />
        )}
      </div>
    </div>
  );
}

export default USLineChart;
