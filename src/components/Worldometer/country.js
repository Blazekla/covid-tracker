import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CountryStats = ({ data }) => (
  <>
    <div className="w-min-250">
      <h2 className="text-xl">{data.country} Data</h2>
      <div className="mt-4">
        <div className="flex justify-between">
          <p>Cases:</p>
          <p>{data.cases}</p>
        </div>
        <div className="flex justify-between">
          <p>Deaths:</p>
          <p>{data.deaths}</p>
        </div>
        <div className="flex justify-between">
          <p>Critical:</p>
          <p>{data.critical}</p>
        </div>
        <div className="flex justify-between">
          <p>Cases Today:</p>
          <p>{data.todayCases}</p>
        </div>
        <div className="flex justify-between">
          <p>Recovered:</p>
          <p>{data.recovered}</p>
        </div>
        <div className="flex justify-between">
          <p>Population:</p>
          <p>{data.population}</p>
        </div>
      </div>
    </div>
  </>
);

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

export default CountryPage;
