---
title: TypeScript 정리 1 - 서론
tags: ['Frontend', 'Basic']
published: '2021-04-18'
hidden: 'false'
---
## TypeScript 개요
TypeScript의 수많은 장점들을 생각하지 않더라도, 프론트엔드와 노드의 생태계가 점점 TypeScript 친화적으로 변하고있기에 TypeScript는 필수가 되었다. 이에 기존에는 러프하게만 알고있던 TypeScript를 보다 정확하게 알아야할 필요가 있다고 느껴 TypeScript의 스터디를 시작하고자 한다. 참고할 자료는 공식 Docs이다.
https://typescript-kr.github.io/pages/tutorials/ts-for-the-new-programmer.html

#### TypeScript의 등장 계기
javascript의 시작은 브라우저에서 간단한 코드 몇 줄을 사용하기 위함이였다. 이에 javascript는 그 자신의 특성으로 인해 몇 가지 예기치 않은 동작을 하게 되었으며 공식 Docs 상에는 아래와 같은 케이스를 소개하고있다.
+ 동일 연산자의 강제 변환으로 인한 동작 결과 예측의 모호함. 아래의 예문은 둘 다 참이다.
```javascript
if ("" == 0) {
  console.log('True');
}
if (1 < x < 3) {
  console.log('True');
}
```
+ 정의되지 않은 변수 혹은 프로퍼티에 접근할 수 있다. 아래 예제를 보면 height의 오타로 인해 결과가 NaN으로 출력되고 있으며 얼핏봐서는 결과가 어째서 NaN인지 알기 힘들다.
```javascript
const obj = { width: 10, height: 15 };
const area = obj.width * obj.heigth;
console.log(area);
```
그리고 위와 같은 javascript의 모호함으로 인해 발생하는 작업 효율 저하를 위해 TypeScript가 등장한다.

#### TypeScript란
Type 스크립트는 러프하게 설명하자면 정적 타입 검사자를 포함하는 javascript의 개발용 런타임이다. 정적 타입 검사란 버그가 있는 프로그램을 실행시키지 않으며 오류를 검출하는 것을 의미한다. 대표적으로 아래 두 가지를 검사한다.

+ ***구문***

구문은 프로그램을 만들기 위해 코드를 작성하는 방법 그 자체를 말한다. 공식 Docs상에서는 괄호를 열었으면 닫아야하는 기초적인 코딩 예제에 대해 설명하고 있다. 아래의 예제는 TypeScript상에서 구문 오류로 분류된다.
```
let a = ( 4
```

+ ***타입***

값의 종류를 잘못 사용한 연산에 대해 오류를 출력한다. 아래의 예제에선 숫자를 빈 배열로 나누고있다. 이는 javascript 상에서는 NaN을 출력하지만 TypeScript 상에서는 에러이다.
```javascript
console.log(4 / []);
```

이렇게 TypeScript 런타임 상에서 코드를 작성한 후, 최종적으로 컴파일을 마치고 나면 일반 js 파일이 생성된다.

