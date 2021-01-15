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
  console.log("howdy");
  return (
    <div className="text-white px-4">
      <div className="text-white">Page for the Worldometer data</div>
      {skeletonLoader && <div>Loading</div>}
      {totalCases && <WorldTable />}
    </div>
  );
}

export default WorldPage;
