import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  // Calculate total price, discount and final total
  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.originalPrice || item.price) * item.quantity,
    0
  );
  const discount = totalPrice * 0.1;
  const finalTotal = totalPrice - discount;

  if (!cart || cart.length === 0) {
    return <h2 className="text-center mt-5">🛒 Your cart is empty</h2>;
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-4 fw-bold">🛒 Items in Cart</h3>
      <div className="row">
        {/* Left Side - Cart Items */}
        <div className="col-md-8">
          {cart.map((item) => {
            const originalPrice = item.originalPrice || item.price;
            const discountedPrice = (originalPrice * 0.9).toFixed(2); // 10% Discount Applied

            return (
              <div key={item.id} className="card mb-4 p-4 shadow-lg border-0">
                <div className="row align-items-center">
                  {/* Product Image */}
                  <div className="col-md-3">
                    <img
                      src={`http://localhost:8080/assets/${item.image}`} // ✅ Proper image URL
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ width: "100%", height: "180px", objectFit: "cover" }} // Bigger image
                    />
                  </div>

                  {/* Product Details */}
                  <div className="col-md-6">
                    <h5 className="fw-bold">{item.name}</h5>
                    <div className="d-flex align-items-center my-3">
                      <button
                        className="btn btn-outline-primary btn-lg"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1} // Prevent negative quantity
                      >
                        -
                      </button>
                      <span className="mx-4 fs-5">{item.quantity}</span>
                      <button
                        className="btn btn-outline-primary btn-lg"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="mt-3 mb-2 fs-5">
                      <strong>₹ {discountedPrice}</strong>{" "}
                      <s className="text-muted">₹ {originalPrice}</s>{" "}
                      <span className="badge bg-warning text-dark">10% Off</span>
                    </p>
                    <p className="text-muted mb-0">
                      🚚 Delivery by <strong>{item.deliveryDate || "Tomorrow"}</strong>
                    </p>
                  </div>

                  {/* Remove Button */}
                  <div className="col-md-3 text-end">
                    <button
                      className="btn btn-outline-danger btn-lg"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side - Order Summary */}
        <div className="col-md-4">
          <div className="card p-4 shadow-lg border-0">
            <h4 className="fw-bold mb-3">🧾 Order Summary</h4>
            <hr />
            <p className="fs-5">
              <strong>Total Price:</strong> ₹ {totalPrice.toLocaleString()}
            </p>
            <p className="fs-5">
              <strong>Discount (10%):</strong> - ₹ {discount.toLocaleString()}
            </p>
            <p className="fs-5">
              <strong>Convenience Fee:</strong> ₹ 0
            </p>
            <hr />
            <h4>
              <strong>Total:</strong> ₹ {finalTotal.toLocaleString()}
            </h4>
            <button className="btn btn-success w-100 btn-lg mt-4">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
