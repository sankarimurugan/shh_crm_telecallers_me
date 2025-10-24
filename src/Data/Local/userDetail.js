import { useState } from "react";
import { USER_DETAILS } from "./constants";

export default function useUser() {
  const getuser = () => {
    const userString = JSON.parse(localStorage.getItem(USER_DETAILS));
    return userString;
  };

  const [user, setUser] = useState(getuser());

  const saveUser = (userDetails) => {
    localStorage.setItem(USER_DETAILS, JSON.stringify(userDetails));
    setUser(userDetails);
  };

  return {
    setUser: saveUser,
    user,
  };
}
