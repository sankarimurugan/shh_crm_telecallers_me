import React from "react";
import { springicon } from "../../assets/images";

const LeadReport = ({ dashLeadData }) => {
  console.log("dashLeadData", dashLeadData);

  return (
    <div className="leed-report bg-transparent">
      <div className="springcont-top ">
        <img src={springicon} alt=""/>
      </div>
      <div className="springcont-bottum">
        <img src={springicon} alt="" />
      </div>
      <div className="leedlay rounded-4 p-md-4">
        <p className="mb-2 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
          Today Leads Report
        </p>
        <div className="in-box w-100 bg-white p-3 rounded-4 gap-3 d-flex flex-column">
          <div className="d-flex ac-jc gap-3">
            <div className="min-box1 w-100 rounded-3 p-3">
              <p className="f6 merun fs-xxl-17 fs-xl-17 fs-lg-15 fs-sm-14 fs-xs-13 textani mb-0">
                Pending
              </p>
              <p className="f6 merun fs-xxl-17 fs-xl-17 fs-lg-15 fs-sm-14 fs-xs-13 textani mb-0">
                Leads
              </p>
              <div>
                <p className="f8 merun fs-xxl-40 fs-xl-17 fs-lg-15 fs-sm-14 fs-xs-13 textani mb-0 text-end">
                  {dashLeadData?.Tdypending}
                </p>
              </div>
            </div>
            <div className="min-box2 w-100 rounded-3 p-3">
              <p className="f6 primary3 fs-xxl-17 fs-xl-17 fs-lg-15 fs-sm-14 fs-xs-13 textani mb-0">
                Converted
              </p>
              <p className="f6 primary3 fs-xxl-17 fs-xl-17 fs-lg-15 fs-sm-14 fs-xs-13 textani mb-0">
                Leads
              </p>
              <div>
                <p className="f8 primary3 fs-xxl-40 fs-xl-17 fs-lg-15 fs-sm-14 fs-xs-13 textani mb-0 text-end">
                  {dashLeadData?.Tdyconverted}
                </p>
              </div>
            </div>
          </div>
          <div className="min-box3 w-100 rounded-3 p-3">
            <p className="f6 dark_green fs-xxl-26 fs-xl-25 fs-lg-25 fs-sm-20 fs-xs-20 textani mb-0">
              Leads
            </p>
            <p className="f6 dark_green fs-xxl-26 fs-xl-25 fs-lg-25 fs-sm-20 fs-xs-20 textani mb-0">
              Attended
            </p>
            <div>
              <p className="f8 dark_green fs-xxl-40 fs-xl-17 fs-lg-15 fs-sm-14 fs-xs-13 textani mb-0 text-end">
                {dashLeadData?.updatesLeads}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadReport;
