---
title: React 기초 학습 6
tags: ['react', 'basic']
published: '2021-03-18'
---

## React의 기초 학습 -7-
velog의 포스팅을 보며 함수 컴포넌트의 기초를 Study 했다.
https://react.vlpt.us/basic/03-first-component.html
React에서의 바람직한 rest 통신 및 Redux를 배우기 전에 그간 배웠던 내용들 중 몇 가지를 간략하게 다시 메모해두려 한다.

#### props.children
+ React component로 child 컴포넌트를 감싸고자 할 때 사용
+ child 컴포넌트를 받아서 랜더링 해야하는 컴포넌트에 아래와 같이 작성.
```javascript
function Wrapper ({children}){
	return (
		<>
			{children}
		</>
	)
}
```

#### 조건부 랜더링
+ 주로 랜더링 여부를 전달받아 아래와 같이 단축 평가 논리 계산법으로 구현
```javascript
function SimpleChild({isSpecial}){
	return (
		<>
			{ isSpecial && <b>Note : </b>}
		</>
	)
}
```

#### Hooks - useState
+ state 관리를 위한 가장 기본적인 Hook
+ 주로 아래와 같은 구조로 작성
```javascript
function SimpleChild () {
	const [state, setState] = useState("State의 초기값");

	const changeStateText = () => {
		setState("바뀔 텍스트로 state를 덮어 씀");
	}
	return (
		<>
			<button onClick={changeStateText}>Set</button>
			{state}
		</>
	)
}
```

#### Hooks - useState - 함수형 업데이트
+ state를 직접 참조해 최신값을 가져오고, 그를 통한 연산으로 값을 갱신한다.
+ 다양한 이유로 사용하겠지만, 학습중에는 useCallback에서 최신 state를 참조할 때 deps 배열에 너무 많은 값이 들어가 랜더링이 자주 일어나는 현상을 방지하기 위해 사용했다.
+ ***State의 Setter에 대해***, 괄호 안에 인자를 하나만 받는 화살표 메서드를 넣어주면 인자 이름이 무엇이건 set 메서드는 해당 화살표 함수에 현재 state를 전달한다.
```javascript
function SimpleChild () {
	const [state, setState] = useState("State의 초기값");

	const setMarkOnStateText = () => {
		setState(prevText => prevText + "!!");
	}
	return (
		<>
			<button onClick={setMarkOnStateText}>Set</button>
			{state}
		</>
	)
}
```

#### e.target.name을 활용하는 이벤트 구분
+ 리엑트에서는 아래와 같이 name을 이용하는 이벤트 구분을 자주 사용하는 듯 하다.
+ 이는 관리 편의성을 위해, 그로인한 렌더링 최적화를 위해 가급적 하나의 state로 연관있는 값들을 묶고싶기 때문으로 보인다.
```javascript
function SimpleChild(){
	const [object, setObject] = useState({first : "첫 상태", second="둘째 상태"});
	const {first, second} = object;
	const onChange = (e) => {
		const {value, name} = e.target;
		setObject ({
			...object,
			[name] : value
		})
	}
	return (
		<>
			<Input name="first" onChange="onChange" value={first}/>
			<Input name="second" onChange="onChange" value={second}/>
		</>
	)
}
```

#### 배열 랜더링
+ 배열이 존재한다면 각각의 아이템에 대해 아래와 같이 map을 사용하여 랜더링하곤 한다.
```javascript
function SimpleChild(){
	const item = [1,2,3];
	return (
		<>
			{item.map((item, index) => (
				<b>{item}</b>
			))}
		</>
	)
}
```

#### Hook - useRef
+ useRef Hook은 두 가지 사용법이 있다.
+ 첫 째로 아래와 같이 ***DOM 내의 객체를 참조*** 해 작업하고자할 때, 참조 플래그를 만드는 목적으로 사용할 수 있다.
```javascript
function SimpleChild(){
	const input = useRef();
	const focuse = () => {
		input.current.focus();
	}
	return (
		<>
			<input ref={input}>
		</>
	)
}
```
+ 둘 째로 갱신 및 참조되어야하나 렌더링을 유발해선 안되는 변수를 작성할 때 사용할 수 있다. 문법은 아래와 같다.
```javascript
function SimpleChild(){
	const refText = useRef("렌더링유발 안하는 변수");
	const setText = () => {
		refText.current = "렌더링 유발 없이 변경"
	}
	return (
		<>
			<b>해당 값은 랜더링 안되는 것을 권장</b>
		</>
	)
}

```

#### 배열 렌더링의 CRUD에 유용한 메서드
+ State를 수정할 때엔 항상 반영할 새 값을 기존 State에 Set해주어야 한다. 따라서 State 수정 시, Immer를 사용하지 않는다면 기존 배열 또는 Object를 수정해 새 객체를 생성하는 메서드가 더 유용하다.
+ ***filter*** : ***배열에 값 제거***. 기존 배열에서 filter에 넘겨준 함수 return이 true인 객체들 만으로 배열을 새로 만들어 return한다.
+ ***map*** : ***배열 값 수정***. 기존 배열 인자 하나하나에 함수를 수행한 결과를 return한다.
+ ***concat*** : ***배열 값 추가***. 기존 배열에 넘겨준 인자를 추가한 배열을 return한다.

