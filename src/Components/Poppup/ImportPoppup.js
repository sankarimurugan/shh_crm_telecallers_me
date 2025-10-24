import React, { useState } from "react";
import { useBulkleaduplloadMutation } from "../../Data/Api/api";
import PageLoad from "../common/Loading/PageLoad";
import { toast } from "react-toastify";

const ImportPoppup = ({ poppupHandle }) => {
  const [file, setFile] = useState(null); // ✅ Added to store the actual file
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState([]);

  const [bulkUplloadApi] = useBulkleaduplloadMutation();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile); // ✅ Store file object
      setFileName(selectedFile.name);
    } else {
      alert("Please select a valid CSV file.");
      e.target.value = "";
      setFile(null); // ✅ Clear file object on invalid input
      setFileName("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a CSV file before submitting.");
      return;
    }

    setLoading(true);
    let formdata = new FormData();
    formdata.append("file", file);

    console.log("file", file);

    bulkUplloadApi(formdata)
      .unwrap()
      .then((res) => {
        console.log("res", res);
        toast.success(res?.status?.message || "Leads imported successfully");
        poppupHandle(null);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Err", err);
        setApiError(err?.data?.results?.failed || []);
        toast.error(err?.data?.message || "BAD_REQUEST");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="logpoppup d-flex ac-jc">
      {loading && <PageLoad />}
      <button
        className="poppup-layer border-0"
        onClick={() => poppupHandle(null)}
      />
      {apiError?.length == 0 && (
        <div className="logout-cont w-md-40 w-80 rounded-3 p-md-3 p-4 d-flex gap-4 ac-jc flex-column">
          <div className="d-flex ac-jc flex-column gap-md-4 gap-2 w-100">
            <input
              type="file"
              id="csvFile"
              accept=".csv"
              onChange={handleFileChange}
              className="upload-input"
            />
          </div>
          <a
            download
            href="/Sample.csv"
            className="peimary2 cp f3 text-center fs-xxl-15 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani"
          >
            Download sample CSV file to import leads.
          </a>

          <button
            onClick={handleSubmit}
            className="inner-btn py-2 py-md-2 yes w-md-30 wi-100 border-0 bg-primarys white rounded-3 textani f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
          >
            Submit
          </button>
        </div>
      )}
      {apiError?.length > 0 && (
        <div className="logout-contf w-md-40 w-80 rounded-3 p-md-3 p-4  d-flex gap-4 ac-jc flex-column">
          {apiError?.map((err) => {
            return (
              <div>
                <p className="red cp f3 text-center fs-xxl-15 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani mb-0">
                  {err?.email}
                </p>
                <p className="red cp f2 text-center fs-xxl-15 fs-xl-14 fs-lg-14 fs-sm-13 fs-xs-13 textani mb-0">
                  {err?.error}
                </p>
              </div>
            );
          })}
          <button
            className="inner-btn py-2 py-md-2 yes w-md-30 wi-100 border-0 bg-primarys white rounded-3 textani f2 fs-xxl-17 fs-xl-16 fs-lg-15 fs-sm-14 fs-xs-13"
            onClick={() => setApiError([])}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ImportPoppup;
