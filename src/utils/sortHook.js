import { useState, useMemo } from "react";

function UseSortHook(totalCases, sort = true) {
  const [sortedField, setSortedField] = useState(null);

  const handleTableHeaderClick = (name) => {
    requestSort(name);
  };
  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortedField &&
      sortedField.key === key &&
      sortedField.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortedField({ key, direction });
  };

  let sortedData = useMemo(() => {
    if (totalCases && sortedField !== null) {
      const data = [...totalCases];
      data.sort((a, b) => {
        if (a[sortedField.key] < b[sortedField.key]) {
          return sortedField.direction === "ascending" ? -1 : 1;
        }
        if (a[sortedField.key] > b[sortedField.key]) {
          return sortedField.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      return data;
    } else if (totalCases) {
      const data = [...totalCases];
      if (sort) {
        data.sort((a, b) => {
          if (a["cases"] < b["cases"]) {
            return 1;
          }
          if (a["cases"] > b["cases"]) {
            return -1;
          }
          return 0;
        });
      }
      return data;
    } else {
      return null;
    }
  }, [sortedField, totalCases, sort]);

  return { handleTableHeaderClick, sortedData, sortedField };
}

export default UseSortHook;
