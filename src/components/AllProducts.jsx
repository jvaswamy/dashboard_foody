import React, { useEffect, useState } from "react";
import "./AllProducts.css";
import { API_URL } from "../data/apiPath";
import axios from "axios";
import { toast } from "react-toastify";

const AllProducts = () => {
  const [list, setList] = useState([]);

  const getProducts = async () => {
    const response = await axios.get(`${API_URL}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  const removeProduct = async (productId) => {
    const response = await axios.delete(`${API_URL}/api/food/remove`, {
      data: { id: productId },
    });
    await getProducts();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error removing product");
    }
  };

  // show confirmation modal before deleting
  const [confirmId, setConfirmId] = useState(null);
  const confirmDelete = (id) => setConfirmId(id);
  const cancelDelete = () => setConfirmId(null);
  const handleConfirm = async () => {
    if (confirmId) {
      await removeProduct(confirmId);
      setConfirmId(null);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food Products</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div className="list-table-format" key={index}>
            <img className="product-img" src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p className="cursor" onClick={() => confirmDelete(item._id)}>
              X
            </p>
          </div>
        ))}
      </div>
      {confirmId && (
        <div className="confirm-overlay">
          <div className="confirm-modal">
            <p>Are you sure you want to delete this product?</p>
            <div className="confirm-actions">
              <button className="btn cancel" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn confirm" onClick={handleConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
