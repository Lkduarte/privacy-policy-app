import { Product } from "../../../utils/interfaces";
import React, { useState } from "react";
import ProductItem from "./product";
import "./productStyles.css";

export const ProductListIphone: React.FC = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      image:
        "https://a-static.mlcdn.com.br/450x450/apple-iphone-14-128gb-azul-61-12mp-ios-5g/magazineluiza/237184400/791bd420fb03ad4a40f58a45634ce39d.jpg",
      name: "iphone",
      description: "iPhone 14 128GB",
      price: "R$ 4.299,00",
    },
    {
      id: 2,
      image:
        "https://dcdn.mitiendanube.com/stores/002/027/409/products/1-3908691fac99fe57b517002160929580-1024-1024.png",
      name: "iphone2",
      description: "iPhone 14 Pro 128GB",
      price: "R$ 5.799,00",
    },
    {
      id: 3,
      image:
        "https://gamestationx.online/wp-content/uploads/2024/04/IPHONE-11-PRO-256GB-PRATEADO-GRADE-A-FC.png",
      name: "iphone3",
      description: "iPhone 11 Pro 256GB",
      price: "R$ 3.999,00",
    },
    {
      id: 4,
      image:
        "https://cdn.webshopapp.com/shops/277909/files/417567130/1000x1000x2/apple-iphone-13-pro-256gb-graphite.jpg",
      name: "iphone4",
      description: "iPhone 13 Pro 256GB",
      price: "R$ 5.199,00",
    },
  ]);

  return (
    <section>
      <h2 className="titleProducts">Iphone</h2>
      <div className="productList">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export const ProductListAndroid: React.FC = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      image:
        "https://media.mobilephonesdirect.co.uk/images/handsets/NjM5cGhhbnRvbS1ibGFjaw/combined.png",
      name: "AiPhone",
      description: "Samsung Galaxy S23 256GB",
      price: "R$ 3.499,00",
    },
    {
      id: 2,
      image:
        "https://media.bechtle.com/is/180712/1c4b3d4ee288fc9434f5175bf56070570/c3/superzoom/4d609b6dbdc84a58b253bd1e9d5d4b11?version=0",
      name: "UaiPhone",
      description: "Samsung Galaxy A33 5G 128GB",
      price: "R$ 1.349,00",
    },
    {
      id: 3,
      image:
        "https://cf-images.dustin.eu/cdn-cgi/image/format=auto,quality=75,width=828,,fit=contain/image/d2000010011127171/samsung-galaxy-a25-5g-128gb-bl%C3%A5.png",
      name: "AiPhone",
      description: "Samsung Galaxy A25 5G 256GB",
      price: "R$ 1.399,00",
    },
    {
      id: 4,
      image:
        "https://med.greatecno.com/628768/samsung-galaxy-s22-s901-5g-dual-sim-8gb-ram-128gb-roxo.jpg",
      name: "UaiPhone",
      description: "Samsung Galaxy S22 256GB",
      price: "R$ 2.999,00",
    },
  ]);

  return (
    <section>
      <h2 className="titleProducts">Android</h2>
      <div className="productList">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
