import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Layout from "./components/Layout";
import Intro from "./components/intro";
import "./assets/css/tailwind.css";
import US from "./components/US/usPage";
import State from "./components/State/statePage";

function App() {
  return (
    <Layout>
      <div className="flex justify-center py-8">
        <NavLink
          to="/us"
          className="p-4 rounded-full border-solid border-2 border-primary-light text-white"
          activeClassName="underline bg-primary-light"
          aria-label="See US Numbers"
        >
          US Data
        </NavLink>
        <NavLink
          to="/state"
          className="p-4 rounded-full border-solid border-2 border-primary-light text-white"
          activeClassName="underline bg-primary-light"
          aria-label="See State's Numbers"
        >
          State Data
        </NavLink>
      </div>
      <div className="py-4">
        <Switch>
          <Route path="/us">
            <US />
          </Route>
          <Route path="/state">
            <State />
          </Route>
          <Route path="/">
            <Intro />
          </Route>
        </Switch>
      </div>
    </Layout>
  );
}

export default App;
