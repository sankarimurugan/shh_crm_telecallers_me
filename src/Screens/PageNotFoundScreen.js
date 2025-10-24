import React, { useEffect, useState } from "react";
import { notfound } from "../assets/images";
import PageLoad from "../Components/common/Loading/PageLoad";
import { useNavigate } from "react-router-dom";

const PageNotFoundScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {loading ? (
        <PageLoad />
      ) : (
        <div className="d-flex ac-jc notfound_cont w-90 px-5">
          <div className="not_img d-flex ac-jc w-50">
            <img src={notfound} alt="" />
          </div>
          <div className="notfound_cont w-50 d-flex ac-jc flex-column">
            <div className=" text-start">
              <h1
                style={{
                  color: "#00225D",
                }}
                className="f7 fs-xxl-80 fs-xl-70 fs-lg-60 fs-sm-50 fs-xs-40 textani"
              >
                Oh No!
              </h1>
              <p className="black fs-xxl-40 fs-xl-40 fs-lg-30 fs-sm-30 fs-xs-20 textani f5">
                Sorry! Page not Found
              </p>
            </div>
            <div className="w-100 ac-jc d-flex">
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="border-0 rounded-3 white fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani f4"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PageNotFoundScreen;
