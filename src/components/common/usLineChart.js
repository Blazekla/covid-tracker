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

function USLineChart(props) {
  const [totalCases, setTotalCases] = useState(null);
  const [selectedState, setSelectedState] = useState("TX");

  // const today = DateTime.local().minus({ day: 1 }).toFormat("LLL d");
  const today = DateTime.local().toFormat("LLL d");
  useEffect(() => {
    async function fetchTotals() {
      try {
        const data = await axios.get(
          `https://api.covidtracking.com/v1/us/${props.timeframe}.json`
        );

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
    // e.preventDefault();
    console.log("selected state: ", e.target.value);
    setSelectedState(e.target.value);
  };

  return (
    <div className="flex flex-col items-center px-12 my-12 ">
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

      {totalCases ? (
        <h1>Total Positive in {selectedState}</h1>
      ) : (
        "nothing to see here"
      )}
      {totalCases && (
        <ResponsiveContainer width="99%" height={300} className="bg-gray-300">
          <LineChart
            width={500}
            height={500}
            data={totalCases}
            margin={{
              top: 10,
              right: 0,
              left: 0,
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

              // tickLine={false}
            />
            <YAxis dataKey="positiveIncrease" />
            <Tooltip
              itemStyle={{ color: "purple" }}
              wrapperStyle={{ backgroundColor: "pink", color: "black" }}
              isAnimationActive={false}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="positiveIncrease"
              name={`Positive Cases in ${totalCases[0].state}`}
              stroke="#88844d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default USLineChart;