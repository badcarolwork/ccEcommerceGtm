import React, { useEffect } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();
  const baseuri = "/gtm-cc";

  window.dataLayer = window.dataLayer || [];

  useEffect(() => {
    // handle gtm
    const cartList = cart.map((p, i) => ({
      item_id: p.product_id,
      item_name: p.product_name,
      price: p.price.regular_price,
      discounted_price: p.price.discounted_price,
      item_category: p.category_id,
      currency: p.price.currency,
      quantity: p.quantity,
      index: i,
    }));

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "begin_checkout",
      items: cartList,
    });
    window.dataLayer.push({
      event: "pageView",
    });
  }, []);

  const handlePayment = (event) => {
    const productsData = cart.map((item) => ({
      item_id: item.product_id,
      item_name: item.product_name,
      price: item.price.regular_price,
      discounted_price: item.price.discounted_price,
      item_category: item.category_id,
      quantity: item.quantity,
    }));

    const _this = event.target;

    window.dataLayer.push({
      event: "gtm_click",
      button: {
        text: _this.getAttribute("value"),
        classes: _this.getAttribute("class"),
        btn_id: _this.id,
      },
      form: {
        text: _this.getAttribute("value"),
        classes: _this.getAttribute("class"),
        btn_id: _this.id,
      },
      ecommerce: {
        currencyCode: cart.length > 0 ? cart[0].price.currency : "TWD",
        purchase: {
          products: productsData,
          total: totalAmount,
        },
      },
    });

    // Optional: Trigger payment flow (e.g., redirect to payment gateway)
    navigate(`${baseuri}/shipment`);
  };
  return (
    <div className="container mt-5 checkout">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <div className="alert alert-info text-center mt-4" role="alert">
          There is nothing in your cart. Shop now!
        </div>
      ) : (
        <div>
          <ul className="list-group">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item checkout-list">
                <img
                  src={baseuri + item.images[0].image_url}
                  alt={item.images[0].alt_text}
                  className="checkout-img"
                />
                <div className="cart-item-detail">
                  <h5>{item.product_name}</h5>
                  <p>
                    Price: {item.price.currency}{" "}
                    {item.price.discounted_price
                      ? item.price.discounted_price
                      : item.price.regular_price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  id="removeItem"
                  className="cart-remove"
                  onClick={(event) =>
                    removeFromCart(event, item.product_id, item)
                  }
                  value="Remove"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                  </svg>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="total-amount">
            <h4>
              Total Amount: {cart.length > 0 ? cart[0].price.currency : ""}{" "}
              {totalAmount}
            </h4>
          </div>
          <button
            id="makePayment"
            className="payment-btn btn btn-outline-success"
            onClick={handlePayment}
            value="Make Payment"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-credit-card-2-back"
              viewBox="0 0 16 16"
            >
              <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z" />
              <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1" />
            </svg>
            Make Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
