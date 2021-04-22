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
앞에서 interface는 러프한 조건과도 같아 정의된 조건을 통과하기만 하면 된다했으나, 위 예제에서 이어지는 아래의 예제는 오류이다.
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

let mySquare = createSquare({ somenewvalue: "red", width: 100 });
```
햇갈릴 수 있는 부분으로 이는 function에 넘겨준 객체가 리터럴이기 때문에 TypeScript의 초과 프로퍼티 검사가 적용되었으며, 이 리터럴이 인터페이스상에 없는 프로퍼티를 사용해 TypeScript의 초과 프로퍼티 검사를 통과하지 못했기 때문이다. 좀 더 자세히 이야기하자면 이 초과 프로퍼티 검사는 아래와 같은 경우에 발생한다.
+ 객체 리터럴을 다른 변수(아마도 인터페이스를 포함하는)에 할당할 때
```typescript
interface SquareConfig {
    color: string;
    width: number;
}

let sqconf: SquareConfig = { somenewvalue: "red", color: "red", width: 100 };
```
+ 객체 리터럴을 인수로 함수에 넘길 때
```typescript
interface SquareConfig {
    color: string;
    width: number;
}
function createSquare(config: SquareConfig): {color: string; area: number} {
		....
}
let mySquare = createSquare({ somenewvalue: "red", color: "red", width: 100 });
```
물론 이 초과 프로퍼티 검사는 대부분의 경우에는 유용하게 동작하는 기능이지만, 그럼에도 이를 피해서 위와 같이 작업해야하는 경우가 있을 수 있다. 이에 공식문서에선 초과 프로퍼티 검사를 피하기 위한 방법을 세 가지 설명하는데 가장 단순한 방법은 아래와 같이 타입 단언을 사용하는 것이다.
```typescript
let mySquare = createSquare({width: 100, opacity: 0.5} as SquareConfig);
```
하지만 어떤 인터페이스는 항상 불특정 프로퍼티를 포함한다면 어떨까? 그럴때를 위해 문자열 인덱스 서명이란 문법이 제공된다. 아래 예제를 보면 알 수 있듯, 이 경우 문자열 인덱스 서명을 추가하는 것이 더 가독성이 좋은 방법이다.
```typescript
interface SquareConfig {
	color?: string;
	width?: number;
	[propName: string]: any;
}
```
이 검사를 피하기 위한 마지막 방법으로, 단순히 객체 리터럴을 직접 전달하지 않고 아래와 같이 변수를 거쳐 전달하는 것이다.
```typescript
let squareOptions = { somenewvalue: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```
물론 공식문서에도 나와있듯, 마지막 케이스같이 단순한 코드에서의 초과 프로퍼티는 대부분 오류이므로, 정말 필요하다 싶을 때에 이렇게 검사를 피해주면 되겠다.

#### 함수 타입의 인터페이스
인터페이스는 객체 이외에도 함수의 형태 또한 기술할 수 있다. 인터페이스로 함수를 정의하기 위해서는 호출 서명(Call signature)이라는 문법을 사용한다. 아래와 같은 형태인데 매개변수 목록과 반환 타입만 주어진 함수와 비슷하게 생각하면 된다.
```typescript
interface SearchFunc {
	(source: string, subString: string): boolean;
}
```
이를 이용해 함수를 정의하는 방법은 아래와 같다.
```typescript
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
	let result = source.search(subString);
	return result > -1;
}
```
여기서 인터페이스를 정의한 function의 변수 명은 인터페이스에 명시된 변수 명과 같아야할 필요는 없다. 공식 문서에 따르면 TypeScript는 이 규격을 검사하는데 같은 위치에 대응하는 매개변수의 타입을 이용한다고 한다. 이에 아래와 같이 작성하는 것도 가능하다.
```typescript
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
	let result = source.search(subString);
	return result > -1;
}
```
만약 여기서 타입을 아예 생략하면 어떻게 될까? 이 경우 TypeScript의 문맥상 타이핑 기능이 인수 타입을 추론하여 SearchFunc의 규격을 지켰는지를 검사한다. 따라서 아래와 같은 코드도 작동한다.
```typescript
let mySearch: SearchFunc;
mySearch = function(src, sub) {
	let result = src.search(sub);
	return result > -1;
}
```

#### 인덱서블 타입 (색인 가능 타입)
https://ahnheejong.gitbook.io/ts-for-jsdev/04-interface-and-class/indexable-types
공식 문서와 위 링크를 함께 봐야 이해가 더 잘간다. Object에 ```Computer[cpu]```와 같은 식으로 속성접근을 하는 경우가 있다. 그리고 종종 이를 이용해 키값으로 value를 색인하는 인덱서블 객체를 만든다. 예를 들어 유저의 이름을 키값으로 포스트 수를 보여준다거나, 하는 경우 아래와 같이 표현하는 식이다.
```typescript
const UserPostCount: = {
	CROMESS : 82,
	MUMU : 17
}
```
이 경우엔 object 내의 프로퍼티 개수가 유동적인데다 프로퍼티의 이름 또한 고정이 아니다. 따라서 이를 위에 언급한 오브젝트 인터페이스로 정의하기에는 무리가 있다. 이에 TypeScript는 아래의 문법으로 위와 같은 색인 가능한 객체(인덱서블)를 정의하도록 도와준다. 가령 위의 포스트 수 오브잭트는 아래와 같이 표현할 수 있다.
```typescript
interface UserPostCount: = {
	[userName: string]: number | undefined;
}
```
여기서 ```|```는 아직 배우지 않은 유니온 타입 문법인데, 우선은 이 값이 number, 혹은 undefined이다, 라고 작성했다고 뜻만 이해하고 넘어가자. 여기서 undefined를 정의한 이유는, 없는 색인값으로 검색하는 경우도 있기 때문이다. 이는 코드상에서는 undefined 채크 등을 통해 잡아줘야한다. 위의 문법을 한글로 다시 풀어보면 아래와 같다.
```typescript
interface 인터페이스이름 {
	[색인에사용할값 : 값의타입] : 매핑가능한값 | undefined;
}
```
여기서, 색인값으론 string과 number를 사용할 수 있다. 다만, 한 인덱서블 타입에서 string 색인과 number 색인을 둘 다 사용하려면 자바스크립트의 색인의 동작방식을 이해하고 사용해야하는데, 자바스크립트는 색인을 할 때 문자열로 된 값을 사용하기 때문이다. ```Object[1]```을 수행하고 실제 오브젝트 안에 number 1이란 색인 값이 있더라도 실제 자바스크립트가 이를 찾을 때엔 number를 toString()을 이용해 string으로 바꾸며 최종적으론 ```Object["1"]``` 이 수행되게 된다. 그러므로 아래와 같이 정의할 경우,
```typescript
interface SomeMixed {
	[name: string] : number | undefined;
	[index: number] : string | undefined;
}
```
최종 컴파일 후엔 TypeScript가 아닌 자바스크립트가 동작하며 위 특성으로인해 javascript는 number 색인과 string 색인을 구분할 수 없기에,
1. number 색인에 string을 지정
2. number 색인값이 최종적으로 string으로 색인
3. string 색인에 매핑되는 value는 number로 한정되어있음.
4. string 값을 number에 넣으려함(오류)

위 과정으로 인한 모호함때문에 TypeScript의 빌드 에러가 발생하게 된다. 따라서 number 색인에 매핑할 값의 타입은 무조건 string 색인에 매핑되는 값의 타입의 하위 타입이여야한다. 가령 number 색인에 number 타입이 매핑되고 string 타입에 string 타입이 매핑된다면 number는 string 치환이 가능하기에 에러는 없을 것이다.

또 한 가지 알아야 할 것으로 인덱서블을 정의할 때에는 필수 프로퍼티의 정의도 주의해야 한다. 공식 docs에는 아래의 예제를 들어 설명하고 있는데,
```typescript
interface NumberDictionary {
	[index: string]: number;
	length: number; //success
	name: string; //fail
}
```
이는 ```name: string```이 인덱서블로 정의된 범위 내에 포함되기 때문이다. string은 number로 매핑하도록 인덱서블로 정의하였는데 name(string 인덱스)에 string을 매핑하여 오류가 생기는 것이다. 이는 유니온 등을 사용하여 ```[indexL string]: number | string``` 과 같이 정의해 사용할 수 있다.

마지막으로 인덱서블을 읽기 전용으로 만드는 방법은 아래와 같다.
```typescript
interface ReadonlyStringArray {
	readonly [index: number]: string;
}
```

#### 클래스의 인터페이스
Class의 인터페이스란, Class가 특정 규약을 지키도록 강제하는 것을 의미한다. 주로 Java나 C#에서 사용하던 문법이다. 이는 TypeScript에서도 가능하며 가장 단순한 예제부터 살펴보자면 아래와 같다.
```typescript
interface ClockInterface {
	//필수 프로퍼티의 정의
	currentTime: Date;
	//필수 메서드의 정의
	setTime(d: Date): void;
}

