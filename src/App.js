import React from "react";
import Layout from "./components/Layout";
import LineChart from "./components/LineChart";

import SimpleToggle from "./components/simpleToggle";

function App() {
  return (
    <Layout>
      <SimpleToggle />
      <LineChart />
    </Layout>
  );
}

export default App;
