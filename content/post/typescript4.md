---
title: TypeScript 정리 4 - 함수
tags: ['frontend', 'basic']
published: '2020-04-23'
---
## TypeScript의 함수
전 포스트에 이어 공식 docs를 보며 study를 진행해보겠다.
https://typescript-kr.github.io/pages/functions.html

#### TypeScript에서 함수 작성의 기본 문법
우선 기존의 javascript의 대표적 함수 작성법인 기명함수, 무명함수에 타입을 붙인다면 아래와 같은 형태가 될 것이다.
```typescript
function add(x: number, y: number): number {
	return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y };
```
여기에 함수 자체의 타입을 붙여넣자면 아래와 같이 된다.
```typescript
let add: (baseValue: number, increment: number) => number =
	function(x: number, y: number): number { return x + y };
```
윗 줄이 변수 선언 및 어떤 형태의 함수인지를 정의한 것이고 아랫줄이 함수의 정의이다. 물론 위와 같이 다 적을 필요 없이 아래와 같이 작성해도 TypeScript가 타입 추론을 통해 타입을 유지시켜준다.
```typescript
//myAdd의 타입으로 규격없이 전체 함수가 지정된다.
let myAdd = function(x: number, y: number): number { return x + y; };

//실제 함수의 정의부분의 타입을 지정하지 않아도 함수 타입 지정에 인자로 number를 적어놓았기에 x, y 및 return은 number가 된다.
let myAdd: (baseValue: number, increment: number) => number =
	function(x, y) { return x + y };
```

#### 선택적 매개변수와 기본 매개변수
javascript에서는 함수의 인자 수가 충족되지 않을 시엔 전달받지 못한 인자를 undefined 처리해버리고, 초과해서 들어오는 인자는 무시 처리를 한다. 하지만 TypeScript는 모든 매개변수가 함수에 필요하다고 가정한다. 물론 undefined와 null을 직접 넘길 수는 있다. 아무튼 지정된 개수, 지정된 타입의 인자를 함수에게 전달해주어야 오류처리가 되지 않는다. 이에 선택적 매개변수를 작성하길 원한다면 ? 를 사용하여 이를 표현할 수 있다. 동작은 아래의 예제와 같다. 다만, 초과 프로퍼티는 여전히 오류이다.
```typescript
function buildName (firstName: string, lastName?: string) {
	if(lastName)
		return firstName + " " + lastName;
	else
		return firstName;
}

window.onload = function() {
	console.log(buildName("Bob"));
	console.log(buildName("Bob", "Smith"));
	console.log(buildName("Bob", undefined));
	console.log(buildName("Bob", null));
	//오류, 초과프로퍼티
	console.log(buildName("Bob", "Smith", "mighty"));
}
```
여기서 undefined나 null을 넘길 경우의 값은 없음으로 처리되지만, 아래와 같이 기본 값을 넘겨줄 수 있다. 이 때, 기본값이 있음은 해당 매개변수가 넘어오지 않을 수 있음을 의미하므로, 기본값을 준 function의 타입은 ?를 줬을 때의 타입과 동일하게 처리된다.
```typescript
function buildName(firstname: string, lastName = "Smith") {
	return firstName + " " + lastName;
}

//위 function은 아래 function과 타입이 (a:string, b?:string) => string 으로같다.
function buildName2 (firstName: string, lastName? : string):string { return firstName + " " lastName };
```
다만, 선택적 매개변수는 위치가 맨 뒤가 아니라면 에러를 일으킨다. 그리고 기본 매개변수를 지정한 선택적 매개변수 또한 아래와 같이 명시적으로 undefined를 전달해야 에러를 일으키지 않는다.
```typescript
function buildName(firstName = "Will", lastName: string){
	return firstName + " " + lastName;
}

buildName(undefined, "Smith");
//오류, 너무 적은 매개변수
buildName("Bob");

//오류, 필수 매개변수는 선택적 매개변수 뒤에 올 수 없음.
function buildName2(firstName?: string, lastName: string){
	return firstName + " " + lastName;
}
```

#### 나머지 매개변수
그렇다면 몇 개가 될 지 모르는 가변 인자를 받기 위해서는 타입을 어떻게 지정해야할까? 타입스크립트에서는 이를 배열을 통해 받아올 수 있다. 아래와 같이 작성해주자.
```typescript
function buildName(firstName: string, ...restOfName: string[]) {
	return firstName + " " + restOfName.join(" ");
}

//위 나머지 매개변수 함수의 타입을 보여주기 위한 예시
function buildName2: (fname: string, ...reset: string[]) => string = buildName;
```
