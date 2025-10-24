import { useState } from "react";
import { TOKEN } from "./constants";

export default function useToken() {
  const getToken = () => {
    const tokenString = JSON.parse(localStorage.getItem(TOKEN));

    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem(TOKEN, JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
