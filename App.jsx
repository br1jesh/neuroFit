import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WebcamFeed from "./components/WebcamFeed";
import DietForm from "./pages/DietForm";
import Result from "./pages/Result";
import ProductPage from "./pages/ProductPage";
import AddProduct from "./pages/AddProduct";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import WorkoutTracker from "./pages/WorkoutTracker";
import CartProvider from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import LandingPage from "./pages/Landingpage";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import ServicesPage from "./pages/ServicesPage";
import SportRouteForm from "./pages/SportRouteForm";
import SportRouteResult from "./pages/SportRouteResult"; // ✅ Correct path
import LayoutWrapper from "./LayoutWrapper"; // ✅ NEW Layout component

const App = () => {
  return (
    <CartProvider>
      <UserProvider>
        <Router>
          <LayoutWrapper>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/webcam" element={<WebcamFeed />} />
              <Route path="/diet-form" element={<DietForm />} />
              <Route path="/result" element={<Result />} />
              <Route path="/sportrouteform" element={<SportRouteForm />} />
              <Route path="/sport-result" element={<SportRouteResult />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/workout-tracking" element={<WorkoutTracker />} />
            </Routes>
          </LayoutWrapper>
        </Router>
      </UserProvider>
    </CartProvider>
  );
};

export default App;
