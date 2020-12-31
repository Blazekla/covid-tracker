import React from "react";
import Header from "./header";
import Footer from "./footer";
import { NavLink } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="flex flex-col bg-black">
      <Header>
        <NavLink to="/">
          <h1 className="text-4xl text-white">Covid Tracker</h1>
        </NavLink>
        <p className="text-white">Select below</p>
      </Header>
      <main className="min-h-screen">{children}</main>
      <Footer>
        <div className="flex justify-between max-w-full bg-black items-center">
          <p className="text-white flex-no-shrink">
            Created by{" "}
            <a
              href="https://luiscristo.com"
              className="text-primary-main italic underline text-lg"
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
