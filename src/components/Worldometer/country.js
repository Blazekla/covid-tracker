import React, {
  useState,
  useEffect,
  //  useMemo
} from "react";
import axios from "axios";
// import { DateTime } from "luxon";
// import WorldTable from "./worldTable";
import {
  useParams,
  //  useHistory
} from "react-router-dom";
// import USTable from "./usTable";

function CountryPage(props) {
  const [totalCases, setTotalCases] = useState(null);
  const [dates, setDates] = useState("");
  // const [skeletonLoader, setSkeletonLoader] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  // const history = useHistory();
  useEffect(() => {
    async function fetchWorldOMeter() {
      try {
        // setSkeletonLoader(true);
        setTotalCases(null);
        const apiEnpoint = props.usa
          ? `https://disease.sh/v3/covid-19/states?sort=cases`
          : `https://disease.sh/v3/covid-19/countries/${params.country}${dates}`;
        const data = await axios.get(apiEnpoint);
        // const data = await axios.get(
        //   `https://disease.sh/v3/covid-19/countries/${
        //     props.usa ? "usa" : params.country
        //   }${dates}`
        // );
        // setSkeletonLoader(false);
        // data.data.forEach((item) => {
        //   item.date = DateTime.fromMillis(item.updated).toFormat("LLL dd yyyy");
        // });
        setTotalCases(data.data);
        console.log("inside useEffect: ", data.data);
      } catch (err) {
        console.log("error occurred: ", err.response);
        console.error("hihi: ", err.message);
        setError(err.response.data.message);
        // history.push("/404");
      }
    }
    fetchWorldOMeter();
  }, [dates, params.country, props.usa]);

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

  // // ****** //
  // console.log("test: ", test);
  // console.log("state: ", state);
  console.log("props: ", props);
  console.log("params state: ", params);
  if (totalCases) {
    console.log("data retrieved: ", totalCases);
  }
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
      {totalCases ? (
        props.usa ? (
          <>
            <div className="text-white">USA! USA! USA! USA!</div>
            {/* <USTable
              totalCases={totalCases}
              sortedData={totalCases}
              sortedField=""
              // handleTableHeaderClick={}
            /> */}
          </>
        ) : (
          <CountryStats name={params.country} data={totalCases} />
        )
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="text-white">Fetching Data.....</div>
        </>
      )}

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

const CountryStats = ({ name, data }) => (
  <>
    <div>
      <h2 className="text-xl">{data.country} Data</h2>
      <div>
        <p>Cases: {data.cases}</p>
        <p>Deaths: {data.deaths}</p>
        <p>Critical: {data.critical}</p>
        <p>todayCases: {data.todayCases}</p>
        <p>Recovered: {data.recovered}</p>
        <p>Population: {data.population}</p>
      </div>
    </div>
  </>
);
export default CountryPage;
