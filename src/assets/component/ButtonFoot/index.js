import React from "react";
import { arrow, circle } from "../../img";
import "./style.scss";

const ButtonFoot = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="btn__foot">
      <img src={arrow} alt="" className="btn__foot-arrow" />
      <img src={circle} alt="" className="btn__foot-circle" />
    </div>
  );
});

export default ButtonFoot;
