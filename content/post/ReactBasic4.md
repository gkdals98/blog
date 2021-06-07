---
title: React 기초 학습 4
tags: ['Frontend', 'React']
published: '2021-03-16'
hidden: 'false'
---

## React의 기초 학습 -4-
velog의 포스팅을 보며 Study를 이어나가보자.
+ 참고 - https://react.vlpt.us/basic/03-first-component.html

#### useMemo를 이용한 연산결과값의 재사용
이번엔 최적화를 위한 기능이다. useMemo Hook을 사용하면 기존 연산값을 재사용 할 수 있다, 라는게 핵심인데 우선 useMemo를 사용하지 않는 아래 예제를 보자. 전 포스트에서 다루던 App.js를 아래와 같이 수정한다.
```javascript
import React, {useRef, useState, useMemo} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

//추가된 메서드
function countActiveUsers(users){
	console.log('메서드 수행');
	return users.filter(user => user.active).length;
}
//

function App (){
	const[inputs, setInputs] = useState({
		username : '',
		email : ''
	});

	const {username, email} = inputs;

	const[users, setUsers] = useState([
		{
			id : 1,
			username : 'CROMESS',
			email : 'CROMESS@naver.com',
			active : true
		},
		{
			id : 2,
			username : 'MMMC',
			email : 'mmmC@naver.com',
			active : false
		},
		{
			id:3,
			username : 'MUUU',
			email : 'muuu@naver.com',
			active : false
		}
	])

	const nextId = useRef(4);

	const onChange = (e) => {
		const {name, value} = e.target;

		setInputs({
			...inputs,
			[name] : value
		})
	}

	const onCreate = () => {
		const newUser = {
			id : nextId,
			username : username,
			email : email,
			active : false
		}
		setUsers(users.concat(newUser));

		setInputs({
			username : '',
			email : ''
		})
		nextId.current += 1;
	}

	const onRemove = (id) => {
		setUsers(
			users.filter(user => user.id !== id)
		)
	}

	const onToggle = (id) => {
		setUsers	(
			users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
		)
	}
	//추가된 라인
	const count = countActiveUsers(users);
	//
	return (
		<>
			<CreateUser
				username={username}
				email={email}
				onChange={onChange}
				onCreate={onCreate}/>
			<UserList users={users} onRemove={onRemove} onToggle={onToggle} />
			<div>활성사용자 수 : {count}</div>
		</>
	)
}

export default App;
```
여기서 정의한 countActiveUsers는 실제론 개발 중, 필요에 의해 여러 컴포넌트가 공통으로 쓰는 메서드들을 정의해놓은 util.js 등에서 가져온 외부 메서드일 수도 있다. 아무튼 이렇게 수정한 후에 User를 토글해 users에 직접 변화를 주면 예상대로 console상에 현재 active된 유저의 수가 출력된다. 문제는 함수 컴포넌트의 특징인지, CreateUser의 State가 변경되어도 이 메서드가 수행된다는 점이다. 직접 Input 필드의 값을 바꾸며 콘솔의 변화를 살펴보자. 입력 한 번에 메서드가 한 번씩 수행되는 것을 볼 수 있다. 이를 막기위해 존재하는 Hook이 useMemo이다. 아래와 같이 countActiveUsers를 호출하는 기존 라인을 주석처리하고 useMemo를 사용하도록 정정해보자.
```javascript
	//const count = countActiveUsers(users);
	const count = useMemo(() => countActiveUsers(users), [users]);
```
useEffect 때와 마찬가지로, 첫 번째 인자로는 function을, 두 번째 인자로 배열을 넘긴다. 첫 인자인 function이 수행할 메서드이고 함께 넘기는 deps 배열은 값의 변화를 감지할 대상이다. 동작 원리는 ***두 번째 인자의 값이 바뀌지 않았다면 기존 값을 그대로 사용*** 하는 것이다. 좀 더 큰 프로젝트를 진행하다보면 어떤 경우에 사용하는 Hook인지 감이 더 올 것이다.

