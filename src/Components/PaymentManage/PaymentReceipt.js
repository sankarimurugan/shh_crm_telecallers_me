import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentReceipt = ({ paymentData }) => {
  console.log("paymentData", paymentData);

  const time = new Date(paymentData?.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="bg-white w-50 shadow rounded-4 p-3 mt-4">
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
        cellPadding="10"
        className=""
      >
        <tbody>
          <tr>
            <td
              style={{ border: "0", fontWeight: "bold" }}
              className="fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 textani f6 black"
            >
              Name
            </td>
            <td style={{ border: "0" }}>
              <strong>:</strong>
            </td>
            <td
              style={{ border: "0" }}
              className="fs-xxl-16 fs-xl-16 fs-lg-16 fs-sm-15 fs-xs-13 textani f3 black"
            >
              {paymentData?.name}
            </td>
          </tr>
          <tr>
            <td
              className="fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 textani f6 black"
              style={{ border: "0", fontWeight: "bold" }}
            >
              Mobile Number
            </td>
            <td style={{ border: "0" }}>
              <strong>:</strong>
            </td>
            <td
              className="fs-xxl-16 fs-xl-16 fs-lg-16 fs-sm-15 fs-xs-13 textani f3 black"
              style={{ border: "0" }}
            >
              +91 {paymentData?.phonenumber}
            </td>
          </tr>
          <tr>
            <td
              className="fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 textani f6 black"
              style={{ border: "0", fontWeight: "bold" }}
            >
              Email
            </td>
            <td style={{ border: "0" }}>
              <strong>:</strong>
            </td>
            <td
              className="fs-xxl-16 fs-xl-16 fs-lg-16 fs-sm-15 fs-xs-13 textani f3 black"
              style={{ border: "0" }}
            >
              {paymentData?.email}
            </td>
          </tr>
          <tr>
            <td
              className="fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 textani f6 black"
              style={{ border: "0", fontWeight: "bold" }}
            >
              Amount Paid
            </td>
            <td style={{ border: "0" }}>
              <strong>:</strong>
            </td>
            <td
              className="fs-xxl-16 fs-xl-16 fs-lg-16 fs-sm-15 fs-xs-13 textani f3 black"
              style={{ border: "0" }}
            >
              ₹{paymentData?.paid_amount}
            </td>
          </tr>
          <tr>
            <td
              className="fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 textani f6 black"
              style={{ border: "0", fontWeight: "bold" }}
            >
              Mode of Payment
            </td>
            <td style={{ border: "0" }}>
              <strong>:</strong>
            </td>
            <td
              className="fs-xxl-16 fs-xl-16 fs-lg-16 fs-sm-15 fs-xs-13 textani f3 black"
              style={{ border: "0" }}
            >
              {paymentData?.mode_of_amount}
            </td>
          </tr>
          {paymentData?.transaction_id && (
            <tr>
              <td
                className="fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 textani f6 black"
                style={{ border: "0", fontWeight: "bold" }}
              >
                Transaction ID
              </td>
              <td style={{ border: "0" }}>
                <strong>:</strong>
              </td>
              <td
                className="fs-xxl-16 fs-xl-16 fs-lg-16 fs-sm-15 fs-xs-13 textani f3 black"
                style={{ border: "0" }}
              >
                {paymentData?.transaction_id}
              </td>
            </tr>
          )}
          <tr>
            <td
              className="fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 textani f6 black"
              style={{ border: "0", fontWeight: "bold" }}
            >
              Date
            </td>
            <td style={{ border: "0" }}>
              <strong>:</strong>
            </td>
            <td
              className="fs-xxl-16 fs-xl-16 fs-lg-16 fs-sm-15 fs-xs-13 textani f3 black"
              style={{ border: "0" }}
            >
              {new Date(paymentData?.createdAt).toISOString().split("T")[0]}
            </td>
          </tr>
          {time && (
            <tr>
              <td
                className="fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 textani f6 black"
                style={{ border: "0", fontWeight: "bold" }}
              >
                Time
              </td>
              <td style={{ border: "0" }}>
                <strong>:</strong>
              </td>
              <td
                className="fs-xxl-16 fs-xl-16 fs-lg-16 fs-sm-15 fs-xs-13 textani f3 black"
                style={{ border: "0" }}
              >
                {time}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* <button
        className="btn btn-success w-100  "
        style={{ backgroundColor: "#00225D", color: "white" }}
      >
        Print
      </button> */}
    </div>
  );
};

export default PaymentReceipt;
