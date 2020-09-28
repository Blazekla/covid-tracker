import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  ResponsiveContainer,
} from "recharts";

function lineChart({ totalCases, today, selectedType, location }) {
  const positiveSelection =
    location === "US" ? `New Cases in the US` : `New Cases in ${location}`;
  const negativeSelection =
    location === "US" ? `New Deaths in the US` : `New Deaths in ${location}`;

  return (
    <ResponsiveContainer width="100%" height={300} className="bg-gray-300">
      <LineChart
        data={totalCases}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          // reversed
          dataKey="date"
          interval="preserveStartEnd"
          ticks={["Apr 1", "May 1", "Jun 1", "Jul 1", "Aug 1", "Sep 1", today]}
        />
        <YAxis domain={["dataMin", "dataMax"]} />
        <Tooltip
          itemStyle={{ color: "purple" }}
          wrapperStyle={{ backgroundColor: "pink", color: "black" }}
          isAnimationActive={false}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey={
            selectedType === "newCases" ? "positiveIncrease" : "deathIncrease"
          }
          name={
            selectedType === "newCases" ? positiveSelection : negativeSelection
          }
          stroke="#88844d"
          activeDot={{ r: 4 }}
        />
        <Brush />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default lineChart;
