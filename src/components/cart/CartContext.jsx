// CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add items to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.product_id === product.product_id
      );

      if (existingProduct) {
        // Update the quantity of the existing product
        return prevCart.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: existingProduct.quantity + product.quantity }
            : item
        );
      } else {
        // Add the new product with its quantity
        return [...prevCart, product];
      }
    });

    const _this = event.target;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "gtm_click",
      button: {
        text: _this.innerText,
        classes: _this.getAttribute("class"),
        btn_id: _this.id,
      },
      ecommerce: {
        currencyCode: product.price.currency,
        add: {
          products: [
            {
              item_id: product.product_id,
              item_name: product.product_name,
              price: product.price.regular_price,
              item_category: product.category_id,
              quantity: product.quantity,
              currency: product.price.currency,
            },
          ],
        },
      },
    });
  };

  const removeFromCart = (event, product_id, products) => {
    const updatedCart = cart.filter((item) => item.product_id !== product_id);
    setCart(updatedCart);

    const _this = event.target;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "gtm_click",
      button: {
        text: _this.getAttribute("value"),
        classes: _this.getAttribute("class"),
        btn_id: _this.id,
      },
    });

    window.dataLayer.push({
      event: "remove_from_cart",
      button: {
        text: _this.getAttribute("value"),
        classes: _this.getAttribute("class"),
        btn_id: _this.id,
      },
      remove: {
        products: [
          {
            item_id: products.product_id,
            item_name: products.product_name,
            price: products.price.regular_price,
            item_category: products.category_id,
            quantity: products.quantity,
            currency: products.price.currency,
            discounted_price: products.price.discounted_price,
          },
        ],
      },
    });
  };

  // Clear all items from the cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Calculate total amount
  let oriTotalAmount;
  const totalAmount = cart.reduce((sum, item) => {
    const price = item.price.discounted_price
      ? item.price.discounted_price
      : item.price.regular_price;

    oriTotalAmount = sum + item.price.regular_price * item.quantity;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalAmount,
        oriTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
