import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import {
  useChatListLoadingStore,
  useChatListNameStore,
  useChatMenuStore,
} from "../store/store";
import { createChatSession, getChatSession } from "../api/mainApi";
import { useChatCreation } from "../hook/useChatCreation";

function Sidebar() {
  const navigate = useNavigate();
  // 사용자 정보 가져오기
  const user = (() => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("사용자 데이터 파싱 오류:", error);
      return null;
    }
  })();
  const { isSidebarOpen, setIsSidebarOpen } = useChatMenuStore();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  const [chatList, setChatList] = useState([]);
  const location = useLocation();
  const { setChatListName } = useChatListNameStore();
  const { createChat, isCreating, error } = useChatCreation();
  const { chatListLoading } = useChatListLoadingStore();

  const chatListName = useMemo(() => {
    const ChatListName = {};
    // map은 새로운 배열을 반환하므로 forEach 사용
    chatList.forEach((chat) => {
      ChatListName[chat.sessionId] = chat.sessionName;
    });
    return ChatListName;
  }, [chatList]);

  // 채팅 목록 이름 설정
  useEffect(() => {
    setChatListName(chatListName);
  }, [chatListName]);

  // 채팅 세션 목록 가져오기
  useEffect(() => {
    // 로그인 상태가 아니면 채팅 세션 목록 가져오지 않음
    if (!user) return;

    const fetchChatList = async () => {
      try {
        const response = await getChatSession();
        if (response?.success) {
          setChatList(response.sessions);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          console.error("채팅 세션 목록 가져오기 오류:", error);
        }
      }
    };
    fetchChatList();
  }, [chatListLoading]);

  // 현재 경로에 따라 활성화된 메뉴 설정
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActiveMenu("home");
    } else if (path.startsWith("/chat")) {
      setActiveMenu("chat");
    } else if (path === "/mypage") {
      setActiveMenu("mypage");
    } else if (path === "/admin") {
      setActiveMenu("admin");
    } else if (path === "/mypage") {
      setActiveMenu("mypage");
    }
  }, [location.pathname]);

  // 채팅 메뉴의 각 채팅방 활성화 상태 체크
  const [isChatActive, setIsChatActive] = useState(3);

  // 홈 클릭 시 채팅 메뉴 닫기
  const handleChatClick = (chatId) => {
    setIsChatOpen(false);
  };

  // 채팅 메뉴 열기
  const handleChatOpen = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  // 채팅 메뉴 활성화
  const handleChatActive = useCallback((chatId) => {
    setIsChatActive(chatId); // 1 or 2
  }, []);

  // 사이드바 열기
  const handleSidebarOpen = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  // 채팅 생성
  const handleChatCreate = () => {
    // 채팅 생성 훅 호출
    createChat();
  };

  return (
    <nav
      className={`${styles.sidebar} ${
        isSidebarOpen ? styles.close : styles.open
      }`}
    >
      <header className={styles.header}>
        <Link to="/">
          <img src="/white_logo.png" alt="logo" className={styles.logo} />
        </Link>
        <button
          className={styles.closeButton}
          onClick={() => handleSidebarOpen()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-chevron-double-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
            <path
              fillRule="evenodd"
              d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
        </button>
      </header>
      <section className={styles.menuList}>
        <h3 className={styles.title}>메뉴</h3>

        {/* 메인 메뉴 */}
        <ul className={styles.chatList}>
          <li className={`${styles.chatItem} ${styles.chatItemTitle}`}>
            <Link
              className={`${styles.chatTitle} ${
                activeMenu === "home" ? styles.active : ""
              }`}
              to="/"
              onClick={() => handleChatClick()}
            >
              {activeMenu === "home" ? (
                <img src="/menuIcon/house.svg" alt="home" />
              ) : (
                <img src="/menuIcon/house-fill.svg" alt="home" />
              )}
              <span>홈</span>
            </Link>
          </li>
          {user && (
            <>
              <li
                className={`${styles.chatItem} ${styles.chatItemTitle}`}
                onClick={() => handleChatOpen()}
              >
                <button
                  to="/chat"
                  className={`${styles.chatTitle} ${
                    activeMenu === "chat" ? styles.active : ""
                  }`}
                >
                  {activeMenu === "chat" ? (
                    <img src="/menuIcon/chat.svg" alt="chat" />
                  ) : (
                    <img src="/menuIcon/chat-fill.svg" alt="chat" />
                  )}
                  <span>채팅</span>
                  {/* 채팅 메뉴 열기 버튼 */}
                  <span className={styles.chatItemButton}>
                    {activeMenu === "chat" ? (
                      <img
                        src="/menuIcon/chevron-down_black.svg"
                        alt="chevron-down"
                        className={`${styles.chatIcon} ${
                          isChatOpen ? styles.open : ""
                        }`}
                      />
                    ) : (
                      <img
                        src="/menuIcon/chevron-down_white.svg"
                        alt="chevron-down"
                        className={`${styles.chatIcon} ${
                          isChatOpen ? styles.open : ""
                        }`}
                      />
                    )}
                  </span>
                </button>

                <ul
                  className={`${styles.chatItemList} ${
                    isChatOpen ? styles.open : ""
                  }`}
                >
                  {chatList?.map((chat, index) =>
                    chat.id === "new" ? (
                      <li key={index}>
                        <button onClick={() => handleChatCreate()}>
                          {isSidebarOpen ? "+" : chat.title}
                        </button>
                      </li>
                    ) : (
                      <li key={index}>
                        <Link
                          to={`/chat/${chat.sessionId}`}
                          className={
                            isChatActive === index ? styles.active : ""
                          }
                          onClick={(e) => {
                            handleChatActive(index);
                            e.stopPropagation();
                          }}
                        >
                          {isSidebarOpen ? index + 1 : chat.sessionName}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </li>
              <li className={`${styles.chatItem} ${styles.chatItemTitle}`}>
                <Link
                  className={`${styles.chatTitle} ${
                    activeMenu === "mypage" ? styles.active : ""
                  }`}
                  onClick={() => handleChatClick()}
                  to="/mypage"
                >
                  {activeMenu === "mypage" ? (
                    <img src="/menuIcon/gear.svg" alt="account" />
                  ) : (
                    <img src="/menuIcon/gear-fill.svg" alt="account" />
                  )}
                  <span>계정 관리</span>
                </Link>
              </li>
              {/* 관리자 페이지 메뉴 */}
              {user.roles && user.roles[0] === "ADMIN" && (
                <li className={styles.chatItem}>
                  <Link
                    className={`${styles.chatTitle} ${
                      activeMenu === "admin" ? styles.active : ""
                    }`}
                    to="/admin"
                  >
                    {activeMenu === "admin" ? (
                      <img src="/menuIcon/person-badge.svg" alt="admin" />
                    ) : (
                      <img src="/menuIcon/person-badge-fill.svg" alt="admin" />
                    )}
                    <span>관리자 페이지</span>
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>

        {/* 관리 메뉴 */}
        <ul className={styles.subChatList}>
          <li className={styles.chatItem}>
            {user ? (
              <button
                className={styles.chatTitle}
                onClick={() => {
                  localStorage.removeItem("userEmail");
                  localStorage.removeItem("user");
                  navigate("/");
                  window.location.reload();
                }}
              >
                <img src="/menuIcon/door-closed-fill.svg" alt="logout" />
                <span>로그아웃</span>
              </button>
            ) : (
              <button
                className={styles.chatTitle}
                onClick={() => {
                  navigate("/login");
                }}
              >
                <img src="/menuIcon/door-open-fill.svg" alt="logout" />
                <span>로그인</span>
              </button>
            )}
          </li>
          {!user ? (
            <li className={styles.chatItem}>
              <Link className={styles.chatTitle} to="/register">
                <img src="/menuIcon/person-plus-fill.svg" alt="register" />
                <span>회원가입</span>
              </Link>
            </li>
          ) : null}
        </ul>
      </section>
      {user ? (
        <section className={styles.userInfo}>
          <h3>{user.fullName}</h3>
          <p>{user.username}</p>
        </section>
      ) : (
        <section className={styles.userInfo}>
          <h3>로그인 후 이용해주세요.</h3>
        </section>
      )}
    </nav>
  );
}

export default Sidebar;
