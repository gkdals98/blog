---
title: React 기초 학습 2
tags: ['Frontend', 'React']
published: '2021-03-09'
hidden: 'false'
---

## React의 기초 학습 -2-
velog의 포스팅을 보며 Study를 이어나가보자.
+ 참고 - https://react.vlpt.us/basic/03-first-component.html

#### 조건부 렌더링
React의 조건부 렌더링은 코딩적인 방법으로 구현된다. 가령 isSpecial라는 이름의 props로 Child 컴포넌트 일부를 조건부 랜더링을 한다 치자. 우선 부모 컴포넌트는 아래와 같이 props를 전달할 것이다.

**App.js**
```javascript
import React from 'react';
import SimpleChild from './SimpleChild';

function App(){
	return (
		<>
			<SimpleChild isSpecial={true}/>
		</>
	)
}
export default App;
```
이 때 자식 컴포넌트에서 이를 활용해 조건부 렌더링을 하려면 아래와 같이 하면 된다. 추가적으로 default 값을 설정해 해당 값이 true가 아닐 때에는 부모 컴포넌트에서 값을 내려주지 않도록 하였다.

**SimpleChild**
```javascript
import React from 'react';

function SimpleChild({isSpecial}){

	return (
		<>
			{ isSpecial ? <b>*</b> : null}
			Hello
		</>
	)
}

SimpleChild.defaultProps = {
	isSpecial : false
}

export default SimpleChild;
```
velog에선 이를 조금 더 작성하기 쉽게 구현해 아래와 같이 하였다. 단축 평가 논리 계산법을 사용한 것으로, 아마도 &&으로 논리검증을 하면 앞의 값이 true여도 && 뒤의 코드 또한 실행되는 성질을 이용한 것 같다.
```javascript
import React from 'react';

function SimpleChild ({isSpecial}){
	return (
		<div>
			{isSpecial && <b>*</b>}
		</div>
	)
}

SimpleChild.defaultProps = {
	isSpecial : false
}
export default SimpleChild;
```
또한 부모 컴포넌트에서 props를 넘겨줄 때, 아래와 같이 값을 설정하지 않으면 자동으로 true가 들어간다.
```javascript
import React from 'react';
import SimpleChild from './SimpleChild';
function App () {
	return (
		<>
			<SimpleChild isSpecial/>
		</>
	)
}

export default App;
```

#### useState, 그리고 Hooks를 이용한 동적 State 관리
기존엔 함수 컴포넌트에서는 상태를 관리할 수 없었다고 한다. 하지만 이제 Hooks 라는 기능이 도입되어 함수 컴포넌트에서도 State를 관리할 수 있다. 아래는 그 예시이다.
```javascript
import React, {useState} from 'react';

function Counter() {
	//아래 line은 주석 코드의 배열 비구조화 할당이다.
	/*
	const numberState = useState(0);
	const number = numberState[0];
	const setNumber = numberState[1];
	*/
	const [number, setNumber] = useState(0);
	const onIncrease = () => {
		setNumber(number + 1);
	}
	const onDecrease = () => {
		setNumber(number - 1);
	}

	return (
		<>
			<h1>{number}</h1>
			<button onClick={onIncrease}>+1</button>
			<button onClick={onDecrease}>-1</button>
		</>
	)
}

export default Counter
```
주석에 적힌 대로 `const [number, setNumber] = useState(0)` 라인은 useState(0)의 리턴값을 배열 비구조화 할당한 라인이다. 이를 3줄로 표현한 내용은 아래와 같은데,
```javascript
  const numberState = useState(0);
	const number = numberState[0];
	const setNumber = numberState[1];

```
이를 하나하나 뜯어보자면 `useState(0)`는 초기 값이 0인 State 및 Setter를 배열로 리턴하는 라인, `const number = numberState[0]` 는 리턴받은 배열의 0번 인자인 0으로 초기화된 State를 받아오는 라인, `const setNumber = numberState[1]` 은 리턴받은 배열의 1번 인자인 State를 Set 하기 위한 Setter를 받아오는 라인이다. 이렇게 받아온 Setter를 통해 아래 라인과 같이 number 값을 변경하면
```javascript
const onIncrease = () => {
	setNumber(number + 1);
}
const onDecrease = () => {
	setNumber(number - 1);
}
```
number값의 변화가 컴포넌트에도 반영된다. 위 6줄의 성능을 최적화 하기 위해서는 아래와 같은 함수형 업데이트를 사용한다. 사실 알아보기도 더 쉽다. 원리는 나중에 학습한다.
```javascript
const onIncrease = () => {
	setNumber(prevNumber => prevNumber + 1);
}
const onDecrease = () => {
	setNumber(prevNumber => prevNumber -1);
}
```
추가로 prevNumber, number 등의 변수 명은 원하는 대로 지어도 된다. 해당 State의 Setter로 정해진 시점에서 () 안의 첫 번째 변수 명을 state로 취급하기 때문이다. 문법상 당연한 거지만 함수형 업데이트를 사용중이라면 아래와 같이 이미 선언된 변수의 이름을 가져다 써도 동작은 한다. 이건 그냥 궁금해서 해봤다.
```javascript
import React, {useState} from 'react';

function Counter () {
	const [number, setState] = useState(0);
	const num = 0;
	const onIncrease = () => {
		setState (num => num+ 1)
	}
	return (
		<>
			<h1>{number}</h1>
			<button onClick={onIncrease}>+1</button>
		</>
	)
}

export default Counter;
```

