import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Intro from "./components/intro";
import "./assets/css/tailwind.css";

import CTP from "./CovidTrackingProject";
import Worldometer from "./Worldometer";
import NotFoundPage from "./404";

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
          <Route exact path="/">
            <Intro />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Layout>
  );
}

export default App;
