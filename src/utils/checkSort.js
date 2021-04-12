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
          className="inline ml-0.5"
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
          className="inline ml-0.5"
        >
          <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
        </svg>
      );
    }
  } else {
    return (
      <svg
        focusable="false"
        viewBox="0 0 64 64"
        aria-hidden="true"
        fill="#fff"
        width="20"
        height="20"
        className="inline ml-0.5"
      >
        <path d="m31.414 15.586-7-7c-.78-.781-2.048-.781-2.828 0l-7 7c-.781.781-.781 2.047 0 2.828.78.781 2.048.781 2.828 0l3.586-3.586v39.172c0 1.104.896 2 2 2s2-.896 2-2v-39.172l3.586 3.586c.39.391.902.586 1.414.586s1.024-.195 1.414-.586c.781-.781.781-2.047 0-2.828z" />
        <path d="m49.414 45.586c-.781-.781-2.047-.781-2.828 0l-3.586 3.586v-39.172c0-1.104-.896-2-2-2s-2 .896-2 2v39.172l-3.586-3.586c-.781-.781-2.048-.781-2.828 0-.781.781-.781 2.047 0 2.828l7 7c.391.391.902.586 1.414.586s1.023-.195 1.414-.586l7-7c.781-.781.781-2.047 0-2.828z" />
      </svg>
    );
  }

  return null;
};

export default checkSorting;
