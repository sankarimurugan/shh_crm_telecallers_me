import React from "react";
import { useNavigate } from "react-router-dom";

const LeadNotAssign = ({ poppupHandle }) => {
  const navigate = useNavigate();
  return (
    <div className="logpoppup d-flex ac-jc">
      <button className="poppup-layer border-0" />
      <div className="logout-cont w-md-40 w-80  rounded-3 p-md-3 p-4 d-flex gap-4 ac-jc flex-column">
        <p className="black f3 text-center fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13 textani">
          This Lead Assign To Another Telecaller
        </p>
        <div className="d-flex ac-jc gap-md-4 gap-2 w-100">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="inner-btn py-2 py-md-2 yes w-md-40 wi-100 border-0 bg-primarys white rounded-3 textani f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadNotAssign;
