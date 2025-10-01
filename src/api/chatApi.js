import axios from "axios";

// API 요청 시 사용할 기본 URL 및 헤더 설정
const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// Chat API에 메시지 전송 함수
// export const sendMessage = async (messages, customApiKey = null) => {
//   // 환경변수 API 키 또는 사용자 제공 API 키 사용
//   const apiKey = customApiKey || API_KEY;

//   // API 키 체크
//   if (!apiKey) {
//     throw new Error("API 키가 필요합니다. 환경변수 또는 직접 입력해주세요.");
//   }

//   try {
//     const response = await axios.post(
//       API_URL,
//       {
//         model: "gpt-3.5-turbo",
//         messages: messages,
//         temperature: 0.7,
//         max_tokens: 1000,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${apiKey}`,
//         },
//       }
//     );
//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error("Error sending message:", error);
//     // API 키 관련 오류 감지
//     if (error.response && error.response.status === 401) {
//       throw new Error("API 키가 유효하지 않습니다.");
//     }
//     throw new Error("메시지 전송 중 오류가 발생했습니다.");
//   }
// };

// 채팅 히스토리를 API 메시지 형식으로 변환
export const formatMessagesForAPI = (chatHistory) => {
  return chatHistory.map((msg) => ({
    role: msg.isUser ? "user" : "assistant",
    content: msg.text,
  }));
};

// 채팅 개수 조회
export const getChatList = async () => {
  try {
    // const response = await axios.get(`/api/user/register`);
    // return response.data;
    return [
      {
        id: 1,
        title: "1번 채팅",
      },
      {
        id: 2,
        title: "2번 채팅",
      },
    ];
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
};

export const sendFeedback = async (feedback) => {
  try {
    const response = await axios.post(`/api/v1/chat/feedback`, feedback);

    return response.data;
  } catch (error) {
    console.error("Error sending feedback:", error);
    throw error;
  }
};
