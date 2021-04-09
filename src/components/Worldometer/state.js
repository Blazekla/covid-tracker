import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const StateStats = ({ data }) => (
  <>
    <div className="w-min-250">
      <h2 className="text-xl">{data.state} Data</h2>
      <div className="mt-4">
        <div className="flex justify-between">
          <p>Total Cases:</p>
          <p>{data.cases}</p>
        </div>
        <div className="flex justify-between">
          <div>Cases Today:</div>
          <div>{data.todayCases}</div>
        </div>
        <div className="flex justify-between">
          <div>Total Deaths:</div>
          <div>{data.deaths}</div>
        </div>
        <div className="flex justify-between">
          <div>Deaths Today:</div>
          <div>{data.todayDeaths}</div>
        </div>
        <div className="flex justify-between">
          <div>Active:</div>
          <div>{data.active}</div>
        </div>
        <div className="flex justify-between">
          <div>Cases Per One Million:</div>
          <div>{data.casesPerOneMillion}</div>
        </div>
        <div className="flex justify-between">
          <div>Deaths Per One Million:</div>
          <div>{data.deathsPerOneMillion}</div>
        </div>
        <div className="flex justify-between">
          <div>Tests:</div>
          <div>{data.tests}</div>
        </div>
        <div className="flex justify-between">
          <div>Tests Per One Million:</div>
          <div>{data.testsPerOneMillion}</div>
        </div>
        <div className="flex justify-between">
          <div>Population:</div>
          <div>{data.population}</div>
        </div>
      </div>
    </div>
  </>
);

function StatePage() {
  const [totalCases, setTotalCases] = useState(null);
  const [dates, setDates] = useState("");
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function fetchWorldOMeter() {
      try {
        setTotalCases(null);
        const apiEnpoint = `https://disease.sh/v3/covid-19/states/${params.state}${dates}`;
        const data = await axios.get(apiEnpoint);
        setTotalCases(data.data);
      } catch (err) {
        console.error(err.message);
        setError(err.response.data.message);
      }
    }
    fetchWorldOMeter();
  }, [dates, params.state]);

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
          <div className="text-white">Fetching {params.state} Data.....</div>
        </>
      )}
    </div>
  );
}

export default StatePage;
