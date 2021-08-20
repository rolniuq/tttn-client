import React, { useState, useEffect } from 'react';
import Header from "../../components/Header";
import Feed from "./Product.Form";
import CategoryDocument from '../../interfaces/Category.Interface';
import ProductDocument from '../../interfaces/Product.Interface';
import ProductHeader from './Product.Header';
import { GetListCategories, GetListProducts, AddToCart, GetListProductsByCategory } from '../../services/Setting.Service';
import Spinner from '../../components/Spinner';
import Banner from "./Product.Banner";

const ProductPage = () => {
  const [products, setProducts] = useState<ProductDocument[]>();
  const [categories, setCategories] = useState<CategoryDocument[]>();
  const [loading, setLoading] = useState<Boolean>(true);
  const [typeSelected, setTypeSelected] = useState<string>("all");

  useEffect(() => {
    if (typeSelected === "all") {
      GetAllProducts();
      return;
    }

    setLoading(true);
    GetListProductsByCategory(typeSelected)
      .then(res => {
        setLoading(false);
        setProducts(res.data.result);
        window.scrollTo({
          top: 900,
          behavior: 'smooth'
        })
      })
      .then(e => {
        setLoading(false);
        console.log(e);
      });
  }, [typeSelected]);

  useEffect(() => {
    GetListCategories()
      .then(res => {
        setCategories(res.data.result);
      })
      .catch(e => {
        console.log(e);
      })
  }, []);

  const GetAllProducts = () => {
    GetListProducts()
      .then(res => {
        setProducts(res.data.result);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      })
  }

  const handleSelectCategory = (value: string) => {
    setTypeSelected(value);
  };

  const handleAddToCart = (idProduct: string, quantity: number, size: string) => {
    AddToCart(idProduct, quantity, size);
  }

  return (
    <>
      <Header />
      <Banner />
      {
        loading ? (
          <Spinner />
        ) : (
          <>
            <ProductHeader
              categories={categories}
              typeSelected={typeSelected}
              handleSelectCategory={handleSelectCategory}
            />
            <Feed
              products={products}
              handleAddToCart={handleAddToCart}
            />
          </>
        )
      }
    </>
  )
}

export default ProductPage
