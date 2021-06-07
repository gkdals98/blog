---
title: 모던 자바스크립트 요약
tags: ['Frontend', 'Basic']
published: '2021-04-09'
hidden: 'false'
---
## 모던 자바스크립트 학습
https://learnjs.vlpt.us/
참고 블로그를 보며 모던 자바스크립트에 대해 간단히 정리하고자 한다.
#### Truthy, Falsy와 단축 평가 논리 계산법
Javascript에는 undefine, null, 0, '' NaN 등 다양한 부정의 값이 존재한다. 이는 ```===```를 통해 처리하면 정확한 대상을 지정해야하지만 논리 연산자로 다음과 같이 다루면 전부 false 처리 된다.
```javascript
console.log(!undefine);
console.log(!null);
console.log(!0);
console.log(!'');
console.log(!NaN)
```
반대로 그 이외의 모든 값이 논리연산자상에서 truthy 하다. 이를 이용해 아래와 같이 if문을 축약하는 ***단축 평가 논리 계산법*** 을 사용할 수 있다. 아래 코드는 item이 falthy하지 않다면 item의 name을 리턴할 것이다.
```javascript
function getName(item){
	return item && item.name
}
```
&& 연산자를 활용해 앞의 값이 truthy하다면 뒤의 값을 리턴하는 것 이외에도 || 연산자를 사용하여 앞의 값이 falthy하다면 뒤의 연산으로 기본 값을 전달하는 동작 또한 가능하다.
```javascript
function getName (item) {
	return item || 'No item';
}
```
#### 비구조화 할당
비구조화 할당 문법은 Object 비구조화 할당과 배열 비구조화 할당으로 나뉜다. 우선 Object 비구조화 할당은 아래와 같이 Object의 각각의 요소를 참조하는 변수를 만들 때, Object 내에 해당 이름을 가진 속성이 있을 경우 자동으로 이를 매핑시켜주는 문법이다. 바닐라 자바스크립트보다는 주로 프레임워크쪽에서 오브젝트의 값을 참조할 때 가독성을 위해 사용한다.
```Javascript
const item = {
	id : 1,
	name : '사과',
	price : '3$'
}

const {id, name, price} = item;
console.log(id);
console.log(name);
console.log(price)
```
다음, 배열 비구조화 할당의 경우, 배열 내의 요소에 변수명을 지어 각 요소를 참조할 수 있게 해준다. 주로 function의 return이 배열로 돌아오는데 각 요소가 다른 의미를 가지는 경우, 각각의 값을 참조하기 위해 사용한다.
```javascript
const current_user = "Julia"
const [name, skillFunction] = getSkill (currentUser);
```
#### # object-shorthand
Object에 속성을 줄 때, 같은 이름의 변수가 존재한다면 아래와 같이 코드를 줄일 수 있다. 어떤 원리로 동작한다기보다는 편의를 위한 문법이므로 암기해야한다.
```javascript
const currentUser = "Julia"
const [name, skillFunction] = getSkill (currentUser);

const skillObject = {
	name,
	skillFunction
}
```
위와 같이 선언하면 Object 생성부의 실질적인 동작은 아래와 같다.
```javascript
const skillObject = {
	name : name,
	skillFunction : skillFunction
}
```
#### 배열 내장 함수
배열에서 제공되는 내장 함수들을 정리해보자.
+ ***forEach*** - 각각의 요소에 인자로 넘겨준 function을 수행한다. 값의 변화보다는 각각의 값에 대한 연산이 필요할 때 사용한다.
```javascript
const fruits = ['사과', '배', '포도']

fruits.forEact ( item => {
	console.log(item);
})
```
+ ***map*** - 각 배열안의 요소들에 인자로 넘겨준 function을 수행한 새로운 배열을 리턴한다. 즉, 기존 배열을 바꾸는게 아니라 새 배열을 생성해준다.
```javascript
const numbers = [1,2,3,3,1];
const doubled = numbers.map (n => {
	return n * 2;
})
```
+ ***findIndex*** - 배열 내 object등이 특정 조건을 만족했을 시, 해당 object의 index를 반환해준다. 비슷한 ***find*** 메서드는 결과로 오브젝트를 직접 반환한다.
```javascript
const fruits = [
	{
		name : "사과",
		price : 3000
	},
	{
		name : "배",
		price : 4000
	},
	{
		name : "포도",
		price : 2000
	}
]
const index = fruits.findIndex ( item => item.name==='사과' );
```
+ ***filter*** - 배열 내 조건을 만족하는 object들로 새 배열을 만들어 리턴해준다.
```Javascript
const fruits = [
	{
		name : "사과",
		price : 3000
	},
	{
		name : "배",
		price : 4000
	},
	{
		name : "포도",
		price : 2000
	}
]

const lowPrice = fruits.filter ( item => item.price < 3500);
```
+ ***splice, slice*** - 배열에서 index 지점의 요소를 제거한다. 숫자를 두 개 넘겨주면 앞의 숫자로는 index를, 둘 째 숫자로는 몇 개 자를 지를 지정할 수 있다. splice는 원래 배열을 가공하며 slice는 새 배열을 리턴한다.
```javascript
const numbers = [1, 3, 3, 1, 1];
const slice = numbers.slice(2);
console.log (slice);

number.splice (2,2);
console.log (number);
```
+ ***shift, pop*** - 배열에서 shift는 첫 번째 원소를 추출한다. pop은 맨 뒤의 요소를 추출한다.
```javascript
const numbers = [1, 3, 3, 1, 1];
const shifted = numbers.shift();
console.log ( shifted );

const poped = numbers.pop();
console.log ( poped );
```
+ ***concat*** - 배열 두 개를 합쳐 새로운 배열을 반환한다.
```javascript
const number1 = [1,2,3,4]
const number2 = [3,2,1,3]

const concated = number1.concat(number2);
console.log (concated);
```

