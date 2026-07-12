import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { ReactNode } from "react";
import "./layout.css";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="layout-shell">
      <Sidebar />

      <div className="layout-content">
        <div className="main-content">
          <Navbar />
          <div className="content-wrapper">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;