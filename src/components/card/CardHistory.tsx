import React from 'react';
import { ConvertStatus, EnumURL, formatMoney } from '../../utils/Common';

interface CardHistoryDocument {
  image: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  status: string;
}

const CardHistory = ({ image, name, price, size, quantity, status }: CardHistoryDocument) => {
  return (
    <div className="card-history">
      <div className="card-history__field">
        <img className="card-history__field__image" src={`${EnumURL.baseURL}${image}`} alt="img" />
      </div>
      <div className="card-history__field">
        <span>{name}</span>
      </div>
      <div className="card-history__field">
        <span>{formatMoney(price)}</span>
      </div>
      <div className="card-history__field">
        <span>{size}</span>
      </div>
      <div className="card-history__field">
        <span>{quantity}</span>
      </div>
      <div className="card-history__field">
        <span>{ConvertStatus(status)}</span>
      </div>
    </div>
  )
}

export default CardHistory
