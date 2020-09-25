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
      <main className="h-screen">{children}</main>
      <Footer>
        <div className="flex justify-between max-w-full bg-gray-700 items-center">
          <p className="">
            Created by{" "}
            <a
              href="https://luiscristo.com"
              className="text-indigo-500 italic underline text-lg"
            >
              Luis C
            </a>
          </p>
          <p>More updates incoming</p>
        </div>
      </Footer>
    </div>
  );
}

export default Layout;
