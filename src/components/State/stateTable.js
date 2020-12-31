import React from "react";

function StateTable({
  totalCases,
  sortedData,
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
            className="sticky top-0 left-0 z-10 bg-secondary-main px-2"
            onClick={() => handleTableHeaderClick("rawDate")}
          >
            Date
          </th>
          <th
            className="sticky top-0 bg-secondary-main px-2"
            onClick={() => handleTableHeaderClick("totalTestResults")}
          >
            New Tests
          </th>
          <th
            className="sticky top-0 bg-secondary-main px-2"
            onClick={() => handleTableHeaderClick("positiveIncrease")}
          >
            Cases
          </th>
          <th
            className="sticky top-0 bg-secondary-main px-2"
            onClick={() => handleTableHeaderClick("negativeIncrease")}
          >
            Negative PCR Test
          </th>
          <th
            className="sticky top-0 bg-secondary-main px-2"
            onClick={() => handleTableHeaderClick("hospitalizedCurrently")}
          >
            Currently hopitalized
          </th>
          <th
            className="sticky top-0 bg-secondary-main px-2"
            onClick={() => handleTableHeaderClick("deathIncrease")}
          >
            Deaths
          </th>
          <th
            className="sticky top-0 bg-secondary-main px-2"
            onClick={() => handleTableHeaderClick("totalTestResults")}
          >
            Total Test Results
          </th>
        </tr>
      </thead>
      {sortedData && !skeleton ? (
        <tbody className="text-white">
          {sortedData.map((cases) => {
            return (
              <tr
                key={cases.date}
                className="text-right border-4 border-white hover:bg-secondary-main hover:bg-opacity-40 "
              >
                <td className="text-left border-r-4 bg-secondary-main border-white px-1 sticky left-0">
                  {cases.date}
                </td>
                <td className="border-r-4 border-white px-1">0</td>
                <td className="border-r-4 border-white px-1">
                  {cases.positiveIncrease}
                </td>
                <td className="border-r-4 border-white px-1">0</td>
                <td className="border-r-4 border-white px-1">0</td>
                <td className="border-r-4 border-white px-1">
                  {cases.deathIncrease}
                </td>
                <td className="border-r-4 border-white px-1">0</td>
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
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
}

export default StateTable;
