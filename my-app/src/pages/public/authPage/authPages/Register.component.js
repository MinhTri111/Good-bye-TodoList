import React, { useState } from "react";
import { useField, Form, Formik } from "formik";
import * as Yup from "yup";
import { Input, Button, Row, Col, Spin, Card, Space, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../../../../saga/Auth/auth.action";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isLoadingSelector } from "../../../../saga/Auth/auth.selector";

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
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
              cfpassword: "",
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
              cfpassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Required"),
            })}
            onSubmit={(values) => {
              const email = values.email;
              const password = values.password;
              dispatch(
                registerRequest(
                  { email, password },
                  () => {
                    navigate("/login");
                    toast.success("Register Success!!!");
                  },
                  (message) => {
                    toast.error(message);
                  }
                )
              );
            }}
          >
            <Row justify='center'>
              <Card style={{ borderRadius: 20, marginTop: 10, width: 500 }}>
                <Form>
                  <Row justify='center'>
                    <h2>Register</h2>
                  </Row>
                  <Row justify='center'>
                    <Space direction='vertical' size='middle'>
                      <MyTextInput
                        label='Email:'
                        name='email'
                        id='email'
                        type='text'
                        placeholder='Your account...'
                      />
                      <MyTextInput
                        label='PassWord:'
                        name='password'
                        id='password'
                        type={showPass ? "text" : "password"}
                        placeholder='Your password...'
                      />
                      <MyTextInput
                        label='Confirm PassWord:'
                        name='cfpassword'
                        id='cfpassword'
                        type={showPass ? "text" : "password"}
                        placeholder='Your password...'
                      />
                      <Checkbox
                        onChange={(e) => {
                          setShowPass(e.target.checked);
                        }}
                      >
                        Show Password
                      </Checkbox>
                      <Button type='primary' htmlType='submit'>
                        Register
                      </Button>
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
