import React from "react";
import StatusLabel from "../../components/StatusLabel";
import styles from "./MemberTable.module.css";
import { approveCompany, rejectCompany } from "../../api/adminApi";

export default function CompanyTBody({ company, index, onDataChange }) {
  const handleApprove = async () => {
    const response = await approveCompany(company.id);
    console.log(response);
    onDataChange();
  };

  const handleSuspend = async () => {
    const response = await rejectCompany(company.id);
    console.log(response);
    onDataChange();
  };
  return (
    <div className={styles.tableRow}>
      <div className={styles.tableCell}>{index + 1}</div>
      <div className={styles.tableCell}>{company.companyName}</div>
      <div className={styles.tableCell}>{company.businessNumber}</div>
      <div className={styles.tableCell}>{company.companyNumber}</div>
      <div className={styles.tableCell}>{company.job}</div>
      <div className={styles.tableCell}>
        <StatusLabel status={company.status} />
      </div>
      <div className={styles.tableCell}>
        <div className={styles.buttonContainer}>
          <button
            className={styles.approveButton + " " + styles.button}
            disabled={
              company.status === "APPROVED" || company.status === "PENDING"
            }
            onClick={handleApprove}
          >
            승인
          </button>
          <button
            className={styles.rejectButton + " " + styles.button}
            disabled={
              company.status === "REJECTED" ||
              company.status === "PENDING" ||
              company.status === "WITHDRAWAL"
            }
            onClick={handleSuspend}
          >
            거부
          </button>
        </div>
      </div>
    </div>
  );
}
