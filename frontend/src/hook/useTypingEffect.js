import { useEffect, useRef, useState } from "react";

// 타이핑 효과 관련 커스텀 훅
export const useTypingEffect = (fullResponse, isTyping, setIsTyping) => {
  const [displayedResponse, setDisplayedResponse] = useState("");
  const typingSpeedRef = useRef(30);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let timeoutId = null;

    if (isTyping && fullResponse && typeof fullResponse === "string") {
      if (displayedResponse.length < fullResponse.length) {
        const randomSpeed = Math.floor(Math.random() * 15) + 15; // 15-30ms 사이로 속도 조정

        timeoutId = setTimeout(() => {
          // 다음 문자가 마침표나 쉼표인 경우 약간 더 긴 지연 추가
          const nextChar = fullResponse[displayedResponse.length];
          const isBreakPoint = [".", ",", "!", "?", ":", ";", "\n"].includes(
            nextChar
          );

          // 한 번에 추가할 글자 수 제한
          const charsToAdd = Math.min(
            Math.floor(Math.random() * 2) + 1, // 1-2글자로 제한
            fullResponse.length - displayedResponse.length
          );

          // 함수형 업데이트 사용
          setDisplayedResponse((prev) =>
            fullResponse.substring(0, prev.length + charsToAdd)
          );

          // 문장 부호에서는 잠시 멈추는 효과
          if (isBreakPoint) {
            typingSpeedRef.current = Math.floor(Math.random() * 150) + 100; // 100-250ms 지연
          } else {
            typingSpeedRef.current = randomSpeed;
          }
        }, typingSpeedRef.current);
      } else {
        // 타이핑이 완료되면 isTyping 상태 업데이트
        setIsTyping(false);

        // 타이핑이 완료되면 스크롤 조정
        timeoutId = setTimeout(() => {
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollTo({
              top: messagesEndRef.current.scrollHeight,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    }

    // 클린업 함수
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isTyping, displayedResponse, fullResponse, setIsTyping]);

  return { displayedResponse, setDisplayedResponse };
};
