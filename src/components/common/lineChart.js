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
    location === "US" ? `New Cases` : `New Cases in ${location}`;
  const negativeSelection =
    location === "US" ? `New Deaths` : `New Deaths in ${location}`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="mx-auto w-full bg-gray-300 px-1">
          <p className="text-indigo-900 text-xl">{`${payload[0].value}`}</p>
          <p className="">{`${label}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300} className="bg-white rounded">
      <LineChart
        data={totalCases}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 10,
        }}
        syncId="chartSync"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          interval="preserveStartEnd"
          ticks={[
            totalCases[0].date,
            "Apr 1",
            "May 1",
            "Jun 1",
            "Jul 1",
            "Aug 1",
            "Sep 1",
            today,
          ]}
        />
        <YAxis domain={["dataMin", "dataMax"]} />
        <Tooltip isAnimationActive={false} content={<CustomTooltip />} />
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
        <Brush dataKey="date" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default lineChart;
