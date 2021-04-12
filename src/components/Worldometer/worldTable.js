import React from "react";
import { useRouteMatch } from "react-router-dom";
import checkSorting from "../../utils/checkSort";
import TableSkeleton from "../tableSkeleton";
import TableHead from "../common/tableHead";
import TableData from "../common/tableData";

function WorldTable({
  totalCases,
  sortedData,
  skeleton,
  sortedField,
  handleTableHeaderClick,
}) {
  const { url } = useRouteMatch();

  const columnData = [
    { Title: "Country", dataTitle: "country", link: url },
    { Title: "Total Cases", dataTitle: "cases" },
    { Title: "New Cases", dataTitle: "todayCases" },
    { Title: "Total Deaths", dataTitle: "deaths" },
    { Title: "New Deaths", dataTitle: "todayDeaths" },
    { Title: "Total Tests", dataTitle: "tests" },
    { Title: "Active Cases", dataTitle: "active" },
    { Title: "Serious, Critical", dataTitle: "critical" },
    { Title: "Total Recovered", dataTitle: "recovered" },
    { Title: "Today Recovered", dataTitle: "todayRecovered" },
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
            objectData={columnData}
          />
        </tr>
      </thead>
      {sortedData && !skeleton ? (
        <tbody className="text-white">
          {sortedData.map((set, id) => {
            return (
              <tr
                key={set.date + id}
                className="text-right border-4 border-white hover:bg-secondary-main hover:bg-opacity-40 bg-gray-900"
              >
                <TableData
                  objectData={columnData}
                  data={set}
                  highlightColumn={2}
                />
              </tr>
            );
          })}
        </tbody>
      ) : (
        <tbody>
          <TableSkeleton rows={12} columns={10} />
        </tbody>
      )}
    </table>
  );
}

export default WorldTable;
