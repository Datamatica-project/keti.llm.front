// api 호출 인덱스 파일
import axios from "axios";

const api = axios.create({
  // 프록시를 사용하므로 상대 경로 사용
  baseURL:
    process.env.REACT_APP_NODE_ENV === "development"
      ? ""
      : process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  withCredentials: true,
});

// 요청 인터셉터 - 토큰 추가
api.interceptors.request.use(
  (config) => {
    // 쿠키 대신 Authorization 헤더 사용 (백엔드에서 지원하는 경우)
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.token) {
          config.headers.Authorization = `Bearer ${userData.token}`;
        }
      } catch (error) {
        console.error("토큰 파싱 오류:", error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("useEmail");

      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