#### Input을 통한 State 관리
useState의 활용의 연장선상에서 코딩적으로 구현 가능하다. input의 onChage 이벤트에 링크를 걸어 아래와 같이 적어보자.
```javascript
import React, {useState} from 'react';

function InputComponent(){
	const [text, setText] = useState('');

	//인자로 event를 넘겨받음
	const onChange = (e) => {
		//e 안에는 target의 정보가 담겨있다.
		setText(e.target.value);
	}

	const onReset = () => {
		setText('');
	}

	return (
		<>
			<input onChange={onChange} text={text}/>
			<button onClick={onReset}>초기화</button>
			<h1>text</h1>
		</>
	)
}
export default Input Component;
```
여기서 주목할 부분. input에도 굳이 `text={text}`를 지정해주었다. 이는 해당 state를 변경할 수 있는 것이 input만은 아니기 때문이다. 만약 input의 text 지정이 없다면 버튼을 눌러 값을 초기화해도, input의 값은 그대로 남을 것이다.

#### 한 컴포넌트에서 여러 State를 동시에 관리하는 방법
쉽게 생각해보면 useState를 여러개 쓰면 될 것 같다. 하지만 이는 좋은 방법이 아니라고 한다. 대신, useState에서 객체 형태의 State를 관리하도록 한다. 이번엔 코드를 먼저 보고 한 부분씩 뜯어보자.
```javascript
import React, {useState} from 'react';


function InputComponent(){
	const [inputs, setInputs] = useState (
		{
			name: '',
			nickName: ''
		}
	);
	const {name, nickName} = inputs; //객체 타입의 비구조화 할당

	const onChange = (e) => {
		const {value, name} = e.target;
		setInput({
			...inputs,
			[name]: value
		})
	}


	return (
		<>
			<Input name="name"placeholder="이름" onChange={onChange} value={name}/>
			<Input placeholder="닉네임" onChange={onChange} value={nickName}/>
		</>
	)

}

export default InputComponent;
```
아래 부분은 심플하게 useState로 객체 형태의 State 및 setter를 할당하는 부분이다.
```javascript
const [inputs, setInputs] = useState (
	{
		name: '',
		nickName: ''
	}
);
```
문제는 아래 부분인데,
```javascript
const onChange = (e) => {
	const {value, name} = e.target;
	setInput({
		...inputs,
		[name]: value
	})
}
```
처음 보면 이건 또 뭐야? 라는 생각이 들기 때문에, function 아무곳에서나 아래와 같은 예제를 돌려보자.
```javascript
var a = {b:''};
a = {
	...a,
	b : 'b'
}
console.log(a);
```
오브젝트 내에 이미 있던 이름의 속성을 정의하면 기존 속성을 덮어 써버린다. [name]은 name값을 통해 object 내의 속성을 참조하겠다는 것(`a[b]`와 같이)이니, 본질적으로는 위의 코드와 같다. 쉽게 말해 name 값을 받아 해당 이름을 가지는 속성을 덮어쓴 새 객체를 만들었고, 그것을 Setter에 전달한 상황이다. 이 부분만 이해하면 나머지 부분들은 동일하다. 단, 주의해야할 점으로 ***State를 업데이트 할 때에는 절대 기존 객체를 수정해선 안되며 새 객체를 만들어 기존 객체를 갱신해주어야 한다.*** 다른 이유도 있겠지만 기본적으론 새 객체를 Setter로 밀어넣어줘야 React가 값의 변화를 인지해 컴포넌트를 업데이트한다.

#### ref를 이용한 DOM 참조
React에서도 외부라이브러리로 정의된 컴포넌트를 사용할 때 DOM의 객체를 직접 참조해야할 때가 있다. 그럴 때 React의 ref 기능을 활용한다. useRef를 import해서 사용하면 된다. 여기서 생성된 ref의 current값은 DOM 객체이다.
```javascript
import React, {useRef} from 'react';

function SimpleChild(){
	const inputSample = useRef();

	const onClicked = () => {
		inputSample.current.focus();
	}

	return (
		<>
			<input ref={inputSample}/>
			<button onClick={onClicked}>Focuse</button>
		</>
	)
}

export default SimpleChild;
```
