import React, { useEffect } from "react";
import ComposedChart from "./composedChart";
function ChartModal({
  totalCases,
  selectedState,
  handleToggle,
  handleStateChange,
  stateLabelValues,
  selectedType,
  handleTypeChange,
  barChart,
  handleBarChartChange,
  lineChart,
  handleLineChartChange,
  today,
  display,
}) {
  useEffect(() => {
    // effect
    return () => {
      //   cleanup;
    };
  }, []);
  return (
    <div
      //   onClick={handleToggle}
      className="h-screen w-screen left-0 top-0 fixed z-30 flex flex-col justify-center "
    >
      <div
        className="bg-black bg-opacity-30 z-40 left-0 top-0 right-0 bottom-0 absolute"
        onClick={handleToggle}
      ></div>
      <div className="flex flex-col items-center my-12 bg-red-900 z-50">
        <button
          onClick={handleToggle}
          className="text-white border-green-900 border p-2 my-8"
        >
          X
        </button>
        <div className="flex flex-wrap justify-center">
          <div className="text-white p-2 sm:p-8 flex flex-wrap justify-center">
            <div>
              <label className="m-4" htmlFor="7dayaverage">
                7-Day Average:
              </label>
              <input
                type="checkbox"
                name="lineaveragechart"
                id="7dayaverage"
                checked={lineChart}
                onChange={handleLineChartChange}
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-2 sm:px-4 mb-16">
          {totalCases && (
            <ComposedChart
              totalCases={totalCases}
              today={today}
              selectedType={selectedType}
              location={selectedState}
              lineToggle={lineChart}
              barToggle={barChart}
              heightInput={400}
              minified={true}
              display={display ? display : null}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChartModal;
