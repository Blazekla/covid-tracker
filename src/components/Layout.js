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
          <h1 className="text-4xl text-white">Covid Tracker</h1>
        </NavLink>
        <p className="text-white">Select below</p>
      </Header>
      <main className="min-h-screen">{children}</main>
      <Footer>
        <div className="flex justify-between max-w-full bg-gray-700 items-center px-1 sm:px-4">
          <p className="text-white">
            Created by{" "}
            <a
              href="https://luiscristo.com"
              className="text-indigo-500 italic underline text-lg"
            >
              Luis C
            </a>
          </p>
          <p className="text-white">More updates incoming</p>
        </div>
      </Footer>
    </div>
  );
}

export default Layout;
