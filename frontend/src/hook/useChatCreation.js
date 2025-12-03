import { useState } from "react";
import { createChatSession } from "../api/mainApi";
import { useChatListLoadingStore } from "../store/store";

// 채팅 생성 커스텀 훅
export const useChatCreation = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const { setChatListLoading, chatListLoading } = useChatListLoadingStore();

  // 채팅 생성
  const createChat = async () => {
    setIsCreating(true);
    setError(null);

    try {
      const response = await createChatSession();
      setChatListLoading(!chatListLoading);
      return response;
    } catch (error) {
      console.error("채팅 생성 실패:", error);
      setError(error.message);
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  return { isCreating, error, createChat };
};
