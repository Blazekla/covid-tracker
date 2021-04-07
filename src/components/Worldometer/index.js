import React, { useState, useEffect } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import WorldTable from "./worldTable";
import useSortHook from "../../utils/sortHook";

function WorldPage() {
  const [totalCases, setTotalCases] = useState(null);
  const [dates, setDates] = useState("");
  const [skeletonLoader, setSkeletonLoader] = useState(true);
  const { handleTableHeaderClick, sortedData, sortedField } = useSortHook(
    totalCases
  );

  useEffect(() => {
    async function fetchWorldOMeter() {
      try {
        setSkeletonLoader(true);
        setTotalCases(null);
        const data = await axios.get(
          `https://disease.sh/v3/covid-19/countries${dates}`
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
  }, [dates]);

  return (
    <div className="text-white px-4 flex flex-wrap flex-col items-center max-w-max mx-auto mb-12">
      <div className="flex mb-8">
        <button
          className={`px-2 rounded-full ${
            dates === "" ? "bg-primary-light" : null
          }`}
          onClick={() => setDates("")}
        >
          Now
        </button>
        <button
          className={`px-2 rounded-full ${
            dates === "?yesterday=true" ? "bg-primary-light" : null
          }`}
          onClick={() => setDates("?yesterday=true")}
        >
          Yesterday
        </button>
        <button
          className={`px-2 rounded-full ${
            dates === "?twoDaysAgo=true" ? "bg-primary-light" : null
          }`}
          onClick={() => setDates("?twoDaysAgo=true")}
        >
          2 Days Ago
        </button>
      </div>
      <WorldTable
        totalCases={totalCases}
        sortedData={sortedData}
        skeleton={skeletonLoader}
        sortedField={sortedField}
        handleTableHeaderClick={handleTableHeaderClick}
      />
      {/* )} */}
    </div>
  );
}

export default WorldPage;
