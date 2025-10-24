import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideNavbar from "../Navbar/SideNavbar";
import TopHeader from "./TopHeader";
import { topsetting } from "../../assets/images";
import LogoutPoppup from "../common/Logout/LogoutPoppup";
import PageLoad from "../common/Loading/PageLoad";
import useToken from "../../Data/Local/userToken";
import useUser from "../../Data/Local/userDetail";
import {
  useLazyTelecaller_viewQuery,
  useLogoutMutation,
} from "../../Data/Api/api";
import { toast } from "react-toastify";
import AccountActive from "../Poppup/AccountActive";
import { useSelector } from "react-redux";

const Layout = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuactive, setMenuActive] = useState(true);
  const [profileData, ssetProfileData] = useState(null);
  const [load, setLoad] = useState(false);
  const activestatus = useSelector((store) => store?.saveDeactiveSlice);

  const [logoutpop, setLogoutPop] = useState(false);

  const { token, setToken } = useToken();
  const { user, setUser } = useUser();

  const [profileViewApi] = useLazyTelecaller_viewQuery();

  // Api
  const [logoutApi] = useLogoutMutation();

  const toggleFun = () => {
    setMenuActive(!menuactive);
  };

  const poppupHandle = (type) => {
    console.log("PageLoad", type);
    if (type == "yes") {
      setLoad(true);
      logoutApi()
        .unwrap()
        .then((res) => {
          console.log("Res", res);
          toast.success(res?.message || "Logout Success");
        })
        .catch((err) => {
          console.log("err", err);
          setTimeout(() => {
            toast.success(err?.message || "Logout Success");
          }, 1000);
        })
        .finally(() => {
          setToken(null);
          setUser(null);
          navigate("/");
          setLogoutPop(false);
          setLoad(false);
          window.location.reload();
        });
    } else if (type == "no") {
      setLogoutPop(false);
    } else if (type == "clike") {
      setLogoutPop(true);
    }
  };

  const getProFun = () => {
    const id = user?.telecaller?.id;
    profileViewApi(id)
      .unwrap()
      .then((res) => {
        console.log("ProRes", res);
        ssetProfileData(res);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  useEffect(() => {
    getProFun();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 70) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <>
      <div className="layer">
        <div className="containersss">
          {logoutpop && <LogoutPoppup poppupHandle={poppupHandle} />}
          {load && <PageLoad />}
          {activestatus && <AccountActive poppupHandle={poppupHandle} />}
          <SideNavbar
            profileData={profileData}
            setMenuActive={setMenuActive}
            toggleFun={toggleFun}
            menuactive={menuactive}
            load={load}
            poppupHandle={poppupHandle}
          />
          <div className={`${menuactive ? "main active" : "main"}`}>
            <TopHeader
              setMenuActive={setMenuActive}
              toggleFun={toggleFun}
              menuactive={menuactive}
            />
            <div className="px-3 py-2 py-md-1 px-md-5">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
