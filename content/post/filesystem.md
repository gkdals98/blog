## PKG 버전 관리 시스템 만들기
+ PKG 파일을 문서서버에 업로드는 할 건데 감춰둘 계획
+ 우린 시간이 없으니 nodejs로 만든다.

#### UI 디자인
+ 좌측에 메뉴, 상단에 옵션바, 메인 화면에는 상단에 PKG 버전이 바 형 차트로 그려지고 주요 화면에 달력이 있다.
+ 옵션바에서는 툴의 전반적인 옵션을 관리한다.
+ 좌측 메뉴에선 프로젝트 리스트(fs folder read)를 출력한다.
+ Folder에서 프로젝트 선택 시 우측 달력의 정보가 필터링된다.
+ 달력 밑에는 해당 프로젝트 설치시 함께 배포되어야하는 툴들이 제공된다.

#### 필요한 기술
+ nodejs architecture
https://velog.io/@hopsprings2/%EA%B2%AC%EA%B3%A0%ED%95%9C-node.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90-%EC%84%A4%EA%B3%84%ED%95%98%EA%B8%B0

+ Nginx proxy server
http://labs.brandi.co.kr/2018/05/25/kangww.html
https://cheese10yun.github.io/Node-AWS-Nginx/

+ Folder list 및 파일 리스트를 읽을 fs 시스템
https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j

+ Server를 통한 File Download
https://m.blog.naver.com/PostView.nhn?blogId=hyoun1202&logNo=220675944242&proxyReferer=https:%2F%2Fwww.google.com%2F

+ vue data로 달력만들기
연습겸 직접 만들어볼까.

#### Working logic
+ JENKINS PROJECT 1 - web project
  * Web Project 자체를 관리하는 젠킨스
  * web framwork 위치는 github
	* github에서 Nodejs pkg를 읽어와 빌드 후 서버에 올린다.
+ JENKINS PROJECT 2 - PKG management
  * PKG 디렉토리를 관리하는 젠킨스
  * pkg 디렉토리 위치는 local gitlab
	* gitlab에서 PKG 디렉토리를 읽어와 nodejs 서버가 읽을 수 있는 자리에 가져다놓는다.
+ JENKINS PROJECT 3 - PKG History management
  * nodejs 서버상에 아래 절에 언급한 JSON 파일을 보관한다. 주기적으로 해당 Directory를 gitlab상에 Push한다.

#### 일정관리 시스템 - 일정 관리의 방법에 대해 필요한 요구사항은 아래와 같다.

일정표에는 그 날의 PKG Download 링크, 각각의 다운로드 시점이 기록되어야 한다. 또한 각각의 날짜에 대해 두 개의 json 파일을 만든다.
+ **하나**는 해당 날짜의 Server PKG, Client PKG, 절차서 파일의 위치를 담고있으며 달력상에서는 해당 날짜 컴포넌트의 상단에 표시된다. (XXXX-XX-XX-PKG.json)
+ **다른 하나**는 해당 날짜의 다운로드 기록을 담고있다. (XXXX-XX-XX-DOWNLOAD.json)
+ 두 파일 모두 실제 내용이 있는 경우에만 생성한다.
