import React from "react";
import styles from "./MemberTable.module.css";
import CompanyTBody from "./CompanyTBody";

export default function CompanyTable({ companyManagementData, onDataChange }) {
  return (
    <div className={`${styles.memberTable} ${styles.companyTable}`}>
      <ul className={styles.tableHeader}>
        <li>순번</li>
        <li>회사명</li>
        <li>사업자 번호</li>
        <li>회사 번호</li>
        <li>업종</li>
        <li>상태</li>
        <li>권한관리</li>
      </ul>
      <div className={styles.tableBody}>
        {companyManagementData?.map((company, index) => (
          <CompanyTBody
            key={company?.id || index}
            company={company}
            index={index}
            onDataChange={onDataChange}
          />
        ))}
      </div>
    </div>
  );
}