#### props를 통한 Callback 함수 전달
+ 아래와 같이 props를 통해 함수를 전달할 수 있다.
```javascript
function ChildItem({onClick}){
	return (
		<>
			<button>
		</>
	)
}
```

#### Hooks - useEffect
+ 마운트, 언마운트 및 리렌더링 시점의 삭제 생성 동작에 개입할 수 있다.
+ useEffect에 넘겨준 함수는 해당 컴포넌트 마운트 시 호출된다.
+ useEffect에 넘겨준 함수의 return에는 cleanup 함수를 넘겨주며 이는 메서드는 해당 컴포넌트의 언마운트 시 호출된다.
+ deps 배열에 state를 넘겨주면 컴포넌트 마운트, 언마운트 이외에도 해당 변수가 변경되어 일어나는 렌더링 시에도 동작이 호출된다.
+ 문법은 아래와 같다.
```javascript
function SimpleChild(){
	const [state, setState] = useState("이 값이 바뀌어 리랜더링되면 useEffect를 호출해주세요");
	useEffect(() => {
		console.log('마운트 시 호출');
		return () => {
			console.log('언마운트시 호출');
		}
	}, [state]});
	return (
		<>
		</>
	)
}
```

#### Hooks - useMemo
+ 이미 계산된 값에 대해, 리랜더링 시 값을 새로 계산할 필요가 없을 경우 기존 값을 load할 수 있다.
+ deps 배열에는 값의 변화를 감지할 대상을 넘긴다.
```javascript
function clacSomething(text){
	return text + "!";
}
function SimpleChild() {
 	const [state, setState] = useState("대상 State");

	const setSpecialed = useMemo (() => clacSomething(state), [state]);
	return (
		<>
		</>
	)
}
```

#### Hooks - useCallback
+ 함수 컴포넌트가 리랜더링될 때, 컴포넌트 내에서 정의된 함수들을 새로 생성하지 않도록 해준다.
+ deps 배열에는 함수 실행 시 최신 값을 참조해야하는 state들을 넣는다. 해당 값이 갱신될 때 함수를 다시 생성한다.
```javascript
function SimpleChild (){
	const [state, setState] = useState("대상 State");

	const onExclamation = useCallback(() => {
		setState(state+"!");
	}, [state])

	return (
		<>
		</>
	)
}
```
+ 함수형 업데이트를 사용하면 deps 배열에 최소한의 참조값만을 넘겨줄 수 있다. 이는 렌더링 최적화로 이어진다.
```javascript
function SimpleChild (){
	const [state, setState] = useState("대상 State");

	const onExclamation = useCallback(() => {
		setState(prev => prev+"!");
	}, [])

	return (
		<>
		</>
	)
}
```

#### Hooks - useReduce
+ ***Reducer*** : action을 전달받아 새로운 State를 반환해주는 React의 디자인 패턴.
+ 아래와 같은 Action을 전달받아 새 State를 리턴해준다.
```javascript
{
	type : 'ADD_TEXT',
	textToAdd : "!"
}
```
+ 위와 같은 Action에 대한 reducer는 아래와 같다.
```javascript
function reducer (state, action) {
	switch (action.type) {
		case "ADD_TEXT" :
			return state + action.textToAdd;
		default :
			return state;
	}
}
```
+ 위 Reducer를 등록하는 방법은 아래와 같다.
```javascript
function SimpleChild (){
		const [state, dispatch] = useReducer(reducer, "최초 텍스트");

		const onAdded = useCallback (() => {
			dispatcher ({
				type : "ADD_TEXT",
				textToAdd : "붙일텍스트"
			})
		}, [])

		return (
			<>
				{state}
				<button onClick="onAdded">누름</button>
			</>
		)
}
```

#### Hooks - 커스텀 Hook
+ 커스텀 Hook은 유저 정의 함수처럼 사용된다.
+ export하는 방법은 아래와 같다.
```javascript
function useSimple(initialPara){
	return [initialPara+"추가된 값"];
}
export default useSimple;
```

#### ContextAPI
+ 컴포넌트가 여러 겹 중첩되어있을 때, 부모 컴포넌트의 State를 여러 컴포넌트를 거치지 않고 한 번에 참조하기 위해 사용한다.
+ 부모 컴포넌트에서 문법은 아래와 같다.
```javascript
export const UserState = React.createContext(null);

function SimpleParent(){
	const [state, setState] = useState("최초 State")
	return (){
		<UserState.Provider value={setState}>
			<SimpleChild/>
		</UserState.Provider>
	}
}
```
+ Child Component에서 참조하는 방법은 아래와 같다.
```javascript
function SimpleChild(){
	const setState = useContext(UserState);
}
```

#### Immer
+ 아래와 같이 설치한다.
```
yarn add immer
```
+ 복잡한 Object를 기준으로 새 Object를 만들 때, 기존 Object를 직접 수정하는 느낌으로 Object를 만질 수 있는 라이브러리이다.
+ 기존 State를 딥카피한 draft를 return해주며 state를 기준으로 draft를 가공하는 method를 인자로 넘겨주면 된다.
```javascript
import produce from 'immer';

function SimpleChild(){
	const [state, setState] = useState({text : "새 스테이트", num : 0})

	const nextState = produce ( state, draft => {
		draft.num = 10;
	})

	setState(nextState);
}
```
