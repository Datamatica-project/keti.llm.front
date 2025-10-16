import React, { useEffect } from "react";
import {
  useChatIdStore,
  useChatListLoadingStore,
  useChatMenuStore,
  useCustomAlertStore,
} from "../../store/store";
import { useNavigate } from "react-router-dom";
import { deleteChatSession } from "../../api/mainApi";

export default function AlertModal({ setIsAlertModalOpen }) {
  const { setIsCustomAlertOpen, setAlertTitle, setAlertMessage, setAlertType } =
    useCustomAlertStore();
  const navigate = useNavigate();
  const { chatId } = useChatIdStore();
  const { setChatListLoading, chatListLoading } = useChatListLoadingStore();

  // 삭제 버튼 클릭 시
  const handleDelete = async () => {
    try {
      const response = await deleteChatSession(chatId);
      console.log(response);
    } catch (error) {
      console.error("채팅 삭제 실패:", error);
    }

    setIsAlertModalOpen(false);
    setIsCustomAlertOpen(true);
    setAlertType("success");
    setAlertTitle("삭제 완료");
    setAlertMessage("채팅창이 삭제되었습니다.");
    navigate("/");
    setChatListLoading(!chatListLoading);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        handleDelete();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleDelete]);
  return (
    <div className="modal-content">
      <div>
        {/* 아이콘 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-exclamation-triangle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        </svg>
      </div>
      {/* 제목 */}
      <h2>정말 삭제하시겠습니까?</h2>
      {/* 설명 */}
      <p>삭제된 채팅방은 복구할 수 없습니다.</p>
      {/* 버튼 */}
      <div className="alert-modal-content-buttons ">
        <button onClick={() => setIsAlertModalOpen(false)}>취소</button>
        <button className="delete-button" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  );
}
