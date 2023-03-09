# git 다시 해보기
    1. 새 저장소 만들기
        - git init
    2. 파일 스테이징
        - git add .
    3. 커밋 메시지 작성
        - git commit -m "작업 내용"
    4. github 원격저장소 연결
        - git remote add origin "주소"
    5. 파일 업로드
        - git push origin master

# branch
- 저장소의 작업 공간
- master: 최종 작업물, 다른 브런치를 만들어서 여럿이서 작업을 하거나 혼자 작업할때 작업의 내용을 나눠서 작업 하고 최종 작업물로 병합
- master(v0.1) -> dev -> dev -> dev -> master 병합(v0.2)
- master - > dev1, dev2 - > dev1, dev2 -> dev1, dev2 -> dev1 + dev2 - > dev1 + master

## branch 목록 확인
- git branch : 로컬 저장소의 branch 목록 확인
- git branch -a : 원격저장소와 로컬저장소 branch 목록 확인
- 선택되어 있는 branch는 *(글자 초록색)

## branch 생성
- git branch "생성할 branch의 이름"

## branch 이동
- git checkout "이동할 branch의 이름"
- git switch "이동할 branch의 이름"

## 저장소 병합
- merge 병합 중 충돌이 난 파일을 보여주고 선택할 수 있게 함
- git merge "병합할 branch 이름"

### ㅠㅠ