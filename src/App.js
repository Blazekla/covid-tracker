import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Layout from "./components/Layout";
import Intro from "./components/intro";
import "./assets/css/tailwind.css";

// import World from "./components/World";
import CTP from "./CovidTrackingProject";
import Worldometer from "./Worldometer";

function App() {
  return (
    <Layout>
      <div className="py-4">
        <Switch>
          <Route path="/worldometer">
            <Worldometer />
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
