import {
  dash_blue,
  dash_white,
  enquirie_blue,
  enquirie_white,
  leads_blue,
  leads_white,
  payment_blue,
  payment_white,
  paymentproof_blue,
  paymentproof_white,
} from "../assets/images";

export const loginForm = [
  {
    id: 1,
    formFeald: "firstName",
    type: "text",
    lable: "First Name",
    placeholder: "First Name",
  },
  {
    id: 2,
    formFeald: "lastName",
    type: "text",
    lable: "Last Name",
    placeholder: "Last Name",
  },
  {
    id: 3,
    formFeald: "email",
    type: "text",
    lable: "E-mail Address",
    placeholder: "Email",
  },
  {
    id: 4,
    formFeald: "phoneNumber",
    type: "text",
    lable: "Phone Number",
    placeholder: "Phone Number",
  },
  {
    id: 5,
    formFeald: "password",
    type: "password",
    lable: "Password",
    placeholder: "Password",
  },
  {
    id: 6,
    formFeald: "confirmPassword",
    type: "password",
    lable: "Confirm Password",
    placeholder: "confirm Password",
  },
];

export const SideNavList = [
  {
    id: 1,
    name: "Dashboard",
    navi: "/telecallers/dashboard",
    active_icon: dash_blue,
    inactive_icon: dash_white,
    sub: [
      {
        list: "/",
      },
    ],
  },
  // {
  //   id: 2,
  //   name: "Follow-ups",
  //   navi: "/telecallers/followup",
  //   active_icon: follow_blue,
  //   inactive_icon: follow_white,
  //   sub: [
  //     {
  //       list: "/telecallers/followup/details",
  //     },
  //   ],
  // },
  // {
  //   id: 3,
  //   name: "Close Follow ups",
  //   navi: "/telecallers/close_followup",
  //   active_icon: follow_blue,
  //   inactive_icon: follow_white,
  //   sub: [
  //     {
  //       list: "/telecallers/close_followup/details",
  //     },
  //   ],
  // },
  {
    id: 4,
    name: "Leads",
    navi: "/telecallers/leads",
    active_icon: leads_blue,
    inactive_icon: leads_white,
    sub: [
      {
        list: "/telecallers/leads/details",
      },
      {
        list: "/telecallers/followup/details",
      },
      {
        list: "/telecallers/close_followup/details",
      },
    ],
  },
  {
    id: 5,
    name: "Finance",
    navi: "/telecallers/payment-updates",
    active_icon: payment_blue,
    inactive_icon: payment_white,
    sub: [
      {
        list: "/telecallers/payment-updates/payment-list",
      },
      {
        list: "/telecallers/payment-updates/payment-list/payment-detalis",
      },
    ],
  },
  {
    id: 5,
    name: "Payment Proof",
    navi: "/telecallers/payment-proof",
    active_icon: paymentproof_blue,
    inactive_icon: paymentproof_white,
    sub: [
      {
        list: "/telecallers/payment-proof/add",
      },
      {
        list: "/telecallers/payment-proof/view",
      },
    ],
  },
  // {
  //   id: 6,
  //   name: "Performance Report",
  //   navi: "/telecallers/perfomance-report",
  //   active_icon: perfomreport_blue,
  //   inactive_icon: perfomreport_white,
  //   sub: [
  //     // {
  //     //   list: "/",
  //     // },
  //   ],
  // },
  {
    id: 7,
    name: "Enquiry",
    navi: "/telecallers/enquiries",
    active_icon: enquirie_blue,
    inactive_icon: enquirie_white,
    sub: [
      {
        list: "/telecallers/enquiries/details",
      },
    ],
  },
  // {
  //   id: 8,
  //   name: "Notifications ",
  //   navi: "/telecallers/notification",
  //   active_icon: notification_blue,
  //   inactive_icon: notification_white,
  //   sub: [
  //     // {
  //     //   list: "/",
  //     // },
  //   ],
  // },
];

