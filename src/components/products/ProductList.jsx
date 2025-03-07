import React, { useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, selectedCategory, oriUri }) => {
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category_id === selectedCategory)
    : products;

  useEffect(() => {
    // handle gtm
    const productsListData = filteredProducts.map((p, i) => ({
      item_id: p.product_id,
      item_name: p.product_name,
      price: p.price.regular_price,
      item_category: p.category_id,
      item_list_name: p.category_name,
      currency: p.price.currency,
      index: i,
    }));

    window.dataLayer = window.dataLayer || [];

    if (oriUri !== "home") {
      window.dataLayer.push({
        event: "pageView",
      });
      window.dataLayer.push({
        event: "view_item_list",
        items: productsListData,
      });
    }
  }, []);

  return (
    <div className="product-list row">
      {filteredProducts.map((product) => (
        <div key={product.product_id} className="col-md-4 mb-4">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
