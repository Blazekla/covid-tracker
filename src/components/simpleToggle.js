import React, { useState } from "react";

function SimpleToggle() {
  const [isOn, setIsOn] = useState(false);
  return (
    <div>
      <span
        role="checkbox"
        aria-checked={isOn}
        tabIndex="0"
        onClick={() => setIsOn(!isOn)}
        className={`${
          isOn ? "bg-indigo-600" : "bg-gray-200"
        } relative inline-block flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline`}
      >
        <span
          aria-hidden="true"
          className={`${
            isOn ? "translate-x-5" : "translate-x-0"
          } inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200`}
        ></span>
      </span>
    </div>
  );
}

export default SimpleToggle;
