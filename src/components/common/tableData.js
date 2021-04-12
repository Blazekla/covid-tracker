import React from "react";

function tableData({ objectData, data }) {
  return (
    <>
      {objectData.map((cell) => {
        if (cell.dataTitle === "rawDate") {
          return (
            <td
              className="text-left border-r-4 bg-gray-900 border-white p-2 sticky left-0"
              key={cell.dataTitle}
            >
              {data.date}
            </td>
          );
        }
        return (
          <td
            className="border-r-4 bg-gray-900 border-white p-2"
            key={cell.dataTitle}
          >
            {data[cell.dataTitle] != null
              ? data[cell.dataTitle].toLocaleString("en", {
                  useGrouping: true,
                })
              : 0}
          </td>
        );
      })}
    </>
  );
}

export default tableData;
