import React from "react";

function tableHead({
  handleTableHeaderClick,
  checkSorting,
  sortedField,
  objectData,
}) {
  return (
    <>
      {objectData.map((cell, index) => {
        return (
          <th
            className={`sticky top-0 ${
              index === 0 ? `left-0 z-10` : ""
            } bg-gray-900 p-2 cursor-pointer`}
            onClick={() => handleTableHeaderClick(cell.dataTitle)}
            key={cell.dataTitle}
          >
            <div className="flex w-max items-center mx-auto">
              <h1>{cell.Title}</h1>
              {checkSorting(sortedField, cell.dataTitle)}
            </div>
          </th>
        );
      })}
    </>
  );
}

export default tableHead;
