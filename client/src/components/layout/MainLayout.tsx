import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { ReactNode } from "react";
import "./layout.css";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="layout-shell">
      <Sidebar isCollapsed={isCollapsed} />

      <div className="layout-content">
        <Navbar onToggleSidebar={toggleSidebar} />
        <div className="main-content">
          <div className="content-wrapper">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;