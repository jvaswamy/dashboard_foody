import React, { useState } from "react";

const initialProducts = [
  {
    id: 1,
    name: "Product A",
    price: "$25",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Product B",
    price: "$40",
    image: "https://via.placeholder.com/100",
  },
];
const AllProducts = () => {
  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="table-container">
      <h2>Product List</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ id, name, price, image }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{price}</td>
              <td>
                <img src={image} alt={name} />
              </td>
              <td>
                <button onClick={() => handleDelete(id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;
