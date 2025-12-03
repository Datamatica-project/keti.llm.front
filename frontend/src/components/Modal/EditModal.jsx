import React, { useEffect, useState, useCallback } from "react";
import {
  useChatIdStore,
  useChatListLoadingStore,
  useCustomAlertStore,
} from "../../store/store";
import { updateChatSession } from "../../api/mainApi";

export default function EditModal({ setIsEditModalOpen }) {
  const { setIsCustomAlertOpen, setAlertTitle, setAlertMessage, setAlertType } =
    useCustomAlertStore();
  const [editInput, setEditInput] = useState("");
  const { chatId } = useChatIdStore();
  const { setChatListLoading, chatListLoading } = useChatListLoadingStore();
  const handleEdit = useCallback(async () => {
    if (editInput === "") {
      setIsCustomAlertOpen(true);
      setAlertTitle("변경 실패");
      setAlertType("error");
      setAlertMessage("채팅방 이름을 입력해주세요.");
      return;
    }

    try {
      const response = await updateChatSession(chatId, editInput);

      setChatListLoading(!chatListLoading);
    } catch (error) {
      console.error("채팅 이름 변경 실패:", error);
    }

    setIsEditModalOpen(false);
    setIsCustomAlertOpen(true);
    setAlertType("success");
    setAlertTitle("변경 완료");
    setAlertMessage("이름이 변경되었습니다.");
  }, [
    editInput,
    setIsEditModalOpen,
    setIsCustomAlertOpen,
    setAlertTitle,
    setAlertType,
    setAlertMessage,
  ]);

  // 엔터키 입력 시 변경
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        handleEdit();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleEdit]);

  return (
    <div className="modal-edit-content">
      <div>
        {/* 아이콘 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
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
      </div>
      {/* 제목 */}
      <h2>채팅방 이름 변경</h2>
      {/* 입력창 */}
      <input
        type="text"
        placeholder="채팅방 이름"
        id="edit-input"
        name="edit-input"
        value={editInput}
        onChange={(e) => setEditInput(e.target.value)}
        autoFocus
      />
      {/* 버튼 */}
      <div className="alert-modal-content-buttons ">
        <button onClick={() => setIsEditModalOpen(false)}>취소</button>
        <button className="edit-button" onClick={handleEdit}>
          변경
        </button>
      </div>
    </div>
  );
}
