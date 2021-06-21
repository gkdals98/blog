---
title: CSS 심화 2 - 반응형 웹디자인
tags: ['Frontend', 'css']
published: '2021-06-15'
hidden: 'true'
---
## 반응형 웹 디자인
현대에는 모바일, 타블렛 PC, 데스크탑 등 환경에 따라 해상도가 나뉘는 경우가 많다. 그리고 반응형 웹디자인이란, 모니터 해상도에 따라 다른 UI를 적용하는 것을 의미한다. 구체적으론 해상도에 따라 완전히 다른 페이지로 라우팅하는 방식과 다른 css를 적용하는 방식 두 가지가 있다. 이번엔 후자에 대해 메모하고 넘어가고자 한다. 가장 기본이 되는 meta-viewport 및 media 사용법에 대해 정리해본 뒤 vue, 그리고 최근 공부하고있는 react에서의 반응형 웹 구성에 대해 작성할 생각이다.
+ 참고 - https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag
+ 참고 - https://www.samsungsds.com/kr/insights/Responsive_web_1.html?referrer=https://takeknowledge.tistory.com/113
+ 참고 - https://www.codingfactory.net/10534
+ 참고 - https://velog.io/@pyo-sh/React-Responsive
+ 참고 - https://eunyoe.tistory.com/entry/CSS-%EB%B0%98%EC%9D%91%ED%98%95-%EC%9B%B9-%EB%94%94%EB%B0%94%EC%9D%B4%EC%8A%A4%EB%B3%84-%ED%95%B4%EC%83%81%EB%8F%84-%EB%B0%98%EC%9D%91%ED%98%95-%EB%B6%84%EA%B8%B0%EC%A0%90-%EB%A6%AC%EC%8A%A4%ED%8A%B8

#### meta viewport
우선 모바일 환경에서 통용되는 viewport의 개념을 알아야한다. 웹 디자인에서 해상도 문제가 본격적으로 발생한 건 스마트폰의 등장 이후였다. 가장 처음 발생한 문제는 화면의 물리적 사이즈 문제로, 데스크탑을 상정하고 만들어진 기존의 웹페이지들은 당시 가로 320px였던 모바일 환경에서 한 화면에 담기지 못하고 초과돼 버렸다. 애플은 이런 문제를 해결하기 위해 가상의 화면 사이즈인 viewport 개념을 도입했다. 그리고 이 viewport의 기본 width는 980px로 설정되었다. 실제 화면의 사이즈 및 픽셀 수에 상관없이 모바일 웹 브라우저가 자신의 width를 980px라고 가정하고 웹페이지를 랜더링하도록 한 것이다. 이 이후 별도 설정이 없다면 모바일 브라우저는 자신의 가로 사이즈를 980px로 가정하고 페이지를 랜더링하게 되었다. 만약 웹페이지를 디자인할 때 모바일 브라우저의 기본 viewport width인 980px를 쓰지 않고 자체 정의한 viewport사이즈를 쓰게 하고싶다면 아래와 같이 작성하면 된다. 몇 가지 핵심적인 다른 값들도 있지만 이해를 위해 생략했다.
```html
<head>
    <!--이 웹사이트는 브라우저의 viewport를 320px로 설정할 것임을 알림-->
    <meta name="viewport" content="width=320px">
</head>
```
위와 같이 설정하면 모바일 브라우저는 해당 페이지를 랜더링할 때 가로 320px를 가정하고 랜더링할 것이다. 단, 주의사항으로 내부에 고정크기를 가지는 요소 중, viewport width보다 크게 설정된 요소가 있다면 뷰포트 설정은 무시되게 된다.


여기서 추가적으로 발생한 문제는 기본 980px에 비례해 디자인된 웹페이지는 작은 모바일 화면에서 보기엔 너무 오밀조밀했다는 점이다. 또 다양한 기기들이 등장하며 그에 대한 viewport 설정을 일일히 하기에 무리가 생기기도 했다. 이에 요즘은 반응형 웹을 추구한다면 viewport는 아래와 같은 값으로 거의 고정이다. 여기서 width 값으로 설정된 device-width는 실제 device의 가로 해상도가 아닌(같은 면적에 들어가는 pixel 수가 기기별로 다르기에) 사람이 보기 좋은 디자인을 위한 참조값이다. 가령 갤럭시 s9은 실제 장비의 가로 픽셀 수는 1440개지만 사람이 보기 좋은 디자인을 위해 브라우저가 참조할 가로 픽셀 수는 360이다.
```html
<head>
    <!--예시로 든 갤럭시 S9을 기준으로, device-width 값인 360px를 읽어와 뷰포트로 설정함-->
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
```
위와 같이 viewport가 device-width를 감지하도록 설정했다면, 이제 각각의 device width case에 대해 적절한 스타일을 설정해주는 일이 남았다. 이를 위해 @media 태그를 알아야한다.

#### @media
media 태그는 각 브라우저 사이즈에 대해 다른 스타일을 지정해줄 때 사용하는 속성이다. 모바일에선 위와같이 유동적인 viewport를 설정해주었을 때 위 meta태그에서 넘겨준 width값을 기반으로 동작한다. 또한 viewport는 모바일 환경에 국한되는 이야기이므로 pc 브라우저는 viewport 설정과 상관없이 media 태그가 있다면 이를 참조해 사용자가 브라우저의 크기를 늘이고 줄이는 것에 대응해 스타일을 바꿔준다. media 태그는 기본적으로 아래와 같은 형태를 띄고있다.
```css
@media ( max-width : 767px) {
    body {
        color : white;
    }
}
```
각 디바이스의 종류별로 일반적인 device-width 값은 아래와 같다.
+ 가로모드 테블릿 ~ Desktop - 1024px 이상
+ 세로모드 테블릿 ~ 가로모드 테블릿 - 768px ~ 1023px
+ 가로모드 모바일 ~ 세로모드 테블릿 - 480px ~ 767px
+ 세로모드 모바일 ~ 가로모드 모바일 - ~480px


이에 따라 페이지를 어떻게 구성할지는 상황에 맞춰 고려하면 된다.

#### @media query
보다 디테일하게 media 테그를 활용하고 싶다면 media query를 알아야한다. 


#### react-responsive

https://www.codingfactory.net/10534
