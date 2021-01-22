import React, {
  useState,
  useEffect,
  //  useMemo
} from "react";
import axios from "axios";
import { Link, useRouteMatch } from "react-router-dom";

function USTable() {
  const [totalCases, setTotalCases] = useState(null);
  const [dates, setDates] = useState("");

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
  // const checkSorting = (value) => {
  //     if (sortedField && sortedField.key === value) {
  //       if (sortedField.direction === "ascending") {
  //         return (
  //           <svg
  //             focusable="false"
  //             viewBox="0 0 24 24"
  //             aria-hidden="true"
  //             fill="#fff"
  //             width="20"
  //             height="20"
  //           >
  //             <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
  //           </svg>
  //         );
  //       } else if (sortedField.direction === "descending") {
  //         return (
  //           <svg
  //             focusable="false"
  //             viewBox="0 0 24 24"
  //             aria-hidden="true"
  //             fill="#fff"
  //             width="20"
  //             height="20"
  //           >
  //             <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
  //           </svg>
  //         );
  //       }
  //     }

  //     return null;
  //   };

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
            <th
              className="sticky top-0 left-0 z-10 bg-secondary-main px-2 cursor-pointer"
              // onClick={() => handleTableHeaderClick("country")}
            >
              State
              {/* {checkSorting("state")} */}
            </th>
            <th
              className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
              // onClick={() => handleTableHeaderClick("cases")}
            >
              Total Cases
              {/* {checkSorting("cases")} */}
            </th>
            <th
              className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
              // onClick={() => handleTableHeaderClick("todayCases")}
            >
              New Cases
              {/* {checkSorting("todayCases")} */}
            </th>
            <th
              className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
              // onClick={() => handleTableHeaderClick("deaths")}
            >
              Total Deaths
              {/* {checkSorting("deaths")} */}
            </th>
            <th
              className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
              // onClick={() => handleTableHeaderClick("todayDeaths")}
            >
              New Deaths
              {/* {checkSorting("todayDeaths")} */}
            </th>
            <th
              className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
              // onClick={() => handleTableHeaderClick("tests")}
            >
              Total Tests
              {/* {checkSorting("tests")} */}
            </th>
            <th
              className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
              // onClick={() => handleTableHeaderClick("active")}
            >
              Active Cases
              {/* {checkSorting("active")} */}
            </th>
            <th
              className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
              // onClick={() => handleTableHeaderClick("recovered")}
            >
              Total Recovered
              {/* {checkSorting("recovered")} */}
            </th>
            <th
              className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
              // onClick={() => handleTableHeaderClick("critical")}
            >
              Cases Per One Million
              {/* {checkSorting("casesPerOneMillion")} */}
            </th>
            <th
              className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
              // onClick={() => handleTableHeaderClick("todayRecovered")}
            >
              Deaths Per One Million
              {/* {checkSorting("deathsPerOneMillion")} */}
            </th>
            <th
              className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
              // onClick={() => handleTableHeaderClick("todayRecovered")}
            >
              Tests Per One Million
              {/* {checkSorting("testsPerOneMillion")} */}
            </th>
            <th
              className="sticky top-0 bg-secondary-main px-2 cursor-pointer"
              // onClick={() => handleTableHeaderClick("todayRecovered")}
            >
              Population
              {/* {checkSorting("population")} */}
            </th>
          </tr>
        </thead>
        {totalCases ? (
          <tbody className="text-white">
            {totalCases.map((cases, id) => {
              return (
                <tr
                  key={cases.state + id}
                  className="text-right border-4 border-white hover:bg-secondary-main hover:bg-opacity-40 "
                >
                  <td
                    className="text-left border-r-4 bg-secondary-main border-white p-2 sticky left-0"
                    style={{ maxWidth: "120px" }}
                  >
                    <Link
                      to={`${url}/${cases.state}`}
                      aria-label={`See ${cases.state} numbers`}
                    >
                      {cases.state}
                    </Link>
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
                    {cases.recovered != null
                      ? cases.recovered.toLocaleString("en", {
                          useGrouping: true,
                        })
                      : 0}
                  </td>
                  <td className="border-r-4 border-white p-2">
                    {cases.casesPerOneMillion != null
                      ? cases.casesPerOneMillion.toLocaleString("en", {
                          useGrouping: true,
                        })
                      : 0}
                  </td>
                  <td className="border-r-4 border-white p-2">
                    {cases.deathsPerOneMillion != null
                      ? cases.deathsPerOneMillion.toLocaleString("en", {
                          useGrouping: true,
                        })
                      : 0}
                  </td>
                  <td className="border-r-4 border-white p-2">
                    {cases.testsPerOneMillion != null
                      ? cases.testsPerOneMillion.toLocaleString("en", {
                          useGrouping: true,
                        })
                      : 0}
                  </td>
                  <td className="border-r-4 border-white p-2">
                    {cases.population != null
                      ? cases.population.toLocaleString("en", {
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
                <td>
                  <div className="animate-pulse h-6 bg-primary-light bg-opacity-50 w-full"></div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default USTable;
