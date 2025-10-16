import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCustomAlertStore } from "../store/store";
import BodyButton from "../components/BodyButton";
import "./ResetPasswordPage.css";
import { resetPassword } from "../api/user.Api";

export default function ResetPasswordPage() {
  // 알림 상태 관리
  const { setIsCustomAlertOpen, setAlertTitle, setAlertMessage, setAlertType } =
    useCustomAlertStore();
  const navigate = useNavigate();

  // 비밀번호 상태 관리
  const [password, setPassword] = useState("");
  // 비밀번호 확인 상태 관리
  const [confirmPassword, setConfirmPassword] = useState("");
  // 에러 상태 관리
  const [error, setError] = useState(false);
  // 비밀번호 확인 참조 관리
  const confirmPasswordRef = useRef(null);

  // 로그인 상태 체크
  useEffect(() => {
    if (localStorage.getItem("user") || localStorage.removeItem("userEmail")) {
      localStorage.removeItem("user");
      localStorage.removeItem("userEmail");
      window.location.reload();
    }
  }, []);

  // url에서 토큰 가져오기
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  // 비밀번호 재설정 요청
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 불일치 체크
    if (password !== confirmPassword) {
      setIsCustomAlertOpen(true);
      setAlertTitle("비밀번호 불일치");
      setAlertMessage("비밀번호가 일치하지 않습니다.");
      setAlertType("error");
      setError(true);
      confirmPasswordRef.current.focus();
      return;
    }

    // 비밀번호 재설정 요청
    try {
      const response = await resetPassword(password, token);
      if (response.success) {
        setIsCustomAlertOpen(true);
        setAlertTitle("비밀번호 재설정 완료");
        setAlertMessage("비밀번호가 재설정되었습니다.");
        setAlertType("success");
        navigate("/login");
      } else {
        setIsCustomAlertOpen(true);
        setAlertTitle("비밀번호 재설정 실패");
        setAlertMessage("비밀번호 재설정에 실패했습니다.");
        setAlertType("error");
        setError(true);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-center">
        <h2 className="login-title">비밀번호 재설정</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className={`login-input ${error && "input-error"}`}
            type="password"
            placeholder="비밀번호 *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className={`login-input ${error && "input-error"}`}
            type="password"
            placeholder="비밀번호 확인 *"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            ref={confirmPasswordRef}
          />
          <BodyButton type="submit">등록</BodyButton>
        </form>

        <div className="login-link-row">
          <span>로그인 페이지로 돌아가기</span>
          <a className="login-link" href="/login">
            로그인
          </a>
        </div>
      </div>
    </div>
  );
}
