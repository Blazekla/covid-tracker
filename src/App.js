import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Layout from "./components/Layout";
import State from "./components/State/state";
import US from "./components/US/usData";

function App() {
  return (
    <Layout>
      <div className="flex justify-center">
        <NavLink
          to="/us"
          className="p-4 rounded-full border-solid border-2 border-indigo-500"
          activeClassName="underline bg-indigo-500"
        >
          US Data
        </NavLink>
        <NavLink
          to="/state"
          className="p-4 rounded-full border-solid border-2 border-indigo-500"
          activeClassName="underline bg-indigo-500"
        >
          State Data
        </NavLink>
      </div>
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
