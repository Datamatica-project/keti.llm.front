import React from "react";
import { useChatMenuStore, useCustomAlertStore } from "../../store/store";
import { sendFeedback } from "../../api/chatApi";

export default function FeedbackModal() {
  const { setIsCustomAlertOpen, setAlertTitle, setAlertMessage, setAlertType } =
    useCustomAlertStore();
  const {
    isFeedbackModalOpen,
    setIsFeedbackModalOpen,
    feedbackMessageIndex,
    setFeedbackMessageIndex,
    feedbackText,
    setFeedbackText,
    setShouldCancelFeedback,
    setPreviousFeedbackState,
  } = useChatMenuStore();

  const handleFeedback = async () => {
    if (!feedbackText.trim()) {
      setIsCustomAlertOpen(true);
      setAlertTitle("피드백 전송 실패");
      setAlertMessage("피드백을 입력해주세요.");
      setAlertType("error");
      return;
    }
    const feedback = {
      messageId: feedbackMessageIndex,
      feedbackType: "BAD",
      feedbackComment: feedbackText,
    };
    try {
      const response = await sendFeedback(feedback);
      if (response.success) {
        setIsCustomAlertOpen(true);
        setAlertTitle("피드백 전송 완료");
        setAlertMessage("피드백이 전송되었습니다.");
        setAlertType("success");
        setIsFeedbackModalOpen(false);
        setPreviousFeedbackState(null);
      }
    } catch (err) {
      console.error("피드백 전송 실패", err);
    }
  };

  const handleCancel = () => {
    setShouldCancelFeedback(true);
    setIsFeedbackModalOpen(false);
    setFeedbackText("");
  };

  return (
    <div className="modal-edit-content">
      <div>
        {/* 아이콘 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#ffffff"
          className="bi bi-envelope-open-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8.941.435a2 2 0 0 0-1.882 0l-6 3.2A2 2 0 0 0 0 5.4v.314l6.709 3.932L8 8.928l1.291.718L16 5.714V5.4a2 2 0 0 0-1.059-1.765zM16 6.873l-5.693 3.337L16 13.372v-6.5Zm-.059 7.611L8 10.072.059 14.484A2 2 0 0 0 2 16h12a2 2 0 0 0 1.941-1.516M0 13.373l5.693-3.163L0 6.873z" />
        </svg>
      </div>
      {/* 제목 */}
      <h2>피드백 보내기</h2>
      {/* 입력창 */}
      <textarea
        placeholder="피드백을 입력해주세요."
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        className="input"
      />
      {/* 버튼 */}
      <div className="alert-modal-content-buttons ">
        <button onClick={handleCancel}>취소</button>
        <button className="feedback-button" onClick={handleFeedback}>
          전송
        </button>
      </div>
    </div>
  );
}
