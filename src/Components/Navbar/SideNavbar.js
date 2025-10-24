/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  logout_icon,
  menu_toggle,
  pro_icon,
  round_logo,
} from "../../assets/images";
import { SideNavList } from "../../Data/DummyJson";
import { useLocation, useNavigate } from "react-router-dom";

const SideNavbar = ({
  menuactive,
  toggleFun,
  setMenuActive,
  poppupHandle,
  profileData,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const pathname = location?.pathname;
  console.log("pathnprofileDataame", pathname, profileData);

  // Instead of hardcoding the URL
  const imageUrl = profileData?.profileimage || pro_icon;
  const onNavclike = (item) => {
    if (item?.navi === "logout") {
      poppupHandle("clike");
    } else {
      navigate(item?.navi);
    }
  };

  return (
    <>
      <div
        className={`${
          menuactive ? "navigation active" : "navigation"
        } textani `}
      >
        <ul className="">
          <div className="d-flex as-jb flex-column position-relative">
            <div className="w-100">
              <li className="">
                <div className="d-flex ac-js w-100 border-0 bg-transparent">
                  <div className="icon_box d-flex ac-jc">
                    <img src={round_logo} alt="" />
                  </div>
                </div>
              </li>
              <div
                onClick={() => {
                  navigate("/telecallers/profile");
                }}
                className={`${
                  menuactive ? "rounded-2" : "rounded-5 mx-md-3 mx-2 py-1 px-2"
                } pro-cont d-flex ac-js cp`}
              >
                <div className="pro-img d-flex ac-jc ">
                  <img
                    className="rounded-5"
                    src={imageUrl || pro_icon}
                    crossOrigin="anonymous"
                    alt="Profile"
                  />
                </div>
                <div className="textss">
                  <p className="mb-0 orange f4 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani">
                    {profileData?.name}
                    {/* <span className="white">Venkatesh</span> */}
                  </p>
                  <p className="mb-0 white f2 fs-xxl-14 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-12 textani">
                    {profileData?.role}
                  </p>
                </div>
              </div>
              <div className="d-flex ms-3 ac-jb gap-2 my-2">
                <p className="white t-hh mb-2 f3 fs-xxl-14 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-12 textani">
                  Features
                </p>
                <div className="line" />
              </div>
              <div className="d-flex flex-column gap-md-2 gap-0 px-1">
                {SideNavList?.map((item, index) => {
                  return (
                    <li
                      onClick={() => {
                        setActiveIndex(index);
                        if (
                          pathname === item?.navi ||
                          item?.sub?.find(
                            (subItem) => pathname === subItem?.list
                          )
                        ) {
                          setMenuActive(!menuactive);
                        } else if (
                          // (activeIndex === index && pathname === item?.navi) ||
                          pathname === item?.navi
                        ) {
                          setMenuActive(false);
                          onNavclike(item);
                        } else {
                          setMenuActive(true);
                          onNavclike(item);
                        }
                      }}
                      className={`${
                        (activeIndex === index && pathname === item?.navi) ||
                        pathname === item?.navi ||
                        item?.sub?.find((subItem) => pathname === subItem?.list)
                          ? "hovered"
                          : ""
                      } textani cp  `}
                      // className={`${
                      //   activeIndex === index ? "hovered" : ""
                      // } textani cp  `}
                    >
                      <a className="d-flex ac-js">
                        <div className="icon_box_list d-flex ac-jc">
                          <img
                          alt=""
                            src={
                              (activeIndex === index &&
                                pathname === item?.navi) ||
                              pathname === item?.navi ||
                              item?.sub?.find(
                                (subItem) => pathname === subItem?.list
                              )
                                ? item?.active_icon
                                : item?.inactive_icon
                            }
                          />
                          {menuactive && (
                            <span
                              style={{
                                content: '""',
                                position: "absolute",
                                bottom: "100%",
                                left: "50%",
                                transform: "translateX(-50%)",
                                backgroundColor: "#333",
                                color: "#fff",
                                padding: "4px 8px",
                                fontSize: "12px",
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                                borderRadius: "4px",
                                opacity: 0,
                                pointerEvents: "none",
                                transition: "opacity 0.3s ease",
                                zIndex: 10,
                              }}
                              className="tooltip-text"
                            >
                              {(item?.tooltip || item?.name)?.includes(" ") ? (
                                <>
                                  {(item?.tooltip || item?.name)?.split(" ")[0]}
                                  <br />
                                  {(item?.tooltip || item?.name)
                                    ?.split(" ")
                                    .slice(1)
                                    .join(" ")}
                                </>
                              ) : (
                                item?.tooltip || item?.name
                              )}
                            </span>
                          )}
                        </div>
                        <span className="title f5 fs-xxl-14 fs-xl-13 fs-lg-12 fs-sm-12 fs-xs-12">
                          {item?.name}
                        </span>
                      </a>
                      <style>
                        {`li:hover .tooltip-text {
                        opacity: 1 !important;}`}
                      </style>
                    </li>
                  );
                })}
              </div>
            </div>
            <div className="logout-cont d-flex ac-jb flex-column w-20">
              <div
                className={`${
                  menuactive ? "" : "cc"
                } logout cp w-100 d-flex ac-jb`}
              >
                <li className="">
                  <a className="d-flex ac-js">
                    <div
                      onClick={() => {
                        poppupHandle("clike");
                      }}
                      className="icon_box_list d-flex ac-jc cp"
                    >
                      <img src={logout_icon} alt="" />
                    </div>
                    {!menuactive && (
                      <span
                        onClick={() => {
                          poppupHandle("clike");
                        }}
                        className="title f5 ffs-xxl-13 fs-xl-13 fs-lg-12 fs-sm-12 fs-xs-12 textani cp"
                      >
                        Logout
                      </span>
                    )}
                  </a>
                </li>
                <button
                  onClick={() => {
                    toggleFun();
                  }}
                  className={`${
                    menuactive ? "opacity-0 d-none" : ""
                  } icon_box_list2 bg-transparent border-0`}
                >
                  <img src={menu_toggle} alt="" />
                </button>
              </div>
              {menuactive && (
                <div
                  className={`${
                    menuactive ? "" : "opacity-0 d-none"
                  } logout cp w-100 d-flex ac-jb`}
                >
                  <li>
                    <a className="d-flex ac-js">
                      <div
                        onClick={() => {
                          toggleFun();
                        }}
                        className="icon_box_list d-flex ac-jc"
                      >
                        <img src={menu_toggle} alt="" />
                      </div>
                    </a>
                  </li>
                </div>
              )}
            </div>
          </div>
        </ul>
      </div>
    </>
  );
};

export default SideNavbar;
