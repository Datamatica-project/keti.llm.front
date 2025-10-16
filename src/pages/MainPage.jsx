import React, { useEffect, useRef, useState } from "react";
import "./ChatPage.css";
import { useNavigate } from "react-router-dom";
import {
  newinputTextStore,
  useChatIdStore,
  useChatListLoadingStore,
} from "../store/store";
import ChatInput from "../components/ChatInput";
import { getChatSession } from "../api/mainApi";
import { useChatCreation } from "../hook/useChatCreation";
import { useSidebarOpenStore } from "../store/store";

export default function MainPage() {
  const [inputText, setInputText] = useState("");

  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const { setNewInputText, setShouldAutoSend } = newinputTextStore();
  const [handleAnimation, setHandleAnimation] = useState(false);
  const [animationStyle, setAnimationStyle] = useState({});
  const chatCenterRef = useRef(null);
  const [firstChatId, setFirstChatId] = useState("");
  const { createChat, isCreating, error } = useChatCreation();
  const { setChatListLoading, chatListLoading } = useChatListLoadingStore();
  const { sidebarOpen, setSidebarOpen } = useSidebarOpenStore();
  // 채팅 세션 목록 가져오기
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return;
    const fetchChatList = async () => {
      try {
        const response = await getChatSession();
        setFirstChatId(response.sessions[0].sessionId);
      } catch (error) {
        console.error("채팅 세션 목록 가져오기 실패:", error);
      }
    };
    fetchChatList();
  }, []);

  useEffect(() => {
    if (handleAnimation && chatCenterRef.current) {
      const element = chatCenterRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 요소를 화면 하단으로 이동시키기 위한 계산
      const distanceToBottom = windowHeight - rect.bottom;
      const margin = 20;
      const translateY = distanceToBottom - margin;

      setAnimationStyle({
        transform: `translateY(${translateY}px)`,
        transition: "transform 0.3s ease-in-out",
      });
    }
  }, [handleAnimation]);

  // 로그인 여부 확인
  const isLoggedIn = !!localStorage.getItem("userEmail");

  // 텍스트 입력 처리 및 높이 자동 조절
  const handleTextChange = (e) => {
    setInputText(e.target.value);
    adjustTextareaHeight(e.target);
  };

  // textarea 높이 자동 조절 함수
  const adjustTextareaHeight = (element) => {
    if (!element) return;

    // 내용에 따라 높이 조절
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, 120)}px`;
  };

  // textarea 참조가 설정되었을 때 초기 높이 설정
  // useEffect(() => {
  //   if (textareaRef.current) {
  //     adjustTextareaHeight(textareaRef.current);
  //   }
  // }, []); // 메시지 목록이 변경될 때마다 실행

  // 메시지 전송 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setHandleAnimation(true);

    let targetChatId = firstChatId;

    if (firstChatId === "-1") {
      const response = await createChat();

      targetChatId = response.session.sessionId; // 응답에서 직접 가져오기
      setFirstChatId(response.session.sessionId);
    }

    setTimeout(() => {
      setNewInputText(inputText);
      setShouldAutoSend(true);
      navigate(`/chat/${targetChatId}`); // 업데이트된 값 사용
      setChatListLoading(!chatListLoading);
    }, 1000);
  };

  // 키 입력 처리 핸들러
  const handleKeyDown = (e) => {
    // 쉬프트 + 엔터인 경우 줄바꿈 처리
    if (e.key === "Enter" && e.shiftKey) {
      // 기본 동작(폼 제출) 방지
      e.preventDefault();
      // 커서 위치에 줄바꿈 추가
      const cursorPosition = e.target.selectionStart;
      const newText =
        inputText.substring(0, cursorPosition) +
        "\n" +
        inputText.substring(cursorPosition);

      setInputText(newText);

      // 다음 렌더링 후 커서 위치 조정
      setTimeout(() => {
        e.target.selectionStart = cursorPosition + 1;
        e.target.selectionEnd = cursorPosition + 1;
      }, 0);
    }
    // 그냥 엔터만 누른 경우 폼 제출
    else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  const handleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <div className="chat-bg">
        <div className={`chat-container empty-chat`}>
          <button
            className="sidebar-open-button"
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
          <div className="initial-layout">
            <h1 className={`chat-title ${handleAnimation ? "fade-in" : ""}`}>
              무엇을 도와드릴까요? <br />
              <span className="chat-guide-text">
                궁금한 내용을 자유롭게 입력해보세요.
              </span>
            </h1>
            <span className={`chat-guide ${handleAnimation ? "fade-in" : ""}`}>
              AI는 실수를 할 수 있습니다. 중요한 정보는 재차 확인하세요.
            </span>
            <div
              className={`chat-center initial-chat ${
                handleAnimation ? "show-down" : ""
              }`}
              ref={chatCenterRef}
              style={handleAnimation ? animationStyle : {}}
            >
              {/* 초기 화면에서만 보이는 입력 폼 */}
              <ChatInput
                inputText={inputText}
                setInputText={setInputText}
                handleTextChange={handleTextChange}
                handleKeyDown={handleKeyDown}
                handleSubmit={handleSubmit}
                isLoggedIn={isLoggedIn}
                textareaRef={textareaRef}
              />
            </div>
            {/* <section
              className={`chat-section ${handleAnimation ? "fade-in" : ""}`}
            >
              <article></article>
              <article></article>
              <article></article>
            </section> */}
          </div>
        </div>
      </div>
    </div>
  );
}
