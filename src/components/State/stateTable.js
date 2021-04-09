import React from "react";
import TableSkeleton from "../tableSkeleton";
import checkSorting from "../../utils/checkSort";
function StateTable({
  totalCases,
  sortedData,
  sortedField,
  handleTableHeaderClick,
  skeleton,
}) {
  return (
    <table
      className={`table-auto border-collapse overflow-x-auto block w-full ${
        totalCases && !skeleton ? "calculate-100" : null
      } overflow-y-auto`}
    >
      <thead className="text-white">
        <tr>
          <th
            className="sticky top-0 left-0 z-10 bg-gray-900 px-2 cursor-pointer"
            onClick={() => handleTableHeaderClick("rawDate")}
          >
            Date{checkSorting(sortedField, "rawDate")}
          </th>
          <th
            className="sticky top-0 bg-gray-900 px-2 cursor-pointer"
            onClick={() => handleTableHeaderClick("positive")}
          >
            Total Cases{checkSorting(sortedField, "positive")}
          </th>
          <th
            className="sticky top-0 bg-gray-900 px-2 cursor-pointer"
            onClick={() => handleTableHeaderClick("positiveIncrease")}
          >
            New Cases{checkSorting(sortedField, "positiveIncrease")}
          </th>
          <th
            className="sticky top-0 bg-gray-900 px-2 cursor-pointer"
            onClick={() => handleTableHeaderClick("death")}
          >
            Total Deaths{checkSorting(sortedField, "death")}
          </th>
          <th
            className="sticky top-0 bg-gray-900 px-2 cursor-pointer"
            onClick={() => handleTableHeaderClick("deathIncrease")}
          >
            New Deaths{checkSorting(sortedField, "deathIncrease")}
          </th>
          <th
            className="sticky top-0 bg-gray-900 px-2 cursor-pointer"
            onClick={() => handleTableHeaderClick("totalTestResults")}
          >
            Total Tests{checkSorting(sortedField, "totalTestResults")}
          </th>
          <th
            className="sticky top-0 bg-gray-900 px-2 cursor-pointer"
            onClick={() => handleTableHeaderClick("totalTestResultsIncrease")}
          >
            New Tests{checkSorting(sortedField, "totalTestResultsIncrease")}
          </th>
          <th
            className="sticky top-0 bg-gray-900 px-2 cursor-pointer"
            onClick={() => handleTableHeaderClick("hospitalizedCurrently")}
          >
            Currently Hospitalized
            {checkSorting(sortedField, "hospitalizedCurrently")}
          </th>
        </tr>
      </thead>
      {sortedData && !skeleton ? (
        <tbody className="text-white">
          {sortedData.map((cases) => {
            return (
              <tr
                key={cases.date + cases.positiveIncrease}
                className="text-right border-4 border-white hover:bg-secondary-main hover:bg-opacity-40 bg-gray-900"
              >
                <td className="text-left border-r-4 bg-gray-900 border-white p-2 sticky left-0">
                  {cases.date}
                </td>
                <td className="border-r-4 border-white p-2">
                  {cases.positive != null
                    ? cases.positive.toLocaleString("en", { useGrouping: true })
                    : 0}
                </td>
                <td className="border-r-4 border-white p-2">
                  {cases.positiveIncrease != null
                    ? cases.positiveIncrease.toLocaleString("en", {
                        useGrouping: true,
                      })
                    : 0}
                </td>
                <td className="border-r-4 border-white p-2">
                  {cases.death != null
                    ? cases.death.toLocaleString("en", {
                        useGrouping: true,
                      })
                    : 0}
                </td>
                <td className="border-r-4 border-white p-2">
                  {cases.deathIncrease != null
                    ? cases.deathIncrease.toLocaleString("en", {
                        useGrouping: true,
                      })
                    : 0}
                </td>
                <td className="border-r-4 border-white p-2">
                  {cases.totalTestResults != null
                    ? cases.totalTestResults.toLocaleString("en", {
                        useGrouping: true,
                      })
                    : 0}
                </td>
                <td className="border-r-4 border-white p-2">
                  {cases.totalTestResultsIncrease != null
                    ? cases.totalTestResultsIncrease.toLocaleString("en", {
                        useGrouping: true,
                      })
                    : 0}
                </td>
                <td className="border-r-4 border-white p-2">
                  {cases.hospitalizedCurrently != null
                    ? cases.hospitalizedCurrently.toLocaleString("en", {
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
          <TableSkeleton rows={12} columns={8} />
        </tbody>
      )}
    </table>
  );
}

export default StateTable;
