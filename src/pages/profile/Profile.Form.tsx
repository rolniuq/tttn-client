import React, { useState } from 'react';
import Layout from "../../components/Layout";
import { Form, Input, Button, Modal } from "antd";
import UserDocument from '../../interfaces/User.Interfaces';
import { UpdateProfile } from '../../services/Setting.Service';
import { useHistory } from "react-router-dom";
import { AnimationModal } from "../../utils/Common";

interface ProfileFormDocument {
  data: UserDocument;
}

const ProfileForm = ({ data }: ProfileFormDocument) => {
  const [message, setMessage] = useState<string>();
  const [user, setUser] = useState<UserDocument>(data);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const history = useHistory();

  const handleOk = () => {
    setConfirmLoading(true);
    UpdateProfile(user)
      .then(() => {
        history.push("/");
      })
      .catch((e) => {
        console.log(e);
        setMessage("Cập nhật thông tin thất bại");
      });
    AnimationModal(setShowModal, setConfirmLoading);
  }

  const handleCancel = () => {
    setShowModal(false);
  }

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

        <Form.Item label="* Số điện thoại">
          <Input value={user.phone} disabled />
        </Form.Item>

        <Form.Item label="* Email">
          <Input value={user.email} disabled />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16, }} className="register__form__button">
          <Button type="primary" htmlType="submit" onClick={() => setShowModal(true)}>
            Thay đổi
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Title"
        visible={showModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {
          message ? (
            <p>{message}</p>
          ) : (
            <p>Bạn có chắc chắn muốn thay đổi?</p>
          )
        }
      </Modal>
    </Layout>
  )
}

export default ProfileForm
