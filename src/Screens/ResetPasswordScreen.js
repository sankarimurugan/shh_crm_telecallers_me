import React, { useState } from "react";
import {
  no_view,
  resetgirl,
  shh_logo,
  Thorus_Knot,
  view,
} from "../assets/images";
import { useLocation, useNavigate } from "react-router-dom";
import { useReset_passwordMutation } from "../Data/Api/api";
import useUser from "../Data/Local/userDetail";
import useToken from "../Data/Local/userToken";
import PageLoad from "../Components/common/Loading/PageLoad";
import { toast } from "react-toastify";

const ResetPasswordScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;

  const [formFeald, setFormFeald] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const { setUser } = useUser();
  const { setToken } = useToken();

  // Api
  const [resetpasswordApi] = useReset_passwordMutation();

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
        newPassword: formFeald?.confirmPassword,
      };
      resetpasswordApi({ payload: payload, email: email })
        .unwrap()
        .then((res) => {
          console.log("resRes", res);
          toast.success(res?.message || "Password reset successfully");
          setUser(null);
          setToken(null);
          navigate("/");
          window.location.reload();
        })
        .catch((err) => {
          console.log("Err", err);
          toast.error(err?.data?.message || "BAD_REQUEST");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const togglePasswordVisibility = (field) => {
    setPasswordShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="resetpass-cont d-flex ac-jc">
      {loading && <PageLoad />}
      <div className="top-img tranc">
        <img alt="Thorus_Knot" src={Thorus_Knot} />
      </div>
      <div className="bottom-img tranc">
        <img alt="Cylinder" src={resetgirl} />
      </div>
      <div className="form-layer w-md-40 w-90 rounded-5 flex-column d-flex ac-js pt-5">
        <div className="w-100 px-5 d-flex ac-jc flex-column">
          <div className="logo-cont">
            <img src={shh_logo} alt="logo" />
          </div>
          <p className="f7 dark_primary fs-xxl-28 fs-xl-28 fs-lg-20 fs-sm-18 fs-xs-18 textani mb-0">
            Reset Password
          </p>
        </div>
        <div className="w-md-70 w-90">
          <div className="input-form w-100 mt-3">
            <p className="f6 primary2 fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani mb-1">
              New Password
            </p>
            <input
              type={!passwordShow.password ? "password" : "text"}
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
                togglePasswordVisibility("password");
              }}
              className="passicon log border-0 bg-transparent cp"
            >
              <img
                alt="password"
                src={passwordShow.password ? view : no_view}
              />
            </div>
          </div>
          <div className="input-form w-100 mt-3">
            <p className="f6 primary2 fs-xxl-14 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani mb-1">
              Confirm Password
            </p>
            <input
              type={!passwordShow.confirmPassword ? "password" : "text"}
              value={formFeald?.confirmPassword}
              onChange={(e) => fealdOnChange("confirmPassword", e.target.value)}
              placeholder="Password"
              className="rounded-1 px-2 pe-5 w-100 f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani "
            />
            <div className="error">
              <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                {errors?.confirmPassword}
              </p>
            </div>
            <div
              onClick={() => {
                togglePasswordVisibility("confirmPassword");
              }}
              className="passicon log border-0 bg-transparent cp"
            >
              <img
                alt="password"
                src={passwordShow.confirmPassword ? view : no_view}
              />
            </div>
          </div>
          <div className="w-100 d-flex ac-jc mt-4">
            <button
              onClick={() => {
                submitHandler();
              }}
              className=" white border-0 btns rounded-5 px-md-5 px-5 f2 fs-xxl-16 fs-xl-16 fs-lg-15 fs-sm-13 fs-xs-13 textani"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