+ ***join*** - 배열 안의 값들을 인자로 넘긴 토큰으로 구분하며 하나의 String으로 반환해준다.
```javascript
const numbers = [ 1, 2, 3, 4, 3];
console.log(numbers.join(', '));
```

+ ***reduce*** - 리듀스는 배열의 값들을 이용해 원하는 값을 얻고자 할 때 사용한다. 다른 계산을 통해 얻어진 값에 추가로 배열에 있는 모든 숫자를 더한다거나, 배열의 숫자들의 평균을 구하는 경우 등이 이에 해당한다. 구조를 보며 디테일하게 설명해보자.
```javascript
const numbers = [1,2,3,4,5];
let sum = numbers.reduce ((accumulator, current, index, array) => {
	if (index === array.length - 1) {
		return (accumulator + current) / array.length
	}
	return accumulator + current;
}, 0);

console.log(sum)
```
reduce는 첫 인자로 함수를, 둘 째 인자로 초기 값을 넘겨준다. 둘 쨰 인자의 초기값은 배열을 통해 가공할 값을 의미한다. 함수를 보면 accumulator, current, index, array 총 네 개의 변수를 넘겨주는데, accumulator에는 현재 가공 중인 값으로 최초엔 넘겨준 초기값이고 이후로는 함수의 return값이 넘어온다. current는 배열의 현재 요소를 의미한다. index는 배열에서의 현재 위치를, array는 계산에 참조 중인 배열을 의미한다.

#### spread 문법
기존의 Object, 또는 배열을 그대로 참고하고자 할 때 아래와 같이 ```...``` 키워드를 사용하는 spread 문법을 사용할 수 있다. 아래 예시는 spread를 사용하는 대표적인 경우로, 기존 Object나 배열을 그대로 복사해와 원하는 요소만 추가, 변경하는 예시이다. spread는 편의를 위한 문법이므로 암기대상이다.
```javascript
const koreaApple = {
	name : 사과,
	countryOfOrigin : 'korea',
	price : '$3'
}

const americaApple = {
	...koreaApple,
	countryOfOrigin : 'america'
}

const fruits = ['사과', '파인애플', '배'];
const moreFruits = [...fruits, '포도'];
```

