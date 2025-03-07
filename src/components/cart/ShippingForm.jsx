import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const ShippingForm = () => {
  const baseuri = "/gtm-cc";
  const navigate = useNavigate();

  const { cart, totalAmount } = useCart();

  useEffect(() => {
    window.dataLayer.push({
      event: "pageView",
    });
    const cartList = cart.map((item) => ({
      item_id: item.product_id,
      item_name: item.product_name,
      price: item.price.regular_price,
      item_category: item.category_id,
      quantity: item.quantity,
      discounted_price: item.price.discounted_price,
    }));

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "add_shipping_info",
      total_value: totalAmount,
      currency: "TWD",
      items: cartList,
    });
  }, []);

  const resultPage = (event) => {
    const _this = event.target;
    window.dataLayer.push({
      event: "gtm_click",
      button: {
        text: _this.innerText,
        classes: _this.getAttribute("class"),
        btn_id: _this.id,
      },
    });

    navigate(`${baseuri}/orderconfirm`);
  };
  return (
    <div className="container mt-5 shipping-page">
      <h4 className="mb-3">Shipping Infomation</h4>
      <div className="row">
        <div className="col-12 col-sm-8">
          <form className="shipping-info" id="shippingInfo" noValidate="">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder=""
                  defaultValue=""
                  required=""
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder=""
                  defaultValue=""
                  required=""
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                Email <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="1234 Main St"
                required=""
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address2">
                Address 2 <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="address2"
                placeholder="Apartment or suite"
              />
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <select
                  className="custom-select d-block w-100"
                  id="country"
                  required=""
                >
                  <option defaultValue="">Choose...</option>
                  <option>台灣</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <select
                  className="custom-select d-block w-100"
                  id="state"
                  required=""
                >
                  <option defaultValue="">Choose...</option>
                  <option>台北</option>
                  <option>台中</option>
                  <option>花蓮</option>
                  <option>台南</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder=""
                  required=""
                />
                <div className="invalid-feedback">Zip code required.</div>
              </div>
            </div>
            <hr className="mb-4" />
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="same-address"
              />
              <label
                className="custom-control-label ms-1"
                htmlFor="same-address"
              >
                Shipping address is the same as my billing address
              </label>
            </div>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="save-info"
              />
              <label className="custom-control-label ms-1" htmlFor="save-info">
                Save this information for next time
              </label>
            </div>
            <hr className="mb-4" />

            <h4 className="mb-3">Payment</h4>

            <div className="d-block my-3 d-flex">
              <div className="custom-control custom-radio me-3">
                <input
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  defaultChecked=""
                  required=""
                />
                <label className="custom-control-label ms-1" htmlFor="credit">
                  Credit Card
                </label>
              </div>
              <div className="custom-control custom-radio  me-3">
                <input
                  id="debit"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  required=""
                />
                <label className="custom-control-label ms-1" htmlFor="LINEpay">
                  LINEpay
                </label>
              </div>
            </div>

            <button
              type="submit"
              onClick={resultPage}
              id="next"
              className="btn btn-primary btn-lg btn-block next"
            >
              Continue to checkout
            </button>
          </form>
        </div>
        <div className="col-12 col-sm-4 checkout-cart-preview d-none d-sm-block">
          <h5 className="mb-3">Your Cart</h5>
          <ul className="list-group">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item checkout-list">
                <div className="row">
                  <div className="cart-item-detail col-8 col-sm-8">
                    <h5>{item.product_name}</h5>
                    <p>
                      Price: {item.price.currency} {item.price.regular_price}
                    </p>
                  </div>
                  <div className="col-4 col-sm-46">
                    Quantity: {item.quantity}
                  </div>{" "}
                </div>
              </li>
            ))}
          </ul>
          <div className="total-amount text-end mt-2">
            <h5>
              Total Amount: {cart.length > 0 ? cart[0].price.currency : ""}{" "}
              {totalAmount}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
