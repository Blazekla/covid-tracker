import React, { useState, useEffect } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import LineChart from "./lineChart";

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

  //   const handleChange = (e) => {
  //     // e.preventDefault();
  //     console.log("selected state: ", e.target.value);
  //     setSelectedState(e.target.value);
  //   };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div className="flex flex-col items-center px-12 my-12 ">
      <div className="p-12">
        <div>
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="newCases">New Cases</option>
            <option value="newDeaths">New Deaths</option>
          </select>
        </div>
      </div>

      {totalCases ? <h1>New Positive Cases in US</h1> : "nothing to see here"}
      {totalCases && (
        <LineChart
          totalCases={totalCases}
          today={today}
          selectedType={selectedType}
          // state={}
        />
      )}
    </div>
  );
}

export default USLineChart;
