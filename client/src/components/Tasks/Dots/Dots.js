import React, { useState } from "react";
import { generateYearArray } from "../../../utils/utils";

function Dots() {
  return (
    <div className="dots-wrapper flex">
      {generateYearArray().map((e) => (
        <div className="rect" id={`${e}`}></div>
      ))}
    </div>
  );
}

export default Dots;
