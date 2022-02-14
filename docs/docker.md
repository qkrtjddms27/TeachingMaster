## Docker

> 오픈소스 기반의 컨테이너 기술 가상화
### 도커를 사용한 이유
- 다양한 환경에서 컨테이너를 쉽게 실행할 수 있다.
- 도커의 컨테이너와 이미지를 통해서 쉽게 기능 확장이 가능함.
- backend와 frontend를 분리하여 배포하므로 배포 시 어느 쪽 문제인지 찾기 쉽다.
### 도커 설정 파일

#### backend/dockerfile
```dockerfile
# java 8 사용
FROM openjdk:8-jdk-alpine

# jar파일이 빌드 되는 위치를 변수로 정의
ARG JAR_FILE=build/libs/*.jar

# 위에서 정의한 경로에 있는 파일을 /app.jar이름으로 이미지 파일로 복사.
COPY ${JAR_FILE} app.jar

# 컨테이너 실행 시 사용하는 명령어.
# java -jar /app.jar 실행.
# 옵션으로 propertis 파일은 배포용으로 만들어진 application-prod 설정 파일 사용.
# 배포용과 개발용을 설정 파일을 나눈 이유는 배포용에는 ssl인증서를 추가하여 https로 배포하기 위해서.
ENTRYPOINT ["java","-jar","/app.jar","--spring.config.name=application-prod"]
```

#### frontend/dockerfile
```dockerfile
# node:16 버전으로 서버 구동. 
FROM node:16 as build-stage

# 작업 폴더를 /app으로 지정
WORKDIR /app

# /front디렉터리의 모든 파일을 컨테이너 내부로 복사 
ADD . .

# 복사한 파일들을 빌드.
RUN npm install
RUN npm run build

# nginx 서버 사용
# 프록시 서버로 활용
FROM nginx:stable-alpine as production-stage

# front/nginx/nginx.conf 위치에 있는 nginx.config 파일을
# 컨테이너 내부 /etc/nginx/conf.d/default.conf로 복사
COPY  ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# /app/build경로는 빌드된 파일을 /user/share/nginx/html로 이동
COPY --from=build-stage /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
```

#### ./docker-compose.yml
docker 실행 명령어를 정의.
```yaml
version: '3.2'

services: 
  frontend:
    image: frontend-react
    build:
      context: frontend/
      dockerfile: Dockerfile
# nginx http, https 포트를 사용하기 위해서 들어가는 명령어
    ports:
      - "80:80"
      - "443:443" 
# 볼륨은 ssl 인증서를 받아오기위해서 들어가는 명령어
    volumes:
      - /home/ubuntu/docker-volume/ssl:/var/www/html
    container_name: "frontend"
  
  backend:
    image: backend-spring
    build:
      context: backend/
      dockerfile: Dockerfile
    ports:
      - "8080:8080"  
# 볼륨은 ssl 인증서를 받아오기위해서 들어가는 명령어
    volumes:
      - /home/ubuntu/docker-volume/ssl:/root
    container_name: "backend"
```
### 도커 이미지 빌드 명령어

./backend
```shell
# backend/dockerfile 에는 빌드 명령어를 포함하지 않았으므로 빌드 명령어가 추가로 필요하다. 
./gradlew build bootJar

docker build -t qkrtjddms27/backend:1.0.0 .
```

./frontend
```shell
# front/dockerfile에는 빌드 명령어를 포함하고 있으므로 빌드명령어가 따로 필요하지 않음.
docker build -t qkrtjddms27/frontend:1.0.0 .
```
### 컨테이너 실행 명령어
./backend
```shell
docker run -d --rm -p 8080:8080 -v /home/ubuntu/docker-volume/ssl:/root qkrtjddms27/backend:[버전 태그]
```
./frontend
```shell
docker run -d --rm -p 80:80 -p 443:443 -v /home/ubuntu/docker-volume/ssl:/var/www/html qkrtjddms27/frontend:[버전 태그]
```
