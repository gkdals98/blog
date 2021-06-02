---
title: React 기초 학습 5
tags: ['Frontend', 'React']
published: '2021-03-17'
hidden: 'false'
---

## React의 기초 학습 -5-
velog의 포스팅을 보며 Study를 이어나가보자.
+ 참고 - https://react.vlpt.us/basic/03-first-component.html

#### # 커스텀 Hooks
반복되는 로직을 쉽게 재사용하기 위해, Hook을 직접 정의하여 사용한다. 우선 설명 전에 Hooks를 관리하는 관습적 룰을 적어보자면 아래와 같다.
+ src 디렉터리 밑에 hooks 디렉터리를 만들어 파일을 관리한다.
+ 리엑트 제공의 Hooks와 마찬가지로 useInputs.js 와 같은 작명을 한다.
우선 앞에서 쭉 사용하던 App.js의 Inputs를 callback으로 바꾸어보자.
```javascript
import {useState, useCallback} from 'react';

function useInputs(initialForm) {
	const [form, setForm] = useState(initialForm);

	const onChange = useCallback ( e => {
			const {name, value} = e.target;
			setForm(form => {...form, [name] : value});

	}, []);

	const reset = useCallback(() => setForm(initialForm), [initialForm])
	return [form, onChange, reset];
}

export default useInputs;
```

이를 활용한 App.js의 코드는 아래와 같다.

```javascript
import React, {useRef, useMemo, useCallback, useReducer} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';

function countActiveUsers(users){
	console.log('메서드 수행');
	return users.filter(user => user.active).length;
}

const initialState = {
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
		case "CREATE_USER" :
			return {
				users : state.users.concat(action.user)
			}
		case "REMOVE_USER" :
			return {
				users : state.users.filter(user => user.id !== action.id )
			}
		case "TOGGLE_USER" :
			return {
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
	const [{username, email}, onChange, reset] = useInputs({username : '', email : ''});
	const nextId = useRef(4);

	const { users } = state;

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
		reset();
		nextId.current += 1;
	}, [username, email, reset ]);


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

여기서 문제로 위 커스텀 Hook을 useReducer를 사용하도록 바꿔보랬는데, 우선 내가 풀어본 답안은 아래와 같다.

```javascript
import {useReducer, useCallback} from 'react';

function reducer (state, action){
	switch (action.type) {
		case "USER_CHANGE" :
			return ({...state, [action.name] : action.value});
		case "RESET" :
			return ({...action.initialForm});
		default :
			return state;
	}
}

function useInputs(initialForm) {
	const [form, dispatcher] = useReducer(reducer, initialForm);

	const onChange = useCallback ( e => {
			const {name, value} = e.target;

			dispatcher ({
				type : "USER_CHANGE",
				name,
				value
			})

	}, []);

	const reset = useCallback(() => {
		dispatcher ({
			type : "RESET",
			initialForm
		})
	}, [initialForm]);
	return [form, onChange, reset];
}

export default useInputs;
```

RESET action에서 initialForm을 참조해서 넘겨주는건 문제가 있는 코드같지만 reset이면 초기 상태로 돌리는거니까 initialForm으로 되돌려주는게 좋다고 생각했는데... 아무튼 블로그 답안에는 RESET 액션에 대해 아래와 같이 Object의 keys 메서드와 함께 array의 reduce 함수를 활용해 문제를 해결하였다. 처음 보는 함수인데 기회가 되면 모던 자바스크립트관련 Study도 포스트로 정리해야할 것 같다. 일단은 알아만 두고 넘어가자.
```javascript
case 'RESET':
	return Object.keys(state).reduce((acc, current) => {
		acc[current] = '';
		return acc;
	}, {});
```

#### # ContextAPI
ContextAPI는 왜 필요한가. 위 예제에서 UserList는 onRemove, onToggle을 User에 전달해주지만 직접 사용하지는 않는다. 지금처럼 한 단계 거쳐가는 정도라면 문제없는 코드지만 여러 컴포넌트가 중첩되며 이 전달과정이 길어지면 길어질수록 코드의 관리가 힘들어지는 것은 당연하다. 이렇게 두 단계, 세 단계 컴포넌트를 거쳐 값이 전달되는 상황에서 컴포넌트를 거치지 않고 Grobal하게 참조할 수 있게 해주는게 ContextAPI이다. 나중에 Redux를 배우겠지만 상황에 따라서는 여전히 Redux보다도 유용한 방법이기도 하다. 우선 Context를 만드는 방법은 아래와 같다.

```javascript
const UserDispatch = React.createContext(null);
```
여기서 인자로 넘겨주는 null은 Context의 기본값으로 Conetext의 값을 따로 지정하지 않을 경우 사용되는 값이다. Context 안에는 Provider라는 컴포넌트가 들어있는데 이 컴포넌트를 통해 Context의 값을 지정할 수 있다.

```javascript
<UserDispatch.Provider value={dispatch}>...</UserDispatch.Provider>
```
이것만 가지고는 이해가 힘드니 우선 예제를 보며 따라해보자. 우선 Context를 내보내보자. 위치는 App.js의 App 컴포넌트 위쪽 이다. 보다시피 export 시키는 구문이기에 root에 작성해준다.

```javascript
export const UserDispatcher = React.createContext(null);
```

다음 App 컴포넌트 내의 return에서 아래와 같이 provider로 DOM을 감싸준다.
```javascript
//useReducer를 배울 때 작성했던 dispatcher를 받아오는 부분
const [state, dispatcher] = useReducer(reducer, initialState);
/*.....중략....*/

