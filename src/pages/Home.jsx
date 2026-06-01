import React, { useState, useEffect } from "react";
import { API_URL } from "../data/apiPath";
import Sidebar from "../components/Sidebar";
import { GrRestaurant } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Welcome from "./Welcome";
import NotFound from "./NotFound";
import AllProducts from "../components/AllProducts";
import AddItem from "../components/forms/AddItem";
import Orders from "../components/forms/Orders";
import { assets } from "../../public/assets/assets";

const Home = () => {
  const [activeLayout, setActiveLayout] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [sidebarOption, setSidebarOption] = useState("");

  const navigate = useNavigate();
  const firmName = localStorage.getItem("firmName");

  useEffect(() => {
    getVendor();
  }, []);

  const getVendor = async () => {
    const vendorId = localStorage.getItem("vendorId");
    const url = `${API_URL}/vendor/single-vendor/${vendorId}`;
    const response = await fetch(url);
    const data = await response.json();
    // data.vendor.firm.length === 0 ? setShowFirm(false) : setShowFirm(true);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/", { replace: true });
  };

  const renderContent = (option) => {
    switch (option) {
      case "firm":
        return <AddItem />;
      case "orders":
        return <Orders url={API_URL} />;
      case "dashboard":
        return <AllProducts />;

      default:
        return <Welcome />;
    }
  };

  return (
    <div className="page-container">
      {/* Navbar */}
      <nav className="navbar open">
        {sidebarOpen ? (
          <RxCross2
            className="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        ) : (
          <GiHamburgerMenu
            className="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        )}

        <div className="logo-container">
          <GrRestaurant className="restaurant-logo" />
          <span className="logo-text">
            <h2>Foody</h2>
          </span>
        </div>
        <div className="firm-name-container">
          {showFirm && (
            <span className="firm-name">{`Firm Name : ${firmName}`}</span>
          )}
        </div>
        <div className="navbar-right">
          <img src={assets.profile_image} alt="" />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="main-container">
        <Sidebar
          open={sidebarOpen}
          showFirm={showFirm}
          showSidebarPages={setSidebarOption}
        />
        {/* Content Area */}
        <main className="content">
          {/* <NotFound /> */}
          {renderContent(sidebarOption)}
        </main>
      </div>
    </div>
  );
};

export default Home;