#### userCallback을 사용한 함수의 재사용
위의 useMemo가 특정 메서드의 결과값을 재사용한다면 useCallback은 함수를 새로 만들지 않고 재사용하고자 할 때 사용한다. 가령 위의 App.js에서 onCreate, onRemove, onToggle은 컴포넌트 리렌더링 시마다 새로 생성된다. 이 쯤 되어서 짚어보자면 리랜더링 시에 전체 함수 컴포넌트가 다시 수행되는게 함서 컴포넌트의 특징인 것 같다. 아무튼, 함수를 새로 만드는 작업이 엄청난 부하를 일으키는건 아니지만 추후 학습할 최적화 기법을 위해 useCallback의 학습은 중요하다. 위 App.js를 예시로, useCallback은 아래와 같이 사용한다.
```javascript
//중략
const onChange = useCallback( (e) => {
	const {name, value} = e.target;

	setInputs({
		...inputs,
		[name] : value
	})},[inputs]
);

const onCreate = useCallback (() => {
	const newUser = {
		id : nextId,
		username : username,
		email : email,
		active : false
	}
	setUsers(users.concat(newUser));

	setInputs({
		username : '',
		email : ''
	})
	nextId.current += 1;
}, [users, username, email]);


const onRemove = useCallback((id) => {
	setUsers(
		users.filter(user => user.id !== id)
	)
}, [users]);

const onToggle = useCallback((id) => {
	setUsers	(
		users.map(user =>
			user.id === id ? { ...user, active: !user.active } : user
		)
	)
}, [users]);
//중략
```
여기서 주의할 점은 뒤의 deps 배열에 해당 함수가 사용하는 State, 혹은 props 값들을 전부 넘겨야한다는 점이다. 넘기지 않는다면 useCallback의 동작 상, 해당 값이 최신임을 보장할 수 없게된다. 함수도 하나의 객체인 만큼 useMemo로도 같은 기능을 구현할 수 있는데, 실제로 useCallback은 useMemo를 통해 구현된 Hook이다. 단지 사용을 더 편하게 했을 뿐. 아무튼, useCallback만 사용해서 얻어지는 최적화 성능은 미미하다. 하지만 이를 사용한 기법을 통해 얻어지는 최적화는 상당하며 이를 확인하기 위해 우선 Chrome 확장 프로그램의 ***React DevTools*** 를 설치해 리랜더링 되는 컴포넌트 표시 및 사용 중인 Hook 표시 기능을 활성화해놓자. 이는 단순 도구 사용이므로 현재 포스트에선 별도로 다루지 않겠다. 아무튼, React DevTools를 설치해 확인해보면 일부 값만 바뀌어도 아래의 UserList 또한 리렌더링되는 모습을 확인할 수 있다. 이를 막아보자.

