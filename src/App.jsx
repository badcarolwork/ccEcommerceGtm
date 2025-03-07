import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NavBar from "./components/navbar/NavBar";
import data from "./datas.json";
import Footer from "./components/Footer";
import ProductsPage from "./components/products/ProductsListPage";
import HomePage from "./components/home/HomePage";
import CheckoutPage from "./components/cart/CheckoutPage";
import { CartProvider } from "./components/cart/CartContext";
import PaymentResult from "./components/cart/PaymentResult";
import ProductDetailsPage from "./components/products/ProductDetailsPage";
import ShippingForm from "./components/cart/ShippingForm";

function App() {
  return (
    <div className="fluid">
      <CartProvider>
        <Router>
          <NavBar categories={data.categories} />
          <Routes>
            <Route path="/gtm-cc/" element={<HomePage />} />
            <Route path="/gtm-cc/products/:cat_id" element={<ProductsPage />} />
            <Route
              path="/gtm-cc/:cat_id/:productId"
              element={<ProductDetailsPage data={data} />}
            />
            <Route path="/gtm-cc/checkout" element={<CheckoutPage />} />
            <Route path="/gtm-cc/shipment" element={<ShippingForm />} />
            <Route path="/gtm-cc/orderconfirm" element={<PaymentResult />} />
          </Routes>
        </Router>
      </CartProvider>
      <Footer></Footer>
    </div>
  );
}

export default App;