export const leadsList = [
  {
    id: 1,
    lead_id: "LEAD001",
    name: "John Doe",
    email: "johndoe@gmail.com",
    dob: "01/01/2000",
    walk_in: "02/01/2025",
    passing_year: "2025",
    phone_number: "9361559411",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Enrollment",
    source: { id: 2, name: "Instagram" },
  },
  {
    id: 2,
    lead_id: "LEAD002",
    name: "Priya Sharma",
    email: "priya@gmail.com",
    dob: "05/03/1999",
    walk_in: "12/02/2025",
    passing_year: "2024",
    phone_number: "9361559412",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Not interested",
    source: { id: 6, name: "Reference" },
  },
  {
    id: 3,
    lead_id: "LEAD003",
    name: "Karthik R",
    email: "karthik@gmail.com",
    dob: "15/07/2001",
    walk_in: "10/02/2025",
    passing_year: "2023",
    phone_number: "9361559413",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Not responsing",
    source: { id: 3, name: "Facebook" },
  },
  {
    id: 4,
    lead_id: "LEAD004",
    name: "Sneha M",
    email: "sneha@gmail.com",
    dob: "22/08/2000",
    walk_in: "08/02/2025",
    passing_year: "2022",
    phone_number: "9361559414",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Not reachable",
    source: { id: 1, name: "Website" },
  },
  {
    id: 5,
    lead_id: "LEAD005",
    name: "Ravi Kumar",
    email: "ravi.k@gmail.com",
    dob: "11/11/1998",
    walk_in: "05/02/2025",
    passing_year: "2021",
    phone_number: "9361559415",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Switched Off",
    source: { id: 4, name: "LinkedIn" },
  },
  {
    id: 6,
    lead_id: "LEAD006",
    name: "Divya S",
    email: "divya@gmail.com",
    dob: "02/04/2002",
    walk_in: "04/02/2025",
    passing_year: "2022",
    phone_number: "9361559416",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Follow Ups",
    source: { id: 5, name: "YouTube" },
  },
  {
    id: 7,
    lead_id: "LEAD007",
    name: "Arun Raj",
    email: "arunraj@gmail.com",
    dob: "19/09/1997",
    walk_in: "03/02/2025",
    passing_year: "2020",
    phone_number: "9361559417",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Close Follow Ups",
    source: { id: 7, name: "Advertisement" },
  },
  {
    id: 8,
    lead_id: "LEAD008",
    name: "Meena K",
    email: "meena.k@gmail.com",
    dob: "10/12/1999",
    walk_in: "02/02/2025",
    passing_year: "2023",
    phone_number: "9361559418",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Discontinue",
    source: { id: 3, name: "Facebook" },
  },
  {
    id: 9,
    lead_id: "LEAD009",
    name: "Santhosh M",
    email: "santhosh@gmail.com",
    dob: "23/06/2001",
    walk_in: "01/02/2025",
    passing_year: "2023",
    phone_number: "9361559419",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Interested",
    source: { id: 2, name: "Instagram" },
  },
  {
    id: 10,
    lead_id: "LEAD010",
    name: "Lakshmi N",
    email: "lakshmi@gmail.com",
    dob: "30/10/2000",
    walk_in: "31/01/2025",
    passing_year: "2022",
    phone_number: "9361559420",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Enquiry",
    source: { id: 1, name: "Website" },
  },
  {
    id: 11,
    lead_id: "LEAD011",
    name: "Keerthana V",
    email: "keerthana@gmail.com",
    dob: "17/06/2001",
    walk_in: "11/01/2025",
    passing_year: "2024",
    phone_number: "9361559421",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Enrollment",
    source: { id: 3, name: "Facebook" },
  },
  {
    id: 12,
    lead_id: "LEAD012",
    name: "Sathish K",
    email: "sathish@gmail.com",
    dob: "09/03/1999",
    walk_in: "09/01/2025",
    passing_year: "2023",
    phone_number: "9361559422",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Enrollment",
    source: { id: 1, name: "Website" },
  },
  {
    id: 13,
    lead_id: "LEAD013",
    name: "Hari M",
    email: "hari@gmail.com",
    dob: "15/12/2000",
    walk_in: "08/01/2025",
    passing_year: "2022",
    phone_number: "9361559423",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Follow Ups",
    source: { id: 6, name: "Reference" },
  },
  {
    id: 14,
    lead_id: "LEAD014",
    name: "Nisha R",
    email: "nisha@gmail.com",
    dob: "12/08/1998",
    walk_in: "06/01/2025",
    passing_year: "2021",
    phone_number: "9361559424",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Close Follow Ups",
    source: { id: 4, name: "LinkedIn" },
  },
  {
    id: 15,
    lead_id: "LEAD015",
    name: "Vignesh D",
    email: "vignesh@gmail.com",
    dob: "25/11/1997",
    walk_in: "05/01/2025",
    passing_year: "2020",
    phone_number: "9361559425",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Close Follow Ups",
    source: { id: 2, name: "Instagram" },
  },
  {
    id: 16,
    lead_id: "LEAD016",
    name: "Deepa M",
    email: "deepa@gmail.com",
    dob: "03/07/1999",
    walk_in: "04/01/2025",
    passing_year: "2019",
    phone_number: "9361559426",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Close Follow Ups",
    source: { id: 1, name: "Website" },
  },
  {
    id: 17,
    lead_id: "LEAD017",
    name: "SUBRAMANI N",
    email: "lakshmi@gmail.com",
    dob: "30/10/2000",
    walk_in: "31/01/2025",
    passing_year: "2022",
    phone_number: "9361559420",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Enquiry",
    source: { id: 1, name: "Website" },
  },
  {
    id: 18,
    lead_id: "LEAD018",
    name: "KAVITHA",
    email: "lakshmi@gmail.com",
    dob: "30/10/2000",
    walk_in: "31/01/2025",
    passing_year: "2022",
    phone_number: "9361559420",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Enquiry",
    source: { id: 1, name: "Website" },
  },
  {
    id: 19,
    lead_id: "LEAD019",
    name: "SUJATHA N",
    email: "lakshmi@gmail.com",
    dob: "30/10/2000",
    walk_in: "31/01/2025",
    passing_year: "2022",
    phone_number: "9361559420",
    course: { course: "Digital marketing", amount: "25000" },
    status: "Enquiry",
    source: { id: 1, name: "Website" },
  },
];

