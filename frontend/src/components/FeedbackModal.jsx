import React, { useState } from "react";

export default function FeedbackModal(
  feedbackText,
  setFeedbackText,
  feedbackMessageIndex,
  setFeedbackMessageIndex,
  messages,
  setMessages,
  setShowFeedbackModal
) {
  // 피드백 제출 처리
  const handleFeedbackSubmit = () => {
    if (feedbackMessageIndex !== null) {
      const newMessages = [...messages];
      newMessages[feedbackMessageIndex].feedback = "dislike";
      newMessages[feedbackMessageIndex].feedbackText = feedbackText;
      setMessages(newMessages);

      // TODO: 여기에서 피드백을 서버에 전송하는 로직을 추가할 수 있습니다.
      console.log("피드백 제출:", {
        message: newMessages[feedbackMessageIndex].text,
        feedback: feedbackText,
      });

      // 모달창 닫기
      setShowFeedbackModal(false);
      setFeedbackMessageIndex(null);
      setFeedbackText("");
    }
  };

  // 피드백 모달창 닫기
  const handleCloseModal = () => {
    setShowFeedbackModal(false);
    setFeedbackMessageIndex(null);
    setFeedbackText("");
  };

  return (
    <div className="feedback-modal-overlay">
      <div className="feedback-modal">
        <div className="feedback-modal-header">
          <h3>피드백</h3>
        </div>
        <div className="feedback-modal-body">
          <textarea
            className="feedback-textarea"
            placeholder="이 응답의 어떤 점이 만족스럽지 않나요?"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            rows={4}
          />
          <p className="feedback-note">
            {" "}
            이 보고서를 제출하면 향후 모델 개선에 사용됩니다.{" "}
            <button className="link-button">자세히 알아보기</button>
          </p>
        </div>
        <div className="feedback-modal-footer">
          <button className="feedback-cancel-button" onClick={handleCloseModal}>
            취소
          </button>
          <button
            className="feedback-submit-button"
            onClick={handleFeedbackSubmit}
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
}
