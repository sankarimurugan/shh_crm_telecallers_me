import React, { useEffect, useRef, useState } from "react";
import { droparrow } from "../../assets/images";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { leadliststatus, leadsList, leadstatus } from "../../Data/DummyJson";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";

const CloseFollowLeadeList = ({ data }) => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;
  const dropdownRef = useRef(null);

  const handleDropdownClick = (leadId) => {
    setOpenDropdown(openDropdown === leadId ? null : leadId);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".table-drop")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleStatusChange = (leadId, status) => {
    setSelectedStatus((prevStatuses) => ({
      ...prevStatuses,
      [leadId]: status,
    }));
    setOpenDropdown(null); // Close dropdown after selection
  };

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = data.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(data.length / leadsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "Interested":
        return "bg-intrest"; // Green
      case "Enrollment":
        return "bg-enroll"; // Green
      case "Not interested":
        return "bg-not "; // Red
      case "Not responsing":
        return "bg-not"; // Yellow
      case "Not reachable":
        return "bg-notintrest"; // Grey
      case "Switched Off":
        return "bg-switchoff"; // Black
      case "Follow Ups":
        return "bg-follow "; // Blue
      case "Close Follow Ups":
        return "bg-closefollow"; // Light blue
      case "Discontinue":
        return "bg-disconnected"; // Light Grey
      default:
        return "bg-enquiry"; // Default color
    }
  };

  return (
    <>
      {openDropdown !== null && (
        <button
          onClick={() => {
            handleDropdownClick(null);
          }}
          className="droppopp border-0 "
        />
      )}
      <div className="table-container rounded-3 mt-2">
        <table className="responsive-table rounded-3">
          <thead className="">
            <tr className="">
              <th className="py-3 px-2">S.No</th>
              <th className="py-3 px-2">Lead ID</th>
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Email ID</th>
              <th className="py-3 px-2">Walk in</th>
              <th className="py-3 px-2">Passing Year</th>
              <th className="py-3 px-2">Contact</th>
              <th className="py-3 px-2">Source</th>
              <th className="py-3 px-2">Course</th>
              <th className="py-3 px-2">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {currentLeads.map((lead, index) => (
              <tr
                style={
                  openDropdown === lead._id
                    ? {
                        background: "#0b146b59",
                      }
                    : {
                        background: "#ffffff59",
                      }
                }
                key={index}
                onClick={() => {
                  navigate("/telecallers/close_followup/details", {
                    state: { type: "edit", data: lead },
                  });
                }}
                className="cp"
              >
                <td
                  data-label="S.No"
                  className="text-center py-2 px-2 primary3 f5"
                >
                  {indexOfFirstLead + index + 1}
                </td>
                <td
                  data-label="Lead ID"
                  className="text-center py-2 px-2 primary3 f5"
                >
                  {lead?.lead_id || "-"}
                </td>
                <td
                  data-label="Name"
                  className="text-center py-2 px-2 primary3 f5"
                >
                  {lead?.name || "-"}
                </td>
                <td
                  data-label="Email ID"
                  className="text-center py-2 px-2 primary3 f5"
                >
                  {lead?.email || "-"}
                </td>
                <td
                  data-label="Walk in"
                  className="text-center py-2 px-2 primary3 f5"
                >
                  {new Date(lead?.createdAt).toISOString().split("T")[0] || "-"}
                </td>
                <td
                  data-label="Passing Year"
                  className="text-center py-2 px-2 primary3 f5"
                >
                  {lead?.passedout || "-"}
                </td>
                <td
                  data-label="Contact"
                  className="text-center py-2 px-2 primary3 f5"
                >
                  {lead?.phonenumber || "-"}
                </td>
                <td
                  data-label="Source"
                  className="text-center py-2 px-2 primary3 f5"
                >
                  {lead?.source || "-"}
                </td>
                <td
                  data-label="Course"
                  className="text-center py-2 px-2 primary3 f5"
                >
                  {lead?.interested_course || "-"}
                </td>
                <td
                  data-label="Status"
                  className="text-center py-2 px-2 primary3 f5"
                >
                  <div className="w-100 ac-jc d-flex">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownClick(lead._id);
                      }}
                      // className={`${
                      //   selectedStatus[lead._id] && lead?.status == "Enrollment"
                      //     ? "bg-success"
                      //     : "bg-red"
                      // } table-drop border-0 d-flex ac-jb px-3 rounded-5`}
                      className={`table-drop border-0 d-flex ac-jb px-3 rounded-5 ${getStatusColor(
                        selectedStatus[lead?._id] || lead?.status
                      )}`}
                    >
                      <p className="mb-0 ">
                        {(selectedStatus[lead?._id] || lead?.status)?.trim()}
                        {/* {selectedStatus[lead._id] || "Enrollment"} */}
                      </p>
                      <div className="drop-img d-flex ac-jc">
                        {/* <img src={droparrow} /> */}
                        <ArrowDropDownIcon className="fs-xxl-35 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13" />
                      </div>
                      {openDropdown === lead._id && (
                        <div className="dropdrowncont rounded-2">
                          {leadliststatus?.map((item) => {
                            return (
                              <button
                                onClick={() =>
                                  handleStatusChange(lead?._id, item?.name)
                                }
                                className="list w-100 border-0 py-2 bg-white"
                              >
                                <p className="mb-0">{item?.name}</p>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </button>
                  </div>
                </td>
                {/* <td
                  className="text-center border-0 py-3 px-2"
                  data-label="Action"
                >
                  <div className="d-flex ac-jc gap-3">
                    <button
                      onClick={() => {
                        navigate("/telecallers/close_followup/details", {
                          state: { type: "edit" },
                        });
                      }}
                      className="border-0 bg-primary3 white rounded-2 action-box"
                    >
                      <ModeEditOutlinedIcon className="fs-xxl-20" />
                    </button>
                    <button
                      onClick={() => {
                        navigate("/telecallers/close_followup/details", {
                          state: { type: "view" },
                        });
                      }}
                      className="border-0 bg-primary3 white rounded-2 action-box"
                    >
                      <RemoveRedEyeOutlinedIcon className="fs-xxl-20" />
                    </button>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data?.length > leadsPerPage && (
        <div className="pagination d-flex justify-content-center mt-3">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1 ? "opacity-25" : "opacity-100"
            } px-3 py-1 mx-1 border-0 rounded white bg-primary3`}
          >
            <ArrowBackIosNewOutlinedIcon />
          </button>
          <span className="px-3 py-1 mx-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`${
              currentPage == totalPages ? "opacity-25" : "opacity-100"
            } px-3 py-1 mx-1 border-0 rounded white bg-primary3`}
          >
            <ArrowForwardIosOutlinedIcon />
          </button>
        </div>
      )}
    </>
  );
};

export default CloseFollowLeadeList;
