const checkSorting = (sortedField, value) => {
  if (sortedField && sortedField.key === value) {
    if (sortedField.direction === "ascending") {
      return (
        <svg
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="#fff"
          width="20"
          height="20"
        >
          <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
        </svg>
      );
    } else if (sortedField.direction === "descending") {
      return (
        <svg
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="#fff"
          width="20"
          height="20"
        >
          <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
        </svg>
      );
    }
  }

  return null;
};

export default checkSorting;
