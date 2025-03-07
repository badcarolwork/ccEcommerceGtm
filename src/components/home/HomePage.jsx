import React, { useEffect } from "react";
import ProductList from "../products/ProductList";
import data from "../../datas.json";
import Carousel from "../carousel/Carousel";

const HomePage = () => {
  useEffect(() => {
    window.dataLayer.push({
      event: "pageView",
    });
  }, []);

  return (
    <div>
      <Carousel />
      <div className="container mt-5">
        <div className="top-cat">
          <h2>新品上市</h2>
          <ProductList
            products={data.products}
            selectedCategory="new-product"
            oriUri="home"
          ></ProductList>
        </div>
        <div className="top-cat">
          <h2>經典暢銷</h2>
          <ProductList
            products={data.products}
            selectedCategory="cleanser"
            oriUri="home"
          ></ProductList>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
