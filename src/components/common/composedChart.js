import React from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  ResponsiveContainer,
  Bar,
  Legend,
  ComposedChart,
} from "recharts";
import movingAverage from "./movingAverage";

function composedChart({
  totalCases,
  today,
  selectedType,
  location,
  lineToggle,
  barToggle,
}) {
  const positiveSelection =
    location === "US" ? `New Cases` : `New Cases in ${location}`;
  const negativeSelection =
    location === "US" ? `New Deaths` : `New Deaths in ${location}`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="mx-auto w-full bg-gray-300 px-1">
          {payload.map((item) => {
            return (
              <p
                key={item.dataKey}
                className={` text-xl ${
                  item.dataKey === "movingAverage"
                    ? "text-red-800"
                    : "text-indigo-900"
                }`}
              >{`${item.value}`}</p>
            );
          })}
          <p className="">{`${label}`}</p>
        </div>
      );
    }

    return null;
  };

  const averagedData = movingAverage(totalCases, selectedType);

  totalCases.forEach((element, index) => {
    element.movingAverage = averagedData[index];
  });

  return (
    <ResponsiveContainer width="100%" height={300} className="bg-white rounded">
      <ComposedChart
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 10,
        }}
        data={totalCases}
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
        {(lineToggle || barToggle) && (
          <Tooltip isAnimationActive={false} content={<CustomTooltip />} />
        )}
        <Brush dataKey="date" />
        <Legend />
        {lineToggle && (
          <Line
            type="monotone"
            dataKey="movingAverage"
            name="7-day Average"
            stroke="#ff0000"
            activeDot={{ r: 4 }}
          />
        )}

        {barToggle && (
          <Bar
            dataKey={
              selectedType === "newCases" ? "positiveIncrease" : "deathIncrease"
            }
            name={
              selectedType === "newCases"
                ? positiveSelection
                : negativeSelection
            }
            barSize={20}
            fill="#8884d8"
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default composedChart;
