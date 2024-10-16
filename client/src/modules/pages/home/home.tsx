import React from "react";
import {
  ProductListAndroid,
  ProductListIphone,
} from "../../components/productList/productList";
import PaymentList from "../../components/detailInfos/paymentList";
import Footer from "../../components/footer/footer";

const Home: React.FC = () => {
  return (
    <div>
      <main className="page-container">
        <ProductListIphone />
        <ProductListAndroid />
        <PaymentList />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
