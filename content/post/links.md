---
title: 참조용 링크들
tags: ['Etc', 'Article']
published: '2021-04-13'
hidden: 'true'
---
## 참조할 링크들
##### Node js 의 디자인 패턴들
+ https://morioh.com/p/4044a1d621b0

##### Node js 성능 최적화 팁
+ https://morioh.com/p/48e29cabeb90

##### Backend로 express를 사용하는 경우의 React 연동법 (nest에 맞게 변경)
+ https://singa-korean.tistory.com/46

##### 일단 nest 풀스택 구축 방법
+ https://becomereal.tistory.com/56

##### DB 엔진 순위
+ https://zetawiki.com/wiki/DB%EC%97%94%EC%A7%84_%EC%88%9C%EC%9C%84

##### MySQL vs NoSQL
+ https://velog.io/@thms200/SQL-vs-NoSQL

##### Opensource DB List
+ https://geekflare.com/open-source-database/ (결론 - PostgreSQL, MongoDB, Redis)

##### node js의 MongoDB 연동
+ https://velog.io/@chy0428/Node-JS-MongoDB-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0

##### nest js tutorial
+ https://docs.nestjs.com/#philosophy

##### npx로 nest를 초기화하고 싶은 경우
+ https://fors.tistory.com/606

단문이라 그냥 글로 써보자면 아래와 같다.
```
npx @nestjs/cli new <project name>
npx @nestjs/cli generate controller <controller name>
npx @nestjs/cli generate module <module name>
npx @nestjs/cli generate service <service name>

출처: https://fors.tistory.com/606 [우종선]
```
##### (재미) 모바일 어플리케이션을 위한 Cloud, Firebase
+ https://firebase.google.com/?gclid=Cj0KCQjwgtWDBhDZARIsADEKwgOtGU75s-Nc1Ze3liYiwmxcRO9VkZK0Z-j2Eilo2vA7egNxvNZp3UYaAmjiEALw_wcB&gclsrc=aw.ds

##### 애니메이션 처리를 위한 tweenmax
+ https://ko.nuxtjs.org/docs/2.x/deployment/nginx-proxy/
+ https://www.google.com/search?q=tweenmax&oq=twinmax&aqs=chrome.1.69i57j0i10l9.5327j0j7&sourceid=chrome&ie=UTF-8

node 15버전에서의 sass-loader와 node-sass 호환. 아래 버전으로 무조건 맞출 것. 안그러면 온갖 에러 다 뱉는다.
```
"node-sass": "^5.0.0",
"sass-loader": "10.1.0",
```

##### Same Origin 정책에 따른 Module import 시의 에러 이유
+ https://velog.io/@takeknowledge/%EB%A1%9C%EC%BB%AC%EC%97%90%EC%84%9C-CORS-policy-%EA%B4%80%EB%A0%A8-%EC%97%90%EB%9F%AC%EA%B0%80-%EB%B0%9C%EC%83%9D%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-3gk4gyhreu

##### CSS Rotate
+ https://westciv.com/tools/3Dtransforms/index.html

##### Javascript에서의 strict 모드와 sloppy 모드의 차이.
+ https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode

##### Elastic Search에 대한 Naver Blog 가이드
https://d2.naver.com/helloworld/273788

##### GraphQL 개념에 대한 카카오 테크 블로그
https://tech.kakao.com/2019/08/01/graphql-basic/

##### 아직 브라우저 미지원이지만 향후 사용하게될 webp 이미지
https://namu.wiki/w/WebP

##### 10만 접속자에 대해
https://dev.to/jorge_rockr/everything-you-need-to-know-about-node-js-lnc
http://www.kegel.com/c10k.html

##### 서비스 분리를 위한 revers proxy 구조
https://d2.naver.com/helloworld/2177909

##### css3 vs webkit
http://www.web-plus-plus.com/Articles/css-transition-moz-and-webkit-vs-css3

##### MQ
https://wakestand.tistory.com/471

##### nuxt의 reverse proxy 설정에 대해 나와있는 글
https://frontalnh.github.io/2019/03/16/nuxt-js-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0/
+ ***nuxt.config.js***
```
const serverUrl = "localhost:3002";

module.exports = {
  proxy: {
    '/api/': serverUrl
  },
}
```

##### 디자인 툴, zeplin, figma
+ https://www.wedesignx.com/knowledge/figma-ui-gui-design-program

##### Clean architecture
+ https://medium.com/@justfaceit/clean-architecture%EB%8A%94-%EB%AA%A8%EB%B0%94%EC%9D%BC-%EA%B0%9C%EB%B0%9C%EC%9D%84-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%8F%84%EC%99%80%EC%A3%BC%EB%8A%94%EA%B0%80-1-%EA%B2%BD%EA%B3%84%EC%84%A0-%EA%B3%84%EC%B8%B5%EC%9D%84-%EC%A0%95%EC%9D%98%ED%95%B4%EC%A4%80%EB%8B%A4-b77496744616

##### TDD
+ https://media.fastcampus.co.kr/knowledge/dev/tdd/?gclid=Cj0KCQjwh_eFBhDZARIsALHjIKfqqd4aWAAQVEfYht_BSrBSd_yKDVr9ZjXCNlKC9pVHnprU9xOB99caAiLPEALw_wcB

##### CI/CD
+ https://www.redhat.com/ko/topics/devops/what-is-ci-cd

##### DevOps
+ https://velog.io/@exploit017/2020-%EB%8D%B0%EB%B8%8C%EC%98%B5%EC%8A%A4-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EB%A1%9C%EB%93%9C%EB%A7%B5

##### DB 쿼리 최적화에 대한 간단한 팁들
+ https://mangkyu.tistory.com/52

##### Splash Screen
+ https://hearit.tistory.com/21

##### Nuxt에서 SOE, payload 등, 아직 갈 길이 굉장히 먼 것 같다. 아래 블로그 링크는 도움이 된다기보단 알아야할 키워드가 많아서 저장한다.
+ https://jangwonseok.me/logs/118

##### Nuxt 최적화
+ https://vueschool.io/articles/vuejs-tutorials/nuxt-ssr-optimizing-tips/

##### 상상 범주 내에선 다 되는 CSS 에디터
+ https://animista.net/

##### 반응형 웹 확인할 때 유용할 도구
+ https://grapesjs.com/
