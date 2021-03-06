import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  Legend,
  ComposedChart,
} from "recharts";

function smallComposedChart({
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
              >{`${item.dataKey === "movingAverage" ? "7day: " : ""}${
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
        {true ? <XAxis dataKey="date" hide={true} /> : null}
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
        {minified ? <Legend /> : null}

        {barToggle && (
          <Bar
            dataKey={display}
            barSize={20}
            isAnimationActive={false}
            className="fill-current text-primary-light"
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default smallComposedChart;
