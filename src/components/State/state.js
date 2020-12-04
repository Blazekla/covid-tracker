import React from "react";
import StateComposedChart from "./stateChart";

function State() {
  return (
    <div>
      {/* <p className="text-white container mx-auto px-2 sm:px-4">
        Here is the state data
      </p> */}
      <StateComposedChart />
      <StateComposedChart height={200} />
      <div className="px-16 flex flex-wrap">
        <h2>Table</h2>
        <table>
          <tr>
            <th>Date</th>
            <th>New Tests</th>
            <th>Cases</th>
            <th>Negative PCR Test</th>
            <th>Currently hopitalized</th>
            <th>Deaths</th>
            <th>Total Test Results</th>
          </tr>
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
        </table>
      </div>
    </div>
  );
}

export default State;
