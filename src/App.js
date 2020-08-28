import React from "react";
import logo from "./logo.svg";
import LineExample from "./components/LineChartExample";
import LineChart from "./components/LineChart";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* <LineExample /> */}
        <LineChart />
      </header>
    </div>
  );
}

export default App;
