import React from "react";
import { refileicon } from "../assets/images";
import { useNavigate } from "react-router-dom";
import CloseFollowLeadeList from "../Components/CloseFollowup/CloseFollowLeadeList";

const CloseFollowupScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="lead-head">
      <div className="lead-h d-flex ac-jb">
        <p className=" mb-0 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
          Close Follow Ups Management
        </p>
        <div className="d-flex ac-jb gap-3">
          {/* <button
            onClick={() => {
              navigate("/telecallers/leads/details", { state: { type: "add" } });
            }}
            className="refil-text mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani"
          >
            + Add Lead
          </button> */}
          <button className="refil-box d-flex ac-jc bg-primary3 rounded-3 border-0">
            <img src={refileicon} />
          </button>
        </div>
      </div>
      <CloseFollowLeadeList />
    </div>
  );
};

export default CloseFollowupScreen;
