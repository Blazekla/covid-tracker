import React from "react";
import Header from "./header";
import Footer from "./footer";
import "../assets/css/main.css";

function Layout({ children }) {
  return (
    <div className="flex flex-col  bg-indigo-900">
      <Header>
        <h1 className="text-4xl ">Covid Tracker</h1>
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
