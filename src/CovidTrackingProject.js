import React from "react";
import { Route, NavLink, useRouteMatch } from "react-router-dom";
import US from "./components/US/usPage";
import State from "./components/State/statePage";

function CovidTrackingProject() {
  const { path, url } = useRouteMatch();
  return (
    <>
      <div className="flex flex-wrap justify-center py-8 mx-2 sm:mx-4">
        <NavLink
          to={`${url}/us`}
          className="p-4 rounded-full border-solid border-2 border-primary-light text-white m-4"
          activeClassName="underline bg-primary-light"
          aria-label="See US Numbers"
        >
          US Data
        </NavLink>
        <NavLink
          to={`${url}/state`}
          className="p-4 rounded-full border-solid border-2 border-primary-light text-white m-4"
          activeClassName="underline bg-primary-light"
          aria-label="See State's Numbers"
        >
          State Data
        </NavLink>
      </div>
      <Route path={`${path}/us`}>
        <US />
      </Route>
      <Route path={`${path}/state`}>
        <State />
      </Route>
    </>
  );
}

export default CovidTrackingProject;
