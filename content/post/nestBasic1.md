---
title: Nest JS 기초 - 서론 및 Controller
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

Rest 통신에 대해서는 여기서 따로 필기하지 않겠다. 또한 Nest js는 Angular의 구조를 참조한 만큼 데코레이터를 사용한 문법도 많다. 일단 둘 다 안다는 전제로, 이번 포스트에서는 공식 문서의 Controller사용을 Study해보자.

#### Controller
컨트롤러는 Client의 요청을 처리하고 응답을 반환한다. nest가 컨트롤러 클래스를 인식하기 위해서는 Controller 데코레이터를 사용해야한다. nestcli의 사용 없이 공식문서를 따라 우선 간단한 컨트롤러 클래스를 직접 작성해보자.
```javascript
import {Controller, Get} from '@nestjs/common';

@Controller('cats')
export class CatsController {
	@Get()
	findAll(): string {
		return 'This action returns all cats';
	}
}
```
찬찬히 살펴보자면 아래와 같다.
+ ***@Controller(cat)*** 데코레이터는 감싼 class를 nest가 컨트롤러로 인식하도록 한다. 여기서 cat은
