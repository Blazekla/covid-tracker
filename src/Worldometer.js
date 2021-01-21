import React from "react";
import {
  NavLink,
  Route,
  useRouteMatch,
  Switch,
  Redirect,
} from "react-router-dom";
import World from "./components/Worldometer";
import Country from "./components/Worldometer/country";

function Worldometer(props) {
  const { path, url } = useRouteMatch();
  console.log("worldometer props: ", props);
  return (
    <>
      <div className="flex flex-wrap justify-center py-8 mx-2 sm:mx-4">
        <NavLink
          to={`${url}/world`}
          className="p-4 rounded-full border-solid border-2 border-primary-light text-white m-4"
          exact
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
      <Switch>
        <Route
          exact
          path={`${path}/world/usa/:state`}
          render={(props) => (
            <div className="text-white">
              api data for {props.match.params.state} state
            </div>
          )}
        />
        <Route
          exact
          path={`${path}/world/usa`}
          render={(props) => {
            return <Country usa {...props} />;
          }}
        />
        {/* <Country country="USA" />
        </Route> */}
        <Route
          exact
          path={`${path}/world/:country/`}
          render={(props) => {
            return <Country {...props} />;
          }}
        />
        <Route exact path={`${path}/world`}>
          <World />
        </Route>
        <Route path={`${path}/*`}>
          <Redirect to="/404" />
        </Route>
      </Switch>
    </>
  );
}

export default Worldometer;
