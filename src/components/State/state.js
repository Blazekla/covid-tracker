import React, { useState } from "react";
import StateComposedChart from "./stateChart";

function State() {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <StateComposedChart />
      <div className="bg-primary">
        <StateComposedChart
          height={toggle ? 400 : 200}
          onClick={() => setToggle(!toggle)}
          display={toggle}
        />
      </div>
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
