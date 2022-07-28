import React from "react";
import { useField, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Input, Button, Row, Col, Spin, Space, Card, Checkbox } from "antd";
import { loginRequest } from "../../../../saga/Auth/auth.action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isLoadingSelector } from "../../../../saga/Auth/auth.selector";
import { useState } from "react";
const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name} style={{ fontSize: 17 }}>
        {label}
        <Input
          {...field}
          {...props}
          autoComplete='on'
          style={{ borderRadius: 10 }}
          size='large'
        />
      </label>
      {meta.touched || meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(isLoadingSelector);
  const [showPass, setShowPass] = useState(false);

  return (
    <>
      <Row>
        <Col span={24}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .required("Required")
                .matches(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/s,
                  "Must be email"
                ),
              password: Yup.string()
                .min(6, "Must be 6 characters or less")
                .required("Required"),
            })}
            onSubmit={(values) => {
              dispatch(
                loginRequest(
                  values,
                  () => {
                    toast.success("Login success!!!");
                    navigate("/");
                  },
                  (mes) => {
                    toast.error(mes);
                  }
                )
              );
            }}
          >
            <Row justify='center'>
              <Card style={{ borderRadius: 20, marginTop: 10, width: 500 }}>
                <Form>
                  <Row justify='center'>
                    {" "}
                    <h2 style={{ marginTop: 15 }}>Login</h2>
                  </Row>
                  <Row justify='center'>
                    <Space direction='vertical' size='middle'>
                      <Col span={23}>
                        {" "}
                        <MyTextInput
                          label='Email:'
                          name='email'
                          id='email'
                          type='text'
                          placeholder='Your email...'
                        />
                      </Col>
                      <Col span={23}>
                        <MyTextInput
                          label='PassWord:'
                          name='password'
                          id='password'
                          type={showPass ? "text" : "password"}
                          placeholder='Your password...'
                        />
                      </Col>
                      <Checkbox
                        onChange={(e) => {
                          setShowPass(e.target.checked);
                        }}
                      >
                        Show Password
                      </Checkbox>
                      <Col span={20}>
                        <Button type='primary' htmlType='submit'>
                          Login
                        </Button>
                      </Col>
                    </Space>
                  </Row>
                </Form>
              </Card>
            </Row>
          </Formik>
        </Col>
        <Col span={2} offset={20}>
          {loading && <Spin tip='Loading...' />}
        </Col>
      </Row>
    </>
  );
}
