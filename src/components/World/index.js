import React, { useState, useEffect } from "react";
import axios from "axios";
import WorldTable from "./worldTable";
import { DateTime } from "luxon";

function WorldPage() {
  const [totalCases, setTotalCases] = useState(null);
  const [skeletonLoader, setSkeletonLoader] = useState(true);

  useEffect(() => {
    async function fetchWorldOMeter() {
      try {
        setSkeletonLoader(true);
        setTotalCases(null);
        const data = await axios.get(
          `https://disease.sh/v3/covid-19/countries`
        );
        setSkeletonLoader(false);
        data.data.forEach((item) => {
          item.date = DateTime.fromMillis(item.updated).toFormat("LLL dd yyyy");
        });
        setTotalCases(data.data);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchWorldOMeter();
  }, []);
  if (totalCases) {
    console.log("data retrieved: ", totalCases);
  }
  return (
    <div className="text-white px-4 flex flex-wrap flex-col items-center max-w-max mx-auto mb-12">
      <WorldTable
        totalCases={totalCases}
        sortedData={totalCases}
        skeleton={skeletonLoader}
      />
      {/* )} */}
    </div>
  );
}

export default WorldPage;