export const followupleadsList = [
  {
    id: 1,
    name: "John Doe",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Follow Ups",
  },
  {
    id: 2,
    name: "Jane Smith",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Follow Ups",
  },
  {
    id: 3,
    name: "Mark Johnson",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Follow Ups",
  },
  {
    id: 4,
    name: "Emily Davis",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Follow Ups",
  },
  {
    id: 5,
    name: "Sankari",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Follow Ups",
  },
  {
    id: 6,
    name: "Michael Brown",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Follow Ups",
  },
  {
    id: 7,
    name: "Sarah Wilson",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Follow Ups",
  },
  {
    id: 7,
    name: "Sarah Wilson",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Follow Ups",
  },
];

export const closefollowupleadsList = [
  {
    id: 1,
    name: "John Doe",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Close Follow Ups",
  },
  {
    id: 2,
    name: "Jane Smith",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Close Follow Ups",
  },
  {
    id: 3,
    name: "Mark Johnson",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Close Follow Ups",
  },
  {
    id: 4,
    name: "Emily Davis",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Close Follow Ups",
  },
  // {
  //   id: 5,
  //   name: "Sankari",
  //   course: {
  //     course: "Digital marketing",
  //     amount: "25000",
  //   },
  //   status: "Close Follow Ups",
  // },
  // {
  //   id: 6,
  //   name: "Michael Brown",
  //   course: {
  //     course: "Digital marketing",
  //     amount: "25000",
  //   },
  //   status: "Close Follow Ups",
  // },
  // {
  //   id: 7,
  //   name: "Sarah Wilson",
  //   course: {
  //     course: "Digital marketing",
  //     amount: "25000",
  //   },
  //   status: "Close Follow Ups",
  // },
  // {
  //   id: 7,
  //   name: "Sarah Wilson",
  //   course: {
  //     course: "Digital marketing",
  //     amount: "25000",
  //   },
  //   status: "Close Follow Ups",
  // },
];

