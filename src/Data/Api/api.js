import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, URL } from "./const";

export const api = createApi({
  reducerPath: "api",
  credentials: "include",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = localStorage.getItem("token");
      console.log("user_detailskss", token, endpoint);
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
      // DO NOT set Content-Type manually for FormData
      if (
        endpoint !== "leadpayment_proof_add" &&
        endpoint !== "profileEdit" &&
        endpoint !== "payment_proofEdit" &&
        endpoint !== "bulkleaduplload"
      ) {
        headers.set("Content-Type", "application/json");
      }

      headers.set("Accept", "application/json");
      return headers;
    },
  }),

  refetchOnMountOrArgChange: true,
  tagTypes: [],
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (payload) => ({
        url: URL.LOGIN,
        method: "POST",
        body: payload,
      }),
    }),

    // OTP Send
    send_otp: builder.mutation({
      query: (payload) => ({
        url: URL.SEND_OTP,
        method: "POST",
        body: payload,
      }),
    }),

    // Verify Send
    verify_otp: builder.mutation({
      query: (payload) => ({
        url: URL.VERIFY_OTP,
        method: "POST",
        body: payload,
      }),
    }),

    // ResetPassword Send
    reset_password: builder.mutation({
      query: ({ payload, email }) => ({
        url: `${URL.RESET_PASSWORD}/${email}`,
        method: "POST",
        body: payload,
      }),
    }),

    //Notes Delete
    notesdelete: builder.mutation({
      query: (id) => ({
        url: `${URL.NOTES_DELETE}/${id}`,
        method: "DELETE",
      }),
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: URL.LOGOUT,
        method: "POST",
      }),
    }),

    // Lead Add
    leadadd: builder.mutation({
      query: (payload) => ({
        url: URL.LEAD_ADD,
        method: "POST",
        body: payload,
      }),
    }),

    // Lead Payment Proof Add
    leadpayment_proof_add: builder.mutation({
      query: (formdata) => ({
        url: URL.PAYMEN_PROOF_ADD,
        method: "POST",
        body: formdata,
      }),
    }),

    // Notse Post
    notes_post: builder.mutation({
      query: (payload) => ({
        url: URL.NOTES_ADD,
        method: "POST",
        body: payload,
      }),
    }),

    // Checkin
    checkin: builder.mutation({
      query: () => ({
        url: URL.CHECKIN,
        method: "POST",
      }),
    }),

    // CheckOUT
    checkout: builder.mutation({
      query: () => ({
        url: URL.CHECKOUT,
        method: "POST",
      }),
    }),

    //Profile Edit
    profileEdit: builder.mutation({
      query: ({ formdata, id }) => ({
        url: `${URL.PROFILE_EDIT}/${id}`,
        method: "PUT",
        body: formdata,
      }),
    }),

    //payment_proof Edit
    payment_proofEdit: builder.mutation({
      query: ({ formdata, id }) => ({
        url: `${URL.PROOF_EDIT}/${id}`,
        method: "PUT",
        body: formdata,
      }),
    }),

    // Lead Edit
    leadedit: builder.mutation({
      query: ({ payload, id }) => ({
        url: `${URL.LEAD_EDIT}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    // Lead Edit
    notesEdit: builder.mutation({
      query: ({ payload, id }) => ({
        url: `${URL.NOTES_EDIT}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    // Payments method
    payment_methods: builder.query({
      query: () => ({
        url: URL.GET_PAYMENT_METHOD,
        method: "GET",
      }),
    }),

    // Notification list
    notificationlist: builder.query({
      query: () => ({
        url: `notifications/telecaller`,
        // url: `notifications/telecaller/${id}`,
        method: "GET",
      }),
    }),

    // Lead list
    lead_list: builder.query({
      query: () => ({
        url: `${URL.LEAD_LIST}`,
        method: "GET",
      }),
    }),

    // Source list
    source_list: builder.query({
      query: () => ({
        url: URL.SOURCE_LIST,
        method: "GET",
      }),
    }),

    //Proof View
    paymentProofView: builder.query({
      query: (id) => ({
        url: `${URL.PROOFVIE}/${id}/paymentproof`,
        method: "GET",
      }),
    }),

    allpayment_list: builder.query({
      query: () => ({
        url: URL.PAYMENT_LIST,
        method: "GET",
      }),
    }),

    course_list: builder.query({
      query: () => ({
        url: URL.GET_COURSE,
        method: "GET",
      }),
    }),

    all_proof_list: builder.query({
      query: () => ({
        url: URL.ALL_PROOF,
        method: "GET",
      }),
    }),

    notes_list: builder.query({
      query: (id) => ({
        url: `${URL.NOTES_GET}/${id}`,
        method: "GET",
      }),
    }),

    payment_history: builder.query({
      query: (id) => ({
        url: `${URL.PAYMENT_HISSTORY}/${id}`,
        method: "GET",
      }),
    }),

    // Lead view
    lead_view: builder.query({
      query: (id) => ({
        url: `${URL.LEAD_VIEW}/${id}`,
        method: "GET",
      }),
    }),

    payment_detaile: builder.query({
      query: (id) => ({
        url: `${URL.HISTORY_DETAIL}/${id}`,
        method: "GET",
      }),
    }),

    attendance_status: builder.query({
      query: () => ({
        url: URL.ATTENDANCE_STATUS,
        method: "GET",
      }),
    }),

    // Telicaler profile view
    telecaller_view: builder.query({
      query: (id) => ({
        url: `${URL.PROFILE_VIEW}/${id}`,
        method: "GET",
      }),
    }),
    // Leads Payment Proof
    leads_payment_proof: builder.query({
      query: (id) => ({
        url: `${URL.LEADS_PAY_PROOF}/${id}`,
        method: "GET",
      }),
    }),

    messageRead: builder.mutation({
      query: (id) => ({
        url: `${URL.NOTIFICATION_READ}/${id}`,
        method: "POST",
      }),
    }),

    // Bulk lead upload
    bulkleaduplload: builder.mutation({
      query: (payload) => ({
        url: URL.BULK_LEAD_ADD,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useLazyLead_listQuery,
  useLeadaddMutation,
  useLeadeditMutation,
  useLazyLead_viewQuery,
  useLazyLeads_payment_proofQuery,
  useLeadpayment_proof_addMutation,
  useLazyAllpayment_listQuery,
  useLazyTelecaller_viewQuery,
  useProfileEditMutation,
  useLazyPayment_methodsQuery,
  useLazySource_listQuery,
  useLazyCourse_listQuery,
  useLazyAll_proof_listQuery,
  useSend_otpMutation,
  useVerify_otpMutation,
  useReset_passwordMutation,
  useNotes_postMutation,
  useLazyNotes_listQuery,
  useNotesdeleteMutation,
  useLazyPayment_historyQuery,
  useNotesEditMutation,
  useLazyPaymentProofViewQuery,
  usePayment_proofEditMutation,
  useLazyPayment_detaileQuery,
  useLazyNotificationlistQuery,
  useMessageReadMutation,
  useBulkleaduplloadMutation,
  useCheckinMutation,
  useCheckoutMutation,
  useLazyAttendance_statusQuery,
} = api;
