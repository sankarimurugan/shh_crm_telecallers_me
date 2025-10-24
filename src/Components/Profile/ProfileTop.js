import React from "react";
import {  profile_dum } from "../../assets/images";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
 import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { useNavigate } from "react-router-dom";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

const ProfileTop = ({
  edit,
  editToggle,
  handleButtonClick,
  handleImageChange,
  fileInputRef,
  image,
  toggleActiveFun,
  active,
  fullData,
}) => {
  console.log("proimg", image);

  const imageUrl = image || profile_dum;

  const navigate = useNavigate();
  return (
    <div className="profile_cont w-90 d-flec ac-jc flex-column p-3 rounded-5 position-relative">
      <p
        onClick={() => {
          navigate("/otp-resetpassword");
        }}
        className="red rsetlink cp f3 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
      >
        Reset Password
      </p>
      <div className="pro-edit gap-2 d-flex">
        {/* <button
          onClick={() => {
            toggleActiveFun("btn");
          }}
          className={`${
            active
              ? "bg-primary3 white f4 fs-xxl-15 fs-xl-14 fs-lg-13 fs-md-11 fs-sm-10 fs-xs-10 textani"
              : "bg-red white f4 fs-xxl-15 fs-xl-14 fs-lg-13 fs-md-11 fs-sm-10 fs-xs-10 textani"
          } border-0 btnssac rounded-3 d-flec ac-jc`}
        >
          {active ? "Active" : "Deactivate"}
        </button> */}
        {!edit ? (
          <button
            onClick={() => {
              editToggle();
            }}
            className="primary3 bg-transparent edit rounded-5"
          >
            <ModeEditOutlinedIcon />
          </button>
        ) : (
          <button
            onClick={() => {
              editToggle("save");
            }}
            className="white bg-green edit rounded-5"
          >
            <SaveOutlinedIcon />
          </button>
        )}
      </div>
      <div className="profile-cont d-flex ac-jc flex-column">
        <div className="pro_imgcont position-relative shadow">
          <img
            className="rounded-5"
            src={imageUrl || profile_dum}
            crossOrigin="anonymous"
            alt="Profile"
          />
          {edit && (
            <button
              onClick={handleButtonClick}
              className="profile-hove d-flex ac-jc flex-column border-0"
            >
              <p className="mb-0 text-center white f1 fs-xxl-11 fs-xl-11 fs-lg-11 fs-md-10 fs-sm-10 fs-xs-11 textani">
                Upload profile Photo
              </p>
              <AddAPhotoOutlinedIcon className="text-center white" />
            </button>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }} // Hide input field
            onChange={handleImageChange}
          />
        </div>
        <div className="d-flex flex-column ac-jc my-4 gap-2">
          <p
            style={{
              textTransform: "uppercase",
            }}
            className="primary3 f6 mb-0 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-14 textani"
          >
            {fullData?.name}
          </p>
          <p className="f2 black mb-0 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani">
            {fullData?.tole}
          </p>
          <p className="mb-0 black f6 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani">
            Email ID:<span className="primary3 f3"> {fullData?.email}</span>
          </p>
          <p className="mb-0 black f6 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani">
            Phone:<span className="primary3 f3"> {fullData?.phone}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileTop;
