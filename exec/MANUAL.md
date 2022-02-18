## 배포

----

```
java : 8 
webserver :
        nginx : nginx/1.20.2
        nodejs : 16.13.2
db : mysql, '8.0.28-0ubuntu0.20.04.3'
```
### DB 설정 값.
hostname: i6e107.p.ssafy.io</br>
port : 3306</br>
username : ssafy</br>
password : ssafy</br>

### ec2 환경에 SSL 인증서 받기
```shell
# letsencrypt 설치하기
sudo apt-get update
sudo apt-get install letsencrypt

# 인증서 발급
# sudo letsencrypt certonly --standalone -d 도메인[i6팀ID.p.ssafy.io]
sudo letsencrypt certonly --standalone -d i6e107.p.ssafy.io

# 비밀번호, 이메일 입력 및 안내 사항에 동의 후 진행

# root 계정 로그인
sudo su

# 인증서 위치 폴더 이동
cd /etc/letsencrypt/live/i6e107.p.ssafy.io

# pem을 PKCS12 형식으로 변경
openssl pkcs12 -export -in fullchain.pem -inkey privkey.pem -out key.p12 -name airpageserver -CAfile chain.pem -caname root


# 인증서 복사
# 인증서 보관 폴더를 미리 생성해 주세요.
# sudo cp [파일이름] [인증서를 보관 할 docker volume 폴더] 
# 아래는 예시

sudo cp fullchain.pem /home/ubuntu/docker-volume/ssl
sudo cp privkey.pem /home/ubuntu/docker-volume/ssl
sudo cp key.p12 /home/ubuntu/docker-volume/ssl
```

### ec2 환경에 openvidu 설치
```shell
# root 권한으로 접속
$ sudo su

$ cd /opt

$ curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash

$ cd openvidu

$ nano .env

$ vi .env
# DOMAIN_OR_PUBLIC_IP=i6e107.p.ssafy.io
# OPENVIDU_SECRET=ssafy
# CERTIFICATE_TYPE=letsencrypt
# HTTP_PORT=8444
# HTTPS_PORT=8443
# :wq

$ ./openvidu start
```
### backend 배포
./backend

1. gradle build (배포할 jar 파일 만들기, build.gradle 파일에서 설정.)
```
./gradlew bootjar
```

2. Docker image 만들기 (dockerfile 필수)
```shell
docker build -t qkrtjddms27/backend:1.0.0 .
```

3. Docker Hub 에 push
```shell
docker push qkrtjddms27/backend:1.0.0
```

4. 권한 획득

   아래 명령어를 사용하면 sudo를 붙이지 않아도 된다. (reboot)
```shell
sudo usermod -aG docker $USER
```

5. ec2 환경에서 pull 받기
```shell
docker pull qkrtjddms27/backend:1.0.0
```

6.ec2 환경에서 실행하기
```shell
docker run -d --rm -p 8080:8080 -v /home/ubuntu/docker-volume/ssl:/root qkrtjddms27/backend:1.0.0
```

### frontend 배포
./frontend 폴더에서 실행

1. 도커 이미지
```shell
docker build -t qkrtjddms27/frontend:1.0.0 .
```

2. Docker Hub 에 push
```shell
docker push qkrtjddms27/frontend:1.0.0
```
3. ec2 환경에서 실행
```shell
docker run -d --rm -p 80:80 -p 443:443 -v /home/ubuntu/docker-volume/ssl:/var/www/html qkrtjddms27/frontend:1.0.0
```

## 시연 시나리오

https://docs.google.com/presentation/d/1W5KspNC4dveI02Xz40-o9q5t4zEJRRg-O7mP-4TsTBQ/edit#slide=id.g115c2c82371_2_576
