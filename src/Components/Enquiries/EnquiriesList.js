import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ModeEditOutlined as EditIcon,
  RemoveRedEyeOutlined as ViewIcon,
  ArrowBackIosNewOutlined as PrevIcon,
  ArrowForwardIosOutlined as NextIcon,
  ArrowDropDown as DropDownIcon,
} from "@mui/icons-material";
import { leadliststatus, leadstatus } from "../../Data/DummyJson";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useLeadeditMutation } from "../../Data/Api/api";

const EnquiriesList = ({ data, leadListFun, setLoading }) => {
  console.log("data", data);
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef(null);

  const leadsPerPage = 5;
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = data?.slice(indexOfFirstLead, indexOfLastLead);

  const totalPages = Math?.ceil(data?.length / leadsPerPage);

  const [leadeditApi] = useLeadeditMutation();

  const handleDropdownClick = (leadId) => {
    setOpenDropdown((prev) => (prev === leadId ? null : leadId));
  };

  const handleStatusChange = (leadId, status) => {
    const payload = {
      status: status,
    };
    const id = leadId;
    setLoading(true);
    leadeditApi({ payload, id })
      .unwrap()
      .then((res) => {
        console.log("res", res);
        setSelectedStatus((prev) => ({
          ...prev,
          [leadId]: status,
        }));
        setOpenDropdown(null);
        leadListFun();
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Interested":
        return "bg-intrest";
      case "Enrollment":
        return "bg-enroll";
      case "Not interested":
      case "Not responsing":
        return "bg-not";
      case "Not reachable":
        return "bg-notintrest";
      case "Switched Off":
        return "bg-switchoff";
      case "Follow Ups":
        return "bg-follow";
      case "Close Follow Ups":
        return "bg-closefollow";
      case "Discontinue":
        return "bg-disconnected";
      default:
        return "bg-enquiry";
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef?.current && !dropdownRef?.current.contains(e?.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {openDropdown !== null && (
        <button
          onClick={() => setOpenDropdown(null)}
          className="droppopp border-0"
        />
      )}

      <div className="table-container rounded-3 mt-2">
        <table className="responsive-table rounded-3">
          <thead>
            <tr>
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
          <tbody>
            {currentLeads.map((lead, index) => {
              const leadStatus = selectedStatus[lead?._id] || lead?.status;
              return (
                <tr
                  key={lead?._id}
                  className="cp"
                  style={{
                    background:
                      openDropdown === lead?._id ? "#0b146b59" : "#ffffff59",
                  }}
                  onClick={() =>
                    navigate("/telecallers/enquiries/details", {
                      state: { type: "edit", data: lead },
                    })
                  }
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
                    {new Date(lead?.createdAt).toISOString().split("T")[0] ||
                      "-"}
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
                    {lead?.interested_course?.addcourse || "-"}
                  </td>
                  <td
                    data-label="Status"
                    className="text-center py-2 px-2 primary3 f5"
                  >
                    <div className="w-100 ac-jc d-flex" ref={dropdownRef}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDropdownClick(lead?._id);
                        }}
                        className={`table-drop border-0 d-flex ac-jb px-3 rounded-5 ${getStatusColor(
                          leadStatus
                        )}`}
                      >
                        <p className="mb-0">{leadStatus}</p>
                        <div className="drop-img d-flex ac-jc">
                          <DropDownIcon className="fs-xxl-35 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13" />
                        </div>

                        {openDropdown === lead?._id && (
                          <div className="dropdrowncont rounded-2">
                            {leadliststatus?.map((item) => (
                              <button
                                key={item?.name}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(lead?._id, item?.name);
                                }}
                                className="list w-100 border-0 py-2 bg-white"
                              >
                                <p className="mb-0">{item?.name}</p>
                              </button>
                            ))}
                          </div>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {data.length > leadsPerPage && (
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
              currentPage === totalPages ? "opacity-25" : "opacity-100"
            } px-3 py-1 mx-1 border-0 rounded white bg-primary3`}
          >
            <ArrowForwardIosOutlinedIcon />
          </button>
        </div>
      )}
    </>
  );
};

export default EnquiriesList;
