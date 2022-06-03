import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col, message, Modal } from 'antd';
import Link from 'next/link';
import { registretion } from "../../services/auth.service";
import Router from "next/router";

const Register = () => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {

        try {
            values.email = values.email.toLowerCase();
            const response: any = await registretion({ data: values })
            if (!response || !response.hasOwnProperty("status")) {
                message.error('Something went wrong. Please reload and try again')
            }

            switch (response.status) {
                case 201:
                    form.resetFields();
                    Modal.confirm({
                        title: 'Success Message',
                        content: 'Successfully created your acount',
                        okText: 'Login Now',
                        cancelText: 'Stay',
                        onOk() {
                            Router.push("/dashboard");
                        },
                        onCancel() { 
                            return
                        },
                    });
                    break;
                default:
                    message.error(response?.message || "Something went wrong", 4)
            }
        } catch (error) {
            message.error('Something went wrong. Please reload and try again')
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='flex flex-col items-center justify-center h-full px-4 lg:px-20 py-4 pt-10'>
            <div className="text-blueGray-400 text-center mb-3 font-bold text-lg">
                Sign Up
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
                        label="email"
                        name="email"
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
                                <Link href="/">
                                    <Button type="primary" block ghost>
                                        Back to login
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

export default Register;