class Clock implements ClockInterface {
	currentTime: Date = new Date();
	setTime(d: Date) {
		this.currentTime = d;
	}
	constructor(h: number, m: number) { }
}
```

#### 구성 시그니쳐 (Construct Signature)
기본적인 interface의 구현은 위 문단에서와 같지만, 인터페이스로 함수의 인자를 정의하려하면 문제가 발생한다.
```typescript
interface Labeled {
	label: string;
}

class Box implements Labeled {
	label: string = "new";
	constructor(l: string){
		this.label = l;
	}
}

function Boxing (labeled: Labeled, stuff: string) {
	return new labeled(stuff);
}

const label = new Box('Label Text');
Boxing (Box, "Books");
```
에러 로그를 살펴보면 아래와 같다.
```
Type 'LabeledInterface' has no construct signatures.
> return new labeld(stuff);
```
construct signature가 없다는 에러이다. 우선 러프하게 생각해보면 인터페이스에 컨스트럭터에 대한 명시가 안되어있어서 발생하는 에러처럼 보인다. 즉, 호출이 불가능한 것이다. 그렇다면 구성 시그니처라는 것은 무엇일까? 이런 경우 사용할 수 있는, 인터페이스의 구성자이다. 아래 예제와 같이 작성한다.
```typescript
interface Labeled {
	label: string;
}
//구성 시그니처
interface LabeledConstructor {
	new (label: string): Labeled;
}

