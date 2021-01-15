import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Layout from "./components/Layout";
import Intro from "./components/intro";
import "./assets/css/tailwind.css";

import World from "./components/World";
import CTP from "./CovidTrackingProject";

function App() {
  return (
    <Layout>
      <div className="flex flex-wrap justify-center py-8 mx-2 sm:mx-4">
        <NavLink
          to="/world"
          className="p-4 rounded-full border-solid border-2 border-primary-light text-white m-4"
          activeClassName="underline bg-primary-light"
          aria-label="See US Numbers"
        >
          World Data
        </NavLink>
      </div>
      <div className="py-4">
        <Switch>
          <Route path="/world">
            <World />
          </Route>
          <Route path="/covidtrackingproject">
            <CTP />
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
