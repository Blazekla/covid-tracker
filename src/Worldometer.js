import React from "react";
import { NavLink, Route, useRouteMatch } from "react-router-dom";
import World from "./components/World";

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
      </div>
      <Route path={`${path}/world`}>
        <World />
      </Route>
    </>
  );
}

export default Worldometer;
