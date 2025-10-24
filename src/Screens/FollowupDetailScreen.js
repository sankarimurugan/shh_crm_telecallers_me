import React, { useEffect, useRef, useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { courselist, leadaddform, leadstatus } from "../Data/DummyJson";
import { calendar_icon, time_icon } from "../assets/images";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "react-router-dom";

const FollowupDetailScreen = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [formFeald, setFormFeald] = useState({
    name: "",
    email: "",
    phoneno: "",
    source: "",
    status: "",
    followupdate: "",
    followuptime: "",
    enrollement_date: "",
    interested_course: "",
  });

  const [errors, setErrors] = useState({});

  const type = location?.state?.type;

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Append message
      setNewMessage(""); // Clear input
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line in textarea
      handleSendMessage();
    }
  };

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
      case "source":
        if (!stringValue) {
          errorMsg = "source is required!";
        }
        break;
      case "status":
        if (!stringValue) {
          errorMsg = "status is required!";
        }
        break;
      case "followupdate":
        if (!stringValue && formFeald?.status == "Follow Ups") {
          errorMsg = "Followup Date and Followup Time is required!";
        }
        break;
      case "followuptime":
        if (!stringValue && formFeald?.status == "Follow Ups") {
          errorMsg = "Followup Date and Followup Time is required!";
        }
        break;
      case "enrollement_date":
        if (!stringValue && formFeald?.status == "Enrollment") {
          errorMsg = "Enrollment Date is required!";
        }
        break;
      case "interested_course":
        if (!stringValue) {
          errorMsg = "Tnterested Course is required!";
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

  const editMessage = (index) => {
    const updatedMessage = prompt("Edit your message:", messages[index]); // Show a prompt for editing
    if (updatedMessage !== null) {
      setMessages((prevMessages) =>
        prevMessages.map((msg, i) => (i === index ? updatedMessage : msg))
      );
    }
  };

  const deleteMessage = (index) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setMessages((prevMessages) => prevMessages.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    const isValid = Object.keys(formFeald).every((field) =>
      validateInput(field, formFeald[field])
    );
    if (isValid) {
      console.log("formFeald", formFeald);
    }
  };

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  useEffect(() => {
    setFormFeald({
      status: "Follow Ups",
    });
  }, []);

  return (
    <div className="detaile-cont ">
      {/* <p className=" mb-0 f7 black fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
        Follow-up Details
      </p> */}
      <div className="d-flex as-jb mt-4 gap-4 det-layer">
        <div className="w-70 d-flex inputcont ac-jb flex-column gap-4 pb-5">
          <div className="left-box-cont ">
            <fieldset className="out-input rounded-5 d-flex ac-jc  ps-md-5 pe-md-5 px-3 pt-4 pb-5">
              <legend className="f3 px-1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani black mb-0">
                Personal Details
              </legend>
              <div className="d-flex w-100 ac-jb flex-wrap gap-3">
                {/* <div className="w-45">
                  <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                    Lead ID
                  </p>
                  <input className="w-100 rounded-2 px-2" />
                </div> */}
                {leadaddform?.map((item) => {
                  return (
                    <>
                      {item?.type == "dropdown" ? (
                        <div className="w-45">
                          <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                            {item?.lable}
                          </p>
                          <div className="lead_drop position-relative">
                            <select
                              value={formFeald?.[item?.formFeald] || ""}
                              onChange={(e) => {
                                fealdOnChange(item?.formFeald, e.target.value);
                              }}
                              className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                            >
                              <option value="" disabled hidden selected>
                                Select {item?.lable}
                              </option>
                              {item?.list?.map((option) => (
                                <option
                                  key={option?.id}
                                  className="light_gray w-100 rounded-2 px-2"
                                  value={option?.name}
                                >
                                  {option?.name}
                                </option>
                              ))}
                            </select>
                            {errors?.[item?.formFeald] && (
                              <div className="error">
                                <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                                  {errors?.[item?.formFeald]}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="w-45 position-relative">
                          <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                            {item?.lable}
                          </p>
                          <input
                            value={formFeald?.[item?.formFeald]}
                            onChange={(e) => {
                              fealdOnChange(item?.formFeald, e.target.value);
                            }}
                            placeholder={item?.placeholder}
                            className="w-100 rounded-2 px-2 f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
                          />
                          {errors?.[item?.formFeald] && (
                            <div className="error">
                              <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                                {errors?.[item?.formFeald]}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            </fieldset>
          </div>
          <div className="left-box-cont w-100">
            <fieldset className="out-input rounded-5 d-flex ac-jc  ps-md-5 pe-md-5 px-3 pt-4 pb-5">
              <legend className="f3 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani black mb-0">
                Follow Details
              </legend>
              <div className="d-flex w-100 ac-jb flex-wrap gap-3">
                <div className="w-45">
                  <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                    Status
                  </p>
                  <div className="lead_drop position-relative">
                    <select
                      value={formFeald?.status}
                      onChange={(e) => {
                        fealdOnChange("status", e.target.value);
                      }}
                      className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                    >
                      <option value="" disabled hidden selected>
                        Select Status
                      </option>
                      {leadstatus?.map((item) => {
                        return (
                          <option
                            key={item.id}
                            className="light_gray w-100 rounded-2 px-2"
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                    {errors?.status && (
                      <div className="error">
                        <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                          {errors?.status}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-45">
                  <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                    Interested Course
                  </p>
                  <div className="lead_drop position-relative">
                    <select
                      value={formFeald?.interested_course}
                      onChange={(e) => {
                        fealdOnChange("interested_course", e.target.value);
                      }}
                      className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                    >
                      <option value="" disabled hidden selected>
                        Select Interested Course
                      </option>
                      {courselist?.map((item) => {
                        return (
                          <option
                            key={item.id}
                            className="light_gray w-100 rounded-2 px-2"
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                    {errors?.interested_course && (
                      <div className="error">
                        <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                          {errors?.interested_course}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {formFeald?.status == "Follow Ups" && (
                  <div className="w-45 two_inputs position-relative">
                    <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                      Follow-up
                    </p>
                    <div className="d-flex ac-jc input_one rounded-2 gap-3 px-2">
                      <div className="d-flex ac-jb w-50 gap-1 ">
                        <div className="insideinpput d-flex ac-jc">
                          <img src={calendar_icon} />
                        </div>
                        <input
                          type="date"
                          className="w-100 f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
                          placeholder="Date"
                          value={formFeald?.followupdate}
                          onChange={(e) => {
                            fealdOnChange("followupdate", e.target.value);
                          }}
                        />
                      </div>
                      <div className="v-line" />
                      <div className="d-flex ac-jc w-50 gap-1">
                        <div className="insideinpput d-flex ac-jb">
                          <img src={time_icon} />
                        </div>
                        <input
                          className="w-100 f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
                          placeholder="Time"
                          value={formFeald?.followuptime}
                          onChange={(e) => {
                            fealdOnChange("followuptime", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    {(errors?.followupdate || errors?.followuptime) && (
                      <div className="error">
                        <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                          {errors?.followupdate || errors?.followuptime}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {formFeald?.status == "Enrollment" && (
                  <div className="w-45">
                    <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                      Enrollment Date
                    </p>
                    <div className="d-flex ac-js input_twoss rounded-2 px-2 gap-2">
                      <div className="insideinpput d-flex ac-jc">
                        <img src={calendar_icon} />
                      </div>
                      <input
                        type={"date"}
                        value={formFeald?.enrollement_date}
                        onChange={(e) => {
                          fealdOnChange("enrollement_date", e.target.value);
                        }}
                        placeholder="Conversion Date"
                        className="w-100  f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
                      />
                    </div>
                  </div>
                )}
              </div>
            </fieldset>
          </div>
          {type == "edit" && (
            <div className="cust-sendbtn d-flex ac-jc w-100">
              <button
                onClick={() => {
                  handleSubmit();
                }}
                className="btn-sub border-0 bg-primary3 white f4 fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 rounded-3 textani"
              >
                Submit
              </button>
            </div>
          )}
        </div>
        <div className="w-30 not-cont d-flex as-jb flex-column ">
          <p className="f6 px-1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani primary2 mb-0">
            Notes
          </p>
          <div className="rounded-2 text-cont h-100 w-100 ">
            <div className="shadow-layer">
              <div
                className={`${
                  messages?.length == 0
                    ? ""
                    : "text-scroll p-3 d-flex flex-column w-100 as-js gap-3"
                } text-scroll p-3 d-flex flex-column w-100 as-js gap-3 rounded-3 `}
              >
                {messages?.length == 0 ? (
                  <div className="">
                    <p className="f4 px-1 fs-xxl-16 fs-xl-17 fs-lg-16 fs-sm-16 fs-xs-15 textani light_blue mb-0">
                      Add Notes here...
                    </p>
                  </div>
                ) : (
                  messages.map((msg, index) => {
                    return (
                      <div
                        key={index}
                        className="px-2 py-3 rounded-2 listlayer"
                      >
                        <div className="btn-contss d-flex">
                          <button
                            onClick={() => {
                              editMessage(index);
                            }}
                            className="d-flex ac-jc border-0 edit rounded-1"
                          >
                            <ModeEditIcon className="white fs-xxl-16 fs-xl-17 fs-lg-16 fs-sm-16 fs-xs-15 textani" />
                          </button>
                          <button
                            onClick={() => {
                              deleteMessage(index);
                            }}
                            className="d-flex ac-jc border-0 del rounded-1"
                          >
                            <DeleteIcon className="white fs-xxl-16 fs-xl-17 fs-lg-16 fs-sm-16 fs-xs-15 textani" />
                          </button>
                        </div>
                        <p className="f4 message-text px-1 fs-xxl-16 fs-xl-17 fs-lg-16 fs-sm-16 fs-xs-15 textani black mb-0">
                          {msg}
                        </p>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>
              {type == "edit" && (
                <div className="d-flex ac-jb bg-light_blue text-areacont px-2 w-100 py-2">
                  <textarea
                    placeholder="Type here..."
                    className="w-100 border-0"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown} // Detect Enter key
                  />
                  <button
                    onClick={() => {
                      handleSendMessage();
                    }}
                    className="send-btn border-0 bg-primary3 white rounded-2 d-flex ac-jc"
                  >
                    <SendOutlinedIcon className="fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowupDetailScreen;
