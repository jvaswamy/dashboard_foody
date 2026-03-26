import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { API_URL } from "../../data/apiPath";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    firmId: "",
    productName: "",
    price: "",
    category: [],
    bestSeller: "",
    description: "",
    image: null,
  });
  const [firms, setFirms] = useState([]);
  const [firmsLoading, setFirmsLoading] = useState(true);
  const [firmsError, setFirmsError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchFirms = async () => {
      try {
        const vendorId = localStorage.getItem("vendorId");
        if (!vendorId) {
          setFirmsError("Vendor not found");
          return;
        }

        const response = await fetch(`${API_URL}/firm/vendor/${vendorId}`);
        const data = await response.json();

        if (response.ok) {
          setFirms(data.firms || []);
          setFirmsError("");
        } else {
          setFirms([]);
          setFirmsError(data.message || "Failed to load firms");
        }
      } catch (error) {
        console.log("Error fetching firms", error);
        setFirms([]);
        setFirmsError("Failed to load firms");
      } finally {
        setFirmsLoading(false);
      }
    };

    fetchFirms();
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        category: checked
          ? [...prev.category, value]
          : prev.category.filter((item) => item !== value),
      }));
    } else if (type === "file") {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      setFormData((prev) => ({ ...prev, image: files[0] }));
      setImagePreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.category.length === 0) {
        throw new Error("Select at least one category");
      }

      if (!formData.bestSeller) {
        throw new Error("Select best seller option");
      }

      const token = Cookies.get("token");
      const data = new FormData();

      data.append("productName", formData.productName);
      data.append("price", formData.price);
      data.append("bestSeller", formData.bestSeller);
      data.append("description", formData.description);

      if (formData.image) {
        data.append("image", formData.image);
      }

      formData.category.forEach((value) => {
        data.append("category", value);
      });

      const response = await fetch(
        `${API_URL}/product/add-product/${formData.firmId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to add product");
      }

      alert("Product added successfully");
      setFormData({
        firmId: "",
        productName: "",
        price: "",
        category: [],
        bestSeller: "",
        description: "",
        image: null,
      });

      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(null);

      const fileInput = document.querySelector('input[name="image"]');
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.log("Error", error);
      alert(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Firm:
          <select
            name="firmId"
            value={formData.firmId}
            onChange={handleChange}
            required
            disabled={firmsLoading || firms.length === 0}
          >
            <option value="">
              {firmsLoading ? "Loading firms..." : "Select Firm"}
            </option>
            {firms.map((firm) => (
              <option key={firm._id} value={firm._id}>
                {firm.firmName}
              </option>
            ))}
          </select>
        </label>

        {firmsError && <p>{firmsError}</p>}

        <label>
          Product Name:
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <fieldset>
          <legend>Category:</legend>
          <label>
            <input
              type="checkbox"
              name="category"
              value="veg"
              checked={formData.category.includes("veg")}
              onChange={handleChange}
            />
            Veg
          </label>
          <label>
            <input
              type="checkbox"
              name="category"
              value="non-veg"
              checked={formData.category.includes("non-veg")}
              onChange={handleChange}
            />
            Non-Veg
          </label>
        </fieldset>

        <fieldset>
          <legend>Best Seller:</legend>
          <label>
            <input
              type="radio"
              name="bestSeller"
              value="yes"
              checked={formData.bestSeller === "yes"}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="bestSeller"
              value="no"
              checked={formData.bestSeller === "no"}
              onChange={handleChange}
            />
            No
          </label>
        </fieldset>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <label>
          Upload Image:
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
        </label>

        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
          </div>
        )}

        <button type="submit" className="add-product-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
