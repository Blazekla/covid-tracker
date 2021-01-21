import React from "react";
import { NavLink, Route, useRouteMatch } from "react-router-dom";
import World from "./components/Worldometer";
import Country from "./components/Worldometer/country";

function Worldometer() {
  const { path, url } = useRouteMatch();
  return (
    <>
      <div className="flex flex-wrap justify-center py-8 mx-2 sm:mx-4">
        <NavLink
          to={`${url}/world`}
          className="p-4 rounded-full border-solid border-2 border-primary-light text-white m-4"
          activeClassName="underline bg-primary-light"
          aria-label="See US Numbers"
        >
          World Data
        </NavLink>
        <NavLink
          to={`${url}/world/usa`}
          className="p-4 rounded-full border-solid border-2 border-primary-light text-white m-4"
          activeClassName="underline bg-primary-light"
          aria-label="See US Numbers"
        >
          US Data
        </NavLink>
      </div>

      <Route
        path={`${path}/world/usa/:state`}
        render={(props) => <Country {...props} />}
      />
      <Route
        exact
        path={`${path}/world/:country`}
        render={(props) => <Country {...props} />}
      />
      <Route exact path={`${path}/world/usa`}>
        {/* <World /> */}
      </Route>
      <Route exact path={`${path}/world`}>
        <World />
      </Route>
    </>
  );
}

export default Worldometer;
