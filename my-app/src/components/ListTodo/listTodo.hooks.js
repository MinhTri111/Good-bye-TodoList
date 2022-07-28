/* eslint-disable react-hooks/rules-of-hooks */
import {
  todosSelector,
  loadingSelector,
  currentPageSelector,
} from "../../saga/Todos/todos.selector";
import { useDispatch, useSelector } from "react-redux";
const listTodoHooks = () => {
  const dispatch = useDispatch();
  const listTodo = useSelector(todosSelector);
  const loading = useSelector(loadingSelector);
  const currentPage = useSelector(currentPageSelector);
  return {
    dispatch,
    listTodo,
    loading,
    currentPage,
  };
};
export default listTodoHooks;
