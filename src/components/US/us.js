import React from "react";
import USComposedChart from "./usChart";

function UsData() {
  return (
    <div>
      {/* <p className="text-white container mx-auto px-2 sm:px-4">
        Here is the US data
      </p> */}
      <USComposedChart timeframe="daily" />
    </div>
  );
}

export default UsData;
