import React, { useEffect, useState } from "react";
import { refileicon } from "../assets/images";
import LeadeList from "../Components/LeadManage/LeadeList";
import { useLocation, useNavigate } from "react-router-dom";
import LeedsTab from "../Components/Tab/LeedsTab";
import FollowupScreen from "./FollowupScreen";
import FollowLeadeList from "../Components/Followup/FollowLeadeList";
import CloseFollowLeadeList from "../Components/CloseFollowup/CloseFollowLeadeList";
import EnrollementLeadeList from "../Components/Enrollement/EnrollementLeadeList";
import PageLoad from "../Components/common/Loading/PageLoad";
import { leadsList } from "../Data/DummyJson";
import { useLazyLead_listQuery } from "../Data/Api/api";
import EmptyComp from "../Components/common/Empty/EmptyComp";
import useUser from "../Data/Local/userDetail";
import { FaSearch } from "react-icons/fa";
import ExportPoppup from "../Components/Poppup/ExportPoppup";
import ImportPoppup from "../Components/Poppup/ImportPoppup";

const LeadsListScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tab = location?.state?.tab;
  const [tabToggle, setTabToggle] = useState({});
  const [loading, setLoadin] = useState(true);
  const [leadData, setLeadData] = useState([]);
  const [exportImp, setExportImp] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { user, setUser } = useUser();
  console.log("telssuser", user);

  const telID = user?.telecaller?.id;

  // Api
  const [leadGetApi] = useLazyLead_listQuery();

  const toggleFun = (item) => {
    setTabToggle(item);
  };

  const filteredLeads = leadData?.filter((lead) => {
    const leadString = [
      lead?.lead_id,
      lead?.name,
      lead?.email,
      lead?.createdAt && new Date(lead?.createdAt).toISOString().split("T")[0],
      lead?.phonenumber,
      lead?.interested_course?.addcourse,
      lead?.status,
    ]
      .join(" ")
      .toLowerCase();

    return leadString.includes(searchTerm);
  });

  const dataGetFun = () => {
    setLoadin(true);
    // leadGetApi(telID)
    leadGetApi()
      .unwrap()
      .then((res) => {
        console.log("Myres", res);
        setLeadData(Array.isArray(res?.data) ? [...res.data].reverse() : []);
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoadin(false);
      });
  };

  useEffect(() => {
    if (tab == "Enrollment") {
      setTabToggle({
        id: 4,
        name: "Enrollment",
      });
    } else if (tab == "Follow-ups") {
      setTabToggle({
        id: 2,
        name: "Follow-ups",
      });
    } else {
      setTabToggle({
        id: 1,
        name: "All",
      });
    }
    dataGetFun();
  }, [tab]);

  const allleads = leadData.filter((lead) => lead.status !== "Enquiry");
  const followledLeads = leadData.filter(
    (lead) => lead.status === "Follow Ups"
  );
  const closefollowledLeads = leadData.filter(
    (lead) => lead.status === "Close Follow Ups"
  );
  const enrolledLeads = leadData.filter((lead) => lead.status === "Enrollment");

  const tabConfigs = [
    {
      name: "All",
      data: filteredLeads,
      emptyText: "Leads not found",
    },
    {
      name: "Follow-ups",
      data: filteredLeads.filter((lead) => lead.status === "Follow Ups"),
      emptyText: "Follow leads not found",
    },
    {
      name: "Close Follow ups",
      data: filteredLeads.filter((lead) => lead.status === "Close Follow Ups"),
      emptyText: "Close Follow up leads not found",
    },
    {
      name: "Enrollment",
      data: filteredLeads.filter((lead) => lead.status === "Enrollment"),
      emptyText: "Enrollment leads not found",
    },
  ];

  const exportFun = (type) => {
    if (type === "yes") {
      setLoadin(true);
      setExportImp(null);
      setTimeout(() => {
        setLoadin(false);
      }, 1000);
    } else if (type === "import") {
    } else {
      setExportImp(null);
    }
  };

  const formatLeadsForCSV = (leads) =>
    leads.map((lead) => ({
      Lead_ID: lead?.lead_id || "-",
      Name: lead?.name || "-",
      Email: lead?.email || "-",
      Phone: lead?.phonenumber || "-",
      Address: lead?.address || "-",
      Source: lead?.source || "-",
      College: lead?.college_name || "-",
      Degree: lead?.degree || "-",
      Course: lead?.interested_course?.addcourse || "-",
      Course_Amount: lead?.interested_course?.amount || "-",
      Duration: lead?.interested_course?.duration || "-",
      Paid_Amount: lead?.paid_amount ?? 0,
      Balance_Amount: lead?.balance_amount ?? 0,
      Fully_Paid: lead?.fullyPaid ? "Yes" : "No",
      Status: lead?.status || "-",
      Created_At: new Date(lead?.createdAt).toLocaleDateString("en-IN"),
      Assign_To:
        lead?.assignedto?.staff_id ||
        lead?.assignedto?.phone ||
        lead?.assignedto?.email ||
        lead?.assignedto?._id,
    }));

  const today = new Date().toISOString().split("T")[0];

  const exportToCSV = (data, filename = `leads_${today}.csv`) => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = Object.keys(data[0]);
    const csvRows = [];

    // Add header
    csvRows.push(headers.join(","));

    // Add data rows
    data.forEach((row) => {
      const values = headers.map(
        (key) => `"${(row[key] ?? "").toString().replace(/"/g, '""')}"`
      );
      csvRows.push(values.join(","));
    });

    // Create blob and download
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  console.log("tabConfigs", tabConfigs?.data);

  return (
    <div className="lead-head pt-1">
      {loading && <PageLoad />}
      {exportImp == "export" && <ExportPoppup poppupHandle={exportFun} />}
      {exportImp == "import" && <ImportPoppup poppupHandle={exportFun} />}
      {!loading && (
        <div className="lead-h d-flex ac-jb">
          {leadData?.length > 0 && (
            <LeedsTab tabToggle={tabToggle} toggleFun={toggleFun} />
          )}
          <div className="d-flex ac-je w-100 gap-3 ">
            {leadData?.length > 0 && (
              <div className="search-container">
                <div className="mb-0 white d-flex ac-jc f4 rounded-3 border-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani">
                  <input
                    type="text"
                    className="form-control me-2 search-input"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value.toLowerCase())
                    }
                  />
                </div>
              </div>
            )}

            {leadData?.length > 0 && (
              <button
                onClick={() =>
                  exportToCSV(formatLeadsForCSV(leadData), `leads_${today}.csv`)
                }
                className="refil-text mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani"
              >
                Export
              </button>
            )}
            {/* <button
              onClick={() => {
                navigate("/telecallers/leads/add", {
                  state: { type: "add" },
                });
              }}
              className="refil-text mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani"
            >
              Add Lead
            </button> */}
            <div className="position-relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="refil-text mb-0 white d-flex ac-jc bg-primary3 f4 rounded-3 border-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani"
              >
                Add Lead
              </button>

              {isOpen && (
                <ul
                  className="dropdown-menu show position-absolute mt-1"
                  style={{ display: "block" }}
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setIsOpen(false);
                        setExportImp("import");
                      }}
                    >
                      Import CSV File
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setIsOpen(false);
                        navigate("/telecallers/leads/add", {
                          state: { type: "add" },
                        });
                      }}
                    >
                      Add New Lead
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {tabConfigs.map((tab) => {
        if (tabToggle?.name !== tab?.name) return null;
        return tab.data.length > 0 ? (
          <LeadeList
            key={tab?.name}
            data={tab?.data}
            setLoadin={setLoadin}
            dataGetFun={dataGetFun}
          />
        ) : (
          <EmptyComp key={tab?.name} text={tab?.emptyText} />
        );
      })}

      {/* {!loading && (
        <div className="pt-4">
          {tabToggle?.name &&
            (filteredLeads.length > 0 ? (
              <LeadeList
                data={filteredLeads}
                setLoadin={setLoadin}
                dataGetFun={dataGetFun}
              />
            ) : (
              <EmptyComp text="No leads found" />
            ))}
        </div>
      )} */}
    </div>
  );
};

export default LeadsListScreen;
