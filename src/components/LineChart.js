import React, { useState, useEffect } from "react";
import axios from "axios";

function LineChart() {
  const [totalCases, setTotalCases] = useState(null);

  useEffect(() => {
    async function fetchTotals() {
      const data = await axios.get(
        "https://api.covidtracking.com/v1/states/ca/daily.json"
      );
      setTotalCases(data.data);
      console.log("data totals: ", data);
    }

    fetchTotals();
  }, []);
  return (
    <div>
      {console.log("rendered return")}
      {totalCases ? "yay" : "nothing to see here"}
    </div>
  );
}

export default LineChart;
