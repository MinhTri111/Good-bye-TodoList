import React, { useState } from "react";

import { Input, Col, Row } from "antd";
import "react-toastify/dist/ReactToastify.css";
import ListTodo from "../ListTodo/ListTodo.component";

export default function SearchTodo() {
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <div className='addTodo'>
        <Row>
          <Col span={5}>
            <label htmlFor='todo' style={{ marginLeft: 10, fontSize: 15 }}>
              Search Todo:
            </label>
          </Col>
          <Col span={15}>
            <Input
              placeholder='search todo'
              id='todo'
              style={{ borderRadius: 10 }}
              size='large'
              onChange={handleChange}
              value={search}
            />
          </Col>
          <Col span={24}>
            <ListTodo search={search} />
          </Col>
        </Row>
      </div>
    </>
  );
}