export const enrollementleadsList = [
  {
    id: 1,
    name: "Mark Johnson",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Enrollment",
  },
  {
    id: 2,
    name: "Emily Davis",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Enrollment",
  },
  {
    id: 3,
    name: "Sankari",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Enrollment",
  },
];

export const leadstatus = [
  {
    id: 1,
    name: "Enrollment",
  },
  {
    id: 2,
    name: "Not interested",
  },
  {
    id: 3,
    name: "Not responsing",
  },
  {
    id: 4,
    name: "Not reachable",
  },
  {
    id: 5,
    name: "Switched Off",
  },
  {
    id: 6,
    name: "Follow Ups",
  },
  {
    id: 7,
    name: "Close Follow Ups",
  },
  {
    id: 8,
    name: "Discontinue",
  },
  {
    id: 9,
    name: "Interested",
  },
  {
    id: 10,
    name: "Enquiry",
  },
];

export const leadsformtatus = [
  {
    id: 1,
    name: "Not interested",
  },
  {
    id: 2,
    name: "Not responsing",
  },
  {
    id: 3,
    name: "Not reachable",
  },
  {
    id: 4,
    name: "Switched Off",
  },
  {
    id: 5,
    name: "Follow Ups",
  },
  {
    id: 6,
    name: "Close Follow Ups",
  },
  {
    id: 7,
    name: "Discontinue",
  },
  {
    id: 8,
    name: "Interested",
  },
  {
    id: 9,
    name: "Enquiry",
  },
];

export const leadliststatus = [
  {
    id: 1,
    name: "Not interested",
  },
  {
    id: 2,
    name: "Not responsing",
  },
  {
    id: 3,
    name: "Not reachable",
  },
  {
    id: 4,
    name: "Switched Off",
  },
  {
    id: 5,
    name: "Close Follow Ups",
  },
  {
    id: 6,
    name: "Discontinue",
  },
  {
    id: 7,
    name: "Interested",
  },
  {
    id: 8,
    name: "Enquiry",
  },
];

export const PaymentUpdatesListStatus = [
  {
    id: 1,
    name: "Fully Paid",
  },
  {
    id: 2,
    name: "Partially Paid",
  },
];

export const PaymentUpdateList = [
  { id: 1, name: "John Doe", course: "React Basics", status: "Fully Paid" },
  {
    id: 2,
    name: "Jane Smith",
    course: "Node.js",
    status: "Partially Paid",
  },
  { id: 3, name: "Mark Johnson", course: "Python", status: "Fully Paid" },
  {
    id: 4,
    name: "Emily Davis",
    course: "JavaScript",
    status: "Partially Paid",
  },
  { id: 5, name: "Sankari", course: "JavaScript", status: "Fully Paid" },
  {
    id: 6,
    name: "Michael Brown",
    course: "Django",
    status: "Partially Paid",
  },
  {
    id: 7,
    name: "Sarah Wilson",
    course: "Vue.js",
    status: "Partially Paid",
  },
];

export const paymentList = [
  {
    id: 1,
    name: "John Doe",
    ModeOfPayment: "Credit Card",
    AmountReceived: "10,000",
    date: "22/05/2025",
  },
  {
    id: 2,
    name: "John Doe",
    ModeOfPayment: "Cash",
    AmountReceived: "15,000",
    date: "22/05/2025",
  },
];

