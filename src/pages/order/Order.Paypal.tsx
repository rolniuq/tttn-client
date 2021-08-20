import React, { Dispatch, FC, SetStateAction, useState, useEffect } from 'react'
import PaypalDocument from 'interfaces/Paypal.Interface';
import { PayPalButton } from 'react-paypal-button-v2';
import { GetPricePaypalToCreate, SavePaypal } from "services/Setting.Service";
import Spinner from 'components/Spinner';

interface OrderPaypalDocument {
  carts: PaypalDocument[];
  setBuy: Dispatch<SetStateAction<boolean>>;
}

const OrderPaypal: FC<OrderPaypalDocument> = ({ carts, setBuy }) => {
  const [total, setTotal] = useState<number>(0.01);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    GetPricePaypalToCreate(carts)
      .then(res => {
        setTotal(res.data.result);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  }, [])

  const handleSaveOrder = (details: any, data: any) => {
    SavePaypal(data.orderID, carts)
      .then(() => setBuy(true))
      .catch(e => console.log(e));
  }

  return (
    <>
      {
        loading ? (
          <Spinner />
        ) : (
          <PayPalButton
            amount="0.01"
            createOrder={(data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    currency_code: "USD",
                    value: total
                  }
                }],
              });
            }}
            onSuccess={(details: any, data: any) => handleSaveOrder(details, data)}
          />

        )
      }
    </>
  )
}

export default OrderPaypal
