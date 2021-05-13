---
title: TypeScript 정리 2 - 타입
tags: ['Frontend', 'Basic']
published: '2021-04-19'
hidden: 'false'
---
## TypeScript의 타입
전 포스트에 이어 공식 docs를 보며 study를 진행해보겠다.
https://typescript-kr.github.io/pages/tutorials/ts-for-the-new-programmer.html

#### TypeScript의 기본 타입들
TypeScript에서 제공하는 기본 타입들을 알아볼 것이다. 다른 언어에서 이미 한 번 본 내용이라도 끈기있게 다시 보자.

+ ***Boolean***

가장 기본적인 DataType으로 true, false를 저장한다. boolean을 정의하려면 아래와 같이 작성한다.
```typescript
let isDone: boolean = false;
```

+ ***Number***

Number는 javascript에서처럼 부동 소수값이다. 16진수, 10지수 이외에도 2진수와 8진수 또한 지원한다. 아래와 같이 작성한다.
```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

+ ***String***

javascript와 마찬가지로, 큰 따옴표, 작은 따옴표로 문자열 데이터를 정의할 수 있으며 ` `(백틱, 백쿼트)를 통해 템플릿 문자열을 작성할 수 있다. 템플릿 문자열은 여러줄에 걸친 문자열 작성 및 표현식 ( ```${expr}``` 과 같은 형태) 을 포함시킬 수 있다. 아래와 같이 작성한다.
```typescript
let color: string = "blue";
let name: string = `Bob`;
let visit: number = 37;

let sentence: string = `Hello ${name},
it's your ${visit} visit.`;
```

+ ***Array***

TypeScript에서 배열은 총 두 가지 방법으로 작성할 수 있다. 타입 뒤에 []를 사용하는 방법, 그리고 java에서처럼 제네릭 배열 타입을 작성하는 방법이 있다. 아래와 같다.
```typescript
let list: number[] = [1,2,3];
let list2: Array<number> = [1,2,3];
```

+ ***Tuple***

지정된 형태의 요소의 타입과 개수, 위치가 고정된 배열을 표현할 수 있다. 아래와 같이 작성한다.
```typescript
let x: [string, number];

x = ["hello", 10];
```
올바르게 작성한 케이스보다는 어떻게 작성하면 안되는지를 보여주는 쪽이 더 이해가 쉬운 타입이다. 아래의 케이스는 전부 에러처리된다.
```typescript
let x: [string, number];

x = [10, "hello"]; //0번 요소가 string, 1번 요소가 number여야하므로
x[3] = "Hello2" //길이가 2로 고정이므로 3은 지정 불가
console.log(x[1].substring(1)) //1번 요소는 number이기에 substring이 불가능함.
```

+ ***Enum***

여타 언어들처럼 enum은 값의 집합에 더 나은 이름을 붙여주기 위해 사용된다. typescript에선 아래와 같은 방법으로 정의한다.
```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```
enum은 기본적으로 첫 요소부터 0으로 시작하는 숫자값을 매핑해주지만 아래와 같이 시작값을 수동으로 설정해주거나 모든 값을 수동으로 수정할 수 있다.
```typescript
enum Color {Red = 1, Green, Blue}

enum Color2 {Yellow = 1, White = 4, Purple = 8}
```
또한 배열식 접근을 이용해 매겨진 값으로 매칭되는 enum을 알 수 있다.
```typescript
enum Color {Yellow = 1, White = 4, Purple = 8}
let colorName: string = Color[4];

