import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <div className="container mx-auto px-2 sm:px-4 text-center mt-16">
        <div className="text-white">
          Page not found... Go back to the{" "}
          <Link to="/" className="underline">
            Main Page
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;
