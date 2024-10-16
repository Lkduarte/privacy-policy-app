import React from "react";
import { ProductProps } from "../../../utils/interfaces";

const ProductItem: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="product">
      <img src={product.image} alt={product.name} />
      {/* <h3>{product.name}</h3> */}
      <p className="nameTag">{product.description}</p>
      <p className="precoTag">{product.price}</p>
    </div>
  );
};

export default ProductItem;
