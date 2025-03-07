import React, { useEffect, useState } from "react";
import { useCart } from "../cart/CartContext";
import { useParams, useNavigate, Link } from "react-router-dom";

const ProductDetailsPage = ({ data }) => {
  const baseuri = "/gtm-cc";

  const { productId } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const product = data.products.find((p) => p.product_id === productId);
  const [quantity, setQuantity] = useState(1);

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  // Handle increment
  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  window.dataLayer = window.dataLayer || [];

  const handleAddToCart = (e) => {
    addToCart({ ...product, quantity });
    const _this = e.target;
    navigate(`${baseuri}/checkout`);
    window.dataLayer.push({
      event: "gtm_click",
      button: {
        text: _this.innerText,
        classes: _this.getAttribute("class"),
        btn_id: _this.id,
      },
    });
    window.dataLayer.push({
      event: "add_to_cart",
      items: [
        {
          id: product.product_id,
          name: product.product_name,
          price: product.price.regular_price,
          discounted_price: product.price.discounted_price,
          category: product.category_id,
          quantity: quantity,
          currency: product.price.currency,
        },
      ],
    });
  };
  if (!product) {
    return <h2>Product not found</h2>;
  }

  useEffect(() => {
    // Push event to GTM data layer when page is displayed
    window.dataLayer.push({
      event: "pageView",
    });
    window.dataLayer.push({
      event: "view_item",
      page: "Product Detail",
      items: [
        {
          id: product.product_id,
          name: product.product_name,
          price: product.price.regular_price,
          discounted_price: product.price.discounted_price,
          category: product.category_id,
          brand: product.brand,
          currency: product.price.currency,
        },
      ],
    });
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <div className="container mt-5 product-detail">
      <div className="row">
        <div className="col-12 col-sm-6 pe-4">
          <img
            src={baseuri + product.images[0].image_url}
            alt={product.images[0].alt_text}
            className="mb-4 product-detail-img"
          />
        </div>
        <div className="col-12 col-sm-6">
          <h2>{product.product_name}</h2>
          <div className="mb-4">
            {product.price.discounted_price !== null ? (
              <p className="price-tag">
                <span className="currency-text">{product.price.currency}</span>
                <span className="oriPrice-text">
                  {product.price.regular_price}
                </span>
                <span className="discounted-text">
                  {product.price.discounted_price}
                  <span className="badge bg-success rounded-pill">
                    Discounted
                  </span>
                </span>
              </p>
            ) : (
              <p className="price-tag original">
                <span className="currency-text">{product.price.currency}</span>
                <span className="oriPrice-text">
                  {product.price.regular_price}
                </span>
              </p>
            )}
            <span className="product-id-text">SKU: {product.product_id}</span>
          </div>
          <p>{product.description}</p>
          <p>
            <strong>Stock Status:</strong> {product.stock_status}
          </p>
          <div className="quantity-control d-flex">
            <button onClick={decrementQuantity} className="btn ">
              -
            </button>
            <input
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="form-control text-center"
            />
            <button onClick={incrementQuantity} className="btn">
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            id="addCart"
            className="btn btn-primary addCart"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
