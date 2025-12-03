import React, { useEffect, useState } from "react";
import styles from "./AdminPage.module.css";
import UserCard from "./AdminPage/UserCard";
import CompanyCard from "./AdminPage/CompanyCard";
import MemberTable from "./AdminPage/MemberTable";
import CompanyTable from "./AdminPage/CompanyTable";
import { getAdminData } from "../api/adminApi";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("member-approval");

  const tabs = [
    { id: "member-approval", label: "회원 승인" },
    { id: "company-approval", label: "기업등록 승인" },
    { id: "member-management", label: "회원 관리" },
    { id: "company-management", label: "기업 관리" },
  ];
  const [memberData, setMemberData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [memberManagementData, setMemberManagementData] = useState([]);
  const [companyManagementData, setCompanyManagementData] = useState([]);

  // 각 탭별 데이터 리로드용 boolean 상태
  const [reloadMemberData, setReloadMemberData] = useState(false);
  const [reloadCompanyData, setReloadCompanyData] = useState(false);
  const [reloadMemberManagementData, setReloadMemberManagementData] =
    useState(false);
  const [reloadCompanyManagementData, setReloadCompanyManagementData] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAdminData(activeTab);

      if (activeTab === "member-approval") {
        setMemberData(response);
        setReloadMemberData(false); // 데이터 로드 후 상태 초기화
      } else if (activeTab === "company-approval") {
        setCompanyData(response);
        setReloadCompanyData(false);
      } else if (activeTab === "member-management") {
        setMemberManagementData(response);
        setReloadMemberManagementData(false);
      } else if (activeTab === "company-management") {
        setCompanyManagementData(response);
        setReloadCompanyManagementData(false);
      }
    };
    fetchData();
  }, [
    activeTab,
    reloadMemberData,
    reloadCompanyData,
    reloadMemberManagementData,
    reloadCompanyManagementData,
  ]);

  // 각 탭별 데이터 리로드 함수들
  const handleReloadMemberData = () => setReloadMemberData(true);
  const handleReloadCompanyData = () => setReloadCompanyData(true);
  const handleReloadMemberManagementData = () =>
    setReloadMemberManagementData(true);
  const handleReloadCompanyManagementData = () =>
    setReloadCompanyManagementData(true);

  return (
    <div className={styles.adminPage}>
      <header className={styles.adminHeader}>
        <h1>관리자 페이지</h1>
        <p>회원 관리와 기업 관리를 수행할 수 있습니다.</p>
      </header>

      <nav className={styles.adminTabs}>
        <ul>
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                className={activeTab === tab.id ? styles.active : ""}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className={styles.adminContent}>
        <section className={styles.contentSection}>
          {/* 현재 탭의 라벨 표시 */}
          <h2>{tabs.find((tab) => tab.id === activeTab)?.label}</h2>

          <div
            className={` ${
              activeTab === "member-management" ||
              activeTab === "company-management"
                ? styles.approvalCardsTable
                : styles.approvalCards
            }`}
          >
            {activeTab === "member-approval" ? (
              memberData?.map((member, index) => (
                <UserCard
                  key={member?.id || index}
                  member={member}
                  onApproval={handleReloadMemberData}
                />
              ))
            ) : activeTab === "company-approval" ? (
              companyData?.map((company, index) => (
                <CompanyCard
                  key={company?.id || index}
                  company={company}
                  onApproval={handleReloadCompanyData}
                />
              ))
            ) : activeTab === "member-management" ? (
              <MemberTable
                memberManagementData={memberManagementData}
                onDataChange={handleReloadMemberManagementData}
              />
            ) : activeTab === "company-management" ? (
              <CompanyTable
                companyManagementData={companyManagementData}
                onDataChange={handleReloadCompanyManagementData}
              />
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}
