import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import State from "./components/State/state";
import US from "./components/US/usData";

function App() {
  return (
    <Layout>
      <Link to="/us">US Data</Link>
      <Link to="/state">State Data</Link>
      <Switch>
        <Route path="/us">
          <US />
        </Route>
        <Route path="/state">
          <State />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
