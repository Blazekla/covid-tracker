import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import checkSorting from "../../utils/checkSort";
import useSortHook from "../../utils/sortHook";
import TableSkeleton from "../tableSkeleton";
import TableHead from "../common/tableHead";
import TableData from "../common/tableData";

function USTable(props) {
  const [totalCases, setTotalCases] = useState(null);
  const [dates, setDates] = useState("");
  const { handleTableHeaderClick, sortedData, sortedField } = useSortHook(
    totalCases
  );
  useEffect(() => {
    async function fetchWorldOMeter() {
      try {
        setTotalCases(null);
        const apiEnpoint = `https://disease.sh/v3/covid-19/states?sort=cases${dates}`;
        const data = await axios.get(apiEnpoint);
        setTotalCases(data.data);
      } catch (err) {
        console.log("error occurred: ", err.response);
        console.error(err.message);
      }
    }
    fetchWorldOMeter();
  }, [dates]);

  const { url } = useRouteMatch();

  const columnData = [
    { Title: "State", dataTitle: "state", link: url },
    { Title: "Total Cases", dataTitle: "cases" },
    { Title: "New Cases", dataTitle: "todayCases" },
    { Title: "Total Deaths", dataTitle: "deaths" },
    { Title: "New Deaths", dataTitle: "todayDeaths" },
    { Title: "Total Tests", dataTitle: "tests" },
    { Title: "Active Cases", dataTitle: "active" },
    { Title: "Total Recovered", dataTitle: "recovered" },
    { Title: "Cases Per One Million", dataTitle: "casesPerOneMillion" },
    { Title: "Deaths Per One Million", dataTitle: "deathsPerOneMillion" },
    { Title: "Tests Per One Million", dataTitle: "testsPerOneMillion" },
    { Title: "Population", dataTitle: "population" },
  ];

  return (
    <div className="text-white px-4 flex flex-wrap flex-col items-center mx-auto mb-12">
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
            dates === "&yesterday=true" ? "bg-primary-light" : null
          }`}
          onClick={() => setDates("&yesterday=true")}
        >
          Yesterday
        </button>
      </div>
      <table
        className={`table-auto border-collapse overflow-x-auto block w-full ${
          totalCases ? "calculate-100" : null
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
        {sortedData ? (
          <tbody className="text-white">
            {sortedData.map((set, id) => {
              return (
                <tr
                  key={set.state + id}
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
            <TableSkeleton rows={12} columns={12} />
          </tbody>
        )}
      </table>
    </div>
  );
}

export default USTable;
