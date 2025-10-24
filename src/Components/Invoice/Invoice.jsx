import React, { forwardRef } from "react";
import { round_logo } from "../../assets/images";

const Invoice = forwardRef((props, ref) => {
  const invoiceData = {
    invoiceNo: "2315",
    date: "23/05/2025",
    status: "Partially Paid",
    to: {
      name: "Roobini S",
      address:
        "No:11 Dhamodaranar Vinayagar Koil Street, MGR Nagar, Chennai - 78",
      email: "roobini@gmail.com",
    },
    from: {
      name: "Sai Hustle Hub",
      address: "10A, N Mada St, Lakshmi Nagar, Kolathur, Chennai - 600099",
    },
    items: [
      { course: "Digital Marketing", method: "Net Cash", amount: 5000 },
      { course: "Digital Marketing", method: "UPI", amount: 5000 },
    ],
    paid: 10000,
    balance: 5000,
    total: 25000,
  };

  return (
    <div className="invoice" ref={ref}>
      <div className="invoice__ribbon">{invoiceData.status.toUpperCase()}</div>

      <div className="invoice__container">
        {/* Header */}
        <div className="invoice__header">
          <div className="invoice__to">
            <h2>INVOICE</h2>
            <p>
              <strong>Invoice To:</strong>
              <br />
              {invoiceData.to.name}
              <br />
              {invoiceData.to.address}
              <br />
              Email ID: {invoiceData.to.email}
            </p>
          </div>
          <div className="invoice__info">
            <img src={round_logo} alt="Logo" />
            <p>
              <strong>Invoice No:</strong> {invoiceData.invoiceNo}
            </p>
            <p>
              <strong>Date:</strong> {invoiceData.date}
            </p>
          </div>
        </div>

        {/* Table */}
        <table className="invoice__table">
          <thead>
            <tr>
              <th>No</th>
              <th>Course</th>
              <th>Method</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.course}</td>
                <td>{item.method}</td>
                <td>₹{item.amount}</td>
              </tr>
            ))}
            <tr className="bold">
              <td colSpan="3" className="right">
                Balance Amount:
              </td>
              <td className="right">₹{invoiceData.balance}</td>
            </tr>
            <tr className="bold">
              <td colSpan="3" className="right">
                Paid Amount:
              </td>
              <td className="right">₹{invoiceData.paid}</td>
            </tr>
            <tr className="total">
              <td colSpan="3" className="right">
                Total Amount:
              </td>
              <td className="right">₹{invoiceData.total}</td>
            </tr>
          </tbody>
        </table>

        {/* Footer */}
        <div className="invoice__footer">
          <div className="invoice__from">
            <p>
              <strong>Invoice From:</strong>
            </p>
            <p>
              <strong>{invoiceData.from.name}</strong>
              <br />
              {invoiceData.from.address}
            </p>
          </div>
          <div className="invoice__terms">
            <p>
              <strong>Terms & Conditions:</strong>
            </p>
            <ul>
              <li>
                Any invoice discrepancies must be reported within 2 days of the
                invoice date.
              </li>
              <li>No Cancellation (or) Refund Policy</li>
              <li>
                This invoice and all transactions are subject to the laws of
                Tamil Nadu
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Invoice;
