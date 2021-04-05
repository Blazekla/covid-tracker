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
    function handleKeyPress(e) {
      if (e.key === "Escape" || e.keyCode === 27) {
        handleToggle();
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleToggle]);

  const innerHeightValue = window.innerHeight * 0.5;

  return (
    <div className="h-screen w-screen left-0 top-0 fixed z-30 flex flex-col justify-center ">
      <div
        className="bg-black bg-opacity-60 z-40 left-0 top-0 right-0 bottom-0 absolute"
        onClick={handleToggle}
      ></div>
      <div className="flex flex-col items-center mx-4 sm:mx-8 my-12 bg-gray-900 z-50 px-2 py-8 sm:p-8">
        <div className="flex flex-wrap justify-between w-full mb-8 p-2">
          <div className="text-white  flex flex-wrap justify-center">
            <div className="p-1">
              <label className="mr-4" htmlFor="7dayaverage">
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
          <div className="px-4 flex justify-center items-center">
            <button onClick={handleToggle} className="text-white ">
              X
            </button>
          </div>
        </div>

        {totalCases && (
          <ComposedChart
            totalCases={totalCases}
            today={today}
            selectedType={selectedType}
            location={selectedState}
            lineToggle={lineChart}
            barToggle={barChart}
            heightInput={innerHeightValue}
            minified={true}
            display={display ? display : null}
          />
        )}
      </div>
    </div>
  );
}

export default ChartModal;
