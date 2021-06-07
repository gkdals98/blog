---
title: CSS 심화 1 - font-face의 최적화
tags: ['Frontend', 'css']
published: '2021-05-24'
hidden: 'true'
---

## CSS의 font loading 최적화
블로그를 만들다보니, 최초 page 접속 시에 블로그에 적용된 font의 로딩이 지연되어 기본 폰트가 드러나는 문제가 발생하였다. 이에 폰트 로딩을 어떻게하면 자연스럽게 할 수 있을까, 에 대해 study하고 이를 블로그에 적용해보려한다.

+ 참고 - https://showerbugs.github.io/2018-02-02/%EC%9B%B9%ED%8F%B0%ED%8A%B8-%EC%B5%9C%EC%A0%81%ED%99%94-%ED%95%98%EA%B8%B0

#### font-face
font-face는 css의 font-family 속성을 보완하기 위해 나왔다. font-family 속성은 웹페이지에 접속한 사용자의 시스템 폰트를 바탕으로 동작하며 사용자의 pc에 없는 폰트는 사용할 수 없다. 이에 font-face는 설정해두면 사용자 pc에 설치되지 않은 font가 있을 때, 이를 url을 통해 다운로드하도록 유도한다. 이를 ***웹폰트*** 라고 한다.
```css
/*
아래는 url을 통해 font를 다운로드받는 font-face의 예제이다.
*/
@font-face {
  font-family: 'Heebo';
  font-display: fallback;
  src: local('Heebo'), url(../fonts/Heebo-Regular.ttf) format('truetype');
}
/*
아래는 font-family의 문법으로 원래라면 사용자 PC에 존재하지 않는 Heebo폰트를 적용할 수 없었겠지만, 위의 font-face 선언으로 브라우저가 font를 받아오기에 해당 폰트가 적용된다.
*/
body {
	font-family: Heebo;
}
```
다만 이렇게되면 필연적으로 사용자의 pc에 폰트가 다운로드되기까지의 시간에 대한 처리 문제가 발생한다.

#### FOIT와 FOUT
위 로딩문제를 어떻게 처리할 지를 고민한 결과, 각 브라우저들은 두 가지 방법으로 로딩시간을 매우기 시작했다. 이 두 방법의 약자가 FOIT와 FOUT이다.
+ FOIT -
+ FOUT -
