# 웹 기술 Backend

<!-- 필수 항목 -->

## 소개

웹 기술 프로젝트의 Backend 스켈레톤 코드

<!-- 필수 항목 -->

## 기술스택 및 라이브러리

| Project | Version | Description |
| ------- | ------- | ----------- |
| Java    | 1.8     |             |
| Gradle  | 6.7+    | Build Tool  |
| MySQL   |         |             |
|         |         |             |

<!-- 필수 항목 -->

## 배포
EC2(ubuntu)환경에 backend Docker 배포

1. gradle build (배포할 jar 파일 만들기, build.gradle 파일에서 설정.)
```
./gradlew bootjar
```

2. Docker image 만들기 (dockerfile 필수)
```
docker build -t qkrtjddms27/backend:[버전태그] .
```

3. Docker Hub 에 push
```
docker push qkrtjddms27/backend:[버전태그]
```

4. 권한 획득

   아래 명령어를 사용하면 sudo를 붙이지 않아도 된다. (reboot)
```
sudo usermod -aG docker $USER
```

5. ec2 환경에서 pull 받기
```
docker pull qkrtjddms27/backend:[버전태그]
```

6.ec2 환경에서 실행하기
```
docker run -b -p 8080:8080 --rm qkrtjddms27/baceknd:[버전태그]
```

### 배포와 관련된 설정 파일
1. Dockerfile
```
FROM openjdk:8-jdk-alpine
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```
빌드된 *.jar 파일을 ./로 가져와서 실행하는 도커파일 
