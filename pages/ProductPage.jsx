import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductPage = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/products?page=${page}&size=8`
    );
    if (res.data.content.length === 0) {
      setHasMore(false);
      return;
    }
    setProducts((prev) => [...prev, ...res.data.content]);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-page">
      <div className="container mt-4">
        <h1 className="text-center mb-5">Our Best Sellers</h1>
        <InfiniteScroll
          dataLength={products.length}
          next={fetchProducts}
          hasMore={hasMore}
          loader={<h4 className="text-center">Loading...</h4>}
          endMessage={<p className="text-center">No more products to show</p>}
        >
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {products.map((product) => (
              <div key={product.id} className="col">
                <div className="product-card text-center shadow-sm">
                  <img
                    src={`http://localhost:8080/assets/${product.image}`}
                    alt={product.name}
                    className="img-fluid mb-3"
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                  <h5>{product.name}</h5>
                  <p className="fw-bold text-success">
                    ₹ {product.price.toLocaleString()}
                  </p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>

      {/* Custom Styles */}
      <style>{`
        .product-page {
          background: linear-gradient(135deg, #000 50%, rgb(99, 82, 71) 50%);
          padding: 60px 0;
          min-height: 100vh;
          color: white;
        }

        .product-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          padding: 20px;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
        }

        .btn-primary {
          background: rgb(42, 209, 37);
          border: none;
          color: black;
          font-weight: bold;
        }

        .btn-primary:hover {
          background: #b99a31;
          color: white;
        }

        h1 {
          color: white;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductPage;
