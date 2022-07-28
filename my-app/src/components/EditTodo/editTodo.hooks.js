/* eslint-disable react-hooks/rules-of-hooks */
import { userIdSelector } from "../../saga/Auth/auth.selector";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadingSelector } from "../../saga/Todos/todos.selector";
const editTodoHooks = () => {
  const id = useParams().id;
  const name = useParams().name;
  const description = useParams().description;
  const userID = useSelector(userIdSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  return {
    id,
    name,
    description,
    userID,
    navigate,
    dispatch,
    loading,
  };
};
export default editTodoHooks;
