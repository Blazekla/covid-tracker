import React from "react";
import "../assets/css/main.css";

function Layout({ children }) {
  return (
    <div className="flex flex-col  bg-indigo-900">
      <header className="flex justify-between items-center bg-gray-700 px-8">
        <h1 className="text-4xl ">Covid Tracker</h1>
        <p>By State</p>
      </header>
      <main>{children}</main>
      <footer>
        <p className="text-2xl bg-gray-700">Footer Here</p>
      </footer>
    </div>
  );
}

export default Layout;