#### rest 문법
위 spread와 형태는 비슷하나 아래와 같이 Object 내의 특정 요소를 추출하여 해당 요소 및 해당 요소를 제외한 Object를 할당받아오는 것을 rest 문법이라고 부른다. 아래와 같이 작성한다.
```javascript
const koreaApple = {
	name : 사과,
	countryOfOrigin : 'korea',
	price : '$3'
}

const {countryOfOrigin, ...apple} = koreaApple;
console.log(countryOfOrigin); // korea
console.log(apple); // Object {name: "사과", price: "$3"}

const fruits = ['사과', '파인애플', '배'];
const [first, ...lessFruits] = fruits;
```

#### Promise
async, await를 적기 전에 우선 Promiss를 적어야 할 필요가 있다. 또한 Promiss를 적기 전에, 우선 Promise의 탄생을 말하기 위해 전통적인 비동기 작업의 처리방식을 말해보자. 우선, 비동기 작업이란 요청의 응답이 요청과 동시에 일어나지 않는 것을 의미한다. 가령 서버에 데이터를 요청한 후, 받아온 데이터를 화면에 뿌려주는 작업을 할 때, 아래와 같이 처리한다면 data가 온전히 값을 받아온 후에 동작이 수행된다는 보장이 없다.
```javascript
const data = loading ('/data/alarm');
console.log(data);
```
위와 같이 요청과 동시에 결과가 발생하는 작업이 아니기에 비동기 작업이며, 이 경우 비동기 작업을 통해 얻은 값을 기반으로 동작하는 코드들의 실행 순서를 보장할 수 없다. 이에 기존에 비동기 작업을 처리할 때에는 언제 올 지 알 수 없는 응답을 처리하기 위해 callback 메서드 패턴을 사용했다. Callback, 즉 요청이 리턴됐을 경우 수행하고자 하는 함수를 정의해서 비동기 작업을 수행하는 주체에게 아래와 같이 넘겨주는 방법이다.
```javascript
const callbackLogging = (data) => {
	console.log(data);
}
//어느정도 시간이 걸린 후에 data를 받아오는 메서드라고 생각하자.
loading('/data/alarm', callbackLogging);
```
문제는 javascript에선 이 콜백이 연속되는 경우가 많다는 것이다. a라는 리소스를 호출하고, a가 load 되었을 때 b를 호출하고, b가 load되면 c를 호출해야한다면 callback이 끝없이 타고 들어가 아래와 같이 된다.
```javascript
const tempCallback = (data, callback) => {
	const nextData = data + 1;
	if(callback){
		callback(nextData);
	}
	return;
}

tempCallback(1, n => {
	tempCallback(n, n => {
		tempCallback (n, n => {
			tempCallback(n)
		})
	})
})
```
이를 보다 직관적으로 만들기 위해 ES6에서 promis라는 문법을 도입했다. Promise의 파라미터들을 살펴보기 전에, 우선 Promise의 생성방법은 아래와 같다.
```javascript
new Promise ( (resolve, reject) => {
	console.log('a');
})
```
위와 같이 무명함수를 인자로 Promise를 생성하기만 하면 생성과 동시에 해당 메서드가 수행된다. 즉, Promise를 생성한 뒤 호출하거나 수행하는 동작 없이 Promise 생성만으로 Promise에 인자로 넘겨준 function이 실행된다. 다음으로, 위 예시를 보면 무명함수에 파라미터로 resolve, reject가 들어가있는 것이 보인다. 이는 Promise 생성 시에 Promise가 인자로 받은 함수에 resolve, reject라는 파라미터를 넘겨줄 것을 전재로 한 코드이다. 여기서 Promise가 함수에 넘겨주기로 한 resolve, reject는 무엇인가, 또한 promise는 생성되자마자 인자로 넘겨준 메서드를 실행하는데 어떻게 하면 원하는 타이밍에 비동기 작업을 수행할 수 있을까, 이 둘을 알아보기위해 아래 예시 코드를 살펴보자. 우선, Promise에 넘겨주는 무명함수를 원하는 타이밍에 수행하는 방법은 아래와 같이 Promise를 생성해서 return하는 Promise 생성 함수를 만들어 원하는 타이밍에 호출하는 것이다.
```javascript
function increase (n) {
	return new Promise ( (resolve, reject ) => {
		setTimeout( () => {
			const value = n + 1;
			if ( value === 5) {
				const error = new Error();
				error.name = 'ValueIsFiveError';
				reject ( error );
				return;
			}
			console.log(value);
			resolve(value);
		}, 1000);
	});
}

increase(0).then ( (n) => {
	console.log('result: ', n);
})
.catch( e => {
	console.log(e);
})
```
이제 reject, resolve는 무엇인지, 위 코드를 살펴보며 뜯어보자면 아래와 같다.
+ Promise 가 생성 인자 함수에 넘겨주는 ***resolve*** 메서드는 응답이 정상적으로 처리된 경우, Promise의 then을 호출해 값을 전달한다.
+ Promise 가 생성 인자 함수에 넘겨주는 ***reject*** 메서드는 응답이 정상처리되지 못한 경우, Promise의 catch를 호출해 에러를 전달한다.
+ Promise의 속성 ***then*** 은 인자로 무명함수를 받는다. 그리고 resolve가 then을 호출하면 전달받은 무명함수의 첫 번째 파라미터에 resolve로부터 받은 값을 넣고 해당 함수를 실행시킨다.
+ Promise의 속성 ***catch***  또한 인자로 무명함수를 받는다. 그리고 reject가 catch를 호출하면 전달받은 무명함수의 첫 번째 파라미터에 reject로부터 받은 에러를 넣고 해당 함수를 실행시킨다.

