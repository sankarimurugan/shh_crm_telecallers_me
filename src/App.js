import React, { useEffect, useRef, useState } from "react";
import ReactRoute from "./routes";
import NetworkScreen from "./Screens/NetworkScreen";
import { useLazyNotificationlistQuery } from "./Data/Api/api";
import { round_logo } from "./assets/images";
import { useNavigate } from "react-router-dom"; // Import if using React Router
import { useDispatch } from "react-redux";
import { saveNotificationSlice } from "./Data/Redux/slice/notificationSlice";

// Global variable to store navigation function
let navigateToNotifications = null;

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [getNotification] = useLazyNotificationlistQuery();
  const lastNotificationRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // If using React Router
  console.log("SHH CRM TELECALLER WEBSITE");

  // Store navigation function globally
  useEffect(() => {
    navigateToNotifications = () => navigate("/telecallers/notification");
    return () => {
      navigateToNotifications = null;
    };
  }, [navigate]);

  const requestNotificationPermission = () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return;
    }

    if (
      Notification.permission !== "granted" &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    }
  };

  const showNotification = () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return;
    }

    if (Notification.permission === "granted") {
      getNotification()
        .unwrap()
        .then((res) => {
          const notread = res?.data?.notifications?.filter(
            (item) => !item?.isRead
          );
          dispatch(saveNotificationSlice(notread || []));
          if (!res?.data?.notifications?.length) return;

          const now = new Date();
          const twentySecondsAgo = new Date(now.getTime() - 20000);

          // Filter notifications within the last 20 seconds
          const recentNotifications = res?.data?.notifications.filter(
            (item) => {
              const itemDate = new Date(item.createdAt);
              return itemDate > twentySecondsAgo && itemDate <= now;
            }
          );

          if (!recentNotifications.length) return;

          recentNotifications.forEach((item) => {
            if (lastNotificationRef.current !== item._id) {
              lastNotificationRef.current = item._id;

              const parser = new DOMParser();
              const doc = parser.parseFromString(item.message, "text/html");

              const title =
                doc.querySelector("h2")?.textContent ||
                item.type ||
                "Notification";

              const description =
                doc.querySelector("p")?.textContent ||
                item.message ||
                "You have a new message.";

              const notification = new Notification(title, {
                body: description,
                icon: round_logo,
              });

              notification.onclick = () => {
                window.focus(); // Focus the current tab

                // Navigate to notifications screen
                if (navigateToNotifications) {
                  navigateToNotifications();
                } else {
                  // Fallback if navigate function is not available
                  window.location.href = "/telecallers/notification";
                }
              };
            }
          });
        })
        .catch((err) => {
          console.error("Notification fetch error:", err);
        });
    } else {
      console.log("Notification permission is denied.");
    }
  };

  useEffect(() => {
    requestNotificationPermission();
    const intervalId = setInterval(showNotification, 20000);
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline ? <ReactRoute /> : <NetworkScreen />;
};

export default App;
