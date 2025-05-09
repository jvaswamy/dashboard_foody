import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import Cookies from "js-cookie";

const AddFirm = () => {
  const [formData, setFormData] = useState({
    firmName: "",
    area: "",
    category: [],
    offer: "",
    image: null,
    region: [],
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;

    setFormData((prev) => {
      const updated = checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value);
      return { ...prev, [field]: updated };
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      // setFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `${API_URL}/firm/add-firm`;
      const token = Cookies.get("token");

      const data = new FormData();

      data.append("firmName", formData.firmName);
      data.append("area", formData.area);
      data.append("offer", formData.offer);
      data.append("image", formData.image);

      formData.category.forEach((value) => {
        data.append("category", value);
      });
      formData.region.forEach((value) => {
        data.append("region", value);
      });

      const options = {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: data,
      };

      const response = await fetch(url, options);
      const result = await response.json();
      alert("Add firm successfully");
    } catch (error) {
      console.log("Error", error);
      alert(error);
    }
  };

  return (
    <form className="firm-form" onSubmit={handleSubmit}>
      <h2>Firm Title</h2>

      <label>Firm Name:</label>
      <input
        type="text"
        name="firmName"
        value={formData.firmName}
        onChange={handleInputChange}
        required
      />

      <label>Area:</label>
      <input
        type="text"
        name="area"
        value={formData.area}
        onChange={handleInputChange}
        required
      />

      <label>Category:</label>
      <div className="checkbox-group">
        {["veg", "non-veg"].map((cat) => (
          <label key={cat}>
            <input
              type="checkbox"
              value={cat}
              checked={formData.category.includes(cat)}
              onChange={(e) => handleCheckboxChange(e, "category")}
            />
            {cat}
          </label>
        ))}
      </div>

      <label>Offer:</label>
      <input
        type="text"
        name="offer"
        value={formData.offer}
        onChange={handleInputChange}
      />

      <label>Region:</label>
      <div className="checkbox-group">
        {["south-indian", "north-indian", "chinese", "bakery"].map((region) => (
          <label key={region}>
            <input
              type="checkbox"
              value={region}
              checked={formData.region.includes(region)}
              onChange={(e) => handleCheckboxChange(e, "region")}
            />
            {region}
          </label>
        ))}
      </div>

      <label>Upload Firm Image:</label>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Preview" />
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddFirm;
