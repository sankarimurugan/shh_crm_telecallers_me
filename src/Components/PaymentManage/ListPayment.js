import React, { useEffect, useState } from "react";

import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useNavigate } from "react-router-dom";

const ListPayment = ({ historyData }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  // const [setSelectedStatus] = useState("status");

  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;

  const navigate = useNavigate();

  const handleDropdownClick = (leadId) => {
    setOpenDropdown(openDropdown === leadId ? null : leadId);
  };

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

  // const handleStatusChange = (leadId, status) => {
  //   setSelectedStatus((prevStatuses) => ({
  //     ...prevStatuses,
  //     [leadId]: status, // Update status for the specific lead
  //   }));
  //   setOpenDropdown(null); // Close dropdown after selection
  // };

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = historyData?.slice(indexOfFirstLead, indexOfLastLead);

  const totalPages = Math.ceil(historyData?.length / leadsPerPage);

  console.log("currensdjhjkpl[tLeads", currentLeads);

  useEffect(() => {
    const handleClickOutside = (e) => {};
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
              <th className="py-3 px-2">Transition ID</th>
              <th className="py-3 px-2">Mode Of Payment</th>
              <th className="py-3 px-2">Amount Received</th>
              <th className="py-3 px-2">Date</th>
              {/* <th className="py-3 px-2">Action</th> */}
            </tr>
          </thead>
          <tbody className="">
            {currentLeads?.map((lead, index) => (
              <tr
                onClick={() => {
                  navigate(
                    "/telecallers/payment-updates/payment-list/payment-detalis",
                    { state: { data: lead } }
                  );
                }}
                className="cp"
                style={
                  openDropdown === lead?._id
                    ? {
                        background: "#0b146b59",
                      }
                    : {
                        background: "#ffffff59",
                      }
                }
                key={index}
              >
                <td
                  className="text-center border-0 py-3 px-2 primary3 f5"
                  data-label="Lead ID"
                >
                  {index + 1 + indexOfFirstLead}
                </td>
                <td
                  className="text-center b_order-0 py-3 px-2 primary3 f5"
                  data-label="Transaction ID"
                >
                  {lead?.transitionId || lead?.transaction_id || "-"}
                </td>
                {/* <td
                  className="text-center border-0 py-2 px-2 primary3 f5"
                  data-label="Name"
                >
                  {lead.name}
                </td> */}
                <td
                  className="text-center border-0 py-3 px-2 primary3 f5"
                  data-label="Course"
                >
                  {lead?.mode_of_amount}
                </td>
                <td
                  className="text-center border-0 py-3 px-2 primary3 f5"
                  data-label="Status"
                >
                  {lead?.paid_amount}
                </td>
                <td
                  className="text-center border-0 py-3 px-2 primary3 f5"
                  data-label="Status"
                >
                  {new Date(lead?.createdAt).toISOString().split("T")[0] || "-"}
                </td>
                {/* <td
                  className="text-center border-0 py-3 px-2"
                  data-label="Action"
                >
                  <div className="d-flex ac-jc gap-3">
                    <button
                      onClick={() => {
                        navigate(
                          "/telecallers/payment-updates/payment-list/payment-detalis",
                          { state: { data: lead } }
                        );
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
      {currentLeads?.length > leadsPerPage && (
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

export default ListPayment;