return (
	<UserDispatcher.Provider value={dispatcher}>
		<CreateUser
			username={username}
			email={email}
			onChange={onChange}
			onCreate={onCreate}/>
		<UserList users={users} onRemove={onRemove} onToggle={onToggle} />
		<div>활성사용자 수 : {count}</div>
	</UserDispatcher.Provider>
)
```
주석으로 적었듯, 여기서 value로 넣어준 dispatcher는 reducer를 배울 때 받아온 dispatch 함수이다. dispatcher를 Context로 전달하는 것으로, UserList를 타지 않고 User가 직접 action을 dispatch 하도록 코드를 수정하려 한다. 우선 App.js는 최종적으로 onToggle과 onRemove, 그리고 UserList에 이를 전달하던 props를 지워 아래와 같이 된다.
```javascript
import React, {useRef, useMemo, useCallback, useReducer} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';

function countActiveUsers(users){
	console.log('메서드 수행');
	return users.filter(user => user.active).length;
}

const initialState = {
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
		case "CREATE_USER" :
			return {
				users : state.users.concat(action.user)
			}
		case "REMOVE_USER" :
			return {
				users : state.users.filter(user => user.id !== action.id )
			}
		case "TOGGLE_USER" :
			return {
				users : state.users.map (
					user => user.id === action.id ? { ...user, active: !user.active } : user
				)
			}
		default :
			return state
	}
}

export const UserDispatch = React.createContext(null);

function App (){
	const [state, dispatcher] = useReducer(reducer, initialState);
	const [{username, email}, onChange, reset] = useInputs({username : '', email : ''});
	const nextId = useRef(4);

	const { users } = state;

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
		reset();
		nextId.current += 1;
	}, [username, email, reset ]);

	//const count = countActiveUsers(users);
	const count = useMemo(() => countActiveUsers(users), [users]);
	return (
		<UserDispatch.Provider value={dispatcher}>
			<CreateUser
				username={username}
				email={email}
				onChange={onChange}
				onCreate={onCreate}/>
			<UserList users={users} />
			<div>활성사용자 수 : {count}</div>
		</UserDispatch.Provider>
	)
}

export default App;
```

다음으로 UserList를 바꾸려한다. Context를 불러오려면 App.js에서 export한 UserDispatch를 import 하는 것 이외에도 useContext라는 Hook을 사용해야한다. UserList를 통해 그 방법을 구현해보자면 아래와 같다.

``` javascript
import React, {useEffect, useContext} from 'react';
import { UserDispatch } from './App';

function User({user}){
	useEffect(() => {
		console.log('useEffect 메서드 내에선 컴포넌트 마운트 시의 동작. 아래 유저가 마운트됨.')
		console.log(user)
		return () =>{
			console.log('Return되는 메서드는 컴포넌트 삭제 시 동작. 아래 유저가 언마운트됨.')
			console.log(user)
		}
	}, [user]);

	const dispatcher = useContext(UserDispatch);

	return (
		<div>
			<b onClick={() => {dispatcher({
					type : "TOGGLE_USER",
					id : user.id
				});}}
				style = {
					{color : user.active ? 'red' : 'black'}
				}
			>
				{user.username}
			</b>
			<div>{user.email}</div>
			<button onClick={() => {dispatcher({
					type : "REMOVE_USER",
					id : user.id
				});}}>삭제</button>
		</div>
	)
}

function UserList ({users}){
	const style = {
		display : 'flex',
		flexDirection : 'column',
		width : '15em'
	}
	return (
		<div style={style}>
			{users.map((user) => (
				<User
				 	user={user}
					key={user.id}
				/>
			))}
		</div>
	)
}

export default React.memo ( UserList );
```
useCpmtext를 통해 상위 컴포넌트에서 선언된 Context를 잘 사용하고 있는 것을 볼 수 있다.
