---
title: Nest JS 기초 -1-
tags: ['BACKEND', 'Nest']
published: '2020-04-15'
---
## Nest Js 기초
nest.js를 통해 Backend를 구축하는 법을 알아보려한다.
#### Nest JS란
Express를 기반으로 보다 정형화된 아키텍쳐를 제공하기 위해 등장하였다. 보다 자세히 설명하자면, Nest의 구조는 Angular 아키텍쳐의 영향을 받았다. 또한 Vanila js 또한 지원하나 기본적으로 Nest는 TypeScript를 지향한다.

공식문서에는 아래와 같이 시작하도록 되어있다.
```
npm i -g @nestjs/cli
nest new project-name
```
지금은 Study를 하려는 것이니 잘 모르고 global 설치를 했다 발생하는 문제점들을 생각해 아래와 같이 시작할 예정이다.
```
npx @nestjs/cli new project-name
```
다만 위와같은 방법은 nest 커멘드를 많이 사용해야하는 nest.js의 특성상 ***절대 권장되지않는다.***
#### 생성된 Nest JS 프로젝트 살펴보기
Nest Cli로 생성된 Nest 프로젝트에는 아래와 같은 파일들이 생겨있다.

| 파일 | 설명 |
|---|---|
| app.controller.js | 기본 컨트롤러 |
| app.controller.spec.ts | 기본 컨트롤러의 테스트 클래스 |
| app.module.ts | 애플리케이션의 루트 모듈 |
| app.service.js | 기본 서비스 |
| main.ts | Module을 통해 백엔드 어플리케이션을 기동함 |

각각을 살펴보자면 아래와 같다.
+ ***Controller*** (app.controller.js) -
