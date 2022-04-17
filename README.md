

# 웹 프로젝트 : 티칭마스터

# 1. 서비스 소개 


## 카테고리

| Application | Domain | Language | Framework |
| ---- | ---- | ---- | ---- |
| :white_check_mark: Desktop Web | :black_square_button: AI | :white_check_mark: JavaScript | :black_square_button: Vue.js         |
| :white_check_mark: Mobile Web | :black_square_button: Big Data | :black_square_button: TypeScript | :white_check_mark: React |
| :white_check_mark: Responsive Web | :black_square_button: Blockchain | :black_square_button: C/C++ | :black_square_button: Angular |
| :black_square_button: Android App | :black_square_button: IoT | :black_square_button: C# | :black_square_button: Node.js |
| :black_square_button: iOS App | :black_square_button: AR/VR/Metaverse | :black_square_button: Python     | :black_square_button: Flask/Django |
| :black_square_button: Desktop App | :black_square_button: Game | :white_check_mark: Java | :white_check_mark: Spring/Springboot |
| | | :black_square_button: Kotlin | |


## 1. 서비스 설명

### 개요

- 한 줄 소개 : 비대면 수업으로 힘들어하는 선생님과 학생들에게 더 나은 교육환경을 제공하는 플랫폼
- 서비스 명 : 티칭마스터(Teaching Master)

### 타겟

- 초등학생👧
  - 기존의 화상수업 UI를 어려워 하는 학생들에게 적합
- 초등학생 선생님👩‍🏫
  - 수업자료 준비 시간을 줄이고 싶은 선생님
  - 비대면 수업으로 인한 학생 관리에 정신 없는 선생님

## 2. 기획 배경

### 배경

- 대체적으로 정적인 수업인 온라인 수업이 진행되고 그로 인해 학생들의 집중력 저하가 크다고 합니다 . 또한 선생님들은 학생들의 화면밖에 보지 못하기 때문에 학생들의 이해정도와 학습 상황을 파악하기가 어렵다고 합니다 .
- 양쪽 측면에서 이러한 비대면 수업의 불편함을 개선하고 더 나은 경험을 제공하기 위해 크게 세가지 기능을 구현했습니다.
  - 선생님들끼리 공유 가능한 `퀴즈` 기능
  - 학생의 수업집중도를 파악할 수 있게 만든 `별점` 기능
  - 그리고 이 수업집중도를 가시적으로 확인할 수 있는 `하이라이팅` 기술
- 이렇게 학생들의 수업 집중도를 파악할 수 있게 되면 참여가 낮은 학생에게도 발표의 기회를 줄 수 있고 , 퀴즈를 통해 학생들의 이해정도를 파악할 수 있게 되어 선생님 입장에서도 질 높은 강의를 할 수 있고 학생들도 더 재밌게 참여할 수 있게 됩니다. 이처럼  선생님과 학생들이 서로 상호작용하여 서로 행복하고 즐거운 수업을 만드는데 도움이 되었으면 좋겠다는 마음으로 이 프로젝트를 제작하게 되었습니다.

### 목적

- 화상수업 UI가 어려운 학생들이 쉽게 사용할 수 있게 하자
- 비대면 수업으로 학생관리가 힘든 선생님의 수업을 조금 더 편하게 하자

### 의의

- 비대면 수업에서 학생들과 선생님들이 쉽게 사용할 수 있는 플랫폼
- 퀴즈 및 하이라이팅으로 학생 수업 참여도를 확인하고, 균등한 수업 참여 제공

## 3. 서비스 화면

### 메인페이지

![Untitled](README.assets/Untitled-16456253811181.png)

## 4. 발표 영상 or ucc

