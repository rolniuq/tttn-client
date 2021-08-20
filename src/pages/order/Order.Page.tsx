import React, { useState, useEffect } from 'react';
import Header from "components/Header";
import Done from "./Order.Done";
import { Modal } from "antd";
import UserDocument from 'interfaces/User.Interfaces';
import { DeleteListCart, GetProfile } from 'services/Setting.Service';
import Spinner from 'components/Spinner';
import { CreateOrder } from 'services/Setting.Service';
import OrderDocument from 'interfaces/Order.Interface';
import { AnimationModal } from 'utils/Common';
import Feed from "./Order.Form";
import ByCash from "./Order.Cash";

const OrderPage = ({ location }: any) => {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [comment, setComment] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [from, setFrom] = useState<string>();
  const [buy, setBuy] = useState<boolean>(false);
  const [payMethod, setPayMethod] = useState<string>("");
  const [order, setOrder] = useState<OrderDocument>({
    comment: "",
    infoGuest: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
    },
    orderDetails: cart,
  });
  const [user, setUser] = useState<UserDocument>({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    cPassword: "",
  });

  useEffect(() => {
    setCart(location.state.cart);
    setFrom(location.state.from);
  }, []);

  useEffect(() => {
    GetProfile()
      .then(res => {
        setUser(res.data.result);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    if (buy) {
      cleanCartAfterOrder();
    }
  }, [buy])

  const handleClickOrder = () => {
    setOrder({
      comment: comment,
      infoGuest: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address,
      },
      orderDetails: cart,
    });

    setShowModal(true);
  }

  const handleOk = () => {
    setConfirmLoading(true);
    console.log(order);
    CreateOrder(order)
      .then(() => {
        Modal.success({
          content: 'Xin cảm ơn quý khách hàng đã tin tưởng dịch vụ chúng tôi!',
        });
        setBuy(true);
        AnimationModal(setShowModal, setConfirmLoading);
      })
      .catch(e => {
        console.log(e);
        AnimationModal(setShowModal, setConfirmLoading);
      });
  }

  const cleanCartAfterOrder = () => {
    if (from === "cart") {
      const list = GetListIDCarts();
      DeleteListCart(list)
        .catch(e => {
          console.log(e);
        });
    }
  }

  const GetListIDCarts = () => {
    let result: string[] = [];
    for (let i = 0; i < cart.length; i++) {
      result.push(cart[i].product);
    }

    return result;
  }

  const handleCancel = () => {
    setShowModal(false);
  }

  return (
    <>
      <Header />
      {
        loading ? (
          <Spinner />
        ) : (
          <>
            {
              buy ? (
                <Done />
              ) : (
                <>
                  {
                    (payMethod === "cash" && !loading) ? (
                      <ByCash 
                        user={user} 
                        setUser={setUser} 
                        setComment={setComment}
                        handleOrder={handleClickOrder}/>
                    ) : (
                      <Feed
                        carts={cart}
                        setPayMethod={setPayMethod}
                        setBuy={setBuy}
                      />
                    )
                  }
                </>
              )
            }
          </>
        )
      }
      <Modal
        title="Tiến hành đặt hàng"
        visible={showModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Xác nhận tiến hành đặt hàng</p>
      </Modal>
    </>
  )
}

export default OrderPage
