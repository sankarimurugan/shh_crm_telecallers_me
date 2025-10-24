import React from "react";
import { round_logo } from "../../assets/images";
import "../../assets/css/invoice.css";

const NewInvoice = ({ invoiceRef, paymentData }) => {
  console.log("paymentData", paymentData);

  const paymentlist = paymentData?.payment_history;
  console.log("paymentlpaymentlistist", paymentlist, paymentData);

  return (
    <div
      ref={invoiceRef}
      className="h-100 w-100 bg-white d-flex ac-jb flex-column"
    >
      <div className="w-100 pb-5 bg-white">
        <div
          style={{
            backgroundColor: "#163d5c",
            color: "#fff",
          }}
          className="px-5 py-4 w-100"
        >
          <header
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
            className="invoice-header mb-4 position-relative"
          >
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
              className="invoice_logo"
            >
              <img src={round_logo} />
            </div>
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              className="d-flex flex-column"
            >
              <p className="f6 text-center fs-xxl-25 fs-xl-25 fs-lg-23 fs-sm-20 fs-xs-15 textani mb-0">
                I N V O I C E
              </p>
              <p className="f3 white text-center mb-0 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani">
                INVOICE NO: {paymentData?.invoice_no}
              </p>
            </div>
          </header>
          <div className="w-100 line bg-white mb-3" />
          <section
            style={{
              alignItems: "start",
              justifyContent: "space-between",
            }}
            className="invoice-from-to d-flex as-jb w-100"
          >
            <div className="invoice-from">
              <p className="mb-0 fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani f2">
                INVOICE FROM :
              </p>
              <p className="mb-0 fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani f6">
                {paymentData?.institute_Name}
              </p>
              <p className="mb-0 fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani f3">
                {paymentData?.invoice_from}
              </p>
              <p className="mb-0 fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani f3">
                Chennai - 600 088
              </p>
              <p className="mb-0 fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani f3">
                +91 63856 62991
              </p>
              <p className="mb-0 fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani f3">
                saihustlehug@gmail.com
              </p>
            </div>
            <div className="invoice-to">
              <p className="mb-0 fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani f2">
                INVOICE TO :
              </p>
              <p className="mb-0 fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani f6">
                {paymentData?.lead_details?.name}
              </p>
              <p className="mb-0 fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani f2">
                {paymentData?.lead_details?.address}
              </p>
              <p className="mb-0 fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani f2">
                {paymentData?.lead_details?.phonenumber}
              </p>
              <p className="mb-0 fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani f2">
                {paymentData?.lead_details?.email}
              </p>
            </div>
          </section>
        </div>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          className="w-100 d-flex flex-column tebla_lay w-100 position-relative"
        >
          <div
            style={{
              backgroundColor: "#163d5c",
            }}
            className="table_topsss w-100 p-3"
          />
          <table
            style={{
              backgroundColor: "#ffffff",
              boxShadow:
                "0px 2px 5px rgba(0, 0, 0, 0.2), 0px 2px 5px rgba(0, 0, 0, 0.2)",
              marginBottom: "20px",
            }}
            className="invoice-table w-90 px-3"
          >
            <thead>
              <tr
                style={{
                  height: "60px",
                  border: "none",
                  borderBottom: "1px solid #e2e2e2",
                }}
                className=""
              >
                <th className="text-center fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani f5">
                  Transaction ID
                </th>
                <th className="text-center fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani f5">
                  Date
                </th>
                <th className="text-center fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani f5">
                  Course
                </th>
                <th className="text-center fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani f5">
                  Mode Of Payment
                </th>
                <th className="text-center fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani f5">
                  Amount Paid
                </th>
              </tr>
            </thead>
            <tbody>
              {paymentlist?.map((item, index) => {
                const dateOnly = new Date(item?.date || item?.createdAt)
                  .toISOString()
                  .split("T")[0];
                const today = new Date().toISOString().split("T")[0];
                console.log("today", today);

                return (
                  <tr key={index}>
                    <td
                      style={{
                        border: "none",
                        borderBottom: "1px solid #e2e2e2",
                      }}
                      className="text-center fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani black f4 py-3 px-2"
                    >
                      {item?.transitionId || item?.transaction_id || "-"}
                    </td>
                    <td
                      style={{
                        border: "none",
                        borderBottom: "1px solid #e2e2e2",
                      }}
                      className="text-center fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani black f4 py-3 px-2"
                    >
                      {dateOnly}
                    </td>

                    <td
                      style={{
                        border: "none",
                        borderBottom: "1px solid #e2e2e2",
                      }}
                      className="text-center fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani black f4 py-3 px-2"
                    >
                      {/* {paymentlist?.interested_course?.addcourse} */}
                      {paymentData?.lead_details?.interested_course?.addcourse}
                    </td>
                    <td
                      style={{
                        border: "none",
                        borderBottom: "1px solid #e2e2e2",
                      }}
                      className="text-center fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani black f4 py-3 px-2"
                    >
                      {item?.mode_of_amount}
                    </td>
                    <td
                      style={{
                        border: "none",
                        borderBottom: "1px solid #e2e2e2",
                      }}
                      className="text-center fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani black f4 py-3 px-2"
                    >
                      {item?.paid_amount}
                    </td>
                  </tr>
                );
              })}
              {/* {paymentData?.map((item, index) => (
                
              ))} */}
            </tbody>
          </table>
          <div className="invoice-total d-flex ac-jb w-90">
            <div>
              <p
                style={{
                  color: "#343A40",
                }}
                className="fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani f7 mb-1"
              >
                TOTAL AMOUNT:{" "}
                <span
                  style={{
                    color: "#474747",
                  }}
                >
                  {paymentData?.total_amount}
                </span>
              </p>

              {paymentData?.total_balance_amount > 0 ? (
                <p
                  style={{
                    color: "red",
                  }}
                  className="fs-xxl-16 text-start fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13 textani f8 mb-0"
                >
                  PARTIALLY PAID
                </p>
              ) : (
                <p
                  style={{
                    color: "#00FF44",
                  }}
                  className="fs-xxl-16 text-start fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13 textani f8 mb-0"
                >
                  FULLY PAID
                </p>
              )}
            </div>
            <p
              style={{
                color: "#0ABFAD",
              }}
              className="fs-xxl-16 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13 textani f8 mb-0"
            >
              GRAND TOTAL: {paymentData?.total_paid_amount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewInvoice;
