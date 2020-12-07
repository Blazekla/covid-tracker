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
import movingAverage from "../../utils/movingAverage";

function smallComposedChart({
  totalCases,
  today,
  selectedType,
  location,
  lineToggle,
  barToggle,
  heightInput = 400,
  minified,
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
                    ? "text-red-700"
                    : "text-indigo-900"
                }`}
              >{`${item.dataKey === "movingAverage" ? "7day: " : ""}${
                item.value
              }`}</p>
            );
          })}
          <p className="">{`${label}`}</p>
        </div>
      );
    }

    return null;
  };

  const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          className="fill-current text-gray-600"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  const averagedData = movingAverage(totalCases, selectedType);

  totalCases.forEach((element, index) => {
    element.movingAverage = averagedData[index];
  });

  return (
    <ResponsiveContainer
      width="100%"
      height={heightInput}
      className="bg-white rounded"
    >
      <ComposedChart
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 10,
        }}
        data={totalCases}
        // className="bg-gray-400"
      >
        <CartesianGrid strokeDasharray="3 3" />
        {minified ? (
          <XAxis
            dataKey="date"
            interval="preserveStartEnd"
            tick={<CustomizedAxisTick />}
            height={60}
          />
        ) : null}
        <YAxis
          domain={["dataMin", "dataMax"]}
          interval="preserveEnd"
          scale="linear"
          tickFormatter={(tick) => {
            return tick >= 1000 ? tick / 1000 + "k" : tick;
          }}
        />
        {(lineToggle || barToggle) && (
          <Tooltip isAnimationActive={false} content={<CustomTooltip />} />
        )}
        {minified ? <Brush dataKey="date" height={40} /> : null}
        {minified ? <Legend /> : null}

        {lineToggle && (
          <Line
            type="monotone"
            dataKey="movingAverage"
            name="7-day Average"
            activeDot={{ r: 4 }}
            dot={false}
            stroke="#ff0000"
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

export default smallComposedChart;