export const leadaddform = [
  {
    id: 1,
    formFeald: "name",
    type: "text",
    lable: "Student Name*",
    placeholder: "Name",
  },
  {
    id: 2,
    formFeald: "email",
    type: "text",
    lable: "E-mail Address*",
    placeholder: "E-mail Address",
  },
  {
    id: 3,
    formFeald: "phoneno",
    type: "text",
    lable: "Phone Number*",
    placeholder: "Phone Number",
  },
  {
    id: 4,
    formFeald: "source",
    type: "dropdown",
    lable: "Source*",
    placeholder: "Source",
  },
  {
    id: 5,
    formFeald: "degree",
    type: "text",
    lable: "Student Degree",
    placeholder: "Student degree",
  },
  {
    id: 6,
    formFeald: "passedout",
    type: "number",
    lable: "Passed Out",
    placeholder: "Passed Out",
  },
  {
    id: 7,
    formFeald: "college_name",
    type: "text",
    lable: "College Name",
    placeholder: "College Name",
  },

  {
    id: 8,
    formFeald: "state",
    // type: "dropdownstate",
    type: "text",
    lable: "State*",
    selectplac: "State",
    placeholder: "State",
  },
  {
    id: 9,
    formFeald: "city",
    // type: "citydropdown",
    type: "text",
    lable: "City*",
    selectplace: "City",
    placeholder: "City",
  },
  {
    id: 10,
    formFeald: "pincode",
    type: "number",
    lable: "Pincode*",
    placeholder: "Pincode",
  },
  {
    id: 11,
    formFeald: "address",
    type: "text",
    lable: "Address*",
    placeholder: "Address",
  },
  // {
  //   id: 12,
  //   formFeald: "assignto",
  //   type: "text",
  //   lable: "Assigned To",
  //   placeholder: "Assigned To",
  // },
];

export const courselist = [
  {
    id: 1,
    name: "Digital marketing",
    amount: "25000",
  },
];

export const leadsListss = [
  {
    id: 1,
    name: "Sankari",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Enrollment",
  },
  {
    id: 2,
    name: "Pramila",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Enrollment",
  },
];

export const paymentlist = [
  {
    id: 1,
    data: {
      _id: "dytxy454",
      name: "Sankari",
      status: "Enrollment",
      email: "sankari@gmail.com",
      phon_no: "7824804291",
      course: "Digital marketing",
      address: "109, Sivan Kovil Street, Thiruvallur, chennai - 600067",
      pincode: 600067,
      city: "Chennai",
    },
    payment: {
      full_amount: "25000",
      balance: "20000",
      paid_amount: "5000",
      status: "Partially Paid",
      method: [
        {
          id: 1,
          method: "upi",
          amount: "2000",
          img: "",
          date: "23/05/2025",
        },
        {
          id: 2,
          method: "net cash",
          amount: "3000",
          img: "",
          date: "26/05/2025",
        },
      ],
    },
  },
  {
    id: 2,
    data: {
      _id: "dytxy454",
      name: "Ramya",
      status: "Enrollment",
      email: "sankari@gmail.com",
      phon_no: "7824804291",
      course: "Digital marketing",
      address: "109, Sivan Kovil Street, Thiruvallur, chennai - 600067",
      pincode: 600067,
      city: "Chennai",
    },
    payment: {
      full_amount: "25000",
      balance: "0",
      paid_amount: "25000",
      status: "Fully Paid",
      method: [
        {
          id: 1,
          method: "upi",
          amount: "2000",
          img: "",
          date: "22/05/2025",
        },
        {
          id: 2,
          method: "net cash",
          amount: "3000",
          img: "",
          date: "25/05/2025",
        },
        {
          id: 3,
          method: "net cash",
          amount: "20000",
          img: "",
          date: "29/05/2025",
        },
      ],
    },
  },
  {
    id: 3,
    data: {
      _id: "dytxy454",
      name: "Keerthana",
      status: "Enrollment",
      email: "sankari@gmail.com",
      phon_no: "7824804291",
      course: "Digital marketing",
      address: "109, Sivan Kovil Street, Thiruvallur, chennai - 600067",
      pincode: 600067,
      city: "Chennai",
    },
    payment: {
      full_amount: "25000",
      balance: "20000",
      paid_amount: "5000",
      status: "Partially Paid",
      method: [
        {
          id: 1,
          method: "upi",
          amount: "2000",
          img: "",
          date: "10/05/2025",
        },
        {
          id: 2,
          method: "net cash",
          amount: "3000",
          img: "",
          date: "20/05/2025",
        },
      ],
    },
  },
  {
    id: 4,
    data: {
      _id: "dytxy454",
      name: "Sujatha",
      status: "Enrollment",
      email: "sankari@gmail.com",
      phon_no: "7824804291",
      course: "Digital marketing",
    },
    payment: {
      full_amount: "25000",
      balance: "15000",
      paid_amount: "10000",
      status: "Partially Paid",
      method: [
        {
          id: 1,
          method: "upi",
          amount: "2000",
          date: "11/05/2025",
        },
        {
          id: 2,
          method: "net cash",
          amount: "3000",
          date: "04/06/2025",
        },
        {
          id: 3,
          method: "net cash",
          amount: "5000",
          date: "02/07/2025",
        },
      ],
    },
  },
];

