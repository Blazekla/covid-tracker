import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import WorldTable from "./worldTable";

function WorldPage() {
  const [totalCases, setTotalCases] = useState(null);
  // const [dates,setDates]=useState();
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

  // ****** //
  const [sortedField, setSortedField] = useState(null);
  const handleTableHeaderClick = (name) => {
    requestSort(name);
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortedField &&
      sortedField.key === key &&
      sortedField.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortedField({ key, direction });
  };
  let sortedData = useMemo(() => {
    if (totalCases && sortedField !== null) {
      const data = [...totalCases];
      data.sort((a, b) => {
        if (a[sortedField.key] < b[sortedField.key]) {
          return sortedField.direction === "ascending" ? -1 : 1;
        }
        if (a[sortedField.key] > b[sortedField.key]) {
          return sortedField.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      return data;
    } else if (totalCases) {
      const data = [...totalCases];
      data.sort((a, b) => {
        if (a["cases"] < b["cases"]) {
          return 1;
        }
        if (a["cases"] > b["cases"]) {
          return -1;
        }
        return 0;
      });
      return data;
    } else {
      return null;
    }
  }, [sortedField, totalCases]);

  // ****** //

  return (
    <div className="text-white px-4 flex flex-wrap flex-col items-center max-w-max mx-auto mb-12">
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
