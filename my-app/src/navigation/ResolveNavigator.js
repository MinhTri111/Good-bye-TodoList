/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserRequest } from "../saga/Auth/auth.action";

const ResolveNavigator = ({ setHasUser }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = !!localStorage.getItem("token");
    if (token) {
      dispatch(setUserRequest());
      setHasUser(true);
    }
  }, [dispatch]);
  return (
    <>
      <h1>LOADING</h1>
    </>
  );
};
export default ResolveNavigator;
