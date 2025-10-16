import React, { useEffect, useState } from "react";
import BodyButton from "../components/BodyButton";
import "./MypagePage.css";
import { getUserInfo, updateUserInfo } from "../api/user.Api";
import { useCustomAlertStore } from "../store/store";
import { useNavigate } from "react-router-dom";

export default function MypagePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [allowedCompanies, setAllowedCompanies] = useState([]);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const { setIsCustomAlertOpen, setAlertTitle, setAlertMessage, setAlertType } =
    useCustomAlertStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await getUserInfo();
      setEmail(response.profile.username || "");
      setName(response.profile.fullName || "");
      setCompany(response.profile.companyName || "");
    };
    fetchUserInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      fullName: name,
      username: email,
    };
    if (isPasswordReset) {
      if (password !== passwordConfirm) {
        setIsCustomAlertOpen(true);
        setAlertTitle("비밀번호 재설정 실패");
        setAlertMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        setAlertType("error");
        return;
      }
      userData.changePassword = true;
      userData.password = password;
      userData.passwordConfirm = passwordConfirm;
    } else {
      userData.changePassword = false;
    }
    const response = await updateUserInfo(userData);

    if (response.success) {
      setIsCustomAlertOpen(true);
      setAlertTitle("회원 정보 수정 성공");
      setAlertMessage("회원 정보가 성공적으로 수정되었습니다.");
      setAlertType("success");
      navigate("/");
    } else {
      setIsCustomAlertOpen(true);
      setAlertTitle("회원 정보 수정 실패");
      setAlertMessage(response.message);
      setAlertType("error");
    }
  };

  return (
    <div className="register-bg">
      <div className="register-center">
        <h2 className="register-title">개인정보 수정</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label className="register-label">성함 *</label>
          <input
            className="register-input"
            type="text"
            placeholder="홍길동"
            required
            onChange={(e) => setName(e.target.value)}
            value={name || ""}
          />
          <label className="register-label">이메일 주소 *</label>
          <input
            className="register-input"
            type="email"
            placeholder="example@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
          />

          <label className="register-label">기관/기업명 *</label>
          <input
            className="input-disabled register-input"
            type="text"
            placeholder="기관/기업명"
            disabled
            value={company || ""}
            style={{ color: "#efefef" }}
          />

          <div className="register-divider">
            <h3>비밀번호 재설정</h3>
            <input
              type="checkbox"
              checked={isPasswordReset}
              onChange={() => {
                setIsPasswordReset(!isPasswordReset);
                if (isPasswordReset) {
                  setCurrentPassword("");
                  setPassword("");
                  setPasswordConfirm("");
                }
              }}
            />
          </div>

          <label className="register-label">새 비밀번호 *</label>
          <input
            className={`register-input ${
              !isPasswordReset ? "input-disabled" : ""
            }`}
            type="password"
            placeholder="********"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
            disabled={!isPasswordReset}
            minLength={8}
          />
          <label className="register-label">새 비밀번호 확인 *</label>
          <input
            className={`register-input ${
              !isPasswordReset ? "input-disabled" : ""
            }`}
            type="password"
            placeholder="********"
            required
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm || ""}
            disabled={!isPasswordReset}
            minLength={8}
          />

          <BodyButton type="submit">수정완료</BodyButton>
        </form>
      </div>
    </div>
  );
}
