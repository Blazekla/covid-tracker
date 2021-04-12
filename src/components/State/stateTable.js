import React from "react";
import TableSkeleton from "../tableSkeleton";
import checkSorting from "../../utils/checkSort";
import TableHead from "../common/tableHead";
import TableData from "../common/tableData";

function StateTable({
  totalCases,
  sortedData,
  sortedField,
  handleTableHeaderClick,
  skeleton,
}) {
  const Data = [
    { Title: "Date", dataTitle: "rawDate" },
    { Title: "Total Cases", dataTitle: "positive" },
    { Title: "New Cases", dataTitle: "positiveIncrease" },
    { Title: "Total Deaths", dataTitle: "death" },
    { Title: "New Deaths", dataTitle: "deathIncrease" },
    { Title: "Total Tests", dataTitle: "totalTestResults" },
    { Title: "New Tests", dataTitle: "totalTestResultsIncrease" },
    { Title: "Currently Hospitalized", dataTitle: "hospitalizedCurrently" },
  ];
  return (
    <table
      className={`table-auto border-collapse overflow-x-auto block w-full ${
        totalCases && !skeleton ? "calculate-100" : null
      } overflow-y-auto`}
    >
      <thead className="text-white">
        <tr>
          <TableHead
            handleTableHeaderClick={handleTableHeaderClick}
            checkSorting={checkSorting}
            sortedField={sortedField}
            objectData={Data}
          />
        </tr>
      </thead>
      {sortedData && !skeleton ? (
        <tbody className="text-white">
          {sortedData.map((set) => {
            return (
              <tr
                key={set.date + set.positiveIncrease}
                className="text-right border-4 border-white hover:bg-secondary-main hover:bg-opacity-40 bg-gray-900"
              >
                <TableData objectData={Data} data={set} />
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
