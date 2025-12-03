# AI 챗봇 프론트엔드 프로젝트

이 프로젝트는 React 기반의 AI 챗봇 웹 애플리케이션입니다. 사용자 인증, 멀티 채팅방, LangChain 및 파인튜닝/LLM 백엔드 연동을 지원합니다.

## 주요 기능
- **회원가입/로그인**: 이메일 기반 인증, JWT/세션 연동 예정
- **채팅**: 로그인한 사용자만 채팅 가능, 여러 개의 채팅방 지원(멀티채팅)
- **AI 답변**: LangChain 파이프라인을 통해 파인튜닝 모델, LLM, RAG(문서검색) 등과 연동하여 답변 제공(백엔드 연동 필요)
- **피드백**: AI 답변에 좋아요/싫어요/텍스트 피드백 가능
- **반응형 UI**: 모바일/PC 모두 최적화

## 기술 스택
- **프론트엔드**: React, React Router, CSS Modules
- **상태관리**: React Context API (추후 Redux/Recoil 등 확장 가능)
- **백엔드(예정)**: FastAPI(or Node.js), LangChain, LLM(OpenAI, Llama 등), DB(PostgreSQL 등)

## 프로젝트 구조
```
src/
  components/   # 공통 UI 컴포넌트
  pages/        # 주요 페이지(채팅, 로그인, 회원가입 등)
  api/          # API 연동 함수
  context/      # 전역 상태 관리
  ...
```

## 설치 및 실행 방법
1. **의존성 설치**
   ```bash
   npm install
   ```
2. **개발 서버 실행**
   ```bash
   npm start
   ```
   - 기본 주소: [http://localhost:3000](http://localhost:3000)

3. **환경 변수 설정**
   - `.env` 파일에 필요한 환경변수를 설정하세요.
   - 예시:
     ```env
     REACT_APP_OPENAI_API_KEY=your-key
     ```

## 백엔드 연동 계획
- **LangChain 기반 AI 파이프라인**과 연동하여, 프론트엔드에서 질문을 보내면 백엔드가 파인튜닝/LLM/RAG 등을 통해 답변을 생성해 반환합니다.
- **API 예시**
  - `POST /api/ai/ask` : 질문 전송 및 답변 수신
  - `POST /api/auth/login` : 로그인
  - `POST /api/auth/register` : 회원가입
  - `GET /api/chat` : 채팅방 목록
  - `POST /api/chat/:chatId/message` : 메시지 전송



## 참고/문서
- [Create React App 공식문서](https://facebook.github.io/create-react-app/docs/getting-started)
- [LangChain 공식문서](https://python.langchain.com/)
- [OpenAI API](https://platform.openai.com/docs/api-reference)

---

> 본 프로젝트는 AI 챗봇 서비스의 프론트엔드 예시입니다. 실제 서비스 적용 시 백엔드와의 연동, 보안, 데이터 관리 등 추가 개발이 필요합니다.
