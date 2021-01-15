import React from "react";

// {
//   totalCases,
//   sortedData,
//   sortedField,
//   handleTableHeaderClick,
//   skeleton,
// }
function WorldTable({ totalCases, sortedData, skeleton }) {
  // const
  //  checkSorting = (value) => {
  //   if (sortedField && sortedField.key === value) {
  //     if (sortedField.direction === "ascending") {
  //       return (
  //         <svg
  //           focusable="false"
  //           viewBox="0 0 24 24"
  //           aria-hidden="true"
  //           fill="#fff"
  //           width="20"
  //           height="20"
  //         >
  //           <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
  //         </svg>
  //       );
  //     } else if (sortedField.direction === "descending") {
  //       return (
  //         <svg
  //           focusable="false"
  //           viewBox="0 0 24 24"
  //           aria-hidden="true"
  //           fill="#fff"
  //           width="20"
  //           height="20"
  //         >
  //           <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
  //         </svg>
  //       );
  //     }
  //   }

  //   return null;
  // };

  return (
    <table
      className={`table-auto border-collapse overflow-x-auto block w-full ${
        totalCases && !skeleton ? "calculate-100" : null
      } overflow-y-auto`}
    >
      <thead className="text-white">
        <tr>
          <th
            className="sticky top-0 left-0 z-10 bg-secondary-main px-2 cursor-pointer"
            // onClick={() => handleTableHeaderClick("rawDate")}
          >
            Date
            {/* {checkSorting("rawDate")} */}
          </th>
          <th
            className="sticky top-0 left-0 z-10 bg-secondary-main px-2 cursor-pointer"
            // onClick={() => handleTableHeaderClick("rawDate")}
          >
            Country
            {/* {checkSorting("rawDate")} */}
          </th>
          <th
            className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
            // onClick={() => handleTableHeaderClick("positive")}
          >
            Total Cases
            {/* {checkSorting("positive")} */}
          </th>
          <th
            className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
            // onClick={() => handleTableHeaderClick("positiveIncrease")}
          >
            New Cases
            {/* {checkSorting("positiveIncrease")} */}
          </th>
          <th
            className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
            // onClick={() => handleTableHeaderClick("death")}
          >
            Total Deaths
            {/* {checkSorting("death")} */}
          </th>
          <th
            className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
            // onClick={() => handleTableHeaderClick("deathIncrease")}
          >
            New Deaths
            {/* {checkSorting("deathIncrease")} */}
          </th>
          <th
            className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
            // onClick={() => handleTableHeaderClick("totalTestResults")}
          >
            Total Tests
            {/* {checkSorting("totalTestResults")} */}
          </th>
          <th
            className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
            // onClick={() => handleTableHeaderClick("totalTestResultsIncrease")}
          >
            Active Cases
            {/* {checkSorting("totalTestResultsIncrease")} */}
          </th>
          <th
            className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
            // onClick={() => handleTableHeaderClick("hospitalizedCurrently")}
          >
            Serious, Critical
            {/* {checkSorting("hospitalizedCurrently")} */}
          </th>
          <th
            className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
            // onClick={() => handleTableHeaderClick("hospitalizedCurrently")}
          >
            Total Recovered
            {/* {checkSorting("hospitalizedCurrently")} */}
          </th>
          <th
            className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
            // onClick={() => handleTableHeaderClick("hospitalizedCurrently")}
          >
            Today Recovered
            {/* {checkSorting("hospitalizedCurrently")} */}
          </th>
        </tr>
      </thead>
      {sortedData && !skeleton ? (
        <tbody className="text-white">
          {sortedData.map((cases, id) => {
            return (
              <tr
                key={cases.date + id}
                className="text-right border-4 border-white hover:bg-secondary-main hover:bg-opacity-40 "
              >
                <td className="text-left border-r-4 bg-secondary-main border-white p-2 sticky left-0">
                  {cases.date}
                </td>
                <td className="text-left border-r-4 bg-secondary-main border-white p-2 sticky left-0">
                  {cases.country}
                </td>
                <td className="border-r-4 border-white p-2">
                  {cases.cases != null
                    ? cases.cases.toLocaleString("en", { useGrouping: true })
                    : 0}
                </td>
                <td className="border-r-4 border-white p-2">
                  {cases.todayCases != null
                    ? cases.todayCases.toLocaleString("en", {
                        useGrouping: true,
                      })
                    : 0}
                </td>
                <td className="border-r-4 border-white p-2">
                  {cases.deaths != null
                    ? cases.deaths.toLocaleString("en", {
                        useGrouping: true,
                      })
                    : 0}
                </td>
                <td className="border-r-4 border-white p-2">
                  {cases.todayDeaths != null
                    ? cases.todayDeaths.toLocaleString("en", {
                        useGrouping: true,
                      })
                    : 0}
                </td>
                <td className="border-r-4 border-white p-2">
                  {cases.tests != null
                    ? cases.tests.toLocaleString("en", {
                        useGrouping: true,
                      })
                    : 0}
                </td>
                <td className="border-r-4 border-white p-2">
                  {cases.active != null
                    ? cases.active.toLocaleString("en", {
                        useGrouping: true,
                      })
                    : 0}
                </td>
                <td className="border-r-4 border-white p-2">
                  {cases.critical != null
                    ? cases.critical.toLocaleString("en", {
                        useGrouping: true,
                      })
                    : 0}
                </td>
                <td className="border-r-4 border-white p-2">
                  {cases.recovered != null
                    ? cases.recovered.toLocaleString("en", {
                        useGrouping: true,
                      })
                    : 0}
                </td>
                <td className="border-r-4 border-white p-2">
                  {cases.todayRecovered != null
                    ? cases.todayRecovered.toLocaleString("en", {
                        useGrouping: true,
                      })
                    : 0}
                </td>
              </tr>
            );
          })}
        </tbody>
      ) : (
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <tr key={item}>
              <td>
                <div className="animate-pulse h-6 bg-primary-light bg-opacity-50 w-full"></div>
              </td>
              <td>
                <div className="animate-pulse h-6 bg-primary-light bg-opacity-50 w-full"></div>
              </td>
              <td>
                <div className="animate-pulse h-6 bg-primary-light bg-opacity-50 w-full"></div>
              </td>
              <td>
                <div className="animate-pulse h-6 bg-primary-light bg-opacity-50 w-full"></div>
              </td>
              <td>
                <div className="animate-pulse h-6 bg-primary-light bg-opacity-50 w-full"></div>
              </td>
              <td>
                <div className="animate-pulse h-6 bg-primary-light bg-opacity-50 w-full"></div>
              </td>
              <td>
                <div className="animate-pulse h-6 bg-primary-light bg-opacity-50 w-full"></div>
              </td>
              <td>
                <div className="animate-pulse h-6 bg-primary-light bg-opacity-50 w-full"></div>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
}

export default WorldTable;
