import React from "react";
import { emty_comp } from "../../../assets/images";

const EmptyComp = ({ text }) => {
  return (
    <div
      style={{
        height: "70vh",
      }}
      className="w-100 d-flex ac-jc flex-column"
    >
      <div className="img_cont d-flex ac-jc">
        <img src={emty_comp} alt="" />
      </div>
      <p className="mb-0 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
        {text}
      </p>
    </div>
  );
};

export default EmptyComp;
