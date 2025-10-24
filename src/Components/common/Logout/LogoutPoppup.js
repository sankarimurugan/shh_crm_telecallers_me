import React from "react";
import { logout_icon_1 } from "../../../assets/images";

const LogoutPoppup = ({ poppupHandle }) => {
  return (
    <div className="logpoppup d-flex ac-jc">
      <button
        onClick={() => {
          poppupHandle();
        }}
        className="poppup-layer border-0"
      />

      <div className="logout-cont w-md-40 w-80  rounded-3 p-md-3 p-4 d-flex ac-jc flex-column gap-2">
        <div className="logoutimg">
          <img src={logout_icon_1} />
        </div>
        <p className="red f8 text-center mb-0 fs-xxl-25 fs-xl-25 fs-lg-23 fs-sm-20 fs-xs-19 textani">
          Are You Sure?
        </p>
        <p className="black f3 text-cente  fs-xxl-18 fs-xl-18 fs-lg-16 fs-sm-15 fs-xs-14 textani">
          You are Leaving the Site
        </p>
        <div className="d-flex ac-jc gap-md-4 gap-2 w-100">
          <button
            onClick={() => {
              poppupHandle("yes");
            }}
            className="inner-btn py-2 py-md-2 yes w-md-40 wi-100 border-0 bg-green white rounded-3 textani f6 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
          >
            Yes
          </button>
          <button
            onClick={() => {
              poppupHandle("no");
            }}
            className="inner-btn no py-2 py-md-2 w-md-40 wi-100 inner-btn yes white rounded-3 border-0 textani f6 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13 bg-red"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPoppup;
