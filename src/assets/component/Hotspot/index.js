import React from "react";
import { hotspot } from "../../img";

function Hotspot(props) {
  return (
    <div className="btn__foot">
      <img src={hotspot} alt="" className="btn__foot-hotspot" />
    </div>
  );
}

export default Hotspot;
