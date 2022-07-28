/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { hasUserSelector } from "../saga/Auth/auth.selector";
import PrivateNavigator from "./PrivateNavigator";
import PublicNavigator from "./PublicNavigator";
import ResolveNavigator from "./ResolveNavigator";
const RootNavigator = () => {
  const [hasUser, setHasUser] = useState(useSelector(hasUserSelector));
  const location = useLocation();
  const renderUI = useMemo(() => {
    const isLogin = !!localStorage.getItem("token");
    if (hasUser) {
      return <PrivateNavigator setHasUser={setHasUser} />;
    } else if (isLogin) {
      return <ResolveNavigator setHasUser={setHasUser} />;
    }
    return <PublicNavigator />;
  }, [hasUser, location]);

  return <>{renderUI}</>;
};

export default RootNavigator;
