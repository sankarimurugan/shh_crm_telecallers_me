import React, { useEffect, useRef, useState } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useNavigate } from "react-router-dom";
import Invoice from "../Invoice/Invoice";
import NewInvoice from "../Invoice/NewInvoice";
import html2pdf from "html2pdf.js";

const PaymentUpdatesList = ({ paymentlist }) => {
  const invoiceRef = useRef();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [paymentDatas, setPaymentDatas] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;
  const navigate = useNavigate();

  const handleDropdownClick = (leadId) => {
    setOpenDropdown(openDropdown === leadId ? null : leadId);
  };

  const styles = {
    invoiceWrapper: {
      fontFamily: "'Poppins', sans-serif",
      background: "#fff",
      padding: 20,
      width: "100%",
      boxSizing: "border-box",
    },
    layerFrom: {
      width: "100%",
    },
    footerSection: {
      marginTop: "20%",
      backgroundColor: "#fff",
      padding: "20px 0",
      boxSizing: "border-box",
    },
    line: {
      width: "100%",
      height: 2,
      backgroundColor: "#D0D3DD",
      margin: "10px 0",
    },
    footerText: {
      fontSize: 12,
      textAlign: "center",
      marginTop: 10,
      color: "#333",
    },
    termsHeader: {
      color: "#0ABFAD",
      fontSize: 13,
      fontWeight: "bold",
      marginBottom: 4,
    },
    termsText: {
      width: "50%",
      margin: 0,
      fontSize: 12,
      color: "#000",
    },
    managerName: {
      margin: 0,
      fontSize: 14,
      fontWeight: "bold",
    },
    managerTitle: {
      margin: 0,
      fontSize: 13,
    },
    generatedOn: {
      margin: 0,
      fontSize: 13,
    },
    flexBetween: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8,
      alignItems: "center",
    },
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

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = paymentlist?.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math?.ceil(paymentlist?.length / leadsPerPage);
  const today = new Date().toISOString().split("T")[0];
  console.log("today", today);

  console.log("paymentlist", paymentlist);

  const handlePrint = (data) => {
    setPaymentDatas(data);
    console.log("invoicedata", data);
    setTimeout(() => {
      if (!invoiceRef.current) {
        console.error("Invoice ref not found");
        return;
      }
      const content = invoiceRef.current.innerHTML;
      if (!content.trim()) {
        console.error("Invoice content is empty.");
        return;
      }

      const opt = {
        margin: 0,
        filename: `Invoice_${data?.invoice_no || "NA"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      };

      html2pdf().set(opt).from(invoiceRef.current).save();
    }, 500);
  };

  return (
    <>
      {openDropdown !== null && (
        <button
          onClick={() => handleDropdownClick(null)}
          className="droppopp border-0"
        />
      )}
      <div className="table-container rounded-3 mt-2">
        <table className="responsive-table rounded-3">
          <thead>
            <tr>
              <th className="py-3 px-2">S.No</th>
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Lead Id</th>
              <th className="py-3 px-2">Course</th>
              <th className="py-3 px-2">Course Amount</th>
              <th className="py-3 px-2">Paid Amount</th>
              <th className="py-3 px-2">Balance Amount</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {currentLeads.map((lead, index) => (
              <tr
                key={lead.id}
                onClick={() =>
                  navigate("/telecallers/payment-updates/payment-list", {
                    state: { data: lead },
                  })
                }
                className="cp"
                style={{
                  background:
                    openDropdown === lead.id ? "#0b146b59" : "#ffffff59",
                }}
              >
                <td className="text-center border-0 py-2 px-2 primary3 f5">
                  {index + 1 + indexOfFirstLead}
                </td>
                <td className="text-center border-0 py-2 px-2 primary3 f5">
                  {lead?.lead_details?.name}
                </td>
                <td className="text-center border-0 py-2 px-2 primary3 f5">
                  {lead?.lead_details?.lead_id}
                </td>
                <td className="text-center border-0 py-2 px-2 primary3 f5">
                  {lead?.lead_details?.interested_course?.addcourse}
                </td>
                <td className="text-center border-0 py-2 px-2 primary3 f5">
                  {lead?.lead_details?.interested_course?.amount}
                </td>
                <td className="text-center border-0 py-2 px-2 primary3 f5">
                  {lead?.total_paid_amount}
                </td>
                <td className="text-center border-0 py-2 px-2 primary3 f5">
                  {lead?.total_balance_amount}
                </td>
                <td className="text-center border-0 py-2 px-2 primary3 f5">
                  <div className="d-flex ac-jc">
                    <div
                      className={`${
                        lead?.total_balance_amount > 0
                          ? "bg-ltorange"
                          : "bg-ltgreen"
                      } table-drop border-0 d-flex ac-jc px-3 rounded-5 primary3`}
                    >
                      <p className="mb-0">
                        {lead?.total_balance_amount > 0
                          ? "Partially Paid"
                          : "Fully Paid"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-center border-0 py-3 px-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrint(lead);
                    }}
                    className="border-0 bg-red white rounded-5 action-box2"
                  >
                    <FileDownloadOutlinedIcon className="fs-xxl-30" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {paymentlist.length > leadsPerPage && (
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

      {/* Render invoice preview for printing (hidden in UI, used for printing) */}
      {paymentDatas && (
        <div style={{ display: "none" }}>
          <div ref={invoiceRef} style={styles.invoiceWrapper}>
            {/* Your invoice content here */}
            <NewInvoice paymentData={paymentDatas} />
            {/* Footer Section */}
            <div style={styles.footerSection}>
              <p style={styles.termsHeader}>Terms & Conditions:</p>
              <div style={styles.flexBetween}>
                <p style={styles.termsText}>
                  A finance charge of 1.5% will be made on unpaid balances after
                  30 days.
                </p>
                <div style={{ textAlign: "left" }}>
                  <p style={styles.managerName}>{paymentDatas?.Manager_Name}</p>
                  <p style={styles.managerTitle}>Manager</p>
                </div>
              </div>
              <p style={styles.generatedOn}>
                Generated on: <strong>{today}</strong>
              </p>
              <div style={styles.line}></div>
              <div style={styles.footerText}>
                Invoice was created on a computer and is valid without the
                signature and seal.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentUpdatesList;
