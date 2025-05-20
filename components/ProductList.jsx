import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";  

const ProductList = ({ addToCart }) => {
  const [categories, setCategories] = useState({});
  const [filteredCategories, setFilteredCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Categorizing products
        const categorizedData = data.reduce((acc, product) => {
          const category = product.category || "Uncategorized";
          acc[category] = acc[category] || [];
          acc[category].push(product);
          return acc;
        }, {});

        setCategories(categorizedData);
        setFilteredCategories(categorizedData); // Initially, show all products
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to show all products (Gym Equipment)
  const showAllProducts = () => {
    setFilteredCategories(categories);
  };

  return (
    <div className="container">
      <h1 className="title">Our Best Sellers</h1>

      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && Object.keys(filteredCategories).length === 0 && <p>No products available.</p>}

      {/* "Gym Equipment" Button to Show All Products */}
      <button className="show-all-button" onClick={showAllProducts}>
        Show All Gym Equipment
      </button>

      {Object.entries(filteredCategories).map(([category, products]) => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
