import React, { useEffect, useState } from "react";
import { droparrow } from "../../assets/images";

const LeadeList = () => {
  const leads = [
    { id: "001", name: "John Doe", course: "React Basics", status: "Pending" },
    { id: "002", name: "Jane Smith", course: "Node.js", status: "Enrolled" },
    { id: "003", name: "Mark Johnson", course: "Python", status: "Completed" },
    { id: "004", name: "Emily Davis", course: "JavaScript", status: "Pending" },
  ];
  const droplist = [
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
  ];
  const [openDropdown, setOpenDropdown] = useState(null);

  // Function to toggle dropdown visibility
  const handleDropdownClick = (leadId) => {
    setOpenDropdown(openDropdown === leadId ? null : leadId);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".table-drop")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="table-container rounded-3 mt-2">
      <table className="responsive-table rounded-3">
        <thead className="">
          <tr className="">
            <th className="py-3 px-2">Lead ID</th>
            <th className="py-3 px-2">Name</th>
            <th className="py-3 px-2">Course</th>
            <th className="py-3 px-2">Status</th>
            <th className="py-3 px-2">Action</th>
          </tr>
        </thead>
        <tbody className="">
          {leads.map((lead) => (
            <tr key={lead.id} style={{ background: "#ffffff59" }}>
              <td className="text-center border-0 py-3 px-2">{lead.id}</td>
              <td className="text-center border-0 py-3 px-2">{lead.name}</td>
              <td className="text-center border-0 py-3 px-2">{lead.course}</td>
              <td className="text-center border-0 py-3 px-2">
                <div className="position-relative">
                  <button
                    className="table-drop bg-white border-0 d-flex ac-jb px-3 rounded-5"
                    onClick={() => handleDropdownClick(lead.id)}
                  >
                    <p className="mb-0">Not Interested</p>
                    <div className="drop-img d-flex ac-jc">
                      <img src={droparrow} alt="Dropdown Arrow" />
                    </div>
                  </button>

                  {openDropdown === lead.id && (
                    <div className="dropdown-content">
                      {droplist.map((item) => (
                        <p key={item.id} className="dropdown-item">
                          {item.name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </td>
              <td className="text-center border-0 py-3 px-2">{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadeList;
