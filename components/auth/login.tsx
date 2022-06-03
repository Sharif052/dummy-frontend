import React from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import Link from 'next/link';
import { login } from "../../services/auth.service";
import cookie from "cookie";
import { setCookie } from "nookies";
import Router from "next/router";

const Login = () => {
  const onFinish = async (values: any) => {
    const response: any = await login({ data: values })

    switch (response.status) {
      case 200:
        const token = response.headers["x-api-key"] || response.headers["X-API-KEY"];
        const maxAge = response.headers["x-api-key-expires"] || response.headers["X-API-KEY-EXPIRES"];
        console.log(token);
        setCookie(null,"token", token, {
          maxAge: maxAge,
          sameSite: "lax",
          path: "/",
        })
        setCookie(null, "me", response.data, {
          maxAge: maxAge,
          sameSite: "lax",
          path: "/",
        })
        Router.push("/dashboard");
        break;
      default:
        message.error(response?.message || "Something went wrong",4)
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='flex flex-col items-center justify-center h-full px-4 lg:px-20 py-4 pt-10'>
      <div className="text-blueGray-400 text-center mb-3 font-bold text-lg">
        Sign In
      </div>
      <div className='w-full lg:w-6/12 px-4'>
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            label='Email'
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                required: true,
                min: 2,
                message: 'Please input minimum 2 digit!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Row>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 6 }} md={{ span: 24, offset: 6 }} lg={{ span: 24, offset: 6 }} xl={{ span: 24, offset: 6 }}>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 6 }} md={{ span: 24, offset: 6 }} lg={{ span: 24, offset: 6 }} xl={{ span: 24, offset: 6 }}>
              <Form.Item>
                <Link href="/sign-up">
                  <Button type="primary" block ghost>
                    Create A New Account
                  </Button>
                </Link>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Login;