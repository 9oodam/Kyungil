<!-- md 문서 작성 -->

<!-- #: 제목 작성 (h1~h6 태그와 비슷)-->
<!-- -: 리스트 작성 -->

# 정리
- git init
- git pull origin master (이전 작업물 가져오기)
- git add .
- git commit -m "메시지"
- git remote add origin "저장소 주소"
- git push -u origin +master

# git project
- git: 형상 관리 도구 (버전 관리 시스템)
- 작업하면서 작업의 리스트를 관리 할 수 있음

- 장점
    - 협업하는 단계에서 소스 코드를 파일로 주고 받을 필요 없이 같은 파일을 팀원과 병렬로 작업 가능
    - 눈으로 보고 찾는 것보다 효율이 좋고 작업이 편함
    - 코드의 다른 부분을 바로 찾을 수 있음

- git 설치 & 사용자 설정
    - git bash (터미널 열기(ctrl ~) -> 오른쪽 상단 +)
    - git config --global user.name "9oodam"
    - git config --global user.email "godamcity98@gmail.com"

- git 설정 정보 조회
    - git config --global --list


## 파일 업로드
- 경로 지정
    - cd ..: 한 폴더 위로 이동
    - ls -a: 경로의 파일을 전부 보여줌
    - cd 폴더명: 해당 폴더로 경로 이동 (이름 기억 안날 땐 기억나는 데 까지 치고 tab키 누르기)

- git 저장소 초기화 (저장소를 생성하는 명령어)
    - 해당 프로젝트의 경로에서 (cd ..을 치면 한폴더 위로 빠져나감)
    - git init
    - 저장소와 파일의 내용이 다를 때 컬러로 표현 (초록: 추가, 빨강: 삭제)

- git 저장소 파일 스테이징 (업로드 전 준비 단계)
    - git add 해당 파일 이름
    - git add .: 모든 파일 업로드

- 커밋 메시지 작성
    - git commit -m "메시지 내용"

- 파일들을 업로드 할 준비 끝

## 연결
- git remote add origin "주소 이름": 원격 저장소와 연결 (저장소 주소는 해당 github의 저장소에 접속해서 code(초록색 버튼)을 누르면 볼 수 있음)
- git push -u origin master: 원격 저장소에 업로드
- git pull origin master: 원격 저장소에서 파일을 받아옴

## 관리
- git을 관리하면서 자리 이동 했는데 커밋을 올렸을 때 사용자명이 다를 경우
    - 제어판 - 사용자계정 - 자격증명관리자 - Windows 자격 증명 - github.com 제거 - 사용자 재등록
- 협업을 할 때는 git push 부터 날리면 X, pull & push로 먼저 작업물 병합 필수
    - A와 B 공동작업, A가 먼저 push를 날리고 B가 계속 작업을 하다가 A의 작업물을 병합하지 않고 push 하게 되는 경우 A의 작업물이 사라짐
- .git 파일을 잘못 생성할 경우
    - rm -rf
    - 예시: rm -rf .git/