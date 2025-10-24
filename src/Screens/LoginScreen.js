import React, { useState } from "react";
import { check, no_view, shh_logo, view } from "../assets/images";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveHeaderTitleSlice } from "../Data/Redux/slice/headerTitleSlice";
import { useLoginMutation } from "../Data/Api/api";
import useToken from "../Data/Local/userToken";
import { toast } from "react-toastify";
import PageLoad from "../Components/common/Loading/PageLoad";
import useUser from "../Data/Local/userDetail";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, setUser } = useUser();
  const { token, setToken } = useToken();

  const [formFeald, setFormFeald] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordshow, setPasswordShow] = useState(false);

  // Api
  const [loginApi] = useLoginMutation();

  const fealdOnChange = (field, value) => {
    console.log("field, value", field, value);
    setFormFeald((state) => ({
      ...state,
      [field]: value,
    }));
    validateInput(field, value);
  };
  const validateInput = (field, value) => {
    let errorMsg = "";
    const stringValue = String(value).trim();
    console.log("stringValue", stringValue);
    switch (field) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!stringValue) {
          errorMsg = "E-mail Address is required !";
        } else if (!emailRegex.test(stringValue)) {
          errorMsg = "Enter a valid E-mail Address !";
        }
        break;
      case "password":
        if (!stringValue) {
          errorMsg = "Password is required!";
        } else if (stringValue.length < 6) {
          errorMsg = "Password must be at least 6 characters long!";
        } else if (!/[A-Z]/.test(stringValue)) {
          errorMsg = "Password must contain at least one uppercase letter!";
        } else if (!/[a-z]/.test(stringValue)) {
          errorMsg = "Password must contain at least one lowercase letter!";
        } else if (!/[0-9]/.test(stringValue)) {
          errorMsg = "Password must contain at least one number!";
        } else if (!/[@$!%*?&]/.test(stringValue)) {
          errorMsg = "Include at least one special character";
        }
        break;
      default:
        break;
    }

    console.log("errorMsg", errorMsg);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMsg,
    }));

    return !errorMsg;
  };

  const submitHandler = () => {
    const isValid = Object.keys(formFeald).every((field) =>
      validateInput(field, formFeald[field])
    );
    if (isValid) {
      setLoading(true);
      const payload = {
        email: formFeald?.email,
        password: formFeald?.password,
      };
      loginApi(payload)
        .unwrap()
        .then((res) => {
          console.log("Res", res);
          setUser(res);
          setToken(res?.telecaller?.token);
          console.log("restoken", res?.telecaller?.token, "TOkennnn", token);
          toast.success(res?.message || "Login successful");
          navigate("/telecallers/dashboard");
          window.location.reload();
        })
        .catch((err) => {
          console.log("Err", err);
          toast.error(err?.data?.message || "BAD_REQUEST");
        })
        .finally(() => {
          setLoading(false);
        });
      // navigate("/telecallers/dashboard");
    }
  };

  return (
    <>
      {loading && <PageLoad />}
      <div className="login-cont">
        <div className="form-layer w-md-40 w-90 rounded-5 flex-column d-flex ac-jc">
          <div className="w-100 px-5 d-flex ac-jc flex-column">
            <div className="logo-cont">
              <img src={shh_logo} alt="logo" />
            </div>
            <p className="f7 dark_primary fs-xxl-28 fs-xl-28 fs-lg-20 fs-sm-18 fs-xs-18 textani mb-0">
              Login
            </p>
            <p className="f4 primary2 text-center fs-xxl-20 fs-xl-20 fs-lg-18 fs-sm-15 fs-xs-14 w-100 textani mb-0">
              Login to your account
            </p>
          </div>
          <div className="w-md-70 w-90">
            <div className="input-form w-100 mt-3">
              <p className="f6 primary2 fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani mb-1">
                E-mail Address
              </p>
              <input
                placeholder="Email"
                value={formFeald?.email}
                onChange={(e) => fealdOnChange("email", e.target.value)}
                className="rounded-1 px-2 w-100 f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani "
              />
              <div className="error">
                <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                  {errors?.email}
                </p>
              </div>
            </div>
            <div className="input-form w-100 mt-3">
              <p className="f6 primary2 fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani mb-1">
                Password
              </p>
              <input
                type={!passwordshow ? "password" : "text"}
                value={formFeald?.password}
                onChange={(e) => fealdOnChange("password", e.target.value)}
                placeholder="Password"
                className="rounded-1 px-2 pe-5 w-100 f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani "
              />
              <div className="error">
                <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                  {errors?.password}
                </p>
              </div>
              <div
                onClick={() => {
                  setPasswordShow(!passwordshow);
                }}
                className="passicon log border-0 cp bg-transparent "
              >
                <img
                  style={{
                    height: "100%",
                    width: "20px",
                  }}
                  alt="password"
                  src={passwordshow ? view : no_view}
                />
              </div>
            </div>
            <div className="d-flex w-100 ac-jb  d-flex tranc mt-3">
              <div className=" check-cont d-flex ac-js gap-2">
                <button disabled className="check rounded-2 d-flex ac-jc tranc">
                  <img alt="check" src={check} />
                </button>
                <p className="primary2 mb-0 f3 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani">
                  Remember me
                </p>
              </div>
              <p
                onClick={() => {
                  navigate("/otp-resetpassword");
                }}
                className="primary2 cp mb-0 f6 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani"
              >
                Reset Password?
              </p>
            </div>
            <div className="w-100 d-flex ac-jc mt-4">
              <button
                onClick={() => {
                  submitHandler();
                }}
                className=" white border-0 btns rounded-5 px-md-5 px-5 f2 fs-xxl-16 fs-xl-16 fs-lg-15 fs-sm-13 fs-xs-13 textani"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
