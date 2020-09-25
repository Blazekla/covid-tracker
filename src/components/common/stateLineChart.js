import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DateTime } from "luxon";
import { stateLabelValues } from "../../data/stateLabel";

function LineChartComponent(props) {
  const [totalCases, setTotalCases] = useState(null);
  const [selectedState, setSelectedState] = useState("TX");
  const [selectedType, setSelectedType] = useState("newCases");

  const today = DateTime.local().minus({ day: 1 }).toFormat("LLL d");
  useEffect(() => {
    async function fetchTotals() {
      try {
        const data = await axios.get(
          `https://api.covidtracking.com/v1/states/${selectedState}/daily.json`
        );
        // const cdcData = await axios.get(
        //   `https://data.cdc.gov/resource/9mfq-cb36.json`,
        //   {
        //     params: {
        //       $limit: 50000,
        //     },
        //     headers: {
        //       "X-App-Token": process.env.REACT_APP_TEST,
        //     },
        //   }
        // );

        data.data.forEach((item) => {
          item.date = DateTime.fromISO(item.date).toFormat("LLL d");
        });
        setTotalCases(data.data);
      } catch (error) {
        console.log("error fetching api data: ", error);
      }
    }

    fetchTotals();
  }, [selectedState]);

  const handleChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div className="flex flex-col items-center my-12 ">
      <div className="p-12">
        <select value={selectedState} onChange={handleChange}>
          <option value="one" disabled>
            Choose a State
          </option>
          {stateLabelValues.map((state) => {
            return (
              <option key={state.label} value={state.value}>
                {state.label}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <select value={selectedType} onChange={handleTypeChange}>
          <option value="newCases">New Cases</option>
          <option value="newDeaths">New Deaths</option>
        </select>
      </div>

      {totalCases ? (
        <h1>Total Positive in {selectedState}</h1>
      ) : (
        "nothing to see here"
      )}
      <div className="container mx-auto px-1 sm:px-4">
        {totalCases && (
          <ResponsiveContainer
            width="100%"
            height={300}
            className="bg-gray-300"
          >
            <LineChart
              data={totalCases}
              margin={{
                top: 10,
                right: 10,
                left: -10,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                reversed
                // allowDataOverflow
                dataKey="date"
                // domain={["auto", "auto"]}
                // domain={[0, 200]}
                // type="category"
                // interval="preserveStart"
                interval="preserveStartEnd"
                // interval="preserveEnd"
                // interval={2}
                ticks={[
                  // "Mar 4",
                  "Apr 1",
                  "May 1",
                  "Jun 1",
                  "Jul 1",
                  "Aug 1",
                  "Sep 1",
                  today,
                  // DateTime.local().toFormat("LLL d").valueOf(String),
                ]}
              />
              <YAxis
                dataKey={
                  selectedType === "newCases"
                    ? "positiveIncrease"
                    : "deathIncrease"
                }
              />
              <Tooltip
                itemStyle={{ color: "purple" }}
                wrapperStyle={{ backgroundColor: "pink", color: "black" }}
                isAnimationActive={false}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={
                  selectedType === "newCases"
                    ? "positiveIncrease"
                    : "deathIncrease"
                }
                name={
                  selectedType === "newCases"
                    ? `New Cases in ${totalCases[0].state}`
                    : `New Deaths in ${totalCases[0].state}`
                }
                stroke="#88844d"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default LineChartComponent;
