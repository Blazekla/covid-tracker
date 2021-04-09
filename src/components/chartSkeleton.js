import React from "react";

function chartSkeleton({ columns, height }) {
  function RandoNum() {
    const number = Math.floor(Math.random() * 5) + 1;
    return `h-${number}/6`;
  }
  return (
    <div className="p-4  w-full mx-auto" style={{ height: `${height}px` }}>
      <div className="animate-pulse h-full bg-blue-100 w-full">
        <div className="flex rounded w-full h-full justify-between px-8 mx-auto items-end space-x-1">
          {[...Array(columns)].map((item, index) => {
            return (
              <div
                key={index}
                className={`bg-primary-light bg-opacity-40 w-1/12 ${RandoNum()}`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default chartSkeleton;
