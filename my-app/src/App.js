import "react-toastify/dist/ReactToastify.css";
import RootNavigator from "./navigation";
import { ToastContainer } from "react-toastify";

const App = () => (
  <div className='App'>
    <div className='TodoList'>
      <h1 style={{ textAlign: "center", fontSize: 40 }}>TodoApp Redux-Saga</h1>
      <RootNavigator />
      <ToastContainer />
    </div>
  </div>
);

export default App;
