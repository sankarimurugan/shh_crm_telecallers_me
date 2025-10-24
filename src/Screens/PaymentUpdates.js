import React, { useEffect, useState } from "react";

import PaymentUpdatesList from "../Components/PaymentManage/PaymentUpdatesList";
import PageLoad from "../Components/common/Loading/PageLoad";
import { useLazyAllpayment_listQuery } from "../Data/Api/api";
import EmptyComp from "../Components/common/Empty/EmptyComp";

const PaymentUpdates = () => {
  const [loading, setLoadin] = useState(true);
  const [paymentlist, setPaymentlist] = useState([]);

  // Api
  const [paymentListApi] = useLazyAllpayment_listQuery();

  const dataGetFun = () => {
    setLoadin(true);
    paymentListApi()
      .unwrap()
      .then((res) => {
        console.log("res", res);
        setPaymentlist(res?.data?.grouped_payments || []);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoadin(false);
      });
  };

  useEffect(() => {
    dataGetFun();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="lead-head">
      {loading && <PageLoad />}
      {/* <div className="lead-h d-flex ac-jb"> */}
      {/* <p className=" mb-0 f7 primary3 fs-xxl-20 fs-xl-20 fs-lg-19 fs-sm-15 fs-xs-13 textani">
          Payment Updates
        </p> */}
      {/* <div className="d-flex ac-jb gap-3">
          <button className="refil-box d-flex ac-jc bg-primary3 rounded-3 border-0">
            <img src={refileicon} />
          </button>
        </div> */}
      {/* </div> */}
      {!loading && paymentlist?.length === 0 ? (
        <EmptyComp text={"Payments Not Found"} />
      ) : (
        !loading && <PaymentUpdatesList paymentlist={paymentlist} />
      )}
    </div>
  );
};

export default PaymentUpdates;
