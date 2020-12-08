import React, { useState, useEffect } from "react";
import axios from "axios";
import StateComposedChart from "./stateChart";
import { DateTime } from "luxon";

function State() {
  const [totalCases, setTotalCases] = useState(null);
  const [selectedState, setSelectedState] = useState("TX");
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
  return (
    <div>
      <div className="bg-primary flex flex-wrap justify-center">
        <StateComposedChart
          totalCases={totalCases}
          selectedState={selectedState}
          handleStateChange={handleStateChange}
          display="positiveIncrease"
        />
        <StateComposedChart
          totalCases={totalCases}
          selectedState={selectedState}
          handleStateChange={handleStateChange}
          display="deathIncrease"
        />
        <StateComposedChart
          totalCases={totalCases}
          selectedState={selectedState}
          handleStateChange={handleStateChange}
          display="totalTestResults"
        />
        <StateComposedChart
          totalCases={totalCases}
          selectedState={selectedState}
          handleStateChange={handleStateChange}
          display="hospitalizedCurrently"
        />
      </div>
      {/* <div className="px-16 flex flex-wrap">
        <h2>Table</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>New Tests</th>
              <th>Cases</th>
              <th>Negative PCR Test</th>
              <th>Currently hopitalized</th>
              <th>Deaths</th>
              <th>Total Test Results</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
}

export default State;
