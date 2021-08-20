import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import PaypalDocument from 'interfaces/Paypal.Interface';
import ProductDocument from 'interfaces/Product.Interface';
import { GetCartPriceSelected, GetProductsForOrder } from 'services/Setting.Service';
import { formatMoney } from 'utils/Common';
import { Button } from "antd";
import Layout from "components/Layout";
import PaypalButton from "./Order.Paypal";
import Spinner from "components/Spinner";

interface OrderFormDocument {
  carts: PaypalDocument[];
  setPayMethod: Dispatch<SetStateAction<string>>;
  setBuy: Dispatch<SetStateAction<boolean>>;
}

const OrderForm: React.FC<OrderFormDocument> = ({ carts, setPayMethod, setBuy }) => {
  const [products, setProducts] = useState<ProductDocument[]>([]);
  const [list, setList] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState({
    order: true,
    price: true,
  });

  useEffect(() => {
    carts.forEach(item => {
      setList(prev => [...prev, item.product]);
    });
  }, []);

  useEffect(() => {
    GetProductsForOrder(list)
      .then(res => {
        setProducts(res.data.result);
        setLoading(prev => ({ ...prev, order: false }));
      })
      .catch(e => console.log(e));

    GetCartPriceSelected(list)
      .then(res => {
        setTotal(res.data.result);
        setLoading(prev => ({ ...prev, price: false }));
      })
      .catch(e => console.log(e));
  }, [list]);

  return (
    <Layout>
      {
        !loading.price && !loading.order ? (
          <div className="order__form">
            <div className="order__form__info">
              <div className="order__form__info__container">
                <p className="order__form__info__header">* Thông tin hóa đơn</p>
                <div>
                  {
                    products && products.map((product, index) => {
                      return (
                        <div key={index} className="order__form__info__element">
                          <span className="order__form__info__element__name">
                            {index + 1}. {product.name} x{carts[index] && carts[index].quantity}
                          </span>
                          <span className="order__form__info__element__price">{formatMoney(product.price)}</span>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <p className="order__form__info__total">* TỔNG: {formatMoney(total)}</p>
            </div>
            <div className="order__form__pay-method">
              <Button className="order__form__pay-method__cash" onClick={() => setPayMethod("cash")}>Thanh toán khi nhận hàng</Button>
              <PaypalButton carts={carts} setBuy={setBuy} />
            </div>
          </div>
        ) : (
          <Spinner/>
        )
      }
    </Layout>
  )
}

export default OrderForm