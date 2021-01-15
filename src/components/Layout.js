import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { NavLink } from "react-router-dom";
import MobileNavLinks from "./mobileNavLinks";

const DesktopNav = () => (
  <>
    <div className="hidden md:flex justify-between ">
      <NavLink
        to="/covidtrackingproject"
        className="px-4"
        activeClassName="border-b-2 border-secondary-main"
      >
        <p className="text-white">Covid Tracking Project API</p>
      </NavLink>
      <NavLink
        to="/worldometer"
        className="px-4"
        activeClassName="border-b-2 border-secondary-main"
      >
        <p className="text-white">Worldometer</p>
      </NavLink>
    </div>
  </>
);

const MobileNav = () => {
  const [toggle, setToggle] = useState(null);

  return (
    <>
      {toggle ? (
        <button
          className="z-30 relative text-white"
          onClick={() => setToggle(!toggle)}
        >
          Close
        </button>
      ) : (
        <button className="block md:hidden" onClick={() => setToggle(!toggle)}>
          <svg
            className="block h-6 w-6 stroke-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
      {toggle && <MobileNavLinks toggle={() => setToggle(!toggle)} />}
    </>
  );
};

function Layout({ children }) {
  return (
    <div className="flex flex-col bg-black">
      <Header>
        <NavLink to="/">
          <h1 className="text-4xl text-white">Covid Tracker</h1>
        </NavLink>
        <DesktopNav />
        <MobileNav />
      </Header>
      <main className="min-h-screen">{children}</main>
      <Footer>
        <div className="flex justify-between max-w-full bg-black items-center">
          <p className="text-white flex-no-shrink">
            Created by{" "}
            <a
              href="https://luiscristo.com"
              className="text-white italic underline text-lg"
            >
              Luis C
            </a>
          </p>
          <p className="text-white text-right flex-grow-0">
            More updates incoming
          </p>
        </div>
      </Footer>
    </div>
  );
}

export default Layout;