즉, Promise 내에서는 아래의 것들을 정의하고,
+ 비동기 요청
+ 비동기 요청의 결과를 처리한 후 resolve를 호출해 값을 넘겨주는 부분
+ 비동기 요청이 정상처리되지 않았을 시 reject를 호출해 error를 넘겨주는 부분
Promise 호출 시에는 아래의 것들을 정의해야한다.
+ resolve로부터 받은 값을 넘겨받아 후속처리를 할 then
+ reejct로 부터 에러를 넘겨받아 처리할 catch

하지만 여기까지만 보면, 우리의 문제인 콜백의 중첩으로 인한 가독성 저하 부분을 어떻게 해결하겠다는 건지 알 수가 없다. 여기서 우리는 Promise가 생성과 동시에 전달받은 비동기 작업을 실행한다는 것을 상기할 필요가 있다. 위에서 정의한 Promise와 그를 생성하는 increse 메서드를 아래와 같이 호출하면 어떻게 될까?
```javascript
increase(0)
	.then(n => {
		return increase(n);
	})
	.then(n => {
		return increase(n);
	})
	.then(n => {
		return increase(n);
	})
	.then(n => {
		return increase(n);
	})
	.catch( e => {
		console.log(e);
	})
```
비동기 작업이 완료되면 then에서 새로운 promise를 생성하여 return한다. 그와 동시에 새로 생성된 promise가 앞의 promise의 결과로 생긴 n을 이용해 다시 비동기처리를 수행할 것이고, 이 작업이 완료되면 다시 then이 호출된다. 위와 같이 작성하면 적어도 코드를 읽으면서는 정확히 몇 번 무엇을 호출했는지 알기가 쉬워진다. 추가적으로, 위 코드는 이해를 돕기 위해 작성된 코드이다. then은 단지 인자로 받은 함수에 resolve로부터 받은 값을 넘겨줘 실행할 뿐임을 생각해보면 위 코드를 아래와 같이 작성해도 동작할 것임을 짐작할 수 있다.
```javascript
increase(0)
	.then( increase )
	.then( increase )
	.then( increase )
	.then( increase )
	.catch( e => {
		console.log(e);
	})
```
하지만 이것만으론 각 분기에 대한 처리를 정의하기가 어렵다. 가령 세 번째 즈음의 promise에서 분기처리를 하고 싶다거나 다섯 번째 즈음에서 다른 처리를 추가로 하고싶은 경우, then 안쪽이 굉장히 더러워 질 수 있다. 이런 이유 뿐만 아니라 여기서는 다 적기 힘든 다양한 이유로, 아직은 코드의 가독성이 부족하기에 ES8에선 async, await가 등장한다.

