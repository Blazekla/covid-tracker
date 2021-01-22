import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CountryPage(props) {
  const [totalCases, setTotalCases] = useState(null);
  const [dates, setDates] = useState("");
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function fetchWorldOMeter() {
      try {
        setTotalCases(null);
        const apiEnpoint = `https://disease.sh/v3/covid-19/countries/${params.country}${dates}`;
        const data = await axios.get(apiEnpoint);
        setTotalCases(data.data);
      } catch (err) {
        console.error(err.message);
        setError(err.response.data.message);
      }
    }
    fetchWorldOMeter();
  }, [dates, params.country, props.usa]);

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
        <CountryStats data={totalCases} />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="text-white">Fetching {params.country} Data.....</div>
        </>
      )}
    </div>
  );
}

const CountryStats = ({ data }) => (
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
