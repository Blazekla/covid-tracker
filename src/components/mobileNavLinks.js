import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

function MobileNavLinks({ toggle }) {
  useEffect(() => {
    function KeyPress(e) {
      if (e.key === "Escape" || e.keyCode === 27) {
        toggle();
      }
    }

    function Resize(e) {
      const numericScreenSize = 768;
      if (e.currentTarget.innerWidth >= numericScreenSize) {
        toggle();
      }
    }
    document.addEventListener("keydown", KeyPress);
    window.addEventListener("resize", Resize);
    return () => {
      document.removeEventListener("keydown", KeyPress);
      window.removeEventListener("resize", Resize);
    };
  }, [toggle]);
  return (
    <>
      <div className="absolute z-20 left-0 top-0 w-screen h-screen flex items-center flex-col bg-primary-light justify-between py-32">
        <NavLink
          to="/covidtrackingproject"
          className="px-4"
          activeClassName="border-b-2 border-secondary-main"
          onClick={toggle}
        >
          <p className="text-white">Covid Tracking Project API</p>
        </NavLink>
        <NavLink
          to="/worldometer"
          className="px-4"
          activeClassName="border-b-2 border-secondary-main"
          onClick={toggle}
        >
          <p className="text-white">Worldometer</p>
        </NavLink>
      </div>
    </>
  );
}

export default MobileNavLinks;
