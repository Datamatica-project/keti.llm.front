import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Layout.css";
import ChatMenu from "../components/ChatMenu";
import { useSidebarOpenStore } from "../store/store";
import useIsMobile from "../hook/useIsMobile";

export default function Layout() {
  const { sidebarOpen, setSidebarOpen } = useSidebarOpenStore();
  const isMobile = useIsMobile();
  return (
    <div className="layout-container">
      {sidebarOpen && isMobile && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar />
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
}
