# ============================
# 1) Build Stage
# ============================
# node:18-alpine - 노드 18번이 설치된 Alpine Linux 기반 공식 이미지를 "빌더" 라고 부르면서 쓴다. 
FROM node:18-alpine AS builder

# 도커 이미지 내에 앱 폴더 생성 후 이동
WORKDIR /app

# 패키지 복사 및 설치
COPY package*.json ./
RUN npm install

# .(로컬 폴더 전체) > .(app 폴더)로 소스코드 복사
COPY . .

#React 빌드
RUN npm run build 

# ============================
# 2) Production State (Nginx)
# ============================
# 컨테이너 속에서 Nginx 실행을 위한 이미지 설정
FROM nginx:stable-alpine

# Nginx 기본 설정 덮어쓰기(옵션)
# 필요 시 아래 파일을 함께 제공할 수 있음
# COPY nginx.conf /etc/nginx/nginx.conf

# 빌드된 정적 파일을 Nginx 기본 경로로 이동
COPY --from=builder /app/build /usr/share/nginx/html 

COPY nginx.conf /etc/nginx/conf.d/default.conf


# K8s에서 사용할 포트 (가능한 변경하지 말라고 하심)
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
