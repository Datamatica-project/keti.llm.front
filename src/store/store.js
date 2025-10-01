import { create } from "zustand";

// export const useAuthStore = create((set) => ({
//   userEmail: null,
//   setUserEmail: (email) => set({ userEmail: email }),
// }));

export const newinputTextStore = create((set) => ({
  newinputText: "",
  setNewInputText: (text) => set({ newinputText: text }),
  shouldAutoSend: false,
  setShouldAutoSend: (value) => set({ shouldAutoSend: value }),
}));

export const useChatMenuStore = create((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (value) => set({ isMenuOpen: value }),
  isAlertModalOpen: false,
  setIsAlertModalOpen: (value) => set({ isAlertModalOpen: value }),
  isEditModalOpen: false,
  setIsEditModalOpen: (value) => set({ isEditModalOpen: value }),
  isSidebarOpen: false,
  setIsSidebarOpen: (value) => set({ isSidebarOpen: value }),

  isFeedbackModalOpen: false,
  setIsFeedbackModalOpen: (value) => set({ isFeedbackModalOpen: value }),
  feedbackMessageIndex: null,
  setFeedbackMessageIndex: (index) => set({ feedbackMessageIndex: index }),
  feedbackText: "",
  setFeedbackText: (text) => set({ feedbackText: text }),

  // 피드백 취소를 위한 이전 상태 저장
  previousFeedbackState: null,
  setPreviousFeedbackState: (state) => set({ previousFeedbackState: state }),

  // 취소 시그널 (ChatPage에서 감지용)
  shouldCancelFeedback: false,
  setShouldCancelFeedback: (value) => set({ shouldCancelFeedback: value }),
}));

export const useCustomAlertStore = create((set) => ({
  isCustomAlertOpen: false,
  setIsCustomAlertOpen: (value) => set({ isCustomAlertOpen: value }),
  alertTitle: "",
  setAlertTitle: (title) => set({ alertTitle: title }),
  alertMessage: "",
  setAlertMessage: (message) => set({ alertMessage: message }),
  alertType: "success",
  setAlertType: (type) => set({ alertType: type }),
}));

// 채팅 목록 관리
export const useChatListStore = create((set) => ({
  chatList: [],
  setChatList: (chatList) => set({ chatList }),
  addChat: (newChat) =>
    set((state) => ({
      chatList: [...state.chatList, newChat],
    })),
  updateChatList: (updatedList) => set({ chatList: updatedList }),
}));

export const useChatIdStore = create((set) => ({
  chatId: "",
  setChatId: (id) => set({ chatId: id }),
}));

export const useChatListNameStore = create((set) => ({
  chatListName: [],
  setChatListName: (name) => set({ chatListName: name }),
}));

export const useChatListLoadingStore = create((set) => ({
  chatListLoading: true,
  setChatListLoading: (loading) => set({ chatListLoading: loading }),
}));
