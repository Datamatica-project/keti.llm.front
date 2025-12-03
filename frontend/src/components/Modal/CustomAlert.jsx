import React, { useEffect, useState } from "react";
import "./CustomAlert.css";
import { useCustomAlertStore } from "../../store/store";

export default function CustomAlert({ setIsCustomAlertOpen }) {
  const [visible, setVisible] = useState(false);
  const { alertTitle, alertMessage, alertType } = useCustomAlertStore();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        setIsCustomAlertOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // 토스트 알림 애니메이션
  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setIsCustomAlertOpen(false);
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [setIsCustomAlertOpen]);

  return (
    <div className={`Custom-alert-content ${visible ? "show" : "hide"}`}>
      <div>
        {alertType === "success" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-patch-check-fill"
            viewBox="0 0 16 16"
          >
            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#ff4d5d"
            className="bi bi-exclamation-triangle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
        )}
      </div>
      <div className="Custom-alert-content-text">
        <h2>{alertTitle}</h2>
        <p>{alertMessage}</p>
      </div>
      <button
        className="Custom-alert-content-button"
        onClick={() => setIsCustomAlertOpen(false)}
      >
        확인
      </button>
    </div>
  );
}
