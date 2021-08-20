import React, { useState } from 'react'
import Layout from "../../components/Layout";
import ProductDocument from '../../interfaces/Product.Interface';
import { formatMoney, EnumURL, ProductSize } from '../../utils/Common';
import { Button, Select, Modal } from "antd";
import { AddToCart } from "../../services/Setting.Service";

interface DetailFormDocument {
  data: ProductDocument;
}

const { Option } = Select;

const DetailForm = ({ data }: DetailFormDocument) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string>("S");

  const handleSelectSize = (value: string) => {
    setSize(value);
  }

  const handleClickDecrement = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity(prev => prev - 1);
  }

  const handleClickIncrement = () => {
    setQuantity(prev => prev + 1);
  }

  const handleClickAddToCart = () => {
    AddToCart(data._id, quantity, size);
    Modal.success({
      content: 'Sản phẩm đã được thêm vào giỏ',
    });
  }

return (
  <Layout>
    <p className="detail__title">Thông tin sản phẩm</p>
    <div className="detail">
      <div className="detail__image">
        <img src={`${EnumURL.baseURL}${data.images[0].name}`} alt="image-detail" />
      </div>
      <div className="detail__infor">
        <p className="detail__infor__name">{data.name}</p>
        <p className="detail__infor__price">Giá tiền: {formatMoney(data.price)}</p>
        <p className="detail__infor__description">{data.description}</p>
        <div className="detail__infor__size">
          Kích cỡ: <Select defaultValue={size} style={{ width: 150 }} onChange={handleSelectSize}>
            {
              ProductSize.map(item => {
                return (
                  <Option key={item.id} value={item.size}>{item.size}</Option>
                )
              })
            }
          </Select>
        </div>
        <div className="detail__infor__quantity">
          <Button onClick={handleClickDecrement}>-</Button>
          <span className="detail__infor__quantity__count">{quantity}</span>
          <Button onClick={handleClickIncrement}>+</Button>
        </div>
        <Button className="detail__button" onClick={handleClickAddToCart}>🛒 Thêm vào giỏ</Button>
      </div>
    </div>
  </Layout>
)
}

export default DetailForm
