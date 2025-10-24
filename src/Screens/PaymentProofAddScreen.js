import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { paymentproofForm } from "../Data/DummyJson";
import { addproof_icon } from "../assets/images";
import PageLoad from "../Components/common/Loading/PageLoad";
import {
  useLazyLead_listQuery,
  useLazyPayment_methodsQuery,
  useLazyPaymentProofViewQuery,
  useLeadpayment_proof_addMutation,
  usePayment_proofEditMutation,
} from "../Data/Api/api";
import { toast } from "react-toastify";

const PaymentProofAddScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoadin] = useState(true);

  const type = location?.state?.type;
  const RouteData = location?.state?.data;
  const RouteDatanew = location?.state?.RouteData;

  console.log("tyRouteDatape", type, RouteData, RouteDatanew);

  const [image, setImage] = useState(null);
  const [imageObj, setImageObj] = useState(null);
  const [leadId, setLeadId] = useState(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [leadlist, setLeadList] = useState([]);
  const [paymentmethod, setPaymentMethod] = useState([]);
  const [formFeald, setFormFeald] = useState({});
  const [errors, setErrors] = useState({});

  const [getleadApi] = useLazyLead_listQuery();
  const [payproofAdd] = useLeadpayment_proof_addMutation();
  const [paymentmethodApi] = useLazyPayment_methodsQuery();
  const [proofViewApi] = useLazyPaymentProofViewQuery();
  const [proofEditApi] = usePayment_proofEditMutation();

  const today = new Date();
  const year = today.getFullYear(); // 2025
  const month = today.getMonth() + 1; // 4 (April) — add 1 because getMonth() returns 0-based month
  const date = today.getDate();
  const formatted = `${year}-${String(month).padStart(2, "0")}-${String(
    date
  ).padStart(2, "0")}`;

  console.log("formatted", formatted);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageObj(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (field, value) => {
    setFormFeald({ ...formFeald, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };
  console.log("formFedfjbald", formFeald);

  const validateForm = () => {
    const newErrors = {};
    paymentproofForm.forEach((item) => {
      const value = formFeald[item.formFeald];
      if (!value || value.trim() === "") {
        newErrors[item.formFeald] = `${item.lable} is required`;
      }
    });
    if (!image) {
      newErrors.image = "Payment proof image is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    console.log("Submit Data", { ...formFeald, image }, type, RouteData?._id);

    if (validateForm()) {
      setLoadin(true);
      let formdata = new FormData();
      formdata.append(
        "data",
        leadId?._id || RouteDatanew?._id || RouteData?._id
      );
      // formdata.append("data", RouteData||leadId);
      formdata.append("paymentmethood", formFeald?.paymentmethod);
      formdata.append("status", "Pending");
      // formdata.append("status", "Verified");
      console.log("imageObj", imageObj);
      if (imageObj) {
        formdata.append("image", imageObj);
      }
      if (type === "view") {
        const id = RouteData?._id;
        proofEditApi({ formdata: formdata, id: id })
          .unwrap()
          .then((res) => {
            console.log("res", res);
            toast.success(res?.message || "Telepay proof updated successfully");
            navigate(-1);
          })
          .catch((err) => {
            console.log("err", err);
            toast.error(err?.data?.message || "BAD_REQUEST");
            setLoadin(false);
          })
          .finally(() => {
            setLoadin(false);
          });
      } else {
        payproofAdd(formdata)
          .unwrap()
          .then((res) => {
            console.log("ProofAdres", res);
            toast.success(res?.message || "Telepay proof added successfully");
            navigate(-1);
            // const payload = {
            //   status: "Enrollment",
            //   enrollement_date: formatted,
            // };
            // const id = RouteData?._id || leadId?._id;
            // console.log("payloaidd", payload, id);
            // leadeditApi({ payload: payload, id: id })
            //   .unwrap()
            //   .then((neres) => {
            //     console.log("Res", neres);
            //     toast.success(
            //       res?.message || "Telepay proof added successfully"
            //     );
            //     navigate(-1);
            //   });
          })
          .catch((err) => {
            console.log("err", err);
            toast.error(err?.data?.message || "BAD_REQUEST");
            setLoadin(false);
          });
      }
    }
  };

  const dataGetFun = () => {
    setLoadin(true);
    getleadApi()
      .unwrap()
      .then((res) => {
        console.log("viedhures", res);
        const getuser = res?.data?.find((item) => item?._id === RouteData?._id);
        console.log("getuserId", getuser);
        if (getuser) {
          handleInputChange("studentname", getuser?.name); // or getuser._id if you're using id
        }
        if (type === "view") {
          setLeadList(res?.data || []);
        } else {
          const leadlists = res?.data?.filter(
            (item) => item?.fullyPaid === false
          );
          console.log("leadlists", leadlists);
          setLeadList(leadlists || []);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoadin(false);
      });
  };

  const paymentMethodFun = () => {
    paymentmethodApi()
      .unwrap()
      .then((res) => {
        setPaymentMethod(res?.data || []);
        console.log("Methodres", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const proofViewwFun = () => {
    setLoadin(true);
    if (RouteDatanew) {
      const id = RouteDatanew?._id;
      proofViewApi(id)
        .unwrap()
        .then((res) => {
          console.log("ProofRes", res);
          const lead = res?.data?.lead;
          const paymentDet = res?.data?.payment_proof;
          setFormFeald({
            ...formFeald,
            paymentmethod: paymentDet?.payment_method || "",
            studentname: lead?.name || "",
          });
          setImage(paymentDet?.image);
          setLeadId(lead);
          console.log("formFeald", lead?.name, paymentDet);
        })
        .catch((err) => {
          console.log("Err", err);
        })
        .finally(() => {
          setLoadin(false);
        });
    } else {
      const id = RouteData?._id;
      proofViewApi(id)
        .unwrap()
        .then((res) => {
          console.log("ProofRes", res);
          const lead = res?.data?.lead;
          const paymentDet = res?.data?.payment_proof;
          setFormFeald({
            ...formFeald,
            paymentmethod: paymentDet?.payment_method || "",
            studentname: lead?.name || "",
          });
          setImage(paymentDet?.image);
          setLeadId(lead);
          console.log("formFeald", lead?.name, paymentDet);
        })
        .catch((err) => {
          console.log("Err", err);
        })
        .finally(() => {
          setLoadin(false);
        });
    }
  };

  useEffect(() => {
    // RouteData?.status==="Approved"
    if (type === "add") {
      console.log("Addddes leaddd");
      dataGetFun();
    } else if (type === "view") {
      console.log("viewww leaddd");
      proofViewwFun();
      dataGetFun();
    } else if (RouteDatanew) {
      console.log("routedatanew leaddd");
      proofViewwFun();
    }
    paymentMethodFun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("leadIdleadIdleadId", leadId, formFeald);

  return (
    <div className="paymentp-cont">
      {loading && <PageLoad />}
      {!loading && (
        <div>
          {RouteData?.status !== "Approved" ? (
            <div className="left-box-cont mt-3">
              <fieldset className="out-input w-70 rounded-5 d-flex ac-jc ps-md-5 pe-md-5 px-3 pt-4 pb-5">
                <legend className="f3 px-1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani black mb-0">
                  Personal Details
                </legend>
                <div className="d-flex w-100 ac-jb flex-wrap gap-3">
                  {paymentproofForm?.map((item) => (
                    <React.Fragment key={item?.formFeald}>
                      {item?.type === "dropdown" ? (
                        <div className="lead_drop position-relative w-45">
                          <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                            {item?.lable}
                          </p>
                          <select
                            disabled={
                              RouteData && item?.formFeald === "studentname"
                            }
                            className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                            value={formFeald[item?.formFeald] || ""}
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              handleInputChange(item?.formFeald, selectedValue);
                              if (item?.formFeald === "studentname") {
                                const selectedOption = leadlist?.find(
                                  (option) => option?.name === selectedValue
                                );
                                if (selectedOption) {
                                  setLeadId(selectedOption);
                                }
                              }
                              // handleInputChange(item?.formFeald, e.target.value);
                            }}
                          >
                            <option value="" disabled hidden>
                              {item?.placeholder}
                            </option>
                            {(item?.formFeald === "studentname"
                              ? leadlist
                              : paymentmethod
                            )?.map((option) => (
                              <option
                                key={option?.id}
                                value={option?.name || option?.amountname}
                              >
                                {option?.name || option?.amountname}
                              </option>
                            ))}
                          </select>
                          {errors[item?.formFeald] && (
                            <p className="mb-0 red text-end f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani">
                              {errors[item?.formFeald]}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="w-45 position-relative">
                          <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                            {item?.lable}
                          </p>
                          <input
                            className="w-100 rounded-2 px-2 f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
                            value={formFeald[item?.formFeald] || ""}
                            onChange={(e) =>
                              handleInputChange(item?.formFeald, e.target.value)
                            }
                          />
                          <div className="error">
                            {errors[item?.formFeald] && (
                              <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani">
                                {errors[item?.formFeald]}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                  <div className="d-flex w-100">
                    <div>
                      <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                        Upload a Payment Proof*
                      </p>
                      {image === null ? (
                        <div
                          onClick={handleButtonClick}
                          className="proofimg mt-3 rounded-2 cp d-flex ac-jc"
                        >
                          <img
                            crossOrigin="anonymous"
                            src={addproof_icon}
                            alt="Add Proof"
                          />
                        </div>
                      ) : (
                        <div className="proofimg2 mt-3 rounded-2 cp d-flex ac-jc position-relative">
                          <img
                            crossOrigin="anonymous"
                            src={image}
                            alt="Uploaded"
                          />
                          <div className="view_imgcont d-flex ac-jc">
                            <button
                              className="mb-0 border-0 white f5 text-bgss text-center d-flex ac-jc rounded-3"
                              onClick={() => setIsZoomOpen(true)}
                            >
                              View img
                            </button>
                          </div>
                          <div className="imgadd_btn d-flex ac-jc">
                            <button
                              onClick={handleButtonClick}
                              className="w-100 border-0"
                            >
                              Change Image
                            </button>
                          </div>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                      />
                      {errors.image && image === null && (
                        <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani mt-2">
                          {errors.image}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    style={{
                      height: "44px",
                      width: "150px",
                      position: "relative",
                      zIndex: 200000,
                    }}
                    onClick={handleSubmit}
                    className="refil-box white f4 mt-3 d-flex ac-jc bg-primary3 rounded-3 border-0"
                  >
                    {type === "view" ? "Update" : "Submit"}
                  </button>
                </div>
              </fieldset>
            </div>
          ) : (
            <div className="left-box-cont mt-3">
              <fieldset className="out-input w-70 rounded-5 d-flex ac-jc ps-md-5 pe-md-5 px-3 pt-4 pb-5">
                <legend className="f3 px-1 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani black mb-0">
                  Personal Details
                </legend>
                <div className="d-flex w-100 ac-jb flex-wrap gap-3">
                  {paymentproofForm?.map((item) => (
                    <React.Fragment key={item?.formFeald}>
                      {item?.type === "dropdown" ? (
                        <div className="lead_drop position-relative w-45">
                          <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                            {item?.lable}
                          </p>
                          <select
                            disabled
                            className="w-100 px-2 rounded-3 shadow border-0 mb-1 f3 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
                            value={formFeald[item?.formFeald] || ""}
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              handleInputChange(item?.formFeald, selectedValue);
                              if (item?.formFeald === "studentname") {
                                const selectedOption = leadlist?.find(
                                  (option) => option?.name === selectedValue
                                );
                                if (selectedOption) {
                                  setLeadId(selectedOption);
                                }
                              }
                              // handleInputChange(item?.formFeald, e.target.value);
                            }}
                          >
                            <option value="" disabled hidden>
                              Select {item?.lable}
                            </option>
                            {(item?.formFeald === "studentname"
                              ? leadlist
                              : paymentmethod
                            )?.map((option) => (
                              <option
                                key={option?.id}
                                value={option?.name || option?.amountname}
                              >
                                {option?.name || option?.amountname}
                              </option>
                            ))}
                          </select>
                          {errors[item?.formFeald] && (
                            <p className="mb-0 red text-end f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani">
                              {errors[item?.formFeald]}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="w-45 position-relative">
                          <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                            {item?.lable}
                          </p>
                          <input
                            disabled
                            className="w-100 rounded-2 px-2 f4 black fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-14 fs-xs-13 textani"
                            value={formFeald[item?.formFeald] || ""}
                            onChange={(e) =>
                              handleInputChange(item?.formFeald, e.target.value)
                            }
                          />
                          <div className="error">
                            {errors[item?.formFeald] && (
                              <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani">
                                {errors[item?.formFeald]}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                  <div className="d-flex w-100">
                    <div>
                      <p className="f6 px-1 fs-xxl-18 fs-xl-17 fs-lg-16 fs-sm-15 fs-xs-13 textani primary2 mb-0">
                        Upload a Payment Proof
                      </p>
                      {image === null ? (
                        <div
                          onClick={handleButtonClick}
                          className="proofimg mt-3 rounded-2 cp d-flex ac-jc"
                        >
                          <img
                            crossOrigin="anonymous"
                            src={addproof_icon}
                            alt="Add Proof"
                          />
                        </div>
                      ) : (
                        <div className="proofimg2 mt-3 rounded-2 cp d-flex ac-jc position-relative">
                          <img
                            crossOrigin="anonymous"
                            src={image}
                            alt="Uploaded"
                          />
                          <div className="view_imgcont d-flex ac-jc">
                            <button
                              className="mb-0 border-0 white f5 text-bgss text-center d-flex ac-jc rounded-3"
                              onClick={() => setIsZoomOpen(true)}
                            >
                              View img
                            </button>
                          </div>
                          {/* <div className="imgadd_btn d-flex ac-jc">
                            <button
                              onClick={handleButtonClick}
                              className="w-100 border-0"
                            >
                              Change Image
                            </button>
                          </div> */}
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                      />
                      {errors.image && image === null && (
                        <p className="mb-0 red f3 fs-xxl-12 fs-xl-12 fs-lg-11 fs-sm-10 fs-xs-10 textani mt-2">
                          {errors.image}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          )}
        </div>
      )}

      {isZoomOpen && (
        <div
          onClick={() => setIsZoomOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            cursor: "zoom-out",
          }}
        >
          <img
            src={image}
            crossOrigin="anonymous"
            alt="Zoomed"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              boxShadow: "0 0 15px #000",
              background: "#fff",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentProofAddScreen;
