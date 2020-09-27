import React from "react";
import USLineChart from "./usLineChart";

function UsData() {
  return (
    <div>
      <p className="text-white">Here is the US data</p>
      <USLineChart timeframe="daily" />
    </div>
  );
}

export default UsData;
