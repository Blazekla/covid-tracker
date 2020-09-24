import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import LineChart from "./components/LineChart";
import SimpleToggle from "./components/simpleToggle";

function App() {
  return (
    <Layout>
      <Link to="/us">US Data</Link>
      <Link to="/state">State Data</Link>
      <Switch>
        <Route path="/us">
          <SimpleToggle />
        </Route>
        <Route path="/state">
          <LineChart />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
