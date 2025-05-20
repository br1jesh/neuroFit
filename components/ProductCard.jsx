import React, { useContext } from "react";
import { CartContext } from "../context/CartContext"; // ✅ Import Cart Context

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext); // ✅ Access cart context

  return (
    <div className="product-card">
      <img src={product?.image} alt={product?.name} className="product-image" />
      <div className="product-details">
        <div className="product-rating">
          ⭐ {product?.rating || "N/A"} | {product?.reviews?.toLocaleString() || 0}
        </div>
        <h4 className="product-name">{product?.name}</h4>
        <p className="product-price">₹ {product?.price?.toLocaleString()}</p>
        <button className="add-to-cart" onClick={() => addToCart(product)}>
          ADD TO CART
        </button>
      </div>

      {/* ✅ Professional Styling for Product Card */}
      <style>{`
        .product-card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          padding: 15px;
          text-align: center;
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }

        .product-card:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
        }

        .product-image {
          width: 100%;
          height: 180px;
          object-fit: contain;
          margin-bottom: 10px;
          border-radius: 5px;
        }

        .product-details {
          padding: 10px;
        }

        .product-rating {
          font-size: 14px;
          color: #ff5722;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .product-name {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .product-price {
          font-size: 18px;
          color: #333;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .add-to-cart {
          width: 100%;
          padding: 10px;
          background: #ff5722;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
          transition: background 0.3s ease;
        }

        .add-to-cart:hover {
          background: #e64a19;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
