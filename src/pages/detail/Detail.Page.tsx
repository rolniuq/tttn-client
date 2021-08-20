import React, { useState, useEffect } from 'react';
import Header from "../../components/Header";
import Feed from "./Detail.Form";
import ProductDocument from '../../interfaces/Product.Interface';
import Spinner from '../../components/Spinner';
import { GetProductByID } from '../../services/Setting.Service';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { id }: any = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<ProductDocument>({
    _id: "",
    name: "",
    price: 0,
    description: "",
    images: [{
      _id: "",
      name: ""
    }],
    category: ""
  });

  useEffect(() => {
    GetProductByID(id)
      .then(res => {
        setProduct(res.data.result);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      })
  }, []);

  return (
    <>
      <Header />
      {
        loading ? (
          <Spinner />
        ) : (
          <Feed data={product} />
        )
      }
    </>
  )
}

export default DetailPage
