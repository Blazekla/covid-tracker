import React from "react";
import LineChart from "./components/LineChart";
// import "./App.css";
import "./assets/css/main.css";
import Tailwind from "./components/tailwindexample";
function App() {
  return (
    <div className="App">
      <p class="text-xs ...">The quick brown fox ...</p>
      <p class="text-sm ...">The quick brown fox ...</p>
      <p class="text-base ...">The quick brown fox ...</p>
      <p class="text-lg ...">The quick brown fox ...</p>
      <p class="text-xl ...">The quick brown fox ...</p>
      <p class="text-2xl ...">The quick brown fox ...</p>
      <p class="text-3xl ...">The quick brown fox ...</p>
      <p class="text-4xl ">The quick brown fox ...</p>
      <p class="text-5xl ...">The quick brown fox ...</p>
      <p class="text-6xl ...">The quick brown fox ...</p>
      <header className="App-header">
        <LineChart />
        <Tailwind />
      </header>
    </div>
  );
}

export default App;
