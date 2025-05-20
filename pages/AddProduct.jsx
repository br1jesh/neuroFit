import React, { useState } from "react";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageBase64, setImageBase64] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImageBase64(reader.result.split(",")[1]); // Extract Base64 data
            setImagePreview(reader.result); // Show preview
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !price || !description || !imageBase64) {
            setMessage("⚠️ Please fill in all fields before submitting.");
            return;
        }

        setLoading(true);
        setMessage("");

        const product = { name, price, description, imageBase64 };

        try {
            const response = await fetch("http://localhost:8080/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product),
            });

            if (!response.ok) throw new Error("Failed to add product");

            setMessage("✅ Product successfully added!");
            setName("");
            setPrice("");
            setDescription("");
            setImageBase64("");
            setImagePreview(null);
        } catch (error) {
            setMessage("❌ Error adding product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>➕ Add a New Product</h2>
            {message && <p style={styles.message}>{message}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                    required
                />

                <input
                    type="number"
                    placeholder="Price ($)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={styles.input}
                    required
                />

                <textarea
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={styles.textarea}
                    required
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={styles.fileInput}
                    required
                />

                {imagePreview && (
                    <img src={imagePreview} alt="Preview" style={styles.imagePreview} />
                )}

                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    );
};

// ✅ Professional Industry-Level CSS
const styles = {
    container: {
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    heading: {
        fontSize: "22px",
        color: "#333",
        marginBottom: "15px",
    },
    message: {
        fontSize: "16px",
        color: "red",
        fontWeight: "bold",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        padding: "10px",
        margin: "8px 0",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
    },
    textarea: {
        padding: "10px",
        margin: "8px 0",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
        height: "80px",
        resize: "none",
    },
    fileInput: {
        padding: "10px",
        margin: "8px 0",
        fontSize: "16px",
    },
    imagePreview: {
        width: "100%",
        height: "auto",
        borderRadius: "5px",
        marginTop: "10px",
    },
    button: {
        padding: "12px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontSize: "18px",
        cursor: "pointer",
        marginTop: "10px",
        transition: "background 0.3s ease",
    },
};

export default AddProduct;
