import React, { useState } from "react";
import { useCart } from "../cart/CartContext";
import { useNavigate, Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { product_name, price, images, description, stock_status, product_id } =
    product;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const baseuri = "/gtm-cc";

  window.dataLayer = window.dataLayer || [];

  const handleAddToCart = (e) => {
    addToCart({ ...product, quantity });
    navigate(`${baseuri}/checkout`);

    const _this = e.target;
    const selectedId = _this.getAttribute("data-id");
    window.dataLayer.push({
      event: "gtm_click",
      button: {
        text: _this.innerText,
        classes: _this.getAttribute("class"),
        btn_id: _this.id,
      },
    });
    if (product.product_id === selectedId) {
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
    }
  };

  const handleViewProduct = (e) => {
    const _this = e.target;
    const selectedId = _this.getAttribute("data-id");
    window.dataLayer.push({
      event: "gtm_click",
      button: {
        text: _this.innerText,
        classes: _this.getAttribute("class"),
        btn_id: _this.id,
      },
    });

    if (product.product_id === selectedId) {
      window.dataLayer.push({
        event: "select_details",
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
    }
  };

  return (
    <div className="card h-100">
      <Link to={`${baseuri}/${product.category_id}/${product.product_id}`}>
        <img
          src={baseuri + images[0].image_url}
          alt={images[0].alt_text}
          className="card-img-top"
          onClick={handleViewProduct}
          data-id={product.product_id}
        />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{product_name}</h5>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between">
          <div>
            {price.discounted_price !== null ? (
              <p className="price-tag">
                <span className="currency-text">{price.currency}</span>
                <span className="oriPrice-text">{price.regular_price}</span>
                <span className="discounted-text">
                  {price.discounted_price}
                  <span className="badge bg-success rounded-pill">
                    Discounted
                  </span>
                </span>
              </p>
            ) : (
              <p className="price-tag original">
                <span className="currency-text">{price.currency}</span>
                <span className="oriPrice-text">{price.regular_price}</span>
              </p>
            )}
          </div>
          <div
            className={`alert badge ${
              stock_status === "in_stock" ? "alert-success" : "alert-warning"
            } stock-status`}
          >
            {stock_status}
          </div>
        </div>
      </div>

      <div className="card-footer d-flex justify-content-between">
        <Link
          to={`${baseuri}/${product.category_id}/${product.product_id}`}
          className="btn btn-outline-info more-info"
          id="moreInfo"
          type="button"
          data-id={product.product_id}
          onClick={handleViewProduct}
        >
          View Details
        </Link>
        <button
          onClick={handleAddToCart}
          id="addCart"
          className="btn btn-primary addCart"
          data-id={product.product_id}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
