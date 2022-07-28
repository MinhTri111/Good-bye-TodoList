/* eslint-disable react-hooks/exhaustive-deps */
import { Row, Col } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import "antd/dist/antd.min.css";
import RootNavigator from "../../navigation";
const TodoList = () => {
  return (
    <div className='App'>
      <div className='TodoList'>
        <Row>
          <Col span={24}>
            <h1 style={{ textAlign: "center", fontSize: 40 }}>
              TodoApp Redux-Saga
            </h1>
          </Col>
          <Col span={24}>
            <RootNavigator />
          </Col>
        </Row>
        <ToastContainer />
      </div>
    </div>
  );
};

export default TodoList;
