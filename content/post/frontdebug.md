---
title: Frontend Debug Log
tags: ['Frontend', 'basic']
published: '2021-07-08'
hidden: 'false'
---
## Front 디버깅
이번 포스트는 심플하게 오타 내지는 약간의 실수 등으로 발생할 수 있는 frontend 오류부터 조금 특이해서 기록해둘만한 오류들까지 다양한 오류들에 대해 적어보고자 한다. 포스트는 7월 8일에 처음 작성되었지만 새로 기록할만한 것이 있을 때 마다 업데이트될 것이다.

#### 함수 Call 무한 루프 (javascript 전반)
```
RangeError: Maximum call stack size exceeded
```
위 에러는 함수 Call이 무한 루프를 돌아 call stack에 오버플로우가 발생했을 때 나오는 에러이다. 진짜로 함수 Call이 무한 루프를 돌고 있는 경우부터 사용중인 프레임워크에서 잘못된 방법으로 함수를 호출한 경우까지 발생 경로는 매우 다양하다.