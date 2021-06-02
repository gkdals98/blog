---
title: TypeScript 정리 - Decorator
tags: ['Frontend', 'basic']
published: '2021-04-16'
hidden: 'true'
---
## javascript의 데코레이터
Decorator는 javascript의 정규 문법은 아니지만 Typescript에서 사용 가능하며 javascript에선 현재 표준화가 진행중이라고 한다. 정확히는 디자인 패턴의 데코레이터 패턴에서 말하는 데코레이터 함수를 의미하며 javascript의 특성 상, 그 원리를 한 번은 짚고 넘어가는 것이 좋다. 아래 링크를 중점으로 살펴보자.
https://typescript-kr.github.io/pages/decorators.html

#### # Decorator의 기본
우선 javascript의 데코레이터를 정의하는 법을 살펴보면 아래와 같다.
```javascript
function HelloFirstDeco (helloWord : string){	//Decorator Factory
	return function ( target, propertyKey: string, descriptor: PropeprtyDescriptor) { //Decorator
		console.log(helloWord);
	}
}
```
위와 같이 정의한 후, 파이썬에서 그랬듯, 아래와 같이 ```@```를 사용해 호출하면 된다.
```javascript
@HelloFirstDeco("Hello?")
```



#### # Property Descriptor
끝으로, 데코레이터를 설명하며 이야기한 Descriptor를 잠시 이야기하겠다. javascript의 객체에는 사용자가 정의한 속성 이외에도 숨겨진 속성들이 존재한다. 눈에 보여야 설명하기도 쉬우니 직접 이 값을 보려면 Object.getOwnPropertyDescriptor 메서드를 사용하면 된다. 우선 num이라는 속성 하나만 정의된 Object를 만들고, 속성 num의 Descriptor를 살펴보자.
```javascript
const test = {
	num : 10
}
console.log(Object.getOwnPropertyDescriptor(test, 'num'));
```
결과를 브라우저의 콘솔 상에서 보면 아래와 같다.
```
Object
ㄴconfigurable : true
ㄴenumerable : true
ㄴvalue : 10
ㄴwritable : true
ㄴ__proto__: Object
```
여기서 configurable, enumerable, writable이 Descriptor이다. 각각 아래와 같은 의미를 지닌다.
+ ***configurable*** - 해당 프로퍼티가 defineProperty를 통해 설정될 수 있는 지 여부이다. 좀 더 러프하고 쉽게 이야기하자면 객체에서 해당 속성의 유형을 변경하거나 삭제할 수 있는지를 결정한다.
+ ***enumerable*** - 객체의 프로퍼티를 Object.keys 메서드 등을 통해 열거할 수 있는 지의 여부이다.
+ ***writable*** - 할당연산자(=)를 통한 변경이 가능한지의 여부이다.
기타 get, set이란 메서드 또한 있는데 이번에 다룰 범위는 아니다.
