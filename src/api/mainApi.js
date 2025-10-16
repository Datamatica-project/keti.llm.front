import api from "./index";

export const getChatList = async (sessionId) => {
  const response = await api.get(`/api/v1/chat/messages/${sessionId}`);
  return response.data;
};

// 채팅 세션 목록 가져오기
export const getChatSession = async () => {
  try {
    const response = await api.get(`/api/v1/chat/sessions`);
    // 채팅 세션이 없으면 채팅 시작하기 + 버튼 추가
    if (response.data.sessions.length <= 1) {
      response.data.sessions.push({
        id: "new",
        title: "채팅 시작하기 +",
        sessionId: "-1",
      });
    }

    return response.data;
  } catch (error) {
    console.error("채팅 세션 목록 가져오기 실패:", error);
    throw error;
  }
};

export const createChatSession = async () => {
  const response = await api.post(`/api/v1/chat/sessions`, {});

  return response.data;
};

export const deleteChatSession = async (sessionId) => {
  const response = await api.delete(`/api/v1/chat/sessions/${sessionId}`);
  return response.data;
};

export const updateChatSession = async (sessionId, sessionName) => {
  const response = await api.put(`/api/v1/chat/sessions/${sessionId}`, {
    sessionName,
  });
  return response.data;
};

export const sendMessage = async (sessionId, message) => {
  const response = await api.post(`/api/v1/chat/messages/simple`, {
    sessionId,
    message,
  });
  return response.data;
};