#### TypeScript 연습환경 빌드해보기
연습용 TypeScript 환경을 만드는 방법은 공식문서의 아래 링크에 나와있다.
https://typescript-kr.github.io/pages/tutorials/typescript-in-5-minutes.html
이를 typescript를 global에 설치하지 않고(연습 환경이 실 작업 환경에 최대한 영향을 주지 않도록) local에 설치한 후 수행하려면 아래와 같이 진행하면 된다. 우선 cmd 라인에 아래와 같이 진행하면 된다.
```
//프로젝트 디렉터리 생성 후 초기화
mkdir tsdemo
cd tsdemo

yarn init
yarn add typescript
```
이후 tsdemo 디렉터리 안에 src 디렉터리를 만들고 index.ts 파일을 생성한 후 아래의 예문 코드를 적는다.
```typescript
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "TypeScript";

document.body.textContent = greeter(user);
```
이를 js로 컴파일하기 위해서는 cmd에서 프로젝트 디렉터리의 src로 이동한 후 아래와 같이 하면 된다.
```
npx tsc index.ts
```
문제가 없다면 src 디렉터리 내에 index.js 파일이 생긴 것을 확인할 수 있을 것이다. 이후 아래 코드를 그대로 복사해서 붙여넣은 후 src 디렉터리 내에 index.html란 이름으로 저장한다.
```html
<!DOCTYPE html>
<html>
    <head><title>TypeScript Greeter</title></head>
    <body>
        <script src="index.js"></script>
    </body>
</html>
```
위 html 파일을 열어보는 것으로 최종 컴파일된 js의 동작을 확인할 수 있다. 어차피 컴파일 단계에서 TypeScript의 역할은 끝나고 잘못된 예제를 빌드할 경우 TypeScript가 에러를 표시하며 컴파일을 거부하지만, TypeScript를 통해 빌드된 js가 어떻게 동작하는지를 보는 것도 중요하다고 생각한다. 추가로, typescript로 모듈을 빌드하는 법은 인터넷 여기저기에 꽤 나와있지만 모듈은 CORS 문제와 그에 따른 Same Origin 정책(검색해서 간단히 읽어보자)으로 인해 서버가 있어야 결과를 확인할 수 있으므로 연습환경에서는 위와 같이 작업하는 것을 추천한다.

## TypeScript의 타입 시스템
위의 타입에서 확장되는 이야기이다. TypeScript의 타입 검사기는 사용자의 실수로 작성된 코드들이 javascript 상에서 에러를 뱉지 않고 의도치않은 동작을 하는 경우, 디버깅이 굉장히 힘들어지는 문제를 타입을 통해 해결하고자 한다. 다음은 공식 문서의 타입 시스템에 대한 개요들을 내 나름의 순서로 적어본 것이다.

#### 타입 추론
아래와 같이 변수를 생성하며 값을 할당하는 경우, TypeScript는 그 값을 해당 변수 타입으로 사용한다. 아래 예제에서 TypeScript는 변수를 string 타입으로 인식될 것이다.
```typescript
let hello = "Hello";
```

#### TypeScript에서의 타입이란
타입의 종류에 대해 설명하기 전에 짚고 넘어가야할 부분으로, ***TypeScript에서의 타입은 Java, C#과 달리 값의 형태를 정의한 집합개념이다.*** TypeScript의 타입은 앞에 언급한 언어들과 달리 공통의 규약을 정의한 집합과도 같으며 따라서 아래와 같은 예제 또한 정상 동작한다.
```javascript
class Car {
	drive() {

	}
}

class Golfer {
	drive() {

	}
}

let w: Car = new Golfer();
```
물론 일반적인 경우 위와 같이 이름만 두 종류의 클래스를 정의하는 것은 바람직하지 않지만 TypeScript의 타입의 구조를 설명하기 좋은 코드이다. 위의 코드가 동작하는 이유는 클래스의 구조가 동일하기 때문인데 이는 TypeScript의 중점은 ***값의 형태에 대한 검사*** 이기 때문이다. 이는 duck Typping 이라고도 불리며 위 예제에서 한 발짝 더 나아간 아래와 같은 코드 또한 동작한다.
```typescript
interface Point {
	x: number;
	y: number;
}

function printPoint ( p : Point ) {
	console.log('${p.x}, ${p.y}')
}

const point = { x: 12, y: 26 };
printPoint(point);
```
무명 오브젝트로 값을 준 point는 인터페이스 Point의 값의 형태를 모두 갖추었으므로 Point로 처리 가능하다. 마찬가지로 형의 동일성을 확인하기에 아래와 같은 경우도 동작한다.
```typescript
interface Point {
	x: number;
	y: number;
}

function printPoint(p: Point) {
	console.log(`${p.x}, ${p.y}`);
}
// ---cut---
const point3 = { x: 12, y: 26, z: 89 };
printPoint(point3); // prints "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 };
printPoint(rect); // prints "33, 3"
```
이처럼 TypeScript의 타입은 휴먼 에러의 검사가 목적이기에 여타 언어의 타입과는 달리 상당히 러프하다. 이러한 타입의 널널함은 추후, any나 유니온 등을 통해 더 잘 드러난다.


다음 포스트에선 TypeScript의 타입에 대한 대한 이야기를 해보자.
