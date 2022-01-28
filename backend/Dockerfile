FROM openjdk:8-jdk-alpine
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

# 1. build/libs/*.jar .gitignore에서 build ignore를 해제
# 2. dev브랜치에 front, backend합치고 나서 수행.