import React, { useState } from "react";
import {
  useChatMenuStore,
  useCustomAlertStore,
  useChatIdStore,
  useChatListNameStore,
} from "../../store/store";
import { getChatList } from "../../api/mainApi";

export default function ExportModal() {
  const [fileFormat, setFileFormat] = useState("json");
  const { setIsCustomAlertOpen, setAlertTitle, setAlertMessage, setAlertType } =
    useCustomAlertStore();
  const { setIsExportModalOpen } = useChatMenuStore();
  const { chatId } = useChatIdStore();
  const { chatListName } = useChatListNameStore();

  // CSV 특수문자 처리 함수
  const escapeCSV = (str) => {
    if (!str) return "";
    // 문자열로 변환
    const strValue = String(str);
    // 쉼표, 따옴표, 줄바꿈이 있으면 큰따옴표로 감싸기
    if (
      strValue.includes(",") ||
      strValue.includes('"') ||
      strValue.includes("\n")
    ) {
      // 큰따옴표는 두 개로 이스케이프
      return `"${strValue.replace(/"/g, '""')}"`;
    }
    return strValue;
  };

  const handleDownload = async () => {
    try {
      // 현재 채팅 데이터 가져오기
      const response = await getChatList(chatId);
      const messages = response.messages;

      if (!messages || messages.length === 0) {
        setIsCustomAlertOpen(true);
        setAlertTitle("내보내기 실패");
        setAlertMessage("내보낼 채팅 내역이 없습니다.");
        setAlertType("error");
        return;
      }

      let data;
      let mimeType;
      let fileExtension;

      if (fileFormat === "json") {
        // JSON 형식
        data = JSON.stringify(
          {
            chatId: chatId,
            chatName: chatListName[chatId] || "채팅",
            exportDate: new Date().toISOString(),
            messages: messages.map((msg) => ({
              content: msg.content,
              messageType: msg.messageType,
              feedbackType: msg.feedbackType || null,
              timestamp: msg.timestamp || null,
            })),
          },
          null,
          2
        );
        mimeType = "application/json";
        fileExtension = "json";
      } else if (fileFormat === "text") {
        // TEXT 형식
        const chatName = chatListName[chatId] || "채팅";
        const exportDate = new Date().toLocaleString("ko-KR");
        let textData = `채팅 제목: ${chatName}\n내보내기 날짜: ${exportDate}\n\n`;
        textData += "=".repeat(50) + "\n\n";

        messages.forEach((msg, index) => {
          const sender = msg.messageType === "USER" ? "사용자" : "AI";
          textData += `[${sender}]\n${msg.content}\n\n`;
        });

        data = textData;
        mimeType = "text/plain";
        fileExtension = "txt";
      } else if (fileFormat === "csv") {
        // CSV 형식
        const BOM = "\uFEFF"; // 한글 깨짐 방지
        const headers = ["메시지 유형", "발신자", "내용", "피드백", "시간"];

        // CSV 데이터 행 생성
        const rows = messages.map((msg) => {
          const sender = msg.messageType === "USER" ? "사용자" : "AI";
          const content = escapeCSV(msg.content);
          const feedback = escapeCSV(msg.feedbackType || "");
          const timestamp = escapeCSV(msg.timestamp || "");

          return [
            escapeCSV(msg.messageType),
            escapeCSV(sender),
            content,
            feedback,
            timestamp,
          ].join(",");
        });

        // CSV 문자열 조합
        data = BOM + [headers.join(","), ...rows].join("\n");
        mimeType = "text/csv";
        fileExtension = "csv";
      }

      // Blob 생성 및 다운로드
      const blob = new Blob([data], { type: `${mimeType};charset=utf-8` });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      // 파일명 생성 (채팅방 이름 + 날짜)
      const chatName = chatListName[chatId] || "채팅";
      const dateStr = new Date().toISOString().split("T")[0];
      a.download = `${chatName}_${dateStr}.${fileExtension}`;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // 성공 알림
      setIsCustomAlertOpen(true);
      setAlertTitle("내보내기 완료");
      setAlertMessage("채팅 기록이 다운로드되었습니다.");
      setAlertType("success");
      setIsExportModalOpen(false);
    } catch (error) {
      console.error("채팅 기록 내보내기 실패:", error);
      setIsCustomAlertOpen(true);
      setAlertTitle("내보내기 실패");
      setAlertMessage("채팅 기록을 내보내는 중 오류가 발생했습니다.");
      setAlertType("error");
    }
  };

  const handleCancel = () => {
    setIsExportModalOpen(false);
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
          className="bi bi-upload"
          viewBox="0 0 16 16"
        >
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
          <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
        </svg>
      </div>
      {/* 제목 */}
      <h2>채팅 기록 내보내기</h2>
      {/* 파일 형식 선택 */}
      <select
        value={fileFormat}
        onChange={(e) => setFileFormat(e.target.value)}
        className="input"
      >
        <option value="json">JSON</option>
        <option value="text">텍스트</option>
        <option value="csv">CSV</option>
      </select>
      {/* 버튼 */}
      <div className="alert-modal-content-buttons">
        <button onClick={handleCancel}>취소</button>
        <button className="feedback-button" onClick={handleDownload}>
          내보내기
        </button>
      </div>
    </div>
  );
}
