import React from "react";
import { Link } from "react-router-dom";

function tableData({ objectData, data, highlightColumn = null }) {
  return (
    <>
      {objectData.map((cell, index) => {
        if (index === 0) {
          if (cell.link) {
            return (
              <td
                className="text-left border-r-4  border-white p-2 sticky left-0"
                key={cell.dataTitle}
              >
                <Link
                  to={`${cell.link}/${data[cell.dataTitle]}`}
                  aria-label={`See ${data[cell.dataTitle]} numbers`}
                >
                  {data[cell.dataTitle]}
                </Link>
              </td>
            );
          }

          return (
            <td
              className="text-left border-r-4 border-white p-2 sticky left-0"
              key={cell.dataTitle}
            >
              {cell.dataTitle === "rawDate" ? data.date : data[cell.dataTitle]}
            </td>
          );
        }

        return (
          <td
            className={`border-r-4 border-white p-2 ${
              highlightColumn != null && index === highlightColumn
                ? "bg-secondary-main bg-opacity-40"
                : ""
            }`}
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
