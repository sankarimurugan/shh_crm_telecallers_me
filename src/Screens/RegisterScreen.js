import React, { useState } from "react";
import {
  check,
  Cylinder,
  no_view,
  Thorus_Knot,
  view,
} from "../assets/images/index";
import { loginForm } from "../Data/DummyJson";
import { useNavigate } from "react-router-dom";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [formFeald, setFormFeald] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    newsletter: "",
    termscondition: "",
  });
  const [passwordShow, setPasswordShow] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({});
  const [pageLoad, setPageLoad] = useState(false);

  const fealdOnChange = (field, value) => {
    setFormFeald((state) => ({
      ...state,
      [field]: value,
    }));
    validateInput(field, value);
  };

  const validateInput = (field, value) => {
    let errorMsg = "";
    const stringValue = String(value).trim();

    switch (field) {
      case "firstName":
      case "lastName":
        if (!stringValue)
          errorMsg = `${
            field === "firstName" ? "First" : "Last"
          } Name is required!`;
        break;
      case "email":
        if (!stringValue) {
          errorMsg = "Email is required!";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)) {
          errorMsg = "Enter a valid Email!";
        }
        break;
      case "phoneNumber":
        if (!stringValue) {
          errorMsg = "Phone number is required!";
        } else if (!/^[6-9]\d{9}$/.test(stringValue)) {
          errorMsg = "Enter a valid 10-digit phone number!";
        }
        break;
      case "password":
        if (!stringValue) {
          errorMsg = "Password is required!";
        } else if (stringValue.length < 6) {
          errorMsg = "Password must be at least 6 characters long!";
        } else if (!/[A-Z]/.test(stringValue)) {
          errorMsg = "Must contain at least one uppercase letter!";
        } else if (!/[a-z]/.test(stringValue)) {
          errorMsg = "Must contain at least one lowercase letter!";
        } else if (!/[0-9]/.test(stringValue)) {
          errorMsg = "Must contain at least one number!";
        } else if (!/[@$!%*?&]/.test(stringValue)) {
          errorMsg = "Include at least one special character";
        }
        break;
      case "confirmPassword":
        if (!stringValue) {
          errorMsg = "Confirm Password is required!";
        } else if (stringValue !== formFeald?.password) {
          errorMsg = "Passwords do not match!";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMsg,
    }));

    return !errorMsg;
  };

  const togglePasswordVisibility = (field) => {
    setPasswordShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const submitHandler = () => {
    const isValid = Object.keys(formFeald).every((field) =>
      validateInput(field, formFeald[field])
    );
    if (isValid) {
      setTimeout(() => {
        setPageLoad(true);
      }, 1500);
      setPageLoad(false);
    }
  };

  return (
    <>
      <div className="register-cont w-100 d-flex ac-jc p-2 tranc">
        {/* {!pageLoad && <PageLoad />} */}
        <div className="top-img tranc">
          <img alt="Thorus_Knot" src={Thorus_Knot} />
        </div>
        <div className="bottom-img tranc">
          <img alt="Cylinder" src={Cylinder} />
        </div>
        <div className="form-cont w-90 rounded-5 d-flex ac-jc flex-column py-md-5 py-2 tranc">
          <div className="main-form w-md-50 w-90 h-100 tranc">
            <div className="inner-layer w-md-60 w-90 d-flex flex-column as-jc tranc">
              <p className="gradient-text  mb-0 f7 fs-xxl-28 fs-xl-28 fs-lg-20 fs-sm-18 fs-xs-18 textani">
                Welcome to SAI Hustle Hub
              </p>
              <p className="black f4 fs-xxl-18 fs-xl-18 fs-lg-15 fs-sm-14 fs-xs-14 textani mb-0">
                Register your account
              </p>
            </div>
            <div className="forms d-flex as-jb flex-wrap w-100 mt-3 tranc gap-3">
              {loginForm?.map((item) => {
                return (
                  <div className="input-form d-flex flex-column tranc as-js w-xxl-47 w-xl-47 w-lg-100 w-sm-100 w-xs-100 position-relative">
                    <p className="mb-2 f7 primary2 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani">
                      {item?.lable}
                    </p>
                    <input
                      type={
                        (item?.formFeald === "password" &&
                          passwordShow &&
                          passwordShow.password) ||
                        (item?.formFeald === "confirmPassword" &&
                          passwordShow.confirmPassword &&
                          passwordShow)
                          ? "text"
                          : item?.type
                      }
                      placeholder={item?.placeholder}
                      value={formFeald?.[item?.formFeald]}
                      onChange={(e) =>
                        fealdOnChange(item?.formFeald, e.target.value)
                      }
                      className={`${
                        item?.formFeald === "password" ||
                        item?.formFeald === "confirmPassword"
                          ? "ps-2 pe-5"
                          : "px-2"
                      } rounded-2 f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani `}
                    />
                    {(item?.formFeald === "password" ||
                      item?.formFeald === "confirmPassword") && (
                      <button
                        onClick={() => {
                          togglePasswordVisibility(item?.formFeald);
                        }}
                        className="passicon border-0 bg-transparent "
                      >
                        <img
                          alt="password"
                          src={
                            (item?.formFeald === "password" &&
                              passwordShow.password) ||
                            (item?.formFeald === "confirmPassword" &&
                              passwordShow.confirmPassword)
                              ? view
                              : no_view
                          }
                        />
                      </button>
                    )}
                    {errors?.[item?.formFeald] && (
                      <div className="error">
                        <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                          {errors?.[item?.formFeald]}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="check-cont mt-4 pt-3 d-flex ac-jc flex-column w-100 tranc">
              <div className="d-flex flex-column gap-3 tranc">
                <div className="d-flex gap-2 d-flex  tranc">
                  <button className="check rounded-2 d-flex ac-jc tranc">
                    <img alt="check" src={check} />
                  </button>
                  <p className="light_gray mb-0 f3 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani">
                    Yes , I want SHH Newsletter
                  </p>
                </div>
                <div className="d-flex gap-2 d-flex ">
                  <button className="check rounded-2 d-flex ac-jc">
                    <img alt="check" src={check} />
                  </button>
                  <p className="light_gray mb-0 f3 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani">
                    I agree to all the{" "}
                    <span className="primary2 cp">Terms, Privacy Policy</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="d-flex ac-jc w-100 mt-4 tranc">
              <button
                onClick={() => {
                  submitHandler();
                }}
                className="white border-0 btns rounded-5 px-md-5 px-4 f2 fs-xxl-16 fs-xl-16 fs-lg-15 fs-sm-13 fs-xs-13 textani"
              >
                Create Account
              </button>
            </div>
            <div className="d-flex ac-jc w-100 mt-1 tranc">
              <p className="black f7 mb-3 fs-xxl-16 fs-xl-16 fs-lg-15 fs-sm-13 fs-xs-13 textani text-center">
                Already have an account ?
                <span
                  className="orange cp"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  {" "}
                  Log In
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