console.log(colorName);
```

+ ***Any***

사용자 입력 값이나 라이브러리를 통해 받아오는 값 등, 예측이 가지 않는 값을 검사 없이 통과시키고 싶을 때, any타입을 사용할 수 있다. 아래와 같이 정의할 수 있으며 아래와 같이 값을 마음대로 대입할 수 있다.
```typescript
let notSure: any = 4;
notSure = "Some String";
notSure = false;
```
Any에 대해서는 기존 자바스크립트와 같이 존재하지 않는 프로퍼티에 대한 접근 또한 가능하다.
```typescript
let notSure: any = 5;
notSure.maybeExist();
```
또한 any를 활용해 기존 javascript에서처럼 요소들 간의 타입이 일치하지 않는 배열을 정의할 수도 있다.
```typescript
let list: any[] = [1, true, "free"];
```

+ ***Void, null, undefined***

우선 null과 undefined부터 이야기하자면 자신의 타입이름으로 null과 uindefined를 사용한다. 그 자체로 유용한 경우는 거의 없다. 다만 아래와 같은 경우에 사용할 수 있다.
+ null과 undefined는 다른 모든 타입의 하위 타입이다. 따라서 number 등에 할당할 수 있다. 다만 실제 작업에서 다른 타입에 null, undefined가 할당된 경우는 대부분 사용자 미스이기에 일반적으론 ```--strictNullChecks``` 옵션을 사용하여 이를 방지한다.
+ 반환값이 null 혹은 undefined인지 채크할 수 있다.

위에서 이어지는 내용으로, void는 어떤 타입도 할당할 수 없음을 뜻한다. void에 할당할 수 있는 값은 null, undefined 뿐이며 ```--strictNullChecks``` 옵션을 사용할 시 void는 사용할 수 없다. void를 정의하고자 할 때, 작성은 아래와 같이 한다.
```typescript
let unable: void = undefined;
unable = null
```

+ ***Never***

절대 발생할 수 없는 타입을 나타낸다. never는 모든 타입에게 할당 가능한 하위 타입이지만 never 타입에는 그 무엇도 할당할 수 없다. 변수나 타입가드에 의해 아무 타입도 얻지 못하게 될 경우 never 타입이 반환된다. 공식 docs에는 never를 반환하는 경우에 대해 아래와 같은 예제들을 들었다. 솔직히 다 이해했다고 자신할 수 없지만... 우선 알아두자.
```typescript
//function이 never 타입을 반환하도록 정의된 경우, 함수의 마지막에 도달할 수 없다.
function error(message: string): never {
	throw new Error(message);
}

//반환 타입이 never로 추론된다.
function failedSituation () {
	return error('Some Fail');
}

//never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function infiniteLoop(): never {
	while(true){

	}
}
```

+ ***Object***

객체 타입으로 원시 타입(number, string, boolean, bigint, symbol, null, undefined)이 아닌 나머지를 의미한다. 예제를 읽기 전에, ```declare```는 어딘가에 이미 선언된 함수, 클래스, 인터페이스 등에 대해 접근하는 방법을 typescript에게 알려준다. 우선은 이 정도만 알고, 공식문서에선 create 라는 function을 어딘가에서 가져왔다고 치고 Object로 정의 가능한 범위를 보여주고 있다(유니온으로 null도 대입한 것으로 보아 아마도 Object.create를 비슷하게 정의하려 한 것으로 보임). 실행은 안되지만 build를 해보면 오류라고 적힌 부분에선 오류를 뱉는다.
```typescript
declare function create(o: object | null): void;

//
create({prop:0});
create(null);

//아래의 예시는 전부 오류이다.
create(42);
create("string");
create(false);
create(undefined);
```
간단히 설명하고 넘어가자면, 원시타입 값 그 자체를 object 취급하려하면 오류이고 우리가 이해하고있는 object를 대입하면 성공하는 것을 볼 수 있다.

#### 타입 단언
타입 단언은 다른 언어의 형변환과 비슷한 개념이다. java에서 abstract나 interface 등으로 객체를 받아온 후 그를 상속받는 클래스로 형변환을 해 보다 구체적인 값을 처리하듯, TypeScript에선 대부분 any 등의 막연한 타입으로 받아온 값을 토대로 더 확실한 처리를 하기 위해 사용된다. 아래 예시의 경우, any로 받아온 값을 string으로 치환하지 않으면 length를 쓸 수 없을 것이다. 타입 단언은 아래의 두 가지 문법으로 가능하다.
```typescript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
let strLength2: number = (someValue as string).length;
```

기본적인 타입의 이야기는 여기까지이다. 이제 다음 포스트에서는 인터페이스에 대한 Study를 해보자.
