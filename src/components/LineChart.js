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
} from "recharts";
import { DateTime } from "luxon";

function LineChartComponent() {
  const [totalCases, setTotalCases] = useState(null);

  useEffect(() => {
    async function fetchTotals() {
      const data = await axios.get(
        "https://api.covidtracking.com/v1/states/tx/daily.json"
      );
      setTotalCases(data.data);
      console.log("data totals: ", data);
    }

    fetchTotals();
  }, []);
  return (
    <div>
      {totalCases &&
        console.log(
          "date parsed: ",
          DateTime.fromISO(totalCases[0].date).toISODate()
        )}
      {totalCases && console.log("rendered return: ", totalCases)}
      {totalCases ? "yay" : "nothing to see here"}
      {totalCases && (
        <LineChart
          width={1000}
          height={500}
          data={totalCases}
          margin={{
            top: 5,
            right: 300,
            left: 200,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* <XAxis dataKey="state" /> */}
          <XAxis
            name="date"
            reversed
            allowDataOverflow
            dataKey="date"
            domain={[0, 200]}
            // type="number"
          />
          <YAxis dataKey="positive" />
          <Tooltip
            itemStyle={{ color: "purple" }}
            wrapperStyle={{ backgroundColor: "pink", color: "black" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="positive"
            stroke="#88844d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      )}
    </div>
  );
}

export default LineChartComponent;