export const leedtoggleList = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "Follow-ups",
  },
  {
    id: 3,
    name: "Close Follow ups",
  },
  {
    id: 4,
    name: "Enrollment",
  },
];

export const notificastionList = [
  {
    id: 1,
    title: "Lead Follow-up Reminder",
    message: "You have a follow-up scheduled with Priya S. today at 4:00 PM.",
    timestamp: "2025-04-05T10:00:00Z",
    type: "lead-reminder",
    leadName: "Priya S.",
    followUpTime: "4:00 PM",
    followUpDate: "2025-04-05",
    isRead: false,
  },
  {
    id: 2,
    title: "Upcoming Lead Call",
    message: "Reminder: Call with lead Arjun Kumar at 6:30 PM.",
    timestamp: "2025-04-05T09:00:00Z",
    type: "lead-reminder",
    leadName: "Arjun Kumar",
    followUpTime: "6:30 PM",
    followUpDate: "2025-04-05",
    isRead: false,
  },
  {
    id: 3,
    title: "Missed Lead Follow-up",
    message: "You missed a follow-up with Riya Sharma yesterday.",
    timestamp: "2025-04-04T20:00:00Z",
    type: "lead-missed",
    leadName: "Riya Sharma",
    followUpTime: "3:00 PM",
    followUpDate: "2025-04-04",
    isRead: true,
  },
  {
    id: 4,
    title: "Lead Follow-up Complete",
    message: "You successfully completed follow-up with Vishal M.",
    timestamp: "2025-04-03T18:00:00Z",
    type: "lead-complete",
    leadName: "Vishal M.",
    followUpTime: "2:00 PM",
    followUpDate: "2025-04-03",
    isRead: true,
  },
];

export const paymentproofForm = [
  {
    id: 1,
    formFeald: "studentname",
    type: "dropdown",
    lable: "Student Name*",
    placeholder: "Select Student",
  },
  {
    id: 2,
    formFeald: "paymentmethod",
    type: "dropdown",
    lable: "Payment Method*",
    placeholder: "Select Payment method",
  },
];

export const profileFieald = [
  {
    id: 1,
    formFeald: "name",
    type: "text",
    lable: "Student Name",
    placeholder: "Name",
  },
  {
    id: 2,
    formFeald: "email",
    type: "text",
    lable: "E-mail Address",
    placeholder: "E-mail Address",
  },
  {
    id: 3,
    formFeald: "phoneno",
    type: "text",
    lable: "Phone Number",
    placeholder: "Phone Number",
  },
  {
    id: 4,
    formFeald: "role",
    type: "text",
    lable: "Role",
    placeholder: "Role",
  },
];
