import { Route, Routes } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen";
import "./assets/scss/styles.scss";
import "./assets/scss/Font.scss";
import "./assets/scss/styles.scss";
import "./assets/scss/responcive.scss";
import "./assets/scss/keyframes.scss";
import "./assets/scss/custome.scss";
import "./assets/scss/fontSize.scss";
import "./assets/scss/width.scss";
import "./assets/scss/fonrmsstyle.scss";
import "./assets/scss/height.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import TelecallersDashboardScreen from "./Screens/TelecallersDashboardScreen";
import Layout from "./Components/Layout/Layout";
import ResetPasswordScreen from "./Screens/ResetPasswordScreen";
import ResetPasswordotpScreen from "./Screens/ResetPasswordotpScreen";
import LeadsListScreen from "./Screens/LeadsListScreen";
import LeadManageDetailScreen from "./Screens/LeadManageDetailScreen";
import PaymentUpdates from "./Screens/PaymentUpdates";
import PaymentDetails from "./Screens/PaymentDetails";
import PaymentList from "./Screens/PaymentList";
import NotificationScreen from "./Screens/NotificationScreen";
import PaymentProofListScreen from "./Screens/PaymentProofListScreen";
import PaymentProofAddScreen from "./Screens/PaymentProofAddScreen";
import PerformanceReportScreen from "./Screens/PerformanceReportScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import EnquiriesScreen from "./Screens/EnquiriesScreen";
import useToken from "./Data/Local/userToken";
import PageNotFoundScreen from "./Screens/PageNotFoundScreen";
import useUser from "./Data/Local/userDetail";

const ReactRoute = () => {
  const { token } = useToken();
  const { user } = useUser();

  console.log("tokenuser", token, user);
  return (
    <Routes>
      <Route path="*" element={<PageNotFoundScreen />} />
      {/* <Route path="/" element={<RegisterScreen />} /> */}
      {user?.telecaller?.token ? (
        <>
          <Route element={<Layout />}>
            <Route
              path="/telecallers/dashboard"
              element={<TelecallersDashboardScreen />}
            />
            <Route path="/" element={<TelecallersDashboardScreen />} />
            <Route path="/telecallers/leads" element={<LeadsListScreen />} />
            <Route
              path="/telecallers/leads/details"
              element={<LeadManageDetailScreen />}
            />
            <Route
              path="/telecallers/leads/add"
              element={<LeadManageDetailScreen />}
            />
            <Route
              path="/telecallers/payment-updates"
              element={<PaymentUpdates />}
            />
            <Route
              path="/telecallers/payment-updates/payment-list"
              element={<PaymentList />}
            />
            <Route
              path="/telecallers/payment-updates/payment-list/payment-detalis"
              element={<PaymentDetails />}
            />
            {/* <Route path="/telecallers/followup" element={<FollowupScreen />} /> */}
            {/* <Route
          path="/telecallers/close_followup"
          element={<CloseFollowupScreen />}
        /> */}
            <Route
              path="/telecallers/close_followup/details"
              element={<LeadManageDetailScreen />}
            />
            <Route
              path="/telecallers/perfomance-report"
              element={<PerformanceReportScreen />}
            />
            <Route
              path="/telecallers/followup/details"
              element={<LeadManageDetailScreen />}
            />
            <Route
              path="/telecallers/enrollment/details"
              element={<LeadManageDetailScreen />}
            />
            <Route
              path="/telecallers/payment-proof"
              element={<PaymentProofListScreen />}
            />
            <Route
              path="/telecallers/payment-proof/add"
              element={<PaymentProofAddScreen />}
            />
            <Route
              path="/telecallers/payment-proof/view"
              element={<PaymentProofAddScreen />}
            />

            <Route path="/telecallers/profile" element={<ProfileScreen />} />
            <Route
              path="/telecallers/enquiries"
              element={<EnquiriesScreen />}
            />
            <Route
              path="/telecallers/enquiries/details"
              element={<LeadManageDetailScreen />}
            />
            <Route
              path="/telecallers/notification"
              element={<NotificationScreen />}
            />
          </Route>
          <Route path="/resetpassword" element={<ResetPasswordScreen />} />
          <Route
            path="/otp-resetpassword"
            element={<ResetPasswordotpScreen />}
          />
        </>
      ) : (
        <>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/resetpassword" element={<ResetPasswordScreen />} />
          <Route
            path="/otp-resetpassword"
            element={<ResetPasswordotpScreen />}
          />
        </>
      )}
    </Routes>
  );
};

export default ReactRoute;
