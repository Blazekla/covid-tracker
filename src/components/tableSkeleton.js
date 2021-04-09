import React from "react";

function TableSkeleton({ rows = 12, columns = 8 }) {
  return (
    <>
      {[...Array(rows)].map((rowItem, rowIndex) => (
        <tr key={rowIndex}>
          {[...Array(columns)].map((columItem, columIndex) => (
            <td key={columIndex}>
              <div className="animate-pulse h-6 bg-primary-light bg-opacity-50 w-full"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default TableSkeleton;
