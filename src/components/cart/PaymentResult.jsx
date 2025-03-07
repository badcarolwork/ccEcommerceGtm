import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";

const PaymentResult = () => {
  const { cart, totalAmount, clearCart, oriTotalAmount } = useCart();
  const [transactionId, setTransactionId] = useState("");

  const handleTransId = () => {
    let randStr = "";
    for (let letter = 1; letter <= 6; letter++) {
      randStr +=
        letter % 2 === 0
          ? String.fromCharCode(Math.random() * (91 - 65) + 65)
          : Math.ceil(Math.random() * 9);
    }
    return randStr;
  };

  const handleGtm = (generatedId) => {
    const cartList = cart.map((item) => ({
      item_id: item.product_id,
      item_name: item.product_name,
      price: item.price.regular_price,
      item_category: item.category_id,
      quantity: item.quantity,
    }));

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "pageView",
    });

    window.dataLayer.push({
      event: "purchase",
      transaction_id: generatedId,
      total_value: totalAmount,
      original_total_value: oriTotalAmount,
      currency: "TWD",
      items: cartList,
    });

    // Clear cart after pushing to GTM
    setTimeout(() => {
      clearCart();
    }, 1500);
  };

  useEffect(() => {
    const id = handleTransId();
    setTransactionId(id);
    handleGtm(id);
  }, []);

  return (
    <div className="container mt-5 payment-page text-center">
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">
          Order Confirmed!
          <br />
          Transaction ID: <span className="text-success">{transactionId}</span>
        </h4>
        <p>Your payment has been successful.</p>
      </div>
    </div>
  );
};

export default PaymentResult;
