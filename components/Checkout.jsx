import React from "react";

const Checkout = ({ cart }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <p>Total: ${total}</p>
      <button>Proceed to Payment</button>
    </div>
  );
};

export default Checkout; // ✅ Ensure default export
