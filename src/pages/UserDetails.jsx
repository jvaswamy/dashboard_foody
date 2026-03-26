import React, { useEffect, useState } from "react";
import { API_URL } from "../data/apiPath";

function UserDetails() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    firmCount: 0,
    productCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const vendorId = localStorage.getItem("vendorId");
        if (!vendorId) {
          return;
        }

        const [vendorResponse, firmResponse] = await Promise.all([
          fetch(`${API_URL}/vendor/single-vendor/${vendorId}`),
          fetch(`${API_URL}/firm/vendor/${vendorId}`),
        ]);

        const vendorData = await vendorResponse.json();
        const firmData = await firmResponse.json();

        const firms = firmData.firms || [];
        const productCount = firms.reduce(
          (total, firm) => total + (firm.products ? firm.products.length : 0),
          0
        );

        setUserDetails({
          username: vendorData.vendor?.username || "",
          email: vendorData.vendor?.email || "",
          firmCount: firms.length,
          productCount,
        });
      } catch (error) {
        console.log("Error fetching user details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading user details...</div>;
  }

  return (
    <div className="table-container">
      <h2>User Details</h2>
      <table className="product-table">
        <tbody>
          <tr>
            <th>User Name</th>
            <td>{userDetails.username || "N/A"}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{userDetails.email || "N/A"}</td>
          </tr>
          <tr>
            <th>No of Firms</th>
            <td>{userDetails.firmCount}</td>
          </tr>
          <tr>
            <th>No of Products</th>
            <td>{userDetails.productCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserDetails;
