import React, {Children, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {userLoggedOut} from "../features/auth/authSlice";
import {jwtVerify} from "../utils/jwtVerify";

const AuthVerify = ({children}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const jwtExpired = jwtVerify();
    if (jwtExpired) {
      dispatch(userLoggedOut());
      localStorage.clear();
    }
  }, [location, dispatch]);
  return Children;
};

export default AuthVerify;
