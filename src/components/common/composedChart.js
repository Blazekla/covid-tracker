import React from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  Legend,
  ComposedChart,
} from "recharts";
import movingAverage from "../../utils/movingAverage";

function composedChart({
  totalCases,
  today,
  selectedType,
  location,
  lineToggle,
  barToggle,
  heightInput = 400,
  minified,
  display,
}) {
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
                    ? "text-secondary-main"
                    : "text-primary-main"
                }`}
              >{`${item.dataKey === "movingAverage" ? "7-day: " : ""}${
                item.value
              }`}</p>
            );
          })}
          <p className="text-black">{`${label}`}</p>
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
          className="fill-current text-white text-xs"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  };
  const selectedData =
    selectedType === "newCases" ? "positiveIncrease" : "deathIncrease";

  const averagedData = display
    ? movingAverage(totalCases, display)
    : movingAverage(totalCases, selectedData);

  totalCases.forEach((element, index) => {
    element.movingAverage = averagedData[index];
  });

  const displayMessage = () => {
    if (location === "US" && selectedType === "newCases") {
      return `New Cases`;
    } else if (location === "US" && selectedType === "newDeaths") {
      return `New Deaths`;
    }

    switch (display) {
      case "positiveIncrease":
        return `Daily Increase in ${location}`;
      case "deathIncrease":
        return `Daily Deaths in ${location}`;
      case "totalTestResultsIncrease":
        return `Daily Tests in ${location}`;
      case "hospitalizedCurrently":
        return `Currently Hospitalized in ${location}`;
      default:
        return `Data from ${location}`;
    }
  };
  return (
    <ResponsiveContainer
      width="100%"
      height={heightInput}
      className="bg-gray-900 rounded"
    >
      <ComposedChart
        margin={{
          top: 10,
          right: 10,
          left: -10,
          bottom: 10,
        }}
        data={totalCases}
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
          stroke="#fff"
        />
        {(lineToggle || barToggle) && (
          <Tooltip isAnimationActive={false} content={<CustomTooltip />} />
        )}
        {minified ? (
          <Legend
            formatter={(value, entry, index) => {
              return <span className="text-white">{value}</span>;
            }}
          />
        ) : null}

        {lineToggle && (
          <Line
            type="monotone"
            dataKey="movingAverage"
            name="7-day Average"
            activeDot={{ r: 4 }}
            dot={false}
            stroke="#aa1200"
          />
        )}

        {barToggle && (
          <Bar
            dataKey={
              display
                ? display
                : selectedType === "newCases"
                ? "positiveIncrease"
                : "deathIncrease"
            }
            name={displayMessage()}
            barSize={20}
            fill="#377564"
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default composedChart;
