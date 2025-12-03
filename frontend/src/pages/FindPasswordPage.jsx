import React, { useState } from "react";
import BodyButton from "../components/BodyButton";
import { useNavigate } from "react-router-dom";
import { useCustomAlertStore } from "../store/store";
import { findPassword } from "../api/user.Api";

export default function FindPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { setIsCustomAlertOpen, setAlertTitle, setAlertMessage, setAlertType } =
    useCustomAlertStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    const response = await findPassword(email);
    console.log(response);

    setIsCustomAlertOpen(true);
    setAlertTitle("링크 전송 완료");
    setAlertMessage("이메일로 비밀번호 재설정 링크를 보냈습니다.");
    setAlertType("success");
  };

  return (
    <div className="login-bg">
      <div className="login-center">
        <h2 className="login-title">비밀번호 찾기</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="email"
            placeholder="유저 이메일 *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <BodyButton type="submit">링크 전송</BodyButton>
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
