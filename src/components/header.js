import React from "react";

function Header({ children }) {
  return (
    <header className="flex justify-between items-center bg-primary-main  p-4 sm:p-8">
      {children}
    </header>
  );
}

export default Header;
