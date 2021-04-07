import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import checkSorting from "../../utils/checkSort";
function WorldTable({
  totalCases,
  sortedData,
  skeleton,
  sortedField,
  handleTableHeaderClick,
}) {
  const { url } = useRouteMatch();

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
            onClick={() => handleTableHeaderClick("country")}
          >
            Country
            {checkSorting(sortedField, "country")}
          </th>
          <th
            className="sticky top-0 bg-gray-900 px-2 cursor-pointer"
            onClick={() => handleTableHeaderClick("cases")}
          >
            Total Cases
            {checkSorting(sortedField, "cases")}
          </th>
          <th
            className="sticky top-0 bg-gray-900 px-2 cursor-pointer"
            onClick={() => handleTableHeaderClick("todayCases")}
          >
            New Cases
            {checkSorting(sortedField, "todayCases")}
          </th>
          <th
            className="sticky top-0 bg-gray-900 px-2 cursor-pointer"
            onClick={() => handleTableHeaderClick("deaths")}
          >
            Total Deaths
            {checkSorting(sortedField, "deaths")}
          </th>
          <th
            className="sticky top-0 bg-gray-900 px-2 cursor-pointer"
            onClick={() => handleTableHeaderClick("todayDeaths")}
          >
            New Deaths
            {checkSorting(sortedField, "todayDeaths")}
          </th>
          <th
            className="sticky top-0 bg-gray-900 px-2 cursor-pointer"
            onClick={() => handleTableHeaderClick("tests")}
          >
            Total Tests
            {checkSorting(sortedField, "tests")}
          </th>
          <th
            className="sticky top-0 bg-gray-900 px-2 cursor-pointer"
            onClick={() => handleTableHeaderClick("active")}
          >
            Active Cases
            {checkSorting(sortedField, "active")}
          </th>
          <th
            className="sticky top-0 bg-gray-900 px-2 cursor-pointer"
            onClick={() => handleTableHeaderClick("critical")}
          >
            Serious, Critical
            {checkSorting(sortedField, "critical")}
          </th>
          <th
            className="sticky top-0 bg-gray-900 px-2 cursor-pointer"
            onClick={() => handleTableHeaderClick("recovered")}
          >
            Total Recovered
            {checkSorting(sortedField, "recovered")}
          </th>
          <th
            className="sticky top-0 bg-gray-900 px-2 cursor-pointer"
            onClick={() => handleTableHeaderClick("todayRecovered")}
          >
            Today Recovered
            {checkSorting(sortedField, "todayRecovered")}
          </th>
        </tr>
      </thead>
      {sortedData && !skeleton ? (
        <tbody className="text-white">
          {sortedData.map((cases, id) => {
            return (
              <tr
                key={cases.date + id}
                className="text-right border-4 border-white hover:bg-secondary-main hover:bg-opacity-40 bg-gray-900"
              >
                <td
                  className="text-left border-r-4 bg-gray-900 border-white p-2 sticky left-0"
                  style={{ maxWidth: "120px" }}
                >
                  <Link
                    to={`${url}/${cases.country}`}
                    aria-label={`See ${cases.country} numbers`}
                  >
                    {cases.country}
                  </Link>
                </td>
                <td className="border-r-4 border-white p-2">
                  {cases.cases != null
                    ? cases.cases.toLocaleString("en", { useGrouping: true })
                    : 0}
                </td>
                <td className="border-r-4 border-white p-2 bg-secondary-main bg-opacity-40">
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