#### React.memo를 사용하는 리랜더링 방지
우선 React.memo를 통해 export되는 개별 컴포넌트의 리렌더링을 막는다. 위의 예제에서 사용하던 CreateUser, UserList를 예로 들면 아래와 같이 export 하는 부분만 변경해주면 된다. React 안의 기능이므로 React를 import했다면 별도 import도 필요없다.
```javascript
export default React.memo(CreateUser);
```
UserList도 마찬가지로 아래와 같이 수정한다.
```javascript
export default React.memo(UserList);
```
이렇게 수정하면 더 이상 Input의 값 변화가 UserList를 렌더링하지 않게 된다. 하지만 User 중 하나라도 Toggle에 의해 수정이 되거나 추가되거나 삭제될 경우엔 여전히 UserList 전체와 CreateUser를 리렌더링하는 모습을 볼 수 있다. 이는 users 배열이 바뀔 때 마다 onCreate도, onToggle도, onRemove도 다시 만들어지기 때문이다. useCallback의 deps에 users를 넘겨주었기 때문으로 users의 값이 바뀌었다면 해당 메서드를 다시 생성하는 것은 동작상 당연하다. 이를 막기 위해 ***함수형 업데이트*** 를 작성하는 방법을 배워보자. App.js의 onChange를 아래와 같이 고쳐보자.
```javascript
//기존코드
/*
const onChange = useCallback( (e) => {
	const {name, value} = e.target;

	setInputs({
		...inputs,
		[name] : value
	})},[inputs]
);
*/
const onChange = useCallback(e => {
	const { name, value } = e.target;
	setInputs((inputs) => ({
		...inputs,
		[name]: value
	}));
}, []);

```
state의 Setter에 덮어씌울 값을 직접 주는게 아니라 함수 연산의 결과로 주고있다. 그 결과 함수의 인자로 최신 inputs 값을 넘겨줄 수 있게 되었고 useCallback의 deps를 비울 수 있게 되었다. 이러면 deps에서 inputs를 참조하지 않아도 되고 결과적으로 useCallback도 inputs의 변화에 따라 함수를 새로 만들 필요가 없어지고 결과적으로 함수 갱신에 따른 리렌더링도 일어나지 않게 된다. 이제 남은 메서드들도 함수형 업데이트로 고쳐보자.
```javascript
const onCreate = useCallback (() => {
	const newUser = {
		id : nextId,
		username : username,
		email : email,
		active : false
	}
	setUsers( (users) => (
		users.concat(newUser)
	));

	setInputs({
		username : '',
		email : ''
	})
	nextId.current += 1;
}, [username, email]);


const onRemove = useCallback((id) => {
	setUsers((users) => (
		users.filter(user => user.id !== id)
	))
}, []);

const onToggle = useCallback((id) => {
	setUsers	( (users) => (
		users.map(user =>
			user.id === id ? { ...user, active: !user.active } : user
		)
	))
}, []);
```
렌더링 최적화는 본인의 판단으로 설정할 영역이다. 현재 학습 중인 예제에서도 users에 대한 리렌더링을 막은 것이기에 username 및 email은 그대로 남아있는 것을 볼 수 있다. 실제 프로젝트에서는 React devTool을 활성화시켜 어떤 경우에 어떤 컴포넌트가 리렌더링 되어야하는지를 잘 고려하며 코드를 작성하자.

