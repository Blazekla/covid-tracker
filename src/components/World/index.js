import React, { useState, useEffect } from "react";
import axios from "axios";
import WorldTable from "./worldTable";
import { DateTime } from "luxon";

function WorldPage() {
  return (
    <div className="text-white">
      <div className="text-white">Page for the Worldometer data</div>
      <WorldTable />
    </div>
  );
}

export default WorldPage;
