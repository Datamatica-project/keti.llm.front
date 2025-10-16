import React, { useEffect, useState, useRef } from "react";
import styles from "./ChatMenu.module.css";
import AlertModal from "./Modal";
import {
  useChatIdStore,
  useChatListNameStore,
  useChatMenuStore,
  useSidebarOpenStore,
} from "../store/store";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useIsMobile from "../hook/useIsMobile";

export default function ChatMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { chatId } = useParams();
  const { setChatId } = useChatIdStore();
  const { chatListName } = useChatListNameStore();
  const { setIsFeedbackModalOpen } = useChatMenuStore();
  const location = useLocation();
  const isChatPage = location.pathname.includes("/chat");
  const { sidebarOpen, setSidebarOpen } = useSidebarOpenStore();

  const {
    isAlertModalOpen,
    setIsAlertModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
  } = useChatMenuStore();

  const openAlertModal = () => {
    setIsAlertModalOpen(true);
    setIsEditModalOpen(false);
    setIsFeedbackModalOpen(false);
    setChatId(chatId);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
    setIsAlertModalOpen(false);
    setIsFeedbackModalOpen(false);
  };

  // 메뉴 밖 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const isMobile = useIsMobile(900);

  return (
    <div className={styles.chatMenuContainer}>
      {isMobile && (
        <button
          className={styles.sidebarOpenButton}
          onClick={() => handleSidebarOpen()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
            color="white"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
      )}
      <h1>{chatListName[chatId]}</h1>
      <div className={styles.chatMenuButton} ref={menuRef}>
        {isChatPage && (
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </button>
        )}

        <ul
          className={`${styles.chatMenu} ${
            isOpen ? styles.open : styles.close
          }`}
        >
          <li>
            <button onClick={openAlertModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
              삭제
            </button>
          </li>
          <li>
            <button onClick={openEditModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
              이름 변경
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