class Box implements Labeled {
	label: string = "new";
	constructor(l: string){
		this.label = l;
	}
}

function Boxing (labeled: LabeledConstructor, stuff: string) {
	return new labeled(stuff);
}

const somebox = Boxing(Box, "Books");
```
new 키워드를 사용해 구성 시그니처를 작성한다. 작성 방법은 ```new (인자이름: 타입): 생성될인터페이스``` 이다. 이 때 구성 시그니처의 역할이 생성자인 만큼, 정의한 구성 시그니처를 활용하기 위해선 반드시 타입을 맞춰주어야함을 기억하자. 다만, Box가 LabeledConstructor 타입의 인자로도 전달 되는 것은, 정말 타입 스크립트의 문법이 그렇다고밖에 말할 수 없겠다. 마지막으로, 인터페이스와 구성 시그니처를 활용해 Class의 형식과 생성자를 제한하는 두 번째 방법은 아래와 같다.
```typescript
interface ClockConstructor {
  new (hour: number, minute: number);
}

interface ClockInterface {
  tick();
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
      console.log("beep beep");
  }
}
const ccc = new Clock(1,2);
window.onload = function() {
	ccc.tick();
}
```

#### 인터페이스의 확장
클래스와 마찬가지로, 인터페이스는 다른 인터페이스를 extends 할 수 있다. 적절한 수준의 인터페이스를 extends하는 것으로 코드의 유연함을 만들어낼 수 있다.
```typescript
interface Shape {
	color: string;
}

interface PenStroke {
	penWidth: number;
}

interface Square extends Shape, PenStroke {
	sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

#### 하이브리드 타입
인터페이스를 활용해 Javascript의 동적이고 유연한 타입들을 기술하는 경우가 있다. 주로 서드파티 Javascript와 상호작용할 때 이런 인터페이스 정의를 사용해야할 필요가 있다. 우선 공식 문서에는 함수의 interface에 추가적인 프로퍼티와 추가 메서드를 정의하는 예제를 보여주고있다.
```typescript
interface Counter {
	//함수로의 정의
	(start: number): string;
	//추가 프로퍼티
	interval: number;
	reset(): void;
}

//counter 인터페이스의 규격을 충족하는 오브젝트를 반환하는 getCounter 메서드의 정의
function getCounter(): Counter {
	//생성 시에는 함수로.
	let counter = (function (start: number) { }) as Counter;
	//추가 프로퍼티의 구현
	counter.interval = 123;
	counter.reset = function() { };
	return counter;
}

let c = getCounter();
```
***의문점 :*** 다만 실제 수행해보면서, getCounter 내의 counter는 Counter로 타입단언이 되어있기에 interval, reset 등을 정의하지 않아도 에러가 발생하질 않는다. 그렇다고 타입단언을 없애자니 counter가 ```(start:number) => void ``` 타입으로 타입추론이 되어버린지라 interval, reset등을 정의하려하면 에러가 발생한다. 그렇다면 타입의 검사가 중요한 타입스크립트에서 이 문법을 사용하는 의미가 무엇일까? 이 부분에 대해서는 추후 Study를 하며 답을 찾게 되면 다시 기술해보겠다.

#### 클래스를 확장하는 인터페이스
인터페이스가 클래스를 extends하면, 클래스의 맴버는 상속받으나 구현은 상속받지 않는다. 이를 뒀다 어디다 쓰는가, 아래 예제는 공식 문서의 예제이다.
```javascript
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// Error: Type have separate declarations of a private property 'state'.
class Images implements SelectableControl {
    private state: any;
    select() { }
}

// Error: Property 'state' is missing in type 'images2' but required in type 'SelectableControl'
class Images2 implements SelectableControl {
    private state: any;
    select() { }
}
```
위 예제에서, 현재 표현은 안되어있지만 SelectableControl은 private 변수인 state 또한 상속받고 있다. 즉, 인터페이스 타입을 구현하려면 private 맴버인 state가 구현되어있어야하는데, state는 Control의 private이기에 결론적으로 Control을 extends해야만 SelectableControl을 구현할 수 있게 된다. 이를 이용해 특정 프로퍼티를 가진 하위 클래스에서만 코드가 동작하도록 구현할 수 있다고 하는데, 이 부분에 대해서도 나중에 다시 한 번 적어봐야 할 것 같다.

이후에는 함수에 대해 다룬다.
