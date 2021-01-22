import React, {
  useState,
  useEffect,
  //  useMemo
} from "react";
import axios from "axios";
import {
  useParams,
  //  useHistory
} from "react-router-dom";

function StatePage(props) {
  const [totalCases, setTotalCases] = useState(null);
  const [dates, setDates] = useState("");
  const [error, setError] = useState(null);
  const params = useParams();
  // const history = useHistory();
  useEffect(() => {
    async function fetchWorldOMeter() {
      try {
        setTotalCases(null);
        const apiEnpoint = `https://disease.sh/v3/covid-19/states/${params.state}${dates}`;
        const data = await axios.get(apiEnpoint);
        setTotalCases(data.data);
        console.log("inside useEffect: ", data.data);
      } catch (err) {
        console.error(err.message);
        setError(err.response.data.message);
        // history.push("/404");
      }
    }
    fetchWorldOMeter();
  }, [dates, params.country, props.usa]);

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
      </div>
      {totalCases ? (
        <StateStats data={totalCases} />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="text-white">Fetching Data.....</div>
        </>
      )}
    </div>
  );
}

const StateStats = ({ data }) => (
  <>
    <div>
      <h2 className="text-xl">{data.state} Data</h2>
      <div>
        <p>Total Cases: {data.cases}</p>
        <p>Cases Today: {data.todayCases}</p>
        <p>Total Deaths: {data.deaths}</p>
        <p>Deaths Today: {data.todayDeaths}</p>
        <p>Active: {data.active}</p>
        <p>Cases Per One Million: {data.casesPerOneMillion}</p>
        <p>Deaths Per One Million: {data.deathsPerOneMillion}</p>
        <p>Tests: {data.tests}</p>
        <p>Tests Per One Million: {data.testsPerOneMillion}</p>
        <p>Population: {data.population}</p>
      </div>
    </div>
  </>
);
export default StatePage;
