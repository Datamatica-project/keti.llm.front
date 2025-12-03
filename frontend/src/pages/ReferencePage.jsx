import React from "react";
import { references } from "../context/referenceData";
import styles from "./ReferencePage.module.css";

export default function ReferencePage() {
  return (
    <div className={styles.referencePage}>
      <h1>참고 문헌 자료실</h1>
      <p>아래 목록에서 원하는 자료를 선택해 다운로드할 수 있습니다.</p>

      <ul className={styles.ulist}>
        {references.map((ref) => (
          <li key={ref.fileName} className={styles.li}>
            <span className={styles.title}>{ref.title}</span>
            <a
              href={`/reference/${encodeURIComponent(ref.fileName)}`}
              download
              className={styles.downloadButton}
            >
              다운로드
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
