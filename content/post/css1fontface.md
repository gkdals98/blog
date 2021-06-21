---
title: CSS 심화 1 - font-face의 최적화
tags: ['Frontend', 'css']
published: '2021-05-24'
hidden: 'false'
---

## CSS의 font loading 최적화
블로그를 만들다보니, 최초 page 접속 시에 블로그에 적용된 font의 로딩이 지연되어 기본 폰트가 드러나는 문제가 발생하였다. 이에 폰트 로딩을 어떻게하면 자연스럽게 할 수 있을까 study하고 이를 블로그에 적용해보려한다. 겸사겸사 폰트 적용에 대한 추가 팁도 알아본다.

+ 참고 - https://showerbugs.github.io/2018-02-02/%EC%9B%B9%ED%8F%B0%ED%8A%B8-%EC%B5%9C%EC%A0%81%ED%99%94-%ED%95%98%EA%B8%B0

#### font-face
font-face는 css의 font-family 속성을 보완하기 위해 나왔다. font-family 속성은 웹페이지에 접속한 사용자의 시스템 폰트를 읽어 폰트를 적용한다. 다시 말해 사용자의 pc에 없는 폰트는 사용할 수 없다는 문제점이 있다. 이를 보완하기 위해 font-face 속성이 등장하였다. font-face에 폰트를 다운로드할 수 있는 경로를 설정하면 브라우저는 font-family에 font-face로 지정되어있으며 사용자 pc에 설치되지 않은 font가 있을 때 등록된 url로부터 폰트를 다운로드 받는다. 이런 방식의 폰트 적용을 통틀어 ***웹폰트*** 라고 한다. font-face의 작성 법을 살펴보자.
```css
/*
아래는 url을 통해 font를 다운로드받는 font-face의 예제이다.
*/
@font-face {
  font-family: 'Heebo';
  src: local('Heebo'), url(../fonts/Heebo-Regular.ttf) format('truetype');
}
/*
아래는 font-family의 문법으로 원래라면 사용자 PC에 존재하지 않는 Heebo폰트를 적용할 수 없었겠지만, 위의 font-face 선언으로 브라우저가 font를 받아오기에 해당 폰트가 적용된다.
*/
body {
	font-family: Heebo;
}
```
다만 이렇게되면 필연적으로 사용자의 pc에 폰트가 다운로드되기까지 지연이 발생하며 이 지연시간동안 폰트를 어떻게 처리할 것인가, 라는 문제가 발생한다.

#### FOIT와 FOUT
위 로딩문제를 어떻게 처리할 지를 고민한 결과, 각 브라우저들은 두 가지 방법으로 로딩시간을 매우기 시작했다. 이 두 방법의 약자가 FOIT와 FOUT이다.
+ FOIT - Flash of Invisible Text. 선 폰트 다운로드 후 텍스트를 표시하는 방법. 폰트가 다운되기 전엔 텍스트가 표시되지 않기에 문제(https://www.zachleat.com/web/mitt-romney-webfont-problem/)를 일으켰고 현재 권장되지 않는다.
+ FOUT - Flash of Unstyled Text. 시스템 기본 폰트로 텍스트를 보여준 후 폰트가 다운로드되면 폰트를 적용하는 방법이다. 나쁘지 않은 방법이지만 페이지가 깜빡이게 된다.

기본적으로 크롬, 파이어 폭스, 오페라, 사파리는 FOIT로 기다리다가 3초 뒤에 FOUT로 전환하는 방법으로, Explorer는 FOUT로 동작한다고 한다. 둘 중 어느 방법이 나은지는 개인이 상황에 맞게 선택할 일이다.
내 경우엔 여기서 중도책을 선택하기로 하였다.

#### font-display 옵션
font-display 옵션을 통해 위 폰트 로드 문제를 해결하기 위해 나온 다양한 방법 중 하나를 선택할 수 있다. 선택가능한 주요 옵션은 아래와 같다.
+ auto : 브라우저에게 맡긴다. 즉 브라우저 기본 동작을 따라간다.
+ block : FOIT를 적용한다.
+ swap : FOUT을 적용한다. 폰트의 다운로드가 늦을 경우 다운로드가 될 때 까지 무한정 기다린다. 꼭 적용되어야하는 중요한 폰트일 때 권장되는 옵션이다.
+ fallback : 100ms 동안 텍스트를 표시하지 않는다. 이후 FOUT으로 전환하나 짧은 시간 대기 후에도 폰트가 다운로드 되지 않는다면 더 이상 기다리지 않는다.
+ optional : 100ms 동안 텍스트를 표시하지 않는다. 이후 텍스트를 보여주나 폰트 다운로드에 대한 응답을 기다리지 않는다.


블로그엔 위 예제 중, fallback을 적용하였다. 예시는 아래와 같다.
```css
@font-face {
	font-family: "spoqahansanr";
  font-display: fallback;
	src: local('SpoqaHanSanNeoR'), url(../fonts/SpoqaHanSansNeo-Regular.ttf) format('truetype');
}
```

#### 폰트 다운로드 최적화를 위한 src의 local 속성
font-face는 기본 적용 시, 시스템 폰트를 채크하지 않고 네트워크로부터 폰트를 다운로드 받는다. 이미 한 번 다운로드된 폰트라면 그를 참조해 폰트를 적용할 수 있도록 src 속성에 local을 지정해줄 수 있다. 위에 블로그에 최종 적용된 예제와 같은 예제지만 local 부분을 한 번 더 보면 되겠다.
```css
@font-face {
	font-family: "spoqahansanr";
  font-display: fallback;
	src: local('SpoqaHanSanNeoR'), url(../fonts/SpoqaHanSansNeo-Regular.ttf) format('truetype');
}
```