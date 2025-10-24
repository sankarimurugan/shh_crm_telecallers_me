import React, { useEffect, useRef, useState } from "react";
import ProfileTop from "../Components/Profile/ProfileTop";
import { profileFieald } from "../Data/DummyJson";
import { useNavigate } from "react-router-dom";
import PageLoad from "../Components/common/Loading/PageLoad";
import ActivePoppup from "../Components/Poppup/ActivePoppup";
import useToken from "../Data/Local/userToken";
import useUser from "../Data/Local/userDetail";
import {
  useLazyTelecaller_viewQuery,
  useProfileEditMutation,
} from "../Data/Api/api";
import { toast } from "react-toastify";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [formFeald, setFormFeald] = useState({
    name: "",
    email: "",
    phoneno: "",
    role: "",
  });
  const [loading, setLoadin] = useState(true);
  const [errors, setErrors] = useState({});
  const [edit, setEdit] = useState(false);
  const [fullData, setFullData] = useState(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imageObj, setImageObj] = useState(null);
  const [active, setAcvtive] = useState(true);
  const [activePoppup, setAcvtivePoppup] = useState(false);

  const { token, setToken } = useToken();
  const { user, setUser } = useUser();

  // Api
  const [profile_viewApi] = useLazyTelecaller_viewQuery();
  const [profileEditApi] = useProfileEditMutation();

  console.log("useuseruserr", user);

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
      case "name":
        if (!stringValue) errorMsg = " Name is required!";
        break;
      case "email":
        if (!stringValue) {
          errorMsg = "Email is required!";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)) {
          errorMsg = "Enter a valid Email!";
        }
        break;
      case "phoneno":
        if (!stringValue) {
          errorMsg = "Phone number is required!";
        } else if (!/^[6-9]\d{9}$/.test(stringValue)) {
          errorMsg = "Enter a valid 10-digit phone number!";
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

  const handleSubmit = () => {
    const isValid = Object.keys(formFeald).every((field) =>
      validateInput(field, formFeald[field])
    );
    if (isValid) {
      console.log("SuccccformFeald", formFeald);
      setEdit(false);
    }
  };

  const getUserDataFun = () => {
    setLoadin(true);
    const id = user?.telecaller?.id;
    console.log("usegngjoer", id);
    profile_viewApi(id)
      .unwrap()
      .then((res) => {
        console.log("prores", res);
        setFullData(res);
        setFormFeald({
          name: res?.name,
          email: res?.email,
          phoneno: res?.phone,
          role: res?.role,
        });
        setImage(res?.profileimage);
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoadin(false);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageObj(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Check if ref is not null before clicking
    }
  };

  const editToggle = (item) => {
    if (item == "save") {
      if (imageObj) {
        setLoadin(true);
        let formdata = new FormData();
        if (imageObj) {
          formdata.append("image", imageObj);
        }
        console.log("formdata", formdata, imageObj);

        for (let [key, value] of formdata.entries()) {
          console.log(`${key}:`, value);
        }
        // const id = user?.telecaller?.id;
        // console.log("iididd", id, user);

        profileEditApi({ formdata: formdata, id: user?.telecaller?.id })
          .unwrap()
          .then((res) => {
            console.log("EdiRes", res);
            toast.success(res?.message || "Telecaller updated successfully");
            getUserDataFun();
            window.location.reload();
          })
          .catch((err) => {
            console.log("Err", err);
          })
          .finally(() => {
            setLoadin(false);
            setEdit(!edit);
          });
      } else {
        setEdit(!edit);
      }
    } else {
      setEdit(!edit);
    }
  };

  useEffect(() => {
    getUserDataFun();
  }, []);

  // const dataGetFun = () => {
  //   setLoadin(false);
  // };
  // useEffect(() => {
  //   dataGetFun();
  // }, []);

  const toggleActiveFun = (type) => {
    if (type == "btn") {
      setAcvtivePoppup(true);
    } else if (type == "yes" && active) {
      setAcvtivePoppup(true);
      setLoadin(true);
      setToken(null);
      setUser(null);
      setTimeout(() => {
        setLoadin(false);
        setAcvtivePoppup(false);
        setAcvtive(false);
      }, 1000);
    } else if (type == "no" && !active) {
      setAcvtivePoppup(true);
      setLoadin(true);
      setTimeout(() => {
        setLoadin(false);
        setAcvtivePoppup(false);
        setAcvtive(true);
      }, 1000);
    } else if (type == "no") {
      setAcvtivePoppup(false);
    }
  };
  console.log("active", active);

  return (
    <div className="d-flex flex-column ac-jc pro-ss">
      {loading && <PageLoad />}
      {activePoppup && (
        <ActivePoppup
          cont={!active ? "Active" : "Deactivate"}
          poppupHandle={toggleActiveFun}
        />
      )}
      {!loading && (
        <ProfileTop
          toggleActiveFun={toggleActiveFun}
          active={active}
          image={image}
          edit={edit}
          editToggle={editToggle}
          handleButtonClick={handleButtonClick}
          handleImageChange={handleImageChange}
          fileInputRef={fileInputRef}
          fullData={fullData}
        />
      )}
      {/* <div className="w-50 my-4">
        <fieldset className="out-input w-100 rounded-5 d-flex ac-jc flex-column  ps-md-5 pe-md-5 px-3 pt-4">
          <legend className="f3 px-1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani black mb-0">
            Personal Details
          </legend>
          <div className="w-90">
            {profileFieald?.map((item) => {
              return (
                <div className="w-100 position-relative mx-3">
                  <p className="f6 px-1 mb-2 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2">
                    {item?.lable}
                  </p>
                  <input
                    type={item?.type}
                    value={formFeald?.[item?.formFeald]}
                    onChange={(e) => {
                      fealdOnChange(item?.formFeald, e.target.value);
                    }}
                    disabled={!edit}
                    placeholder={item?.placeholder}
                    className={`${
                      edit ? "opacity-100" : "opacity-50"
                    } w-100 px-2 rounded-2 mb-2 f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani `}
                  />
                  <div className="error">
                    <p className="mb-2 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                      {errors?.[item?.formFeald]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="position-relative d-flex ac-jc my-4 w-100">
            {edit && (
              <button
                onClick={() => {
                  handleSubmit();
                }}
                className="btn-sub border-0 bg-primary3 white f4 fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 rounded-3 textani"
              >
                Save
              </button>
            )}
            <p
              onClick={() => {
                navigate("/otp-resetpassword");
              }}
              className="red rsetlink cp f3 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
            >
              Reset Password
            </p>
          </div>
        </fieldset>
      </div> */}
    </div>
  );
};

export default ProfileScreen;
