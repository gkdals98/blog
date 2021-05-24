---
title: Nest JS 기초 - 서론 및 Controller
tags: ['Backend', 'Node']
published: '2021-04-15'
hidden: 'false'
---
## Nest Js 기초
nest.js를 통해 Backend를 구축하는 법을 알아보려한다. 공식문서를 따라 읽으며 필요한 부분들을 정리해보자.
+ https://docs.nestjs.com/first-steps

#### Nest JS란
Nest는 Express를 기반으로 보다 정형화된 아키텍쳐를 제공하기 위해 등장하였다. 보다 자세히 설명하자면, Nest의 구조는 Angular 아키텍쳐의 영향을 받았다. 또한 Vanila js 또한 지원하나 기본적으로 Nest는 TypeScript를 지향한다.

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

Rest 통신에 대해서는 여기서 따로 필기하지 않겠다. 또한 Nest js는 Angular의 구조를 참조한 만큼 데코레이터(Nest 예제를 보면 스프링의 어노테이션이 떠오르지만 실제론 파이썬의 데코레이터를 참조한 typescript 문법이다.)를 사용한 문법도 많다. 일단 둘 다 안다는 전제로, 이번 포스트에서는 공식 문서의 Controller사용을 Study해보자.

#### Controller
컨트롤러는 Client의 요청을 처리하고 응답을 반환한다. nest가 컨트롤러 클래스를 인식하기 위해서는 Controller 데코레이터를 사용해야한다. 원래라면 nestcli를 이용해 Controller Class를 Gen해야하지만 이번엔 직접 따라치면서 살펴본단 느낌으로 nestcli의 사용 없이 간단한 컨트롤러 클래스를 직접 작성해보자.
+ ***cats.controller.ts***
```typescript
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
+ ***@Controller(cat)*** 데코레이터는 감싼 class를 nest가 컨트롤러로 인식하도록 한다. 여기서 cats는 해당 컨트롤러의 공통 endpoint이다. 즉, 해당 컨트롤러에 매핑되는 자원에 ```http://mysite.com/cats``` url을 통해 접근할 수 있게 해준다. 즉, cats는 해당 constroller class 내에서 처리할 모든 요청의 prefix가 된다.
+ ***@Get()*** 데코레이터는 감싼 함수가 해당 엔드포인트의 Get 요청에 대한 자원 반환을 할 것임을 nest에게 알린다. 지금은 Get에 아무것도 전달하고 있지 않다. 즉, 함수의 return값은 '''http://mysite.com/cats'''로 Get 요청을 할 시 받아갈 자원이다. 여기에 전달인자를 넣어 ```@Get("name")``` 과 같이 매핑한다면 해당 함수의 return은 endpoint ```/cats/name```에 대한 응답이 된다.
+ ***findAll()*** 메서드는 이름이 무엇이 되어도 상관없다. Nest는 해당 이름을 참조하지 않는다. 하지만 언제나 그렇듯 내가, 그리고 다른 사람들이 보자마자 이해할 수 있는 이름을 지어주는 것이 중요하다. 만약 해당 함수 이름이 findAll이 아니였다면 기본 경로에 Get 요청을 할 때 모든 cat을 리턴한다는걸 코드 또는 주석을 읽어봐야만 알 수 있을 것이다.

위 예제에서 가장 중요한 것은 역시 요청을 처리하는 부분일 것이다. 이에 대해 좀 더 자세히 알아보자.

#### Request Mapping 기본 동작
디테일한 설명과 설정방법을 스터디하기에 앞서, 두 가지를 짚고 넘어가려한다. ***첫 째로***, 앞에서 살펴본 예제의 ```@Get()```은 endpoint에 대한 Get 요청을 처리하는 부분이라고 했다. 이는 @Post, @Put, @Delete 등의 다른 요청을 처리할 때도 동일한 형태이다. ```@Post("Register")``` 와 같은 식이 될 것이다. ***둘 째로***, 위와 같은 요청의 return에 대한 이야기이다. Nest는 기본적으로 위와 같은 요청에 대해 응답 성공했을 경우, 200 OK, 내지는 201(Post)과 함께 String을 전달한다. 여기서, 아래와 같이 object를 return한 경우,
```typescript
@Get()
findAll() {
	return {id:3, pw:"Hello"};
}
```
위 값을 브라우저에서 받아보면 Response Headers의 Content-type이 application/json 타입인 것을 볼 수 있다. 이는 Nest가 response를 만들 때 제공하는 두 가지 옵션 중 하나인 Standard 옵션에 의한 것이다. Standard 옵션의 동작은 아래와 같다.
+ return이 string, number, boolean 등의 Javascript primitive 타입인 경우, Nest는 해당 값을 그대로 전달한다.
+ return이 array, object 등일 경우, Nest가 이를 자동적으로 JSON 형태로 Serialize해 전달한다.

Standard 옵션 이외에는 ```@Res()``` 데코레이터 등을 사용해 library-specific한 response를 지정할 수 있다. Res는 Express와의 호환성을 위한 Response로 보이고(Express를 본 적이 없기에 추측이다) 비슷한 ```@Next()``` 등의 데코레이터도 지원한다고 하는데 이는 추후에 필요하게되면 다뤄보자. 우선 간단한 예시로, Res 데코레이터를 사용한 response 객체의 반환은 아래와 같은 식이다.
```typescript
@Get()
findOne(@Res() response){
	return response.status(200).send();
}
```
여기서 주의해야할 것은, 위옵션을 통해 Controller를 작성하는 순간, 표준 접근 방식은 자동으로 비활성화된다는 점이다. 공식 docs에선 이에 대해 세부 설정을 할 수 있는 passthrough라는 옵션을 간단하게 설명하고 있지만, 우선 생략하도록 한다.

#### Request
