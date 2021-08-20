import React from 'react'
import Layout from "../../components/Layout";
import CardBasic from '../../components/card/CardBasic';
import ProductDocument from '../../interfaces/Product.Interface';

interface ProductFormDocument {
  products: ProductDocument[] | undefined;
  handleAddToCart(idProduct: string, quantity: number, size: string) : void;
}

const ProductForm = ({ products, handleAddToCart }: ProductFormDocument) => {
  return (
    <Layout>
      <div className="product__feed">
        {
          products && products.map(product => {
            return (
              <CardBasic
                key={product._id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            )
          })
        }
      </div>
    </Layout>
  )
}

export default ProductForm
