---
title: TypeScript 정리 3 - 인터페이스
tags: ['frontend', 'basic']
published: '2020-04-20'
---
## TypeScript의 인터페이스
전 포스트에 이어 공식 docs를 보며 study를 진행해보겠다.
https://typescript-kr.github.io/pages/interfaces.html

#### 인터페이스란
우선 첫 번째 포스트에서 언급했듯, TypeScript의 타입은 코드 검사를 위한 것으로 그렇게 타이트하지 않다는 것을 알아야한다. 이는 interface또한 마찬가지로, interface에서 중점적으로 다루는 것은 형태이다. 이를 기억하며, 일단 인터페이스가 왜 필요한지를 알아보기 위해 인터페이스를 사용하지 않은 아래의 예제를 보자.
```typescript
function printLabel(labeledObj: { label: string }) {
	console.log(labeledObj.label);
}

let Obj = {size: 10, label: "Some Text"};
printLabel(Obj);
```
함수의 입력값으로 label이란 string value를 가지는 object를 요구하고있다. Object의 구조가 완전히 일치하지 않아도 TypeScript의 검사를 통과한 것은 위에 말했듯, 이것이 요구조건에 불과하기 때문이다. 이렇게 작성해도 동작은 하지만, 가독성도 떨어질 뿐더러 label이란 string value를 가지는 object를 인자로 받는 function 하나하나마다 위와 같은 함수 선언을 해주어야한다. 이제 이를 인터페이스로 표현하면 아래와 같다.
```typescript
interface LabeledValue {
	label: string;
}

function printLabel(labeledObj: LabeledValue) {
	console.log(labeledObj.label);
}

let Obj = {size: 10, label: "Some Text"};
printLabel(Obj);
```
LabeledValue라는 인터페이스는 이 타입으로 정의된 Object가 label이라는 string 값을 포함해야함 규정하고 있다. printLabel 메서드는 앞의 예제와 달리 이미 정의된 LabeledValue를 가져와 값 검사에 사용할 수 있다. 이는 코드의 재사용성을 높이고 가독성을 좋게만든다. 추가로 당연한 이야기를 하자면, 아무리 러프해도 아래와 같은 경우는 당연히 오류이다. alt라는 값이 있다고는 어디에도 보장되어있지 않기 때문이다.
```typescript
interface LabeledValue {
	label: string;
}

function printLabel(labeledObj: LabeledValue) {
	//LabeledValue에 없는 alt라는 값을 참조한다.
	console.log(labeledObj.alt);
}

let Obj = {size: 10, label: "Some Text"};
printLabel(Obj);
```
이제 인터페이스의 추가적인 문법들을 둘러보자.

#### 선택적 프로퍼티
TypeScript의 인터페이스에서는 더 유연한 검사를 위해 선택적 프로퍼티란 문법을 제공한다. 이는 추후 학습할 option bags 패턴을 구사하는데 유용하다. 선택적 프로퍼티는 ```?``` 를 사용해 정의할 수 있으며 이렇게 정의된 프로퍼티는 어떤 조건에서만 존재하거나 없을 수도 있다. 공식 docs의 아래 예제를 보자.
```typescript
interface SquareConfig {
	color?: string;
	width?: number;
}

function createSquare(config: SquareConfig): {color:string; area: number}{
	let newSquare = {color: "white", area: 100};
	if(config.color) {
		newSquare.color = config.color;
	}
	if(config.width) {
		newSquare.width = config.width * config.width;
	}
	return newSquare;
}

let mySquare = createSquare({color: "black"});
```
위처럼 선택적 프로퍼티로 선언된 프로퍼티는 있거나 없거나 TypeScrpit의 검사를 통과할 수 있다. 다만, 아래와 같은 코드도 정상 빌드 되기 때문에 값 검증을 철저히 하며 조심히 잘 다루어야한다.
```typescript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};

		newSquare.color = config.color;
    newSquare.area = config.width * config.width;

		return newSquare;
}

let mySquare = createSquare({color: "black"});
```
위와 같이 코드를 작성하고 어떤 식으로든 mySquare.width를 찍어보면 일단 undefined(정의되지 않은 값)가 출력되긴 한다. 결과적으로 width가 없는 square가 생겼으니 똑같아 보일 수 있겠지만, 보통의 경우엔 이게 의도한 코드는 아닐 것이다.

#### 읽기전용 프로퍼티
객체를 생성할 때에만 값을 할당할 수 있는 읽기전용 프로퍼티를 만들 수 있다. 프로퍼티의 이름 앞에 readonly를 넣어 이를 지정할 수 있다.
```typescript
interface Point {
	readonly x: number;
	readonly y: number;
}

let sp1: Point = { x: 10, y: 20};
p1.x = 5; //Error
```
이는 의도치않은 값의 변경을 방지한다. 마찬가지로 배열 또한 최초 생성 이후 값의 변화를 방지할 수 있는 읽기 전용 배열을 제공한다. 이는 ReadonlyArray라는 키워드를 사용하며 아래와 같이 작성한다.
```typescript
let a: number[] = [1,2,3,4];
let read: ReadonlyArray<number> = a;

//에러케이스들
read[0] = 12;
read.push(1);
a = read
```
마지막 줄의 일반 배열에 ReadonlyArray를 할당하는 동작은 타입상 불가능하지만 타입 단언을 사용해 일반 배열으로 이를 가능하게 할 수는 있다.
```typescript
a = read as number[];
```
이러한 특성때문에, 일단 변수용인 const와는 달리 readonly는 참조 또한 엄격히 해야하는 프로퍼티를 정의할 때 사용되곤 한다.

#### 초과 프로퍼티 검사
앞에서 interface는 러프한 조건과도 같아 정의된 조건을 통과하기만 하면 된다고 하였고, 위에서 선택적 프로퍼티를 이야기하며 있을 수도, 없을 수도 있다고도 했다. 하지만 위 예제에서 이어지는 아래의 예제는 TypeScript의 초과 프로퍼티 검사를 통과하지 못한다.
```javascript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};

		newSquare.color = config.color;
    newSquare.area = config.width * config.width;

		return newSquare;
}

let mySquare = createSquare({ ember: "red", width: 100 });
```
이 초과 프로퍼티 검사는 주로 아래와 같은 경우에 발생한다.
+ 객체 리터럴을 다른 변수에 할당할 때
+ 객체 리터럴을 인수로 함수에 넘길 때
