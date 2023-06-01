// 오늘은 도메인이랑 https 설정까지 진행할 얘정 (Nginx 사용)

// 서버 연결 후 순서
// 1. sudo apt-get update
// 2. sudo apt-get install mysql-server (mysql 쓰면 설치)
// 3. sudo mysql -u root -p
// 4. create database [database_name]
// 5. create user 'admin'@'%' identified by 'admin1234'
// 6. grant all on test1.* to 'admin'@'%'
// 7. sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf - 외부 접속 혀용
// 8. sudo service mysql restart - 변경된 파일이 있으니 mysql 서버 재시작
// 
// nvm 노드 버전 매니저
// nodejs 설치하고 다른 버전으로 설치할대
// 삭제하고 다시 설치할 필요없이 버전 관리가 편하다.
// 원하는 버전을 설치받고 바로 스위치 가능
//
// curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh
// curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash 

// 소스 파일 적용
// source ~/.bashrc

// 전체 목록 확인
// nvm list-remote
//
// 원하는 버전을 선택하고 설치
// nvm install 16(버전 in 숫자)




// 탄력적 IP 연결
// 인스턴스의 탄력 IP로 페이지 열리는지 확인




// 원래 시작 경로
// cd /home/ubuntu/

// 인스턴스에 v4 주소는 우리가 인스턴스를 실행하거나 다시 실행하면 동적으로 ip 주소가 할당된다.
// 예) ec2-52-78-59-109.ap-northeast-2.compute.amazonaws.com

// 연결을 이 v4로 해놓았는데 이 주소가 바뀌면 연결이 끊기겠지?
// 그러면 당연히 안되니까, 탄력적 ip를 설정을 하면 고정 아이피를 할당 받을 수 있다.

// Nginx를 사용해서 프록시 설정

// 프록시는 말그대로 "대신"
// 클라이언트와 서버가 통신을 할때 중간에서 대신 통신을 해주는 역할을 해준다.
// 중계역할을 해주는 것이 프록시 서버
// 클라이언트와 서버 사이의 중계 서버

// 클라이언트는 프록시 서버를 서버로 알고있고
// 서버는 프록시 서버를 클라이언트로 알고있다.

// 서버의 위치에 따라서 포워드 프록시, 리버스 프록시로 구분되는데

// 리버스 프록시는 프록시 서버가 서버의 앞에 위치하고,
// 클라이언트가 서버에 요청을 하면 리버스 프록시가 호출되고,
// 리버스 프록시는 서버에게 요청해서 응답을 받고 클라이언트한테 전송
// 결국, 클라이언트가 서버에 직접 요청하는게 아니고 프록시 서버가 요청을 받고 서버로 요청해서 서버의 응답을 받게 된다.(원래의 서버를 감춰준다. 보안 좋음)
// Nginx를 사용해서 리버스 프록시 만들어보자.

// 클라이언트 -> 인터넷 -> 프록시 서버 -> 서버
// 서버 -> 프록시 서버 -> 인터넷 -> 클라이언트

// aws 인스턴스 접속하고
// nginx 설치
// sudo apt install nginx

// nginx 실행
// sudo service nginx start

// nginx 상태 확인
// sudo service nginx status

// nginx 종료
// sudo service nginx stop

// 웹사이트 호스팅을 할때 설정에 대한 값이
// default 파일이 생성된다.
// cd /etc/nginx/sites-enabled
// default 파일은 가상 호스트 설정 파일
// default 파일 내 server_name - 도메인 추가 위치

// 설정파일 수정

// 예)
// location / {
//     # First attempt to serve request as file, then
//     # as directory, then fall back to displaying a 404.
//     # try_files $uri $uri/ =404;
// 
//     proxy_set_header HOST $host;
//     proxy_pass http://127.0.0.1:8080;
//     proxy_redirect off;
// }

// proxy_set_header : 요청이 들어오 브라우저의 host 내용을 넘겨준다는 뜻
// proxy_pass 80번 포트를 듣고 들어온 요청을 8080 포트로 전달하겠다는 뜻
// proxy_redirect off; : SPA일 경우, redirect를 없애겠다는 뜻 (SPA가 아니면 굳이 작성할 필요는 없다.)
// SPA : Single Page Application (ex. react vue 등등)

// 설정파일이 정상적인지 확인을 먼저 해주자
// 문법에 오류가 있는지 체크
// sudo nginx -t

// 설정파일을 수정했으면 서버 재시작
// sudo serivce nginx restart

// 이제 남은일 : 탄력적 ip 주소를 도메인으로 교체하자.

// 가비아에서 도메인을 구입해서 사용할 예정

// 이 도메인을 사용해서 탄력적 ip로 요청이 갈 수 있게

// aws Route 53을 사용할것
// Hosted zones -> input domain -> create hosted zone

// 상세정보를 보면 레코드
// DNS 레코드는 도메인의 이름과 관련된 정보를 나타내는 데이터
// NS 네임서버 : 인터넷에서 도메인을 ip주소로 변환하는 역할을 담당
// 도메인을 입력하면 네임서버에게 도메인 ip 주소를 요청한다.
// 그래서 웹사이트에 접근을 할 수 있게 해준다.

// 레코드 추가
// A 레코드 : 도메인 이름을 v4 주소로 매핑
// A 레코드에 탄력적 ip를 값으로 작성

// CNAME 레코드 : 서브도메인으로 설정
// www.andybyungjoopark.com -> andybyungjoopark.com 연결해주는 개념


// https 설정해서 보안이슈 해결
// 검증된 사이트라는 것을 인증해주는 인증서를 발급
// 모질라 : 3개월짜리 인증서 무료로 발급해주는 사이트
// certbot : https를 간편하게 설정 가능 (3개월마다 직접 인증서를 재발급 받을 필요 없이 자동 재발급), nginx와 호환이 좋음
// https://certbot.eff.org/

// sudo snap install core
// sudo snap refresh core
// sudo snap install --classic certbot

// certbot 실행파일에 링크 설정
// sudo ln -s /snap/bin/certbot /usr/bin/certbot

// nginx 관련 certbot 실행
// sudo certbot --nginx

// nginx 에 default 파일을 수정
// cd /etc/nginx/sites-enabled
// sudo vi default
// server_name 도메인; 으로 수정
// cd /home/ubuntu
// sudo nginx -t; 문법 오류 확인
// sudo service nginx restart; 재시작


// 3개월마다 인증서 자동 재발급 해주는 명령어
// sudo certbot renew

// 인증서 재발급 체크
// 실제로 인증서 갱신 X, 시뮬레이션으로 테스트
// 발급할 때 사전에 문제가 생길지 여부를 체크
// sudo certbot renew --dry-run