#### Reducer의 개념 및 useReducer Hook.
이번엔 useReducer라는 Hook을 살펴본다. useReducer Hook을 배우기 전에, Reducer란 개념을 우선 짚고 넘어가자. ***Reducer*** 는 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수이다. 일단 개념을 코드처럼 적어보자면 아래와 같다.
```javascript
function reducer(state, action){
	//무언가의 계산 후 nextState 생성
	return nextState;
}
```
살펴보자면 인자로 받는 state는 말 그대로 reducer가 계산을 하기 전의 prev_state이다. 함께 받은 action은 업데이트를 위한 정보이다. 전달받은 action을 기준으로 nextState를 반환해주는 것이 Reducer이다. action의 예시는 아래와 같다.
```javascript
{
	type : "INCREMENT"
}
{
	type : "DECREMENT"
}
{
	type : "CHANGE_INPUT",
	key : "email",
	value : "tester@react.com"
}
{
	type : "ADD_TODO",
	todo : {
		id : 1,
		text : 'Reduce'
	}
}
```
여기서 type이란 이름으로 action을 정의하는 점, type의 값은 대문자 및 언더바(_)로 표기하는 점 등은 전부 관습적인 부분으로 이런 관습은 보통 지키는 쪽이 코드를 알아보기 더 쉽다. 그 이외에 action 오브젝트 내의 다른 부분들은 원하는대로 정의해도 된다. 위와 같은 action 예시 중 INCREMENT, DECREMENT를 받아서 작업을 처리하는 Reducer는 아래와 같은 형대가 될 것이다.
```javascript
function reducer(state, action) {
	switch (action.type) {
		case "INCREMENT" :
			return state + 1;
		case "DECREMENT" :
			return state - 1;
		default :
			return state;
	}
}
```
위 Reducer를 사용하면 한 가지 State에 대한 여러 변화를 한 곳에 정의하기도 쉽고 별도의 js파일로 이를 관리하기도 쉬우며 읽기도 편하다. 물론 이게 useState의 상위호환이라는 뜻은 아니다. 한 State에 대해 여러 action이 존재할 경우 개발자의 관리가 더 용이하다는 이야기일 뿐. 이제 위 Reducer를 의미있게 사용하기 위해, Counter.js에서 useReducer Hook을 사용해보자.
```javascript
import React, {useReducer} from 'react';

function reducer(state, action) {
	switch (action.type) {
		case "INCREMENT" :
			return state + 1;
		case "DECREMENT" :
			return state - 1;
		default :
			return state;
	}
}

function Counter(){
	const [state, dispatcher] = useReducer(reducer, 0);

	const onIncrease = () => {
		dispatcher({ type : "INCREMENT"});
	}

	const onDecrease = () => {
		dispatcher({ type : "DECREMENT"});
	}

	return (
		<div>
			<b>{state}</b>
			<button onClick={onIncrease}>+</button>
			<button onClick={onDecrease}>-</button>
		</div>
	)
}

export default Counter;
```
이제 지금까지 구현했던 UserList 관리를 Reducer를 사용하도록 수정해보자. 우선 결과물은 아래와 같다.
```javascript
import React, {useRef, useMemo, useCallback, useReducer} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users){
	return users.filter(user => user.active).length;
}

const initialState = {
	inputs : {username : '', email : ''},
	users : [
		{
			id : 1,
			username : 'CROMESS',
			email : 'CROMESS@naver.com',
			active : true
		},
		{
			id : 2,
			username : 'MMMC',
			email : 'mmmC@naver.com',
			active : false
		},
		{
			id:3,
			username : 'MUUU',
			email : 'muuu@naver.com',
			active : false
		}
	]
}

function reducer (state, action){
	switch (action.type){
		case "CHANGE_INPUT" :
			return ({
				...state,
				inputs: {
					...state.inputs,
					[action.name] : action.value
				}
			})
		case "CREATE_USER" :
			return {
				inputs : initialState.inputs,
				users : state.users.concat(action.user)
			}
		case "REMOVE_USER" :
			return {
				inputs : state.inputs,
				users : state.users.filter(user => user.id !== action.id )
			}
		case "TOGGLE_USER" :
			return {
				inputs : state.inputs,
				users : state.users.map (
					user => user.id === action.id ? { ...user, active: !user.active } : user
				)
			}
		default :
			return state
	}
}

function App (){
	const [state, dispatcher] = useReducer(reducer, initialState);
	const nextId = useRef(4);

	const { users } = state;
	const {username, email} = state.inputs;

	const onChange = useCallback( (e) => {
		const {name, value} = e.target;

		dispatcher({
			type : "CHANGE_INPUT",
			name,
			value
		})
	}, []);

	const onCreate = useCallback (() => {
		const newUser = {
			id : nextId,
			username : username,
			email : email,
			active : false
		}
		dispatcher({
			type : "CREATE_USER",
			user : newUser
		});
		nextId.current += 1;
	}, [username, email]);


	const onRemove = useCallback((id) => {
		dispatcher({
			type : "REMOVE_USER",
			id
		});
	}, []);

	const onToggle = useCallback((id) => {
		dispatcher	({
			type : "TOGGLE_USER",
			id
		})
	}, []);
	//const count = countActiveUsers(users);
	const count = useMemo(() => countActiveUsers(users), [users]);
	return (
		<>
			<CreateUser
				username={username}
				email={email}
				onChange={onChange}
				onCreate={onCreate}/>
			<UserList users={users} onRemove={onRemove} onToggle={onToggle} />
			<div>활성사용자 수 : {count}</div>
		</>
	)
}

export default App;
```
Reducer를 사용하는 방법에 대해서는 예제만 봐도 대충 알 수 있을 것이다. 코드 관리에 대해서 짚어보자.
+ 최초 state는 별도의 변수로 관리한다. 초기화 시 이를 참조하여 덮어씌운다.
+ return으로는 가급적 무명 메서드를 통한 연산 결과보다는 오브젝트를 넘긴다.... 라는건 여기서 한정된 이야기일까. 우선 그렇다고 하자.
+ 위와 같이 Object 단위로 return을 주기 위해. spread 문법을 적극 활용한다.
+ 바뀐 메서드들, 구체적으로 dispatcher를 통해 action을 넘겨주도록 바뀐 메서드들도 useCallback을 통한 관리가 가능하다. 다만 어떤 때에 useCallback이 유의미한지는 직접 Dev Tool을 통해 파악해보자.
