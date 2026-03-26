import React, { useEffect, useState } from "react";
import { API_URL } from "../data/apiPath";

const AllProducts = () => {
  const [firms, setFirms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFirmProducts = async () => {
    try {
      const vendorId = localStorage.getItem("vendorId");
      if (!vendorId) {
        setFirms([]);
        return;
      }

      const response = await fetch(`${API_URL}/firm/vendor/${vendorId}`);
      const data = await response.json();

      if (response.ok) {
        setFirms(data.firms || []);
      } else {
        setFirms([]);
      }
    } catch (error) {
      console.log("Error fetching products", error);
      setFirms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFirmProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setFirms((prevFirms) =>
        prevFirms.map((firm) => ({
          ...firm,
          products: (firm.products || []).filter(
            (product) => product._id !== productId
          ),
        }))
      );
    } catch (error) {
      console.log("Error deleting product", error);
      alert(error.message);
    }
  };

  if (loading) {
    return <div className="table-container">Loading products...</div>;
  }

  return (
    <div className="table-container">
      <h2>All Products</h2>

      {firms.length === 0 ? (
        <p>No firms found.</p>
      ) : (
        firms.map((firm) => (
          <div key={firm._id} className="firm-products-section">
            <h3>{firm.firmName}</h3>

            {!firm.products || firm.products.length === 0 ? (
              <p>No products added for this firm.</p>
            ) : (
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {firm.products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.productName}</td>
                      <td>{product.price}</td>
                      <td>{(product.category || []).join(", ")}</td>
                      <td>
                        {product.image ? (
                          <img
                            src={`${API_URL}/uploads/${product.image}`}
                            alt={product.productName}
                          />
                        ) : (
                          "No image"
                        )}
                      </td>
                      <td>
                        <button onClick={() => handleDelete(product._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AllProducts;
