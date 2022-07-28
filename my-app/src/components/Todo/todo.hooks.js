/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from "react-router-dom";
import { hasUserSelector, userIdSelector } from "../../saga/Auth/auth.selector";
import { useDispatch, useSelector } from "react-redux";
const todoHooks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userID = useSelector(userIdSelector);
  const isLogin = useSelector(hasUserSelector);
  return {
    navigate,
    dispatch,
    userID,
    isLogin,
  };
};
export default todoHooks;
