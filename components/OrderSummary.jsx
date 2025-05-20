import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const OrderSummary = () => {
  const { cart } = useContext(CartContext);

  if (!cart || cart.length === 0) {
    return null;
  }

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = totalPrice * 0.25;
  const convenienceFee = 0;

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div className="summary-item">
        <span>Total price (Inc GST)</span>
        <span>₹ {totalPrice.toLocaleString()}</span>
      </div>
      <div className="summary-item">
        <span>Discount</span>
        <span className="discount">- ₹ {discount.toLocaleString()}</span>
      </div>
      <div className="summary-item">
        <span>Convenience Fee</span>
        <span className="strike-through">₹ 129</span> <span>₹ {convenienceFee}</span>
      </div>
      <div className="total">
        <h3>Total</h3>
        <h3>₹ {(totalPrice - discount).toLocaleString()}</h3>
      </div>
      <p className="savings-msg">You save ₹ {discount.toLocaleString()} in this order</p>

      <button className="checkout-btn">PROCEED TO CHECKOUT</button>

      <div className="rewards">
        <span>🎖 Sporty Rewards: ₹ 0</span>
        <input type="checkbox" />
      </div>

      <div className="coupon">
        <span>📄 Apply Coupon</span>
      </div>

      <div className="benefits">
        <div>✔ Easy Returns</div>
        <div>✔ Home Delivery at Your Doorstep</div>
        <div>✔ Minimum 2 Years Warranty</div>
      </div>
    </div>
  );
};

// ✅ Ensure that we have a **default export**
export default OrderSummary;
