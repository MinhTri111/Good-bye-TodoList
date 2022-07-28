/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadingSelector } from "../../saga/Todos/todos.selector";
import { useSelector } from "react-redux/es/exports";

const addTodoHooks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);

  return {
    navigate,
    dispatch,
    loading,
  };
};
export default addTodoHooks;
