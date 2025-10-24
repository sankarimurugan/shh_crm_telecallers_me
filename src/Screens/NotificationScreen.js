import React, { useEffect, useState } from "react";
import {
  useLazyNotificationlistQuery,
  useMessageReadMutation,
} from "../Data/Api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageLoad from "../Components/common/Loading/PageLoad";
import EmptyComp from "../Components/common/Empty/EmptyComp";
import useUser from "../Data/Local/userDetail";
import { saveNotificationSlice } from "../Data/Redux/slice/notificationSlice";
import { useDispatch } from "react-redux";

const NotificationScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  console.log("user", user);
  const telecalerId = user?.telecaller?.id;

  // Api
  const [notificationliatApi] = useLazyNotificationlistQuery();
  const [notificationread] = useMessageReadMutation();

  // const handleMarkAsRead = (id) => {
  //   const updatedNotifications = notifications.map((noti) =>
  //     noti.id === id ? { ...noti, isRead: true } : noti
  //   );
  //   setNotifications(updatedNotifications);
  // };

  const notificationGetFun = () => {
    setLoading(true);
    notificationliatApi(telecalerId)
      .unwrap()
      .then((res) => {
        console.log("notires", res);
        const notread = res?.data?.notifications?.filter(
          (item) => !item?.isRead
        );
        dispatch(saveNotificationSlice(notread || []));
        setNotifications(res?.data?.notifications || []);
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // paymentDetails

  const notificatioRead = (item) => {
    console.log("temsss", item);
    const data = item?.leadDetails;
    if (item?.isRead) {
      if (data?.status === "Approved") {
        toast.info("Payment Proof Approved");
      } else {
        navigate("/telecallers/leads/details", {
          state: { type: "edit", data: data },
        });
      }
    } else {
      setLoading(true);
      const id = item?._id;
      notificationread(id)
        .unwrap()
        .then((res) => {
          console.log("Res", res);
          notificationGetFun();
          navigate("/telecallers/leads/details", {
            state: { type: "edit", data: data },
          });
        })
        .catch((err) => {
          console.log("err", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    notificationGetFun();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <PageLoad />}
      {notifications?.length === 0 && !loading ? (
        <EmptyComp text={"Notification Not Found"} />
      ) : (
        !loading && (
          <div className="container mt-4">
            <div className="notification-container rounded-3 mb-3">
              <div className="notification-list">
                {notifications.map((item) => {
                  const isoString = item?.createdAt;
                  const dateObj = new Date(isoString);
                  const istDate = new Date(
                    dateObj.toLocaleString("en-US", {
                      timeZone: "Asia/Kolkata",
                    })
                  );
                  const dateOnly = istDate.toLocaleDateString("en-CA"); // Format: 2025-05-03
                  const timeOnly = istDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true, // This gives AM/PM format
                  });
                  return (
                    <div
                      key={item?._id}
                      className={`notification-card ${
                        !item?.isRead ? "unread" : ""
                      }`}
                      onClick={() => notificatioRead(item)}
                    >
                      <div className="noti-header">
                        <h4 className="f6 fs-xxl-16 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani black">
                          {item?.type === "lead_created" &&
                            "New Lead assigned to You!"}
                        </h4>
                      </div>
                      <p className="f3 fs-xxl-13 fs-xl-13 fs-lg-13 fs-sm-12 fs-xs-12 textani black">
                        {item?.message}
                      </p>
                      <span className="noti-time f4 fs-xxl-13 fs-xl-13 fs-lg-13 fs-sm-12 fs-xs-12 textani">
                        {dateOnly} | {timeOnly}
                      </span>
                      {!item?.isRead && <span className="dot"></span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NotificationScreen;
