import React from "react";
import LineChart from "./components/LineChart";
import "./assets/css/main.css";
import Tailwind from "./components/tailwindexample";
import Menu from "./components/selectMenu";
import SimpleToggle from "./components/simpleToggle";

function App() {
  return (
    <div className="flex flex-col  bg-indigo-900">
      <header className="flex justify-between items-center bg-gray-700 px-8">
        <h1 className="text-4xl ">Covid Tracker</h1>
        <p>By State</p>
      </header>
      <main>
        {/* <Menu /> */}
        <SimpleToggle />
        <LineChart />
        {/* <Tailwind /> */}
      </main>
      <footer>
        <p className="text-2xl bg-gray-700">Footer Here</p>
      </footer>
    </div>
  );
}

export default App;
