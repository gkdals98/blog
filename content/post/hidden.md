## Nest JS Client
스팩은 아래와 같다.
+ 코드 관리는 gitlab
+ Backend는 Nest Image
+ Jenkins, Kuber를 사용해 배포
+ Front는 React
+ Message 기반 C 모듈을 포함하는 Image, MySQL DB Image와 통신

여기서 더 나아가 Client의 기능들도 마이크로 서비스화하고싶지만 우리 장비의 스팩 문제로 보류

#### 큰 Study 항목
1. 남는 자원 및 작업 환경 파악
2. Nest JS Server Build
3. React Thunk를 활용한 비동기 통신 웹 어플리케이션 개발 및 Nest와의 연동
4. Nest Image publish
5. Nest Image와 MySQL Image의 통신
6. Nest JS의 Docker Network 통신
7. ClientGWMgr
8. Nest Image와 ClientGwMgr 통신

### 1. 남는 자원 찾기.
현재 필요한 것들이 뭐가 있죠?
1. 내가 패치해서 올려도 되는 EPC EMS 서버 -> 이건 어디서 가능하지... 우리 EPC EMS 서버가 없는데 그냥.
2. 내가 패치해서 올려도 되는 ENB EMS 서버 -> 이건 10.11.238.208 sXGP 서버에서 해보면 될 것 같음.
=> 최종적으로 MSG 스팩, 보다 구체적으론 String이 어떻게 들어오는지, 그리고 어떻게 나가는지만 살펴보면 된다.
=> 이걸 와이어샤크로 잡는다? 개뻘짓인 것 같음. 헌데 당장은 방법이 없네. 물론 sXGP 쪽은 방법이 있는 거 같으

#### 1. 기존 MGR 백업 후

### 2. Nest JS Server Build
아래의 항목으로 진행하면 된다. (하다가 중간에 막힐 시 추가)
+ TypeScript Study
+ NestJS 기본


### 6. ClientGwMgr
아래의 항목으로 진행해보자.
+ 현재 사용하는 Message Spec의 디테일 살피기 (확인 결과 기본은 String임. 그럼 파싱 전의 struct가 어찌 오는지를 보면 되겠는데... 이게 뜻대로 안되는군.)
+ Client와 소통하는 부분의 구조 파악
+ C에서 Message를 이용해 JSON 메시지 만드는 법 연구

##### 6-1.어디서 받아와서 어디로 보낼 것인가.
+ EPC EMS에서 아래와 같이 인풋 아웃풋이 있음.
```
//클라이언트로부터 받음
09:36:56.780 [I][670] [CLIENTGWLIB/FromClient.cpp:AnalyzeEmsHeader:138]
//커먼 헤더 파싱 및 메시지 데스티네이션 분석
09:36:56.780 [I][670] [CLIENTGWLIB/MsgAnalyzer.cpp:AnalyzeCommonHeader:100]

//TCP GW에게 전달
09:36:56.780 [I][670] [CLIENTGWLIB/MsgAnalyzer.cpp:AnalyzeSrcId:122] 0:0, 2:0, -1:0, 0:1, -1:0, -1:0, -1:0, -1:0
09:36:56.780 [I][670] [CLIENTGWLIB/MsgAnalyzer.cpp:AnalyzeDstId:138] 0:0, 0:0, 0:0, 101:0, -1:0, -1:0, -1:0, -1:0
09:36:56.780 [I][670] [CLIENTGWLIB/FromClient.cpp:HandleData:298] Session-ID(75) C->S Send To (TCPGWMGR) Succes. OpCode(21712)

//대충 이런식으로 응답하는데 로그가 상당히 간략하네. 아마 무엇에 대한 아웃풋이건 같은 로그 찍으면서 나가는거겠지.
09:40:59.548 [I][617] [   1981306] S->C EH [Len=496, Type=0, session=75] CH [Len=128, Type=1, OpCode=21712]
```
+ 한 쪽은 Client 와의 통신이 주가 되는 TCP 통신
+ 다른 쪽은 TCPMgr과 통신해야하는 IPC 통신 (Redis로 바꾸고싶지만... 그랬다간 일이 열 배는 커진다.)

#### 6-2.우리 메시지 포멧은 각 단계별로 어떻게되지?

#### 6-3.IPC 부분은 어디있지?
구조상 Redis를 도입할 순 없다. 기존 IPC 통신 체계를 그대로 따라가야한다. ClientGw의 메이크 파일을 뒤져본 결과
```
26 INC = -I.\
27       -I$(PROJECTROOT)/include\
28       -I$(PROJECTROOT)/gen\
29       -I$(PROJECTROOT)/tool/MessageGen\
30       -I./CLIENTGWLIB\
31       -I$(PROJECTROOT)/src/common/OSS_BASE\
32       -I$(PROJECTROOT)/src/common/OSS_BASE/EMS_MESSAGE\
33       -I$(PROJECTROOT)/src/common/OSS_BASE/NETWORK\
34       -I/usr/local/mysql/include\
35       -I/usr/local/include/mysql++
```
여기서 include 폴더를 들어가면 smipc.h가 있고 따라가보면 shmipc를 이용해 뭔가 하는 것으로 보임.

#### 6-4. 그래서, Node와 C모듈의 IPC 통신은 어떤 식으로 구현하지
결국, C struct를 받는 쪽에서 이외의 통신을 할 예정이 없는 것이 가장 큰 문제이다. 그리고 node는 딱히 shared memory 친화적이지도 않고 cpp struct를 이용한 통신은 더더욱 쥐약이다. 따라서... 따라서 시발 진짜 돌겠네 다 말이 안되네 컨텐츠가 시발 이 지랄이네 아무튼 redis를 거쳐서 node와 통신하는 shared memory 전용 모듈 하나를 사이에 두는 것이 그나마 현실적이다. 이럴바에야 안하는게 낫다.

-fin-
