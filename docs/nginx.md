## Nginx 설정

### Nginx 를 사용한 이유

- 리버스 프록시서버로 활용.
- https 사용.
- 높은 성능.

### front/nginx/nginx.conf

front/dockerfile 에 사용될 nginx 설정 파일.

```
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
    
    # http 접속 시 https 로 자동 접속
    return 301 https://$server_name$request_uri; 
  }
}

server {
	listen 443 ssl;
	listen [::]:443 ssl;

	# server_name 도메인;
	server_name i6e107.p.ssafy.io;

        # 도커 실행 시 마운트 필수.
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

	location /jenkins {
	    proxy_pass http://i6e107.p.ssafy.io:8088;
	}
}
```