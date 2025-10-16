import React, { useState } from "react";
import BodyButton from "../components/BodyButton";
import { useCustomAlertStore } from "../store/store";
import { requestCompany } from "../api/user.Api";
import { useNavigate } from "react-router-dom";

export default function RequestCompanyPage() {
  // 알림 상태 관리
  const { setIsCustomAlertOpen, setAlertTitle, setAlertMessage, setAlertType } =
    useCustomAlertStore();

  const [companyName, setCompanyName] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [companyNumber, setCompanyNumber] = useState("");
  const [job, setJob] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await requestCompany(
        companyName,
        businessNumber,
        companyNumber,
        job
      );
      if (response.success) {
        setIsCustomAlertOpen(true);
        setAlertTitle("기관/기업명 추가 요청 완료");
        setAlertMessage("기관/기업명 추가 요청이 완료되었습니다.");
        setAlertType("success");
        navigate("/login");
      } else {
        setIsCustomAlertOpen(true);
        setAlertTitle("기관/기업명 추가 요청 실패");
        setAlertMessage("기관/기업명 추가 요청에 실패했습니다.");
        setAlertType("error");
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 사업자번호 포맷팅
  const formatBusinessNumber = (value) => {
    const numbers = value.replace(/[^\d]/g, "");

    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 5)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(
      5,
      10
    )}`;
  };

  return (
    <div className="login-bg">
      <div className="login-center">
        <h2 className="login-title">기관/기업명 추가 요청</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className={`login-input ${error && "input-error"}`}
            type="text"
            placeholder="회사명 *"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <input
            className={`login-input ${error && "input-error"}`}
            type="tel"
            placeholder="사업자번호 *"
            value={businessNumber}
            onChange={(e) =>
              setBusinessNumber(formatBusinessNumber(e.target.value))
            }
            required
          />
          <input
            className={`login-input ${error && "input-error"}`}
            type="tel"
            placeholder="회사 전화번호 *"
            value={companyNumber}
            onChange={(e) => setCompanyNumber(e.target.value)}
            maxLength={20}
            required
          />
          <input
            className={`login-input ${error && "input-error"}`}
            type="text"
            placeholder="회사 업종 *"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            required
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