#### async/await
async, await는 위의 Promise를 더 쉽게 사용하도록 도와주는 문법이다. 다시 위의 고전적인 방법을 살펴보자.
```javascript
const callbackLogging = (data) => {
	console.log(data);
}
//어느정도 시간이 걸린 후에 data를 받아오는 메서드라고 생각하자.
loading('/data/url', callbackLogging);
```
이 구조는 사실 Callback을 많이 써서 적응된 것이고, 원래라면 동작을 보장하지 않는 아래의 코드가 더 읽기 쉬운 코드일 것이다.
```javascript
const data = loading ('/data/alarm');
console.log(data);
```
async, await는 바로 callback의 과정을 위와 같이 작성하기 위해 존재한다. 우선 원리 설명 없이 위 코드에 async/await를 적용시켜보면 아래와 같다.
```javascript
async function loggingAlarm () {
	const data = await loading ('/data/alarm');
	console.log(data);
}
```
순서가 반대지만 우선은 ***await*** 를 짚어보자.
+ await는 async 메서드 내에서만 사용할 수 있는 키워드이다.
+ await를 붙인 비동기 메서드는 위에서 언급한 Promise를 생성하는 메서드여야 한다. 다시말해 ***return으로 비동기 작업을 수행하는 Promise를 반환하여야한다.***
+ 위 두 조건이 만족되었을 때, await는 ***원래라면 resolve가 then으로 넘겨주었어야할 비동기 작업의 결과 값을 return한다.***
+ await 키워드가 있으면 await가 비동기 작업을 마치고 결과를 return하기 전까지 다음 동작이 실행되지 않는다.

Promise 설명에 사용했던 increase를 들고와 설명해보자. 다시 말해 then을 써서 작성하면 아래와 같을 코드가
```javascript
increase(0).then ( (n) => {
	console.log('result: ', n);
})
```
(await는 async 메서드 안에서만 사용 가능한 키워드지만 우선 설명을 위해 두 줄만 적자면) await를 써서 작성하면 구조적으론 아래와 같이 된다는 뜻이다.
```javascript
const data = await increase(0);
console.log('result: ', data);
```
다음은 ***async*** 를 짚어보자.
+ async는 함수를 감싸는 키워드이다. async로 감싸는 함수는 await를 이용한 비동기 작업이 여러 분기로 나뉘어 일어날 것을 전재로 한다.
+ async로 감싼 function은 반드시 Promise 객체를 리턴한다. 명시적으로 Promise를 리턴할 수도 있고 값을 return하는 경우엔 값이 promise로 감싸져서 나간다.
```javascript
async function getNum () {
	return 1;
}
//위 코드는 아래와 같은 동작을 한다.
function getNum() {
	return Promise.resolve(1);
}
```
자료를 찾은 것은 아니라 정확한 것은 아니지만 정리해보자면, ***0개 이상의 await를 통한 비동기 작업을 수행하는 비동기 함수를 만드는데 사용하는 것이 async라고 할 수 있다.*** 그 자체로 비동기함수인 async 함수 내에서, 작업자는 await를 이용하여 여러종류의 비동기 처리를 수행할 수 있다. async 메서드 내에서 에러처리를 하는 방법 또한 전통적인 try catch 방식이다. 이는 아래와 같다.
```javascript
async function increaseAsync() {
	try {
		const num1 = await increase(0);
		const num2 = await increase(num1);
	} catch (error) {
		console.log(error)
	}
}
```
위에서 작성한 Promise만을 사용하는 비동기 처리와 비교하면 가독성이 확연히 좋아진 것을 느낄 수 있다. 마지막으로, 위와 같이 비동기 작업이 순차적으로 처리되어야 하는 경우만 있는 것은 아니다. 동시에 여러 비동기 작업이 시작되어야할 경우엔 아래와같이 Promise의 all 기능을 사용할 수 있다.
```javascript
async function increaseAsync() {
	try {
		const num1 = await Promise.all( increase(0), increase(1), increase(2));
	} catch (error) {
		console.log(error)
	}
}
```
이상으로 모던 자바스크립트에 대한 간단한 스터디 메모를 줄이도록 하겠다. 언젠가 다시 읽어보며 기억 안나는 부분을 되짚을 수 있기를...
