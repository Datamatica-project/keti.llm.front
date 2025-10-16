import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import Sidebar from "./components/Sidebar";
import { SidebarProvider } from "./context/SidebarContext";
import MainPage from "./pages/MainPage";
import Modal from "./components/Modal";
import { useChatMenuStore, useCustomAlertStore } from "./store/store";
import AlertModal from "./components/Modal/AlertModal";
import EditModal from "./components/Modal/EditModal";
import CustomAlert from "./components/Modal/CustomAlert";
import FindPasswordPage from "./pages/FindPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import RequestCompanyPage from "./pages/RequestCompanyPage";
import Header from "./components/Header";
import MypagePage from "./pages/MypagePage";
import Layout from "./pages/Layout";
import AdminPage from "./pages/AdminPage";
import FeedbackModal from "./components/Modal/FeedbackModal";

function App() {
  const {
    isAlertModalOpen,
    setIsAlertModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isFeedbackModalOpen,
    setIsFeedbackModalOpen,
  } = useChatMenuStore();
  const { isCustomAlertOpen, setIsCustomAlertOpen } = useCustomAlertStore();
  return (
    <SidebarProvider>
      <Router>
        {/* 삭제 모달 */}
        {isAlertModalOpen && (
          <Modal>
            <AlertModal setIsAlertModalOpen={setIsAlertModalOpen} />
          </Modal>
        )}
        {/* 수정 모달 */}
        {isEditModalOpen && (
          <Modal>
            <EditModal setIsEditModalOpen={setIsEditModalOpen} />
          </Modal>
        )}
        {isFeedbackModalOpen && (
          <Modal>
            <FeedbackModal setIsFeedbackModalOpen={setIsFeedbackModalOpen} />
          </Modal>
        )}
        {/* 커스텀 모달 */}
        {isCustomAlertOpen && (
          <CustomAlert setIsCustomAlertOpen={setIsCustomAlertOpen} />
        )}
        {/* 라우트 */}
        {/* <Header /> */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/find-password" element={<FindPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/request-company" element={<RequestCompanyPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/chat/:chatId" element={<ChatPage />} />
            <Route path="/mypage" element={<MypagePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
