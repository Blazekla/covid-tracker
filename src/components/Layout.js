import React from "react";
import Header from "./header";
import Footer from "./footer";
import "../assets/css/main.css";
import { NavLink } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="flex flex-col  bg-indigo-900">
      <Header>
        <NavLink to="/">
          <h1 className="text-4xl ">Covid Tracker</h1>
        </NavLink>
        <p>By State</p>
      </Header>
      <main>{children}</main>
      <Footer>
        <p className="text-2xl bg-gray-700">Footer Here</p>
      </Footer>
    </div>
  );
}

export default Layout;
