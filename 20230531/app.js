// 웹 서비스를 개발하고 배포해서 사용자에게 소프트웨어를 전달해야 함
// 제 3자가 접속할 수 있는 서버 컴퓨터가 필요
// 매일 매시간 켜져있어야 하기 때문에 서버 컴퓨터를 대여해주는 호스팅 업체를 통해 배포 진행

// 호스팅
// 1) 서버 호스팅 : 물리 서버를 단독으로 임대 및 구매
// 2) 웹 호스팅 : 서버의 일부 공간을 임대 (컴퓨터를 잘게 쪼개는 개념)
//              서버나 인프라 구축이 필요 없고 비용이 저렴함
//              단독 서버에 비해 자원(사용량)이 한정적인 단점

// IaaS (Infrastructure as a Service) : 컴퓨터 자원을 제공하는 형태 (ex. AWS)
// PaaS (Platform as a Service) : 기존 환경(플랫폼)에서 서비스를 올려주는 형태 (ex. 헤로쿠, 넷플리파이 등)


// AWS 사용
// 1) 인스턴스 만들기 전 오른쪽 상단에 리전 확인 (서버 컴퓨터와 지역적으로 가깝게 설정)
// 2) 사용하고 싶은 운영체제 선택 (Ubuntu 프리 티어 자주 사용 예정)
// 3) 키 페어 생성 (절대 유출되면 안되고 잘 가지고 있어야 함)
// 4) 네트워크 설정 : 인스턴스에 접근하기 위한 설정
//                  ssh TCP 프로토콜, 포트 범위 22를 기본으로 가지고 있음)
//                  추가적으로 HTTP(80), HTTPS(443), MYSQL(3306)

// 5) 인스턴스 생성 완료 (실행 중) 되면 터미널 git bash에서 연결
//      SSH 클라이언트 (3, 4, 5번 복사 붙여넣기)

// 6) 인스턴스에 mysql 설치
//      sudo apt-get update
//      sudo apt-get install mysql-server
//      sudo mysql -u root -p => 비밀번호 없이 Enter
// 7) 데이터베이스 세팅
//      create database test1;
//      show databases;
// 8) 데이터베이스 사용 유저 생성
//      create user 'damin'@'%' identified by '3102'; (유저 생성)
//      grant all on test1.* to 'damin'@'%'; (권한 부여)
//      show grants for 'damin'; (권한이 잘 부여됐는지 확인)
// 9) mysql 재접속
//      quit 해서 mysql 나가고
//      sudo service mysql restart;
//      mysql -u damin -p

// 10) 외부에서 인스턴스의 mysql에 접속
//      sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf; (외부 접근 허용)
//      bind-address => i 눌러서 수정 모드 => 0.0.0.0 으로 변경 => esc => :wq! (저장 후 종료)
// :wq! : 저장 후 종료
// :q! : 종료
// :w! : 강제 저장
//      sudo service mysql restart;

// 11) 프로젝트 설치 받기
// git init
// git remote add origin https://github.com/9oodam/AWS_Project1.git
// git pull origin master

// 12) nodejs 설치
// sudo apt-get update
// sudo apt-get install -y build-essential
// sudo apt-get install curl
// curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash --

// sudo apt-get install -y nodejs
// node -v (버전 확인)

// 13)
// vi package.json (안에 내용 확인)
// npm i
// npm start
// https://velog.io/@ywoosang/Node.js-%EC%84%A4%EC%B9%98

// 14) 포트 연결
// 보안 - 보안그룹 - 인바운드 규칙 편집
// 사용자 지정 TCP 에 포트 범위 설정

// 15) 포트 포워딩을 해서 80번 포트 http로 접속했을 때 해당 포트로 재 매핑
// sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 9013; (80으로 접속시 자동으로 9013으로)
// sudo iptables -t nat -L --line-numbers (포트 포워딩 확인)
// sudo iptables -t nat -D PREROUTING 인덱스번호 (포트 포워딩 삭제)

// 16) 백그라운드에서 서버를 대기시켜 계속 동작하게 만들기
// npm i pm2
// package.json 에서 실행 스크립트 명령어 수정 -> pm2 start app.js

// 17) 종료
// npx pm2 kill

// 18) 리스트 확인
// npx pm2 list