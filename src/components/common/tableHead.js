import React from "react";

function tableHead({
  handleTableHeaderClick,
  checkSorting,
  sortedField,
  objectData,
}) {
  return (
    <>
      {objectData.map((cell) => {
        return (
          <th
            className="sticky top-0 left-0 z-10 bg-gray-900 px-2 cursor-pointer"
            onClick={() => handleTableHeaderClick(cell.dataTitle)}
            key={cell.dataTitle}
          >
            {cell.Title}
            {checkSorting(sortedField, cell.dataTitle)}
          </th>
        );
      })}
    </>
  );
}

export default tableHead;
