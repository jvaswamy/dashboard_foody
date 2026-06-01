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
        },
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
    <div className="add">
      <form className="flex-col">
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={assets.upload_area} alt="Upload" />
          </label>
          <input type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input type="text" name="name" placeholder="Type here" />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category">
              <option value="Salad"></option>
              <option value="Rolls"></option>
              <option value="Deserts"></option>
              <option value="Sandwich"></option>
              <option value="Cake"></option>
              <option value="Pure Veg"></option>
              <option value="Pasta"></option>
              <option value="Noodles"></option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input type="number" name="price" placeholder="$20" />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
