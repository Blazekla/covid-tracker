import React from "react";
import USLineChart from "./usLineChart";

function UsData() {
  return (
    <div>
      <p className="text-white container mx-auto px-2 sm:px-4">
        Here is the US data
      </p>
      <USLineChart timeframe="daily" />
    </div>
  );
}

export default UsData;
