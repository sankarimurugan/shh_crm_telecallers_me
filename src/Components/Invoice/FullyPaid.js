import React from "react";

const FullyPaid = ({ invoiceRef, payment }) => {
  const method = payment?.payment?.method;

  const studentdata = payment?.data;

  console.log("paymentmethod", payment, method);

  return (
    <div className="invoicecont d-none">
      {/* <div className="invoicecont"> */}
      <div ref={invoiceRef} className="invoice-container">
        <div
          style={{
            background:
              payment?.payment?.status === "Partially Paid"
                ? "#670707"
                : "green",
            color: "#fff",
            fontWeight: 800,
            boxShadow: " 0 0 5px #cbb4b4",
            textAlign: "center",
          }}
          className={`${
            payment?.payment?.status === "Partially Paid"
              ? "bgssred"
              : "bgsgreen"
          } invoice-posit d-flex ac-jc`}
        >
          <p className="mb-0">{payment?.payment?.status}</p>
        </div>
        <h2 style={{ textAlign: "center" }}>Payment Invoice</h2>
        {/* <p>
          <strong>Status:</strong> {payment?.status}
        </p> */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            width: "80%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
              flexDirection: "column",
              marginBottom: "2rem",
            }}
          >
            <p
              style={{
                margin: "5px",
                fontSize: "10px",
              }}
            >
              <strong>Billed To:</strong>
            </p>
            <p
              style={{
                margin: "5px",
                fontSize: "10px",
              }}
            >
              <strong>{studentdata?.name}</strong>
            </p>
            <p
              style={{
                margin: "5px",
                fontSize: "10px",
              }}
            >
              <strong>{studentdata?.address}</strong>
            </p>
            <p
              style={{
                margin: "5px",
                fontSize: "10px",
              }}
            >
              <strong
                style={{
                  textAlign: "left",
                }}
              >
                Email: {studentdata?.email}
              </strong>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              flexDirection: "column",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-end",
                flexDirection: "column",
                marginBottom: "2rem",
              }}
            >
              <p
                style={{
                  margin: "5px",
                  fontSize: "10px",
                }}
              >
                <strong>Total Amount:</strong> ₹{payment?.payment?.full_amount}
              </p>
              <p
                style={{
                  margin: "5px",
                  fontSize: "10px",
                }}
              >
                <strong>Paid Amount:</strong> ₹{payment?.payment?.paid_amount}
              </p>
              <p
                style={{
                  margin: "5px",
                  fontSize: "10px",
                }}
              >
                <strong>Balance:</strong> ₹{payment?.payment?.balance}
              </p>
            </div>
          </div>
        </div>
        <h3 className="mb-3 black">Payment Breakdown:</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
            border: "1px solid #ddd",
          }}
          cellPadding="10"
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ border: "1px solid #ddd", textAlign: "left" }}>
                ID
              </th>
              <th style={{ border: "1px solid #ddd", textAlign: "left" }}>
                Method
              </th>
              <th style={{ border: "1px solid #ddd", textAlign: "right" }}>
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {method?.map((pay, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", textAlign: "left" }}>
                  {pay?.id || "N/A"}
                </td>
                <td style={{ border: "1px solid #ddd", textAlign: "left" }}>
                  {pay?.method || "N/A"}
                </td>
                <td style={{ border: "1px solid #ddd", textAlign: "right" }}>
                  ₹{pay?.amount || 0}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ backgroundColor: "#fff", fontWeight: "bold" }}>
              <td
                colSpan="2"
                style={{
                  border: "1px solid #ddd",
                  textAlign: "right",
                  padding: "10px",
                }}
              >
                Total
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  textAlign: "right",
                  padding: "10px",
                }}
              >
                ₹{payment?.payment?.paid_amount}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default FullyPaid;
