import React, { Dispatch, SetStateAction } from 'react'
import Layout from "components/Layout";
import { Form, Input, Button } from "antd";
import UserDocument from 'interfaces/User.Interfaces';

interface OrderCashDocument {
  user: UserDocument;
  setComment: Dispatch<SetStateAction<string>>;
  setUser: Dispatch<SetStateAction<UserDocument>>;
  handleOrder() : void;
}

const OrderCash = ({ user, setUser, setComment, handleOrder }: OrderCashDocument) => {
  return (
    <Layout>
    <Form className="register__form"
      name="basic" labelCol={{ span: 8, }}
      wrapperCol={{ span: 16, }}
      initialValues={{ remember: true, }}
    >
      <Form.Item
        label="* Họ"
        rules={[
          {
            required: true,
            message: 'Họ không được trống!',
          },
        ]}
      >
        <Input value={user.lastName} onChange={(e) => setUser(prev => ({ ...prev, lastName: e.target.value }))} />
      </Form.Item>

      <Form.Item
        label="* Tên"
        rules={[
          {
            required: true,
            message: 'Tên không được trống!',
          },
        ]}
      >
        <Input value={user.firstName} onChange={(e) => setUser(prev => ({ ...prev, firstName: e.target.value }))} />
      </Form.Item>

      <Form.Item
        label="* Địa chỉ"
        rules={[
          {
            required: true,
            message: 'Địa chỉ không được trống!',
          },
        ]}
      >
        <Input value={user.address} onChange={(e) => setUser(prev => ({ ...prev, address: e.target.value }))} />
      </Form.Item>

      <Form.Item 
        label="* Số điện thoại"
        rules={[
          {
            required: true,
            message: 'Số điện thoại không được trống!',
          },
        ]}
      >
        <Input value={user.phone} onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))} />
      </Form.Item>

      <Form.Item 
        label="* Ghi chú"
      >
        <Input onChange={(e) => setComment(e.target.value)} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16, }} className="register__form__button">
        <Button type="primary" htmlType="submit" onClick={handleOrder}>
          Đặt hàng
        </Button>
      </Form.Item>
    </Form>
  </Layout>
  )
}

export default OrderCash
