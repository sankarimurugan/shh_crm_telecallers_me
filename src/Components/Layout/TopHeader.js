import React, { useEffect, useRef, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { topmain, topnoti, topsetting } from "../../assets/images";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useDispatch, useSelector } from "react-redux";
import { saveHeaderTitleSlice } from "../../Data/Redux/slice/headerTitleSlice";
import {
  useCheckinMutation,
  useCheckoutMutation,
  useLazyAttendance_statusQuery,
} from "../../Data/Api/api";
import { toast } from "react-toastify";

const TopHeader = ({ toggleFun }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location?.pathname;
  const headerTitleSlice = useSelector((state) => state?.saveHeaderTitleSlice);
  const notifications = useSelector((state) => state?.saveNotificationSlice);
  console.log("headerTitleSlice", headerTitleSlice, path);
  const logoutRef = useRef(null);
  const [logoutToggle, setLogoutToggle] = useState(false);
  const [statusCheck, setStatusCheck] = useState(null);
  const [btndiss, setBtnDiss] = useState(false);

  //Api
  const [checkinApi] = useCheckinMutation();
  const [checkoutApi] = useCheckoutMutation();
  const [attenanceStatusApi] = useLazyAttendance_statusQuery();

  useEffect(() => {
    if (path == "/telecallers/dashboard" || path == "/") {
      dispatch(saveHeaderTitleSlice("Dashboard"));
    } else if (
      path == "/telecallers/leads" ||
      path == "/telecallers/leads/details"
    ) {
      dispatch(saveHeaderTitleSlice("Lead Management "));
    } else if (path == "/telecallers/payment-updates") {
      dispatch(saveHeaderTitleSlice("Finance"));
    } else if (path == "/telecallers/payment-updates/payment-list") {
      dispatch(saveHeaderTitleSlice("Payment List"));
    } else if (
      path == "/telecallers/payment-updates/payment-list/payment-detalis"
    ) {
      dispatch(saveHeaderTitleSlice(" Payment Receipt"));
    } else if (path == "/telecallers/close_followup/details") {
      dispatch(saveHeaderTitleSlice("Close Follow-up Details"));
    } else if (path == "/telecallers/followup/details") {
      dispatch(saveHeaderTitleSlice("Follow-up Details"));
    } else if (path == "/telecallers/enrollment/details") {
      dispatch(saveHeaderTitleSlice("Enrollment Details"));
    } else if (path == "/telecallers/payment-proof") {
      dispatch(saveHeaderTitleSlice("Payment Proofs"));
    } else if (path == "/telecallers/payment-proof/add") {
      dispatch(saveHeaderTitleSlice("Add Payment Proofs"));
    } else if (path == "/telecallers/payment-proof/view") {
      dispatch(saveHeaderTitleSlice("Payment Proofs"));
    } else if (path == "/telecallers/profile") {
      dispatch(saveHeaderTitleSlice("Profile"));
    } else if (path == "/telecallers/notification") {
      dispatch(saveHeaderTitleSlice("Notification"));
    } else if (path == "/telecallers/enquiries") {
      dispatch(saveHeaderTitleSlice("Enquiry"));
    } else if (path == "/telecallers/enquiries/details") {
      dispatch(saveHeaderTitleSlice("Enquiry Details"));
    } else if (path == "/telecallers/leads/add") {
      dispatch(saveHeaderTitleSlice("Lead Add"));
    } else {
      dispatch(saveHeaderTitleSlice("Not A heading"));
    }
  }, [headerTitleSlice, location, window]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setLogoutToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getcheckinStatus = () => {
    attenanceStatusApi()
      .unwrap()
      .then((res) => {
        console.log("statres", res);
        setStatusCheck(res);
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setBtnDiss(false);
      });
  };

  useEffect(() => {
    getcheckinStatus();
  }, []);

  return (
    <div className="top-header px-md-5 px-3 py-md-3 py-3 d-flex ae-jb gap-md-0 gap-3 flex-column flex-md-row">
      <div className="w-md-40 wi-100 d-flex ac-js gap-md-4 gap-3">
        <button
          onClick={() => {
            toggleFun();
          }}
          className="ressidenav border-0 bg-primary3 rounded-2"
        >
          <MenuOpenOutlinedIcon className="white" />
        </button>
        <div className="d-flex ac-jc">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="border-0 bg-transparent mb-0 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani"
          >
            <ArrowBackIosNewOutlinedIcon />
          </button>
          <p className="mb-0 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
            {headerTitleSlice}
          </p>
        </div>
        {/* <div className="serach-cont d-flex ac-jb w-100 py-md-2 py-1 px-md-3 px-2 rounded-5">
          <input
            placeholder="Seaarch.."
            className="search-input serachgray border-0 w-100 f3 fs-xxl-18 fs-xl-17 fs-lg-17 fs-sm-16 fs-xs-15 black"
          />
          <SearchOutlinedIcon className="serachgray fs-3" />
        </div> */}
      </div>
      <div className="icon-cont d-flex ac-jc gap-md-3 gap-2">
        {statusCheck && (
          <button
            disabled={btndiss}
            onClick={() => {
              setBtnDiss(true);
              if (statusCheck?.status == "checked_out") {
                checkinApi()
                  .unwrap()
                  .then((res) => {
                    console.log("checkinRes", res);
                    getcheckinStatus();
                    toast.success("Checked In Successfully");
                  })
                  .catch((err) => {
                    console.log("Err", err);
                  });
              } else {
                checkoutApi()
                  .unwrap()
                  .then((res) => {
                    console.log("checkoutRes", res);
                    getcheckinStatus();
                    toast.success("Checked Out Successfully");
                  })
                  .catch((err) => {
                    console.log("Err", err);
                  });
              }
            }}
            className={`badge d-flex ac-jc f2 fs-xxl-13 fs-xl-13 fs-lg-12 fs-sm-11 fs-xs-11 ${
              statusCheck?.status == "checked_out"
                ? " pending-btn px-3 py-0"
                : "verified-btn px-3 py-0"
            }`}
          >
            {statusCheck?.status == "checked_out"
              ? "Checked Out"
              : "Checked In"}
          </button>
        )}
        <button className="icon-bg d-flex ac-jc border-0 bg-primary3 rounded-5">
          {notifications?.length > 0 && (
            <div className="inner-text rounded-5 d-flex ac-jc">
              <p className="white mb-0 f7 fs-xxl-10 fs-xl-10 fs-lg-9 fs-sm-8 fs-xs-8 textani">
                {notifications?.length}
              </p>
            </div>
          )}
          <img
            src={topnoti}
            onClick={() => {
              navigate("/telecallers/notification");
            }}
          />
        </button>

        {/* <button
          ref={logoutRef}
          onClick={() => {
            setLogoutToggle(!logoutToggle);
          }}
          className="icon-bg d-flex ac-jc border-0 bg-yellow rounded-5 positopn-relative"
        >
          <img src={topsetting} />
          {logoutToggle && (
            <div
              onClick={() => {
                alert("Logout");
              }}
              className="logoutpop bg-white d-flex ac-jc rounded-3"
            >
              <button className="w-100 bg-transparent border-0">Logout</button>
            </div>
          )}
        </button> */}

        {/* <button className="icon-bg d-flex ac-jc border-0 bg-green rounded-5">
          <img src={topmain} />
          <div className="inner-text rounded-5 d-flex ac-jc">
            <p className="white mb-0 f7 fs-xxl-10 fs-xl-10 fs-lg-9 fs-sm-8 fs-xs-8 textani">
              15
            </p>
          </div>
        </button> */}
      </div>
    </div>
  );
};

export default TopHeader;
