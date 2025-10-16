import React, { useEffect } from "react";
import "./Modal.css";
import { useChatMenuStore } from "../store/store";

export default function Modal({ children }) {
  const { setIsAlertModalOpen, setIsEditModalOpen, setIsFeedbackModalOpen } =
    useChatMenuStore();

  const handleClose = () => {
    setIsAlertModalOpen(false);
    setIsEditModalOpen(false);
    setIsFeedbackModalOpen(false);
  };

  useEffect(() => {
    // 모달 창 닫기 키 추가
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="modal">
      <button className="modal-close-button" onClick={handleClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x-lg"
          viewBox="0 0 16 16"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
      </button>
      <>{children}</>
    </div>
  );
}
