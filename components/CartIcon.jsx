import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartIcon = () => {
  const { cartItems } = useContext(CartContext);

  // Ensure cartItems is always an array
  const itemCount = cartItems ? cartItems.length : 0;

  return (
    <Link to="/cart" className="cart-icon">
      🛒 Shopping Cart {itemCount > 0 && <span>({itemCount})</span>}
    </Link>
  );
};

export default CartIcon;
