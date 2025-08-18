import React, { useEffect, useState } from "react";
import BodyButton from "../components/BodyButton";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";
import { getAllowedCompanies, registerUser } from "../api/user.Api";
import { useCustomAlertStore } from "../store/store";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [allowedCompanies, setAllowedCompanies] = useState([]);
  const navigate = useNavigate();
  const { setIsCustomAlertOpen, setAlertTitle, setAlertMessage, setAlertType } =
    useCustomAlertStore();

  useEffect(() => {
    // 허용된 기업 요청
    const fetchAllowedCompanies = async () => {
      try {
        const response = await getAllowedCompanies();

        setAllowedCompanies(response.companies);
      } catch (error) {
        console.error("허용된 기업 불러오기 에러:", error);
      }
    };
    fetchAllowedCompanies();
  }, []);

  // 회원가입 요청
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setIsCustomAlertOpen(true);
      setAlertTitle("회원가입 실패");
      setAlertMessage("비밀번호가 일치하지 않습니다.");
      setAlertType("error");
      return;
    }

    const userData = {
      email,
      password,
      passwordConfirm,
      company,
      name,
    };
    let response;
    try {
      response = await registerUser(userData);
      console.log(response);
    } catch (error) {
      console.error("회원가입 에러:", error);
    }

    if (response.success) {
      setIsCustomAlertOpen(true);
      setAlertTitle("회원가입 성공");
      setAlertMessage("관리자 승인을 기다려주세요");
      setAlertType("success");
      navigate("/");
    } else {
      setIsCustomAlertOpen(true);
      setAlertTitle("회원가입 실패");
      setAlertMessage("회원가입에 실패했습니다.");
      setAlertType("error");
    }
  };

  return (
    <div className="register-bg">
      <div className="register-center">
        <h2 className="register-title">계정 만들기</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label className="register-label">이메일 주소 *</label>
          <input
            className="register-input"
            type="email"
            placeholder="이메일 주소"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label className="register-label">비밀번호 *</label>
          <input
            className="register-input"
            type="password"
            placeholder="비밀번호"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            minLength={8}
          />
          <label className="register-label">비밀번호 확인 *</label>
          <input
            className="register-input"
            type="password"
            placeholder="비밀번호 확인"
            required
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
          <label className="register-label">기관/기업명 *</label>
          <select
            className="register-input"
            required
            onChange={(e) => setCompany(e.target.value)}
            value={company}
          >
            <option value="">기관/기업명</option>
            {allowedCompanies.map((company) => (
              <option
                key={company.id}
                value={company.id}
                disabled={
                  company.companyName === "현재 등록된 기업이 없습니다."
                }
              >
                {company.companyName}
              </option>
            ))}
          </select>
          <label className="register-label">성함 *</label>
          <input
            className="register-input"
            type="text"
            placeholder="성함"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <BodyButton type="submit">회원가입</BodyButton>
        </form>
        <div className="register-link-row">
          <span>이미 계정이 있으신가요?</span>
          <a className="register-link" href="/login">
            로그인
          </a>
        </div>
        <div className="register-link-row request-company-row">
          <span>원하는 기관이 없으신가요?</span>
          <a className="register-link" href="/request-company">
            기관/기업명 추가 요청
          </a>
        </div>
        <div className="register-policy-row">
          <a className="register-policy" href="/terms">
            이용약관
          </a>
          <span className="register-policy-divider">|</span>
          <a className="register-policy" href="/privacy">
            개인정보 보호 정책
          </a>
          <span className="login-policy-divider">|</span>
          <a className="login-policy" href="/find-password">
            비밀번호 찾기
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