[싸피(SSAFY) 6기 공동프로젝트 UCC(티칭마스터 )](https://youtu.be/k_EJWArFbyw)


# 2. 프로젝트 진행

---

## 1. Agile

짧은 기간과 온라인으로 진행된 프로젝트였기에 저희는 단기간에 최고 효율을 가져올 수 있게  `Agile` 방법으로 프로젝트를 진행하였습니다. 기획 단계에서의 시간을 절반으로 줄이고 문서기반의 개발보다는 실질적인 코딩을 하며 이용자가 만족할 수 있을 방향으로 개발 방향을 계속 바꿨습니다.

자주 일어나는 변경에 팀원들과의 소통이 가장 중요했습니다. 그래서 저희는 Jira를 사용한 스프린트 관리, 매일 아침마다의 회의를 통해 소통의 막힘이 없게 했습니다.



## 2. Git Flow

[우아한 형제들의 Git-flow 전략](https://techblog.woowahan.com/2553/) 을 참고하여 관리했습니다. 크게 `BACKEND` 와 `FRONTEND` 브랜치로 나누었고, 기능이 완성될 때 `BACKEND` 또는 `FRONTEND` 브랜치에 merge 했습니다. 하루의 작업이 끝나면 두 브랜치를 `develop` 브랜치에 merge했습니다. 또한, 한 주가 끝날 때 `develop` 브랜치를 `master` 브랜치로 merge했습니다.

`commit message`는 `.gitmessage` 파일을 만들어서 통일시켰습니다.


```
################
# <타입> : <제목> 의 형식으로 제목을 아래 공백줄에 작성
# 제목은 50자 이내 / 변경사항이 "무엇"인지 명확히 작성 / 끝에 마침표 금지
# 예) refactor - 가독성을 위해 서브 시스템 X를

# 바로 아래 공백은 지우지 마세요 (제목과 본문의 분리를 위함)

################
# 본문(구체적인 내용)을 아랫줄에 작성
# 여러 줄의 메시지를 작성할 땐 "-"로 구분 (한 줄은 72자 이내)

################
# feat : 새로운 기능 추가
# fix : 버그 수정 (수정, 삭제 포함)
# docs : 문서 수정
# test : 테스트 코드 추가
# refact : 코드 리팩토링 
# style : 코드 의미에 영향을 주지 않는 변경사항
# chore : 빌드 부분 혹은 패키지 매니저 수정사항
################
```

## 3. Jira

매주 월요일 오전 회의를 통해 금주에 진행할 이슈들을 백로그에 등록했습니다. 금주에 진행할 이슈 및 전주에 완료하지 못한 이슈들을 추가했습니다.

- 에픽은 메모, 퀴즈, 하이라이팅, 실시간 채팅, 상점 관리 기능, 웹사이트 제작, 화면으로 구성하였습니다.
- 스토리는 큰 단위로 나누어 `로그인` `퀴즈` 등으로 작성하였으며,
- 섭 테스크는 스토리의 세부적인 업무 단위로 나누어  `학생 퀴즈 결과값 전송` `학생 퀴즈 결과값 저장` `퀴즈 폴더 페이지 생성` 등으로 작성하였습니다.
- 에픽 링크 태그를 사용하여 이슈를 구별하기 쉽게 했습니다.
- 상황에 맞춰 지라를 관리하였고, 진행할 이슈들을 In Progress로 옮겨 각자 진행하는 부분을 팀원 및 담당자 모두가 확인할 수 있도록 했습니다.

## 4. Discord

![Untitled](README.assets/Untitled-164562666044212.png)

모두가 공유해야할 자료 및 링크는 디스코드에 정리하여 불필요한 커뮤니케이션 리소스를 줄였습니다.

또한 음성채널에 항상 참여해 있는 상태로 작업을 하기로 약속했습니다. 갑자기 프로젝트의 변화가 생기더라도 원활한 소통을 할 수 있게 하였습니다.

<img src="README.assets/Untitled 1-164562666440113.png" alt="Untitled 1" style="zoom:67%;" />

중요한 정보나 다같이 참여해야 하는 링크는 `[이름]` 을 작성하고  `내용이나 링크` 를 추가하는 방식으로 정리를 하였습니다.

# 3. 배포

---

서버는 AWS EC2 ubuntu를 사용했습니다.

- 서비스 포트 번호 : 443

## **1. Docker**

- front 배포
  - front/dockerfile

      ```docker
      FROM node:16 as build-stage
      
      # 도커 컨테이너 내부 작업 디렉터리를 /app으로 지정
      WORKDIR /app
      
      # /front 내부 모든 파일을 {container}/app으로 이동
      ADD . .
      
      # 옮긴 파일들을 빌드
      RUN npm install
      RUN npm run build
      
      # Nginx =========================
      
      FROM nginx:stable-alpine as production-stage
      
      # front/nginx/nginx.conf 파일을 도커 컨테이너 내부로 이동
      # -> /etc/nginx/conf.d/default.conf로 이동
      COPY  ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
      
      # /app 은 위에서 지정한 workdir 바로 아래 생긴 파일을 nginx로 웹 서버 구동.
      COPY --from=build-stage /app/build /usr/share/nginx/html
      CMD ["nginx", "-g", "daemon off;"]
      ```

  - front/nginx/nginx.conf

      ```docker
      server {
        listen 80;
        listen [::]:80;
      
          # server_name 도메인;
        server_name i6e107.p.ssafy.io;
      
        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;
      
        location / {
          alias /usr/share/nginx/html;
          try_files $uri $uri/ /index.html;
          return 301 https://$server_name$request_uri;
        }
      }
      
      server {
          listen 443 ssl;
          listen [::]:443 ssl;
      
          # server_name 도메인;
          server_name 서버도메인;
      
          ssl_certificate /var/www/html/fullchain.pem;
          ssl_certificate_key /var/www/html/privkey.pem;
      
          root /usr/share/nginx/html;
          index index.html;
      
          location / {
              try_files $uri $uri/ /index.html;
          }
      
          location /api {
              proxy_pass https://i6e107.p.ssafy.io:8080/api;
          }
      }
      ```

  - 도커 이미지화

      ```bash
      docker build -t [docker hub 계정]/[docker hub repo]:[버전태그]
      # docker build -t qkrtjddms27/frontend:1.0.0
      ```

  - 도커 실행

      ```bash
      docker run -d --rm -p 80:80 -p 443:443 -v /home/ubuntu/docker-volume/ssl:/var/www/html qkrtjddms27/frontend:0.2.7
      ```

- backend 배포
  - backend build (gradle)

      ```bash
      ./gradnotilew bootJar
      ```

  - backend/dockerfile

      ```docker
      # 자바 버전 사용
      FROM openjdk:8-jdk-alpine
      
      # build/libs/*.jar에 생성된 jar파일을 app.jar이름으로 도커 컨테이너 내부로 이동.
      ARG JAR_FILE=build/libs/*.jar
      COPY ${JAR_FILE} app.jar
      
      # 실행
      # properties 파일을 두 개 나눠서 관리하기 때문에 옵션 추가
      # --spring.config.name=application-prod
      # application-prod (배포용)
      # apllication (개발용)
      ENTRYPOINT ["java","-jar","/app.jar","--spring.config.name=application-prod"]
      ```

  - 도커 이미지화

      ```bash
      docker build -t [docker hub 계정]/[docker hub repo]:[버전태그]
      # docker build -t qkrtjddms27/backend:1.0.0
      ```


## 2. Spring ssl 적용

개발용 / 배포용 properties 따로 관리

- properties-prod (기존 개발용 +)
- properties에서는 주석처리해야되는 부분.

```xml
server.ssl.enabled=truewk
server.ssl.key-store-type=PKCS12
server.ssl.key-store=/root/key.p12
server.ssl.key-store-password=ssafy
```

## 3. 아키텍처 설계

### 시스템 구조

![Untitled](README.assets/Untitled-164562671712714.png)

### DB 구조

<img src="README.assets/ERD_220128.png" alt="ERD_220128" style="zoom: 67%;" />



## 4. HTTPS

### HTTP란?

---

Client(Web Browser)와 Server간 자원을 주고 받을 때 쓰는 통신 규약

단점 : http는 단순 텍스트 교환으로 누군가 네트워크에서 신호를 가로채서 정보를 보는 것이 가능

### HTTPS란?

> HTTP의 보안 문제를 해결해주는 프로토콜
> 
---

Client(Web Browser)와 Server가 정보를 암호화하는 SSL(Secure Socket Layer)프로토콜을 이용하여 데이터를 주고 받는 통신 규약

- http text를 암호화하는 것
- 공개키 암호화 방식
- openvidu 사용을 위한 필수 스펙.

### Let’s Encrypt

---

- HTTPS Everywhere을 위해 무료 SSL을 보급하는 비영리 프로젝트

**사용 이유**

- SSL 인증서 발급, 연장, 재발급 무료
- 콘솔에서 인증서 발급/갱신/설치/세팅 자동화 가능

### Certbot으로 SSL발급 과정

---

Let’s Encrypt SSL 인증서 발급을 위해 사용

1. certbot설치

```
$ sudo apt update
$ sudo apt-get install  letsencrypt -y
```

2. standalone방식으로 SSL 발급

```
$ sudo certbot certonly --standalone -d [도메인]
```

3. 인증서 이동 및 pem 변경

```
$ cd /etc/letsencrypt/live/[도메인]
$ openssl pkcs12 -export -in fullchain.pem -inkey privkey.pem -out key.p12 -name airpageserver -CAfile chain.pem -caname root
```

4. 인증서 복사

```
$ sudo cp fullchain.pem /home/ubuntu/docker-volume/ssl
$ sudo cp privkey.pem /home/ubuntu/docker-volume/ssl
$ sudo cp key.p12 /home/ubuntu/docker-volume/ssl
```



## 5. **Openvidu 설치**

1. root 권한으로 받아야함.

```
$sudo su
```


2. 작업 디렉터리로 이동 (docs 권장사항)

```
$cd /opt
```

3. openvidu 다운

```
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash
```


4.  환경 파일 설정

```
# 환경설정을 위한 이동

$ cd openvidu
$ vi .env
```

5. .env 설정

```
DOMAIN_OR_PUBLIC_IP=(도메인)
OPENVIDU_SECRET=ssafy
CERTIFICATE_TYPE=letsencrypt
HTTPS_PORT=8443
```

6. 실행

```
$ ./openvidu start
```
# 4. 소감 및 배운점

## 소감

- **이혜진** : 처음엔 다 할 수 있을거라고 생각했지만 디테일한 부분까지 신경쓰다보니 포기하게 되는 기능들이 늘어간게 아쉽습니다. 처음으로 React를 사용한 프로젝트라서 많은 걱정을 안고 시작했지만 부딪히며 배우니 생각보다 빠르게 성장할 수 있었습니다. 팀원들도 서로 응원하고 도와가며 진행했기 때문에 무사히 마무리 지을 수 있었습니다.
- **김현태** : JPA, DSL Query같은 백엔드 기술뿐 아니라 Jira, Git, 배포 등을 제대로 해보면서 서투르지만 함께 많은 것을 배우고 이룩할 수 있었습니다. 아쉬운 점은 거의 모든 것이 처음 해보는 것이라 문제를 해결하고 즉각적으로 배우는 데 급급해서 발생한 문제, 문제를 해결한 방법 등을 기록하지 못한 것입니다. 팀원 모두 서로 양보하면서 프로젝트를 성공적으로 마무리했고 2달 동안 감사했습니다!
- **박성은** : 배포와 관련된 건 모두 처음이라 많이 낯설고 어려웠지만, 팀원들의 배려가 있어서 포기하지 않고 끝까지 노력할 수 있었습니다. 다른 팀원들이 항상 늦게까지 남아서 프로젝트를 하는 모습을 보며 동기부여를 얻어 프로젝트를 완주할 수 있었습니다. 아쉬운 것은 삽질한 기록을 제대로 남겨 두지 않아 프로젝트를 마무리하고 정리하는데 시간이 너무 많이 들었습니다.
- **임현홍** : 처음 사용해보는 React와 WebRTC를 선택해서 프로젝트 초반에는 정말 난항이었습니다. 하지만 리액트에 익숙해져갈수록 속도가 붙고 재미를 느끼며 프론트엔드라는 직무를 계속 하고 싶다는 확신이 생겼습니다.  이용자 입장에서 생각하고, 불편함을 예상하여 코드를 수정하는 과정이 가장 즐거운 시간이었습니다. 즐겁게 일하다 보니 팀원들과의 소통도 잘 되고 밝은 분위기에서  프로젝트 또한  만족스러운 결과로 마무리할 수 있었던 것 같습니다.
- **조영현** :  처음에는 크게 어려울 것이라 생각하지 못했지만 막상 부딪쳐보니 너무나도 생소하고 어려운 것들이 잔뜩이라 힘들었습니다. 자료를 찾으려해도 제대로 찾기 힘들고, 참고하려 해도 버전이 달라 적용되지 않는 부분들에 많이 지쳤지만 끊임없이 응원하고 격려하는 팀원들 덕분에 끝까지 노력할 수 있었습니다. 하지만 그 인고의 흔적을 제대로 기록으로 남기지 못했다는 것이 너무 아쉽습니다.
- **진은정** : 팀으로 진행하면서 깃과 지라 같은 협업 툴을 처음 사용하는 것에 대한 어려움이 있었는데 하나씩 규칙을 정하고 사용을 하면서 협업하는 방법에 대해 배울 수 있었습니다. 하지만 개발에 집중하다 보니 문제가 발생했던 부분들을 세세하게 기록하지 못한 점이 아쉬웠습니다. 프로젝트 진행 상황에서 어려운 부분이 많았는데 팀원들과 문제를 해결하기 위해 다 같이 의논하고 지식을 공유하면서 프로젝트를 완성할 수 있었습니다.

## 배운점

- 기록하자!
  - 6주간 삽집을 했지만 남은 문서가 없어 너무 아쉬웠습니다.
  - 회고 꼭 하자!
- 명확한 기획의 중요성
  - 프로젝트를 기획부터 설계, 개발, 배포하는 경험이 모두 처음이다 보니 확실하게 했음에도 개발하면서 적지 않은 수정을 거쳤습니다.
  - 설계를 시작하기전 기획을 명확하게 하는 것의 중요성을 느꼈습니다.
- **일신우일신(日新又日新)**
  - **매일 매일 배우고 익히고 나아간다는 말이다**. 프로젝트를 진행하면서 점점 많은 난관에 부딪히고, 새로운 오류에 힘들어했지만 지나고 보니 그 난관들은 우리를 발전시켰고, 그 오류들은 이제 어렵지 않게 느껴진다. 시간에 쫓기듯 작업했다 생각했지만 매일매일 나를 발전시키고 있는 것이었다. 앞으로 어떤 일을 하더라도 배우고 익히는 자세로 임하자.
