---
title: TypeScript 정리 4 - 함수
tags: ['Frontend', 'Basic']
published: '2021-04-23'
hidden: 'false'
---
## TypeScript의 함수
전 포스트에 이어 공식 docs를 보며 study를 진행해보겠다.
+ 참고 - https://typescript-kr.github.io/pages/functions.html

#### # TypeScript에서 함수 작성의 기본 문법
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

#### # 선택적 매개변수와 기본 매개변수
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

#### # 나머지 매개변수
그렇다면 몇 개가 될 지 모르는 가변 인자를 받기 위해서는 타입을 어떻게 지정해야할까? 타입스크립트에서는 이를 배열을 통해 받아올 수 있다. 아래와 같이 작성해주자.
```typescript
function buildName(firstName: string, ...restOfName: string[]) {
	return firstName + " " + restOfName.join(" ");
}

//위 나머지 매개변수 함수의 타입이 fname: string, ...reset: string[]) => string 임을 보여주기 위한 예시.
function buildName2: (fname: string, ...reset: string[]) => string = buildName;
```

#### # typescript의 this에 대해
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this
위 링크의 기반 지식을 나중에 포스팅하며 다시 정리해보자. 공식문서에선 우선 일반 function과 화살표 함수에서의 this의 참조 차이에 대해 설명하고있다. 그 내용을 알았다는 전재하에, 공식문서에서 말하는 this의 타입 문제에 대해 이야기해보자. 우선 문제점은 화살표 함수를 사용해 javascript의 고질적인 this 이슈를 해결했더라도 Typescript에선 ***function에서 this를 호출하면 type은 any가 된다*** 는 점이다. 이에 아래와 같이 function의 첫 째 인자로 this의 타입을 지정해줄 수 있다.
```typescript
function f (this : void) {
	//예시는 this를 void로 줄 경우, this가 void 타입이 되어 this호출이 불가능함을 보여준다. 타입이 지정되었음을 가장 쉽게 보여주는 예제이다.
}
```

이제 위와 같은 기법을 이용하여 공식 예제에서 this의 타입을 지정한 예를 보자. 아래와 같이 this는 Deck임을 지정하여 createCardPicker내에서 this를 통해 deck 객체의 배열을 참조할 수 있게 하였다.
```javascript
interface Card {
	suit: string;
	card: number;
}

interface Deck {
	suits: string;
	cards: number[];
	createCardPicker(thisL Deck): () => Card;
}

let deck: Deck = {
	suit: ["hearts", "spades", "clubs", "diamonds"],
	cards: Array(52),

	createCardPicker: function(this: Deck) {
		return () => {
			let pickedCard = Math.floor(Math.random() * 52);
			let pickedSuit = Math.floor(pickedCard / 13);

			return {suit: this.suits[pickedSuit], card: pickedCard % 13};
		}
	}
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

다음으로 다루고 있는 것은 callback 메서드에서의 this사용에 대한 예제이다. void를 통해 콜백메서드가 있는 클래스의 this 호출을 막거나, 화살표 함수를 통해 콜백 메서드 내의 this가 콜백이 있는 클래스를 참조하도록 한 것인데, 설명이 난해하기에 우선 이런 것도 있구나, 하고 넘어간다. javascript에선 this를 쓰면 혼란을 야기하는 경우가 많으니 this는 가급적 자주 쓰지 말자.

#### # Overloads
javascript는 동적인 언어이기에, 같은 메서드에서 여러 input 타입이나 return 타입이 있을 수도 있다. 주제 자체가 타입스크립트에서 멀어지는 느낌도 들지만, 이 경우의 구현 방법은 타입스크립트 답게 오버로딩이다, 단, Java에서 보던 오버로딩과는 다르게 아래와 같이 function에 대한 몇 가지 사양을 적는 것으로 input과 return의 any에 제약을 둔다. 아래와 같다.
```typescript
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number) : {suit: string; card: number; };
function pickCard(x): any {
	if(typeof x == "Object") {
		let pickedCard = Math.floor(Math.random() * x.length);
		return pickedCard;
	}
	else if (typeof x == "number") {
		let pickedSuit = Math.floor(x / 13);
		return { suit: suits[pickedSuit], card: x % 13 };
	}
}

let myDeck = [{ suit : "diamonds", card: 2}, { suit: "spades", card: 10}, { suit: "hearts", card: 4}];
let pickedCard1 = myDeck[pickCard(myDeck)];
let pickedCard2 = pickCard(15);
```
다음 포스트에선 리터럴 타입을 다뤄보자.
