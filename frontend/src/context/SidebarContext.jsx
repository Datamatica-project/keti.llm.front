import React, { createContext, useState, useContext } from "react";
import { useChatMenuStore } from "../store/store";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsMenuOpen, setIsAlertModalOpen, setIsEditModalOpen } =
    useChatMenuStore();

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
    setIsMenuOpen(false);
    setIsAlertModalOpen(false);
    setIsEditModalOpen(false);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
