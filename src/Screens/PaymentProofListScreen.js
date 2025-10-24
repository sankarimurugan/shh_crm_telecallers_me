import React, { useEffect, useState } from "react";
import { mini_time, proof_img } from "../assets/images";
import { useLocation, useNavigate } from "react-router-dom";
import PageLoad from "../Components/common/Loading/PageLoad";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  useLazyAll_proof_listQuery,
  useLazyLeads_payment_proofQuery,
} from "../Data/Api/api";
import EmptyComp from "../Components/common/Empty/EmptyComp";

const PaymentProofListScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location);
  const type = location?.state?.type;
  const RouteData = location?.state?.data;
  console.log("RouteData", RouteData);

  const [searchTerm, setSearchTerm] = useState("");
  const [paymentProofs, setPaymentProofs] = useState([]);
  // const [paymentProofs, setPaymentProofs] = useState([
  //   {
  //     id: 1,
  //     userName: "Arjun Kumar",
  //     paymentDate: "2025-04-04",
  //     paymentTime: "10.00AM",
  //     amount: 1500,
  //     paymentMethod: "GPay",
  //     transactionId: "TXN1234567890",
  //     screenshotUrl: "https://via.placeholder.com/150.png?text=GPay+Proof",
  //     status: "Pending",
  //     verifiedByAdmin: false,
  //   },
  //   {
  //     id: 2,
  //     userName: "Priya Sharma",
  //     paymentDate: "2025-04-03",
  //     paymentTime: "08.00AM",
  //     amount: 1000,
  //     paymentMethod: "PhonePe",
  //     transactionId: "TXN9876543210",
  //     screenshotUrl: "https://via.placeholder.com/150.png?text=PhonePe+Proof",
  //     status: "Verified",
  //     verifiedByAdmin: true,
  //   },
  // ]);
  const [loading, setLoadin] = useState(true);

  // Api
  const [paymentList] = useLazyLeads_payment_proofQuery();
  const [allpaymentListApi] = useLazyAll_proof_listQuery();

  const filteredpayments = paymentProofs?.filter((item) => {
    const leadString = [
      item?.lead_id,
      item?.name,
      item?.email,
      item?.createdAt && new Date(item?.createdAt).toISOString().split("T")[0],
      item?.phonenumber,
      item?.interested_course?.addcourse,
      item?.status,
    ]
      .join(" ")
      .toLowerCase();

    return leadString.includes(searchTerm);
  });

  const dataGetFun = () => {
    setLoadin(true);
    if (type === "view") {
      const id = RouteData?._id;
      paymentList(id)
        .unwrap()
        .then((res) => {
          console.log("ProoRes", res);
          setPaymentProofs(res?.data || []);
        })
        .catch((err) => {
          console.log("Err", err);
        })
        .finally(() => {
          setLoadin(false);
        });
    } else {
      setLoadin(true);
      allpaymentListApi()
        .unwrap()
        .then((res) => {
          console.log("ProoRes", res);
          setPaymentProofs(res?.data || []);
        })
        .catch((err) => {
          console.log("Err", err);
        })
        .finally(() => {
          setLoadin(false);
        });
    }
  };

  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert 0 to 12
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };
  useEffect(() => {
    dataGetFun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("lasodfjw hbug", RouteData);

  return (
    <div className="container mt-4 mb-0 ms-0 me-0">
      {loading && <PageLoad />}
      {!loading && (
        <>
          <div className="d-flex ac-jb w-100  mb-3">
            {/* <p className=" mb-0 f7 black fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
          Payment Proofs
        </p> */}
            {RouteData?.fullyPaid !== true && (
              <button
                onClick={() => {
                  if (RouteData) {
                    navigate("/telecallers/payment-proof/add", {
                      state: { type: "add", data: RouteData },
                    });
                  } else {
                    navigate("/telecallers/payment-proof/add", {
                      state: { type: "add" },
                    });
                  }
                }}
                className="bg-primary3 border-0 white py-2 px-3  f4 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 rounded-3 textani"
              >
                <AddCircleIcon /> Add Payment Proof
              </button>
            )}
            {/* {paymentProofs?.length > 0 && ( */}
            <div className="search-container">
              <div className="mb-0 white d-flex ac-jc f4 rounded-3 border-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani">
                <input
                  type="text"
                  className="form-control me-2 search-input"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
              </div>
            </div>
            {/* )} */}
          </div>
          <div className="payment-container rounded-3">
            {filteredpayments?.length === 0 ? (
              <EmptyComp text={"Payment Proof Not Found"} />
            ) : (
              <div className="payment-list">
                {filteredpayments?.map((item) => {
                  const dateObj = new Date(item?.createdAt);
                  const date = dateObj.toISOString().split("T")[0];
                  const time = formatAMPM(dateObj);
                  return (
                    <div
                      onClick={() => {
                        if (RouteData) {
                          navigate("/telecallers/payment-proof/view", {
                            state: {
                              type: "view",
                              data: item,
                              RouteData: RouteData,
                            },
                          });
                        } else {
                          navigate("/telecallers/payment-proof/view", {
                            state: { type: "view", data: item },
                          });
                        }
                      }}
                      key={item.id}
                      className={`payment-card d-flex ac-jb w-100  ${
                        !item.status === "Pending" ? "unread" : ""
                      }`}
                    >
                      <div className="d-flex ac-js">
                        <div className="proofimgs d-flex ac-jc me-3">
                          <img
                            alt=""
                            crossOrigin="anonymous"
                            src={item?.image || proof_img}
                          />
                        </div>
                        <div>
                          <div className="d-flex noti-header justify-content-between align-items-center mb-2">
                            <div>
                              <p className="mb-0 mt-0 fw-bold f5 fs-xxl-18 fs-xl-17 fs-lg-15 fs-sm-14 fs-xs-13 primary3 ">
                                {item.userName}
                              </p>
                            </div>
                          </div>
                          <p className="mb-0 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 f5 black ">
                            Payment Method:
                            <span className="f3"> {item.paymentmethood}</span>
                          </p>
                        </div>
                      </div>
                      {/* <p className="mb-1">Transaction ID: {item?.transactionId}</p> */}
                      <div className="h-100 d-flex flex-column ">
                        <span
                          className={`badge d-flex ac-jc f2 fs-xxl-15 fs-xl-15 fs-lg-13 fs-sm-13 fs-xs-12 ${
                            item.status === "Pending"
                              ? " pending-btn px-3 py-2"
                              : "verified-btn px-3 py-2"
                          }`}
                        >
                          {item.status}
                        </span>
                        <p className="fs-xxl-13  mt-3 mb-0 fs-xl-13 fs-lg-13 fs-sm-12 fs-xs-11 f3 black">
                          {date} |
                          <img
                            alt=""
                            className="mx-1"
                            src={mini_time}
                            style={{
                              height: "13px",
                              width: "13px",
                            }}
                          />
                          {time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentProofListScreen;
