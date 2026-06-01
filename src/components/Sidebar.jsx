import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
const menuItems = [
  { key: "firm", label: "Add Item" },
  { key: "orders", label: "Orders" },
  { key: "dashboard", label: "All Products" },
];

const Sidebar = (props) => {
  const { open, showFirm, showSidebarPages } = props;
  const [activeLayout, setActiveLayout] = useState("");
  const filteredMenuItems = showFirm
    ? menuItems.filter((item) => item.key !== "firm")
    : menuItems;

  const handlingListItems = (key) => {
    setActiveLayout(key);
    showSidebarPages(key);
  };

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <ul className="sidebar-menu">
        {filteredMenuItems.map((item) => (
          <li
            className={activeLayout === item.key ? "active" : ""}
            onClick={() => handlingListItems(item.key)}
            key={item.key}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
