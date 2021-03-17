---
title: React 기초 학습 5
tags: ['react', 'basic']
published: '2021-03-17'
---

## React의 기초 학습 -5-
velog의 포스팅을 보며 Study를 이어나가보자.
https://react.vlpt.us/basic/03-first-component.html

#### 커스텀 Hooks
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
