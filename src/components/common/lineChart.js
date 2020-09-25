import React from "react";
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

function lineChart({ totalCases, today, selectedType, state }) {
  return (
    <ResponsiveContainer width="100%" height={300} className="bg-gray-300">
      <LineChart
        width={500}
        height={500}
        data={totalCases}
        margin={{
          top: 10,
          right: 10,
          left: -10,
          bottom: 10,
        }}
      >
        {console.log("props: ", selectedType, today)}
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          reversed
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
            selectedType === "newCases"
              ? `New Cases in the US`
              : `New Deaths in the US`
          }
          stroke="#88844d"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default lineChart;
