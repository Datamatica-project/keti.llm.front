import React from "react";
import StatusLabel from "../../components/StatusLabel";
import styles from "./MemberTable.module.css";
import { approveMember, rejectMember, suspendMember } from "../../api/adminApi";

export default function MemberTBody({ member, index, onDataChange }) {
  const handleApprove = async () => {
    console.log("승인");
    const response = await approveMember(member.userId);
    console.log(response);
    onDataChange();
  };

  const handleSuspend = async () => {
    console.log("탈퇴");
    const response = await suspendMember(member.userId);
    console.log(response);
    onDataChange();
  };
  return (
    <div className={styles.tableRow}>
      <div className={styles.tableCell}>{index + 1}</div>
      <div className={styles.tableCell}>{member.username}</div>
      <div className={styles.tableCell}>{member.companyName}</div>
      <div className={styles.tableCell}>{member.updatedAt.split("T")[0]}</div>
      <div className={styles.tableCell}>
        <StatusLabel status={member.status} />
      </div>
      <div className={styles.tableCell}>
        <div className={styles.buttonContainer}>
          <button
            className={styles.approveButton + " " + styles.button}
            disabled={
              member.status === "APPROVED" ||
              member.status === "WAITING" ||
              member.status === "WITHDRAWN"
            }
            onClick={handleApprove}
          >
            승인
          </button>
          <button
            className={styles.rejectButton + " " + styles.button}
            disabled={
              member.status === "REJECTED" ||
              member.status === "WAITING" ||
              member.status === "WITHDRAWN"
            }
            onClick={handleSuspend}
          >
            탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
