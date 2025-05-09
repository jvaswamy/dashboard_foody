import React, { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    category: {
      veg: false,
      nonVeg: false,
    },
    bestSeller: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        category: {
          ...prev.category,
          [name]: checked,
        },
      }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted!");
  };

  return (
    <div className="form-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
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
              name="veg"
              checked={formData.category.veg}
              onChange={handleChange}
            />
            Veg
          </label>
          <label>
            <input
              type="checkbox"
              name="nonVeg"
              checked={formData.category.nonVeg}
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
          <input type="file" accept="image/*" onChange={handleChange} />
        </label>

        <button type="submit" className="add-product-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
