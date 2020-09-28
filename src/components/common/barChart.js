import React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function BarChartComponent({ totalCases, today, selectedType, location }) {
  const positiveSelection =
    location === "US" ? `New Cases in the US` : `New Cases in ${location}`;
  const negativeSelection =
    location === "US" ? `New Deaths in the US` : `New Deaths in ${location}`;

  return (
    <ResponsiveContainer width="100%" height={300} className="bg-gray-300">
      <BarChart
        width={500}
        height={500}
        data={totalCases}
        syncId="chartSync"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          interval="preserveStartEnd"
          ticks={["Apr 1", "May 1", "Jun 1", "Jul 1", "Aug 1", "Sep 1", today]}
        />
        <YAxis domain={["dataMin", "dataMax"]} />
        <Tooltip isAnimationActive={false} />
        <Legend />
        <Bar
          dataKey={
            selectedType === "newCases" ? "positiveIncrease" : "deathIncrease"
          }
          name={
            selectedType === "newCases" ? positiveSelection : negativeSelection
          }
          barSize={20}
          fill="#8884d8"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartComponent;
