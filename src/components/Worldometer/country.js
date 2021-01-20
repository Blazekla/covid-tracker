import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { DateTime } from "luxon";
// import WorldTable from "./worldTable";

function CountryPage({ state, test, ...props }) {
  const [totalCases, setTotalCases] = useState(null);
  const [dates, setDates] = useState("");
  const [skeletonLoader, setSkeletonLoader] = useState(true);

  //   useEffect(() => {
  //     async function fetchWorldOMeter() {
  //       try {
  //         setSkeletonLoader(true);
  //         setTotalCases(null);
  //         const data = await axios.get(
  //           `https://disease.sh/v3/covid-19/countries${dates}`
  //         );
  //         setSkeletonLoader(false);
  //         data.data.forEach((item) => {
  //           item.date = DateTime.fromMillis(item.updated).toFormat("LLL dd yyyy");
  //         });
  //         setTotalCases(data.data);
  //       } catch (err) {
  //         console.error(err.message);
  //       }
  //     }
  //     fetchWorldOMeter();
  //   }, [dates]);

  //   // ****** //
  //   const [sortedField, setSortedField] = useState(null);
  //   const handleTableHeaderClick = (name) => {
  //     requestSort(name);
  //   };

  //   const requestSort = (key) => {
  //     let direction = "ascending";
  //     if (
  //       sortedField &&
  //       sortedField.key === key &&
  //       sortedField.direction === "ascending"
  //     ) {
  //       direction = "descending";
  //     }
  //     setSortedField({ key, direction });
  //   };
  //   let sortedData = useMemo(() => {
  //     if (totalCases && sortedField !== null) {
  //       const data = [...totalCases];
  //       data.sort((a, b) => {
  //         if (a[sortedField.key] < b[sortedField.key]) {
  //           return sortedField.direction === "ascending" ? -1 : 1;
  //         }
  //         if (a[sortedField.key] > b[sortedField.key]) {
  //           return sortedField.direction === "ascending" ? 1 : -1;
  //         }
  //         return 0;
  //       });
  //       return data;
  //     } else if (totalCases) {
  //       const data = [...totalCases];
  //       data.sort((a, b) => {
  //         if (a["cases"] < b["cases"]) {
  //           return 1;
  //         }
  //         if (a["cases"] > b["cases"]) {
  //           return -1;
  //         }
  //         return 0;
  //       });
  //       return data;
  //     } else {
  //       return null;
  //     }
  //   }, [sortedField, totalCases]);

  // ****** //
  console.log("test: ", test);
  console.log("state: ", state);
  console.log("props: ", props);
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
      <div>New Page ya'll</div>
      {/* <WorldTable
        totalCases={totalCases}
        sortedData={sortedData}
        skeleton={skeletonLoader}
        sortedField={sortedField}
        handleTableHeaderClick={handleTableHeaderClick}
      /> */}
      {/* )} */}
    </div>
  );
}

export default CountryPage;
