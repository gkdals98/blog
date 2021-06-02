---
title: TypeScript 정리 5 - 리터럴 타입, 유니언, 교차 타입
tags: ['Frontend', 'Basic']
published: '2021-05-03'
hidden: 'false'
---
## TypeScript의 리터럴, 유니언, 교차타입
전 포스트에 이어 공식 docs를 보며 study를 진행해보겠다.
+ 참고 - https://typescript-kr.github.io/pages/literal-types.html

#### # 리터럴 타입
리터럴 타입이란 string, number 타입에 구체적인 하위 타입을 지정하는 것이다. 예시를 들어보자면 string, number에 가능한 값의 범위를 설정하여 enum 비슷하게 사용하는 경우가 해당한다. const 타입의 경우, let과는 달리 값의 변경이 불가능하기에 아래와 같이 const 변수를 선언할 경우, type이 string이 아닌 "Hello World" 가 된다. 다만 여전히 string의 하위 타입이기에 function에 string으로 넘겨줄 수는 있다.
```typescript
const text = "Hello";

function testFunc (text : string) : void {
	console.log(text);
}

function testFunc2 (text : "Hello") : void {
	console.log(text);
}

function testFunc3 (text : "Hello World") : void {
	console.log(text);
}

window.onload = function() {
	testFunc(text);
	testFunc2(text);
	testFunc3(text);
}

```
위와 같이 고정된 문자, 숫자만을 받을 수도 있지만, 몇 가지 입력 가능한 값을 설정할 수도 있다. 주로 설정값과 같이 제한된 값 내에서 한 가지를 고르는 변수를 이 방법을 써서 구현한다. 가령 타이틀 text의 size는 대제목, 소제목 여부에 따라 25pt, 15pt로 고정하기로 한 경우 등이다.
```typescript
//string 리터럴의 선택 가능 풀 지정
type Easing = "ease-in" | "ease-out" | "ease-in-out";

//number 리터럴의 선택 가능 값 지정
interface TextConfig {
	titleSize : 8 | 16 | 32:  
}
```

#### # 유니언 타입
앞서 살펴본 any 타입의 경우, 정말 모든 type이 대입 가능하기에 문제가 발생하곤 한다. 가령 string, number만 가능한 입력값을 any로 받을 경우, 생각지못한 이유로 다른 타입이 들어가며 런타임 에러를 일으킬 가능성이 있다. 이에 typescript에선 몇 가지 가능한 타입을 지정할 수 있는 유니언 타입이란 기능을 지원한다. 사실 위에서 본 몇 가지 값이 가능한 리터럴도 유니언을 이용해 구현한 것이다. 유니언은 아래와 같이 작성한다.
```typescript
//padding이 union 타입이다.
function padLeft(value: string, padding: string | number) {
	// 숫자라면 해당 숫자만큼 공백을 왼쪽에 붙일 예정.
	if(typeof padding === "number") {
		return Array(padding + 1).join(" ") + value;
	}
	if (typeof padding === "string") {
		return padding + value
	}
}
```

또한 타입이 유니언으로 선언된 경우, 객체의 속성에 대한 접근은 아래와 같이 두 타입이 공통으로 가지고 있는 속성에 한해서만 가능하다. 이런 제약이 없다면 없을지도 모르는 속성에 접근할 수 있으니 이는 당연한 이야기다.
```typescript
interface Bird {
	fly(): void;
	layEggs(): void;
}
interface Fish {
	swim(): void;
	layEgg(): void;
}

declare function getSmallPet() : Fish | Bird;

let pet = getSmallPet();
pet.layEggs();

//에러
pet.fly();
```
공식 docs엔 위 유니언을 통해 통신 state 객체를 정의하여 사용하는 예제가 있다. 현재는 꽤 권장되는 방법이니 추후 필요할 때 공식 docs를 읽고 적용해보자.

#### # 교차 타입
교차 타입은 유니언타입과 반대로, 해당 타입의 인자들을 전부 가진 새로운 타입을 정의한다. 작성 방법은 유니언에서 |를 사용했듯, &를 사용해주면 된다. 그를 통한 믹스인 패턴 예제를 아래와 같이 설명하고 있는데, 오브젝트를 상속하는 제네릭 에외에도 Partial이라는 새로운 문법이 보인다. 추후 상세히 다룰지 모르겠어 여기서 짧게 설명해보자면, Partial은 해당 오브젝트의 모든 속성을 optional 하게 만들어준다.
```typescript
class Person {
	constructor (public name: string) {}
}

interface Loggable {
	log(name: string): void;
}

class ConsoleLogger implements Loggable {
	log(name: string) {
		console.log(`Hell, I'm ${name}.`);
	}
}

//믹스인을 하는 부분. 리턴값에서 사용한 & 문법으로 First와 Second의 모든 조건을 만족해야하는 교차 타입을 정의하고 있다.
function extendFunc<First extends {}, Second extends {}> ( first: First, second: Second): First & Second {
	const result: Partial<First & Second> = {};

	//result를 First로 타입단언하고 first의 prop들을 result에 적용하고 있다.
	for (const prop in first) {
		//hasOwnProperty는 해당 프로퍼티를 가졌는지 확인하기 위한 변수
		if(first.hasOwnProperty(prop)) {
			(result as First)[prop] = first[prop];
		}
	}

	for (const prop in second) {
		if(second.hasOwnProperty(prop)) {
			(result as First)[prop] = second[prop];
		}
	}

	return result as First & Second
}
```

다음 포스트에선 Class에 대해 다루어보자.
