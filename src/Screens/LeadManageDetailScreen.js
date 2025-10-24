import React, { useEffect, useRef, useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import {
  leadaddform,
  leadsformtatus,
  leadstatus,
} from "../Data/DummyJson";
import { calendar_icon, time_icon } from "../assets/images";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { City, State } from "country-state-city";
import PageLoad from "../Components/common/Loading/PageLoad";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useLazyCourse_listQuery,
  useLazyLead_viewQuery,
  useLazyNotes_listQuery,
  useLazySource_listQuery,
  useLeadaddMutation,
  useLeadeditMutation,
  useNotes_postMutation,
  useNotesdeleteMutation,
  useNotesEditMutation,
} from "../Data/Api/api";
import { toast } from "react-toastify";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import LeadNotAssign from "../Components/Poppup/LeadNotAssign";

const LeadManageDetailScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const type = location?.state?.type;
  const routData = location?.state?.data;
  console.log("locatiroutDataon", location, routData, type);

  const scrollRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sourceLis, setSourceList] = useState([]);
  const [courseList, setCourceList] = useState([]);
  const messagesEndRef = useRef(null);
  const [fullData, setFulldata] = useState(null);
  const [formFeald, setFormFeald] = useState({
    name: "",
    email: "",
    phoneno: "",
    source: "",
    degree: "",
    passedout: "",
    college_name: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    assignto: "",
    status: "",
    followupdate: "",
    followuptime: "",
    enrollement_date: "",
    interested_course: "",
  });
  const [editbtn, setEditbtn] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoadin] = useState(false);
  const [leadnotpop, setLeadNotPop] = useState(false);

  // Api
  const [leadaddApi] = useLeadaddMutation();
  const [leadeditApi] = useLeadeditMutation();
  const [leadViewApi] = useLazyLead_viewQuery();
  const [getSourceApi] = useLazySource_listQuery();
  const [getCourceApi] = useLazyCourse_listQuery();

  // Notes Api
  const [notesaddApi] = useNotes_postMutation();
  const [noteslistApi] = useLazyNotes_listQuery();
  const [notesDeleteApi] = useNotesdeleteMutation();
  const [notesEditApi] = useNotesEditMutation();

  const handleSendMessage = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("newMessage", newMessage);
    if (newMessage.trim() !== "") {
      const payload = {
        message: newMessage,
        leadId: routData?._id,
      };
      console.log("payload", payload);
      notesaddApi(payload)
        .unwrap()
        .then((res) => {
          console.log("notssRes", res);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          setNewMessage("");
          getNotsFun();
        })
        .catch((err) => {
          console.log("err", err);
        })
        .finally(() => {});
    }
  };

  const states = State.getStatesOfCountry("IN");
  const cities = formFeald?.state?.isoCode
    ? City.getCitiesOfState("IN", formFeald?.state?.isoCode)
    : [];

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
      //
      case "degree":
        if (!stringValue && (formFeald?.passedout || formFeald?.college_name)) {
          errorMsg =
            "Degree is required when Passout year or College name is entered!";
        }
        break;

      case "passedout":
        if (formFeald?.degree && !stringValue) {
          errorMsg = "Passed Out year is required when Degree is entered!";
        } else if (stringValue) {
          const currentYear = new Date().getFullYear(); // Get current year like 2025
          const yearRegex = /^(19|20)\d{2}$/;
          if (!yearRegex.test(stringValue)) {
            errorMsg = "Please enter a valid 4-digit year.";
          } else if (parseInt(stringValue) > currentYear) {
            errorMsg = "Passed Out year cannot be in the future.";
          }
        }
        break;

      case "college_name":
        if (formFeald?.degree && !stringValue) {
          errorMsg = "College name is required when Degree is entered!";
        }
        break;
      //
      case "status":
        if (!stringValue) {
          errorMsg = "status is required!";
        }
        break;
      case "state":
        if (!stringValue) {
          errorMsg = "state is required!";
        }
        break;
      case "city":
        if (!stringValue) {
          errorMsg = "city is required!";
        }
        break;
      case "pincode":
        if (!stringValue) {
          errorMsg = "Pincode is required!";
        } else if (!/^\d{6}$/.test(stringValue)) {
          errorMsg = "Pincode must be exactly 6 digits!";
        }
        break;
      case "address":
        if (!stringValue) {
          errorMsg = "address is required!";
        }
        break;
      case "followupdate":
        if (!stringValue && formFeald?.status === "Follow Ups") {
          errorMsg = "Followup Date and Followup Time is required!";
        }
        break;
      case "followuptime":
        if (!stringValue && formFeald?.status === "Follow Ups") {
          errorMsg = "Followup Date and Followup Time is required!";
        }
        break;
      case "enrollement_date":
        if (!stringValue && formFeald?.status === "Enrollment") {
          errorMsg = "Enrollment Date is required!";
        }
        break;
      case "interested_course":
        if (!stringValue && formFeald?.interested_course === 0) {
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

  console.log("formFeald", formFeald);

  const editMessage = (index) => {
    const item = messages[index]; // Get the item to be edited
    console.log("item", item);
    const updatedMessage = prompt("Edit your message:", item?.text); // Show a prompt for editing
    if (updatedMessage !== null) {
      const id = item?._id; // Extract the message ID
      const payload = {
        message: updatedMessage,
      };

      // Call the API to update the message
      notesEditApi({ payload: payload, id: id })
        .unwrap()
        .then((res) => {
          // On successful API response, update the state with the new message text
          console.log("Res", res);

          setMessages((prevMessages) =>
            prevMessages.map((msg, i) =>
              i === index ? { ...msg, text: updatedMessage } : msg
            )
          );
        })
        .catch((err) => {
          console.log("Err", err);
          alert("Failed to update the message. Please try again.");
        });
    }
  };

  const deleteMessage = (index) => {
    const item = messages[index]; // Get the item to be deleted
    const id = item?._id; // Extract the message ID
    console.log("item", item);

    if (window.confirm("Are you sure you want to delete this message?")) {
      notesDeleteApi(id)
        .unwrap()
        .then((res) => {
          console.log("Message deleted successfully", res);
          setMessages((prevMessages) =>
            prevMessages.filter((_, i) => i !== index)
          );
        })
        .catch((err) => {
          console.log("Error deleting message", err);
          alert("Failed to delete the message. Please try again.");
        });
    }
  };

  const handleSubmit = () => {
    const isValid = Object.keys(formFeald).every((field) =>
      validateInput(field, formFeald[field])
    );
    if (isValid) {
      console.log("SuccccformFeald", formFeald);
      let payload = {
        name: formFeald?.name,
        email: formFeald?.email,
        phonenumber: formFeald?.phoneno,
        status: formFeald?.status,
        source: formFeald?.source,
        // assignedto: "Sujatha",
        degree: formFeald?.degree,
        passedout: formFeald?.passedout,
        college_name: formFeald?.college_name,
        address: formFeald?.address,
        state: formFeald?.state,
        city: formFeald?.city,
        pincode: formFeald?.pincode,
        followupdate: "",
        followuptime: "",
        enrollement_date: "",
      };
      if (formFeald?.interested_course?.addcourse) {
        payload.interested_course = formFeald?.interested_course;
      }
      if (formFeald?.status === "Follow Ups") {
        payload.followupdate = formFeald?.followupdate;
        payload.followuptime = formFeald?.followuptime;
      }
      if (formFeald?.status === "Enrollment") {
        payload.enrollement_date = formFeald?.enrollement_date;
      }

      console.log("payload", payload);
      setLoadin(true);
      if (type === "edit") {
        const id = routData?._id;
        leadeditApi({ payload, id })
          .unwrap()
          .then((res) => {
            console.log("EditRes", res);
            toast.success(res?.message || "Lead updated successfully");
            navigate(-1);
            setEditbtn(true);
          })
          .catch((err) => {
            console.log("Reserr", err);
            toast.error(
              err?.data?.message || err?.data?.error || "BAD_REQUEST"
            );
          })
          .finally(() => {
            setLoadin(false);
            scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
          });
      } else {
        leadaddApi(payload)
          .unwrap()
          .then((res) => {
            console.log("Res", res);
            toast.success(res?.message || "Lead created successfully");
            navigate(-1);
          })
          .catch((err) => {
            console.log("Reserr", err);
            toast.error(
              err?.data?.error || err?.data?.message || "BAD_REQUEST"
            );
          })
          .finally(() => {
            setLoadin(false);
            scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
          });
      }
    }
  };

  const dataGetFun = () => {
    setLoadin(true);
    const id = routData?._id;
    console.log("routDatawwid", routData, routData?._id);

    console.log("id", id);
    leadViewApi(id)
      .unwrap()
      .then((res) => {
        console.log("ladViRes", res);
        const lead = res?.lead || res?.data;
        setFulldata(lead);
        setFormFeald({
          name: lead?.name,
          email: lead?.email,
          phoneno: lead?.phonenumber,
          source: lead?.source,
          degree: lead?.degree,
          passedout: lead?.passedout,
          college_name: lead?.college_name,
          state: lead?.state,
          city: lead?.city,
          pincode: lead?.pincode,
          address: lead?.address,
          // assignto: lead?.assignedto,
          status: lead?.status,
          followupdate: lead?.followupdate,
          followuptime: lead?.followuptime,
          enrollement_date: lead?.enrollement_date,
          interested_course: lead?.interested_course,
        });
        console.log("formFeald", formFeald);

        getSourceFun();
      })
      .catch((err) => {
        console.log("viErr", err);
        setLeadNotPop(true);
      })
      .finally(() => {
        setLoadin(false);
      });
  };

  const getSourceFun = () => {
    setLoadin(true);
    getSourceApi()
      .unwrap()
      .then((res) => {
        console.log("souRes", res, res?.data);
        setSourceList(res?.data);
        getCourceApi()
          .unwrap()
          .then((course) => {
            console.log("Coures", course);
            setCourceList(course?.data);
          })
          .catch((err) => {
            console.log("Err", err);
          });
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoadin(false);
      });
  };

  console.log("courseList", courseList);

  const getNotsFun = () => {
    const id = routData?._id;
    noteslistApi(id)
      .unwrap()
      .then((res) => {
        console.log("noteRes", res);
        setMessages(res?.messages || []);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  useEffect(() => {
    if (type === "edit") {
      setEditbtn(true);
      dataGetFun();
      getNotsFun();
    } else {
      getSourceFun();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("fullData", fullData);

  return (
    <div ref={scrollRef} className="detaile-cont">
      {leadnotpop && <LeadNotAssign />}
      {loading && <PageLoad />}
      {type === "edit" && !loading && (
        <div className="w-100 d-flex ac-je">
          <button
            onClick={() => {
              navigate("/telecallers/payment-proof", {
                state: { type: "view", data: fullData || routData },
              });
            }}
            className="f3 px-1 bg-primarys rounded-2 border-0 px-3 py-1  fs-xxl-17  fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13 textani white mb-0"
          >
            Payment Proof
          </button>
        </div>
      )}
      {!loading && (
        <div className="d-flex as-jb mt-1 gap-4 det-layer">
          <div className="w-70 d-flex inputcont ac-jb flex-column gap-4 pb-5">
            <div className="left-box-cont ">
              <fieldset className="out-input rounded-5 d-flex ac-jc  ps-md-5 pe-md-5 px-3 pt-4 pb-5 position-relative">
                <legend className="f3 px-1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani black mb-0">
                  Personal Details
                </legend>
                {type === "edit" && editbtn && (
                  <button
                    onClick={() => {
                      setEditbtn(false);
                    }}
                    className="edit_conts rounded-5 d-flex ac-jc border-0 "
                  >
                    <ModeEditOutlineOutlinedIcon className=" fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani white mb-0" />
                  </button>
                )}
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
                        {item?.type === "dropdown" ? (
                          <div className="w-45">
                            <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                              {item?.lable}
                            </p>
                            <div className="lead_drop position-relative">
                              <select
                                disabled={type === "edit" && editbtn}
                                value={formFeald?.[item?.formFeald] || ""}
                                onChange={(e) => {
                                  fealdOnChange(
                                    item?.formFeald,
                                    e.target.value
                                  );
                                }}
                                className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                              >
                                <option value="" disabled hidden selected>
                                  Select {item?.selectplace}
                                </option>
                                {(item?.formFeald === "source"
                                  ? sourceLis
                                  : item?.list
                                )?.map((option) => (
                                  <option
                                    key={option?.id}
                                    className="light_gray w-100 rounded-2 px-2"
                                    value={option?.name || option?.sourcename}
                                  >
                                    {option?.name || option?.sourcename}
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
                        ) : item?.type === "citydropdown" ? (
                          <div className="w-45">
                            <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                              {item?.lable}
                            </p>
                            <div className="lead_drop position-relative">
                              <select
                                disabled={type === "edit" && editbtn}
                                value={formFeald?.city?.name || ""}
                                // onChange={(e) => {
                                //   fealdOnChange(item?.formFeald, e.target.value);
                                // }}
                                onChange={(e) => {
                                  const selectedCity = cities.find(
                                    (c) => c.name === e.target.value
                                  );
                                  // fetchPincode(selectedCity);
                                  fealdOnChange("city", selectedCity); // or selectedCity.name if you prefer just string
                                }}
                                className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                              >
                                <option value="" disabled hidden selected>
                                  Select {item?.selectplace}
                                </option>
                                {cities?.map((option) => (
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
                        ) : item?.type === "dropdownstate" ? (
                          <div className="w-45">
                            <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                              {item?.lable}
                            </p>
                            <div className="lead_drop position-relative">
                              <select
                                disabled={type === "edit" && editbtn}
                                value={formFeald?.state?.name || ""}
                                // onChange={(e) => {
                                //   fealdOnChange("state", e.target.value);
                                // }}
                                onChange={(e) => {
                                  const selectedState = states.find(
                                    (s) => s.name === e.target.value
                                  );
                                  fealdOnChange("state", selectedState); // Store state object
                                  fealdOnChange("city", ""); // Reset city when state changes
                                }}
                                className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                              >
                                <option value="" disabled hidden selected>
                                  Select State
                                </option>
                                {states?.map((option, index) => (
                                  <option
                                    key={index}
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
                              disabled={type === "edit" && editbtn}
                              type={item?.type}
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
                  Lead Details
                </legend>
                <div className="d-flex w-100 ac-jb flex-wrap gap-3">
                  <div className="w-45">
                    <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                      Status*
                    </p>
                    <div className="lead_drop position-relative">
                      {type==="edit" && fullData?.status==="Enrollment" ? (
                        <select
                          disabled
                          value={fullData?.status}
                          // onChange={(e) => {
                          //   fealdOnChange("status", e.target.value);
                          // }}
                          className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                        >
                          <option value="" disabled hidden selected>
                            Select Status
                          </option>
                          {leadstatus?.map((item) => {
                            return (
                              <option
                                key={item?.id}
                                className="light_gray w-100 rounded-2 px-2"
                                value={item.name}
                              >
                                {item?.name}
                              </option>
                            );
                          })}
                        </select>
                      ) : (
                        <select
                          disabled={type==="edit" && editbtn}
                          value={formFeald?.status}
                          onChange={(e) => {
                            fealdOnChange("status", e.target.value);
                          }}
                          className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                        >
                          <option value="" disabled hidden selected>
                            Select Status
                          </option>
                          {leadsformtatus?.map((item) => {
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
                      )}
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
                      Interested Course*
                    </p>
                    <div className="lead_drop position-relative">
                      {fullData?.status==="Enrollment" ? (
                        <select
                          disabled
                          value={formFeald?.interested_course?._id || ""}
                          onChange={(e) => {
                            const selectedId = e.target.value;
                            const selectedCourse = courseList.find(
                              (s) => s._id===selectedId
                            );

                            fealdOnChange("interested_course", selectedCourse); // ⭐ Store FULL object
                          }}
                          className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                        >
                          <option value="" disabled hidden>
                            Select Interested Course
                          </option>

                          {courseList?.map((item) => (
                            <option
                              key={item?._id}
                              value={item._id} // ⭐ Only ID goes inside <option>
                              className="light_gray w-100 rounded-2 px-2"
                            >
                              {item?.addcourse} {/* ⭐ Show course name */}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <select
                          disabled={type==="edit" && editbtn}
                          value={formFeald?.interested_course?._id || ""}
                          onChange={(e) => {
                            const selectedId = e.target.value;
                            const selectedCourse = courseList.find(
                              (s) => s._id===selectedId
                            );

                            fealdOnChange("interested_course", selectedCourse); // ⭐ Store FULL object
                          }}
                          className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                        >
                          <option value="" disabled hidden selected>
                            Select Interested Course
                          </option>
                          {courseList?.map((item) => (
                            <option
                              key={item?._id}
                              value={item._id} // ⭐ Only ID goes inside <option>
                              className="light_gray w-100 rounded-2 px-2"
                            >
                              {item?.addcourse} {/* ⭐ Show course name */}
                            </option>
                          ))}
                        </select>
                      )}
                      {errors?.interested_course && (
                        <div className="error">
                          <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani ">
                            {errors?.interested_course}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {formFeald?.status==="Follow Ups" && (
                    <div className="w-45 two_inputs position-relative">
                      <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                        Follow-up
                      </p>
                      <div className="d-flex ac-jc input_one rounded-2 gap-3 px-2">
                        <div className="d-flex ac-jb w-50 gap-1 ">
                          <div className="insideinpput d-flex ac-jc">
                            <img alt="" src={calendar_icon} />
                          </div>
                          <input
                            disabled={type==="edit" && editbtn}
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
                            <img alt="" src={time_icon} />
                          </div>
                          <input
                            disabled={type==="edit" && editbtn}
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
                  {formFeald?.status==="Enrollment" && (
                    <div className="w-45">
                      <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                        Enrollment Date
                      </p>
                      <div className="d-flex ac-js input_twoss rounded-2 px-2 gap-2">
                        <div className="insideinpput d-flex ac-jc">
                          <img alt="" src={calendar_icon} />
                        </div>
                        {fullData?.status==="Enrollment" ? (
                          <input
                            disabled
                            type={"date"}
                            value={fullData?.enrollement_date}
                            // onChange={(e) => {
                            //   fealdOnChange("enrollement_date", e.target.value);
                            // }}
                            placeholder="Conversion Date"
                            className="w-100  f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
                          />
                        ) : (
                          <input
                            disabled={type==="edit" && editbtn}
                            type={"date"}
                            value={formFeald?.enrollement_date}
                            onChange={(e) => {
                              fealdOnChange("enrollement_date", e.target.value);
                            }}
                            placeholder="Conversion Date"
                            className="w-100  f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </fieldset>
            </div>
            {!editbtn && (
              <div className="cust-sendbtn d-flex ac-jc w-100">
                <button
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="btn-sub border-0 bg-primary3 white f4 fs-xxl-18 fs-xl-18 fs-lg-17 fs-sm-16 fs-xs-15 rounded-3 textani"
                >
                  {type==="add" ? "Submit" : "Update"}
                </button>
              </div>
            )}
          </div>
          {type !== "add" && (
            <div className="w-30 not-cont d-flex as-jb flex-column ">
              <p className="f6 px-1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                Notes
              </p>
              <div className="rounded-2 text-cont h-100 w-100 ">
                <div className="shadow-layer">
                  <div
                    className={`${
                      messages?.length===0
                        ? ""
                        : "text-scroll p-3 d-flex flex-column w-100 as-js gap-3"
                    } text-scroll p-3 d-flex flex-column w-100 as-js gap-3 rounded-3 `}
                  >
                    {messages?.length===0 ? (
                      <div className="">
                        <p className="f4 px-1 fs-xxl-16 fs-xl-17 fs-lg-16 fs-sm-16 fs-xs-15 textani light_blue mb-0">
                          Add Notes here...
                        </p>
                      </div>
                    ) : (
                      messages?.map((msg, index) => {
                        console.log("msg", msg);
                        const date = new Date(msg?.timestamp);

                        // Options for formatting
                        const options = {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        };

                        const datetime = date.toLocaleString("en-US", options);
                        return (
                          <div
                            key={index}
                            className="px-2 py-3 rounded-2 listlayer position-relative"
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
                            <p className="message-text f4 px-1 fs-xxl-16 fs-xl-17 fs-lg-16 fs-sm-16 fs-xs-15 textani black mb-0">
                              {msg?.text}
                            </p>
                            <div className="notescont">
                              <p className="message-text f3 px-1 fs-xxl-10 fs-xl-10 fs-lg-9 fs-sm-9 fs-xs-8 textani mb-0">
                                {datetime}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </div>
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
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeadManageDetailScreen;
