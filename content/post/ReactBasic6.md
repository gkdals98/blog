---
title: React 기초 학습 6
tags: ['Frontend', 'React']
published: '2021-03-18'
---

## React의 기초 학습 -6-
velog의 포스팅을 보며 Study를 이어나가보자.
https://react.vlpt.us/basic/03-first-component.html

#### Immer
React에서의 불변성 유지란 state 등을 업데이트할 때, 기존의 객체를 수정해서는 안된다는 개념이다. 그래서 우리는 항상 Hook을 통한 업데이트를 할 때 기존 값을 덮어씌울 새로운 값을 넘겨주곤 했다. 다만, Object가 복잡해질 수록 이 과정은 어려워질 수 밖에 없다. 블로그 예시대로 아래와 같은 Object가 있다 쳐보자.
```javascript
const initialState = {
  posts: [
    {
      id: 1,
      title: '제목입니다.',
      body: '내용입니다.',
      comments: [
        {
          id: 1,
          text: '와 정말 잘 읽었습니다.'
        }
      ]
    },
    {
      id: 2,
      title: '제목입니다.',
      body: '내용입니다.',
      comments: [
        {
          id: 2,
          text: '또 다른 댓글 어쩌고 저쩌고'
        }
      ]
    }
  ],
  selectedId: 1
};
```
굳이 블로그에 있는 예시를 퍼오지 않아도 이걸 업데이트하기 위해선 set 메서드에 전달할 새 객체를 만들기 위해 엄청난 공수가 들어갈 것이 짐작된다. 이 때 아래의 모듈이 이를 쉽게 하도록 도와준다. 지금 당장 예제 프로젝트에 추가해보자.
```
yarn add immer
```
기본적인 예제는 아래와 같다. App.js의 아무 지점에나 이 함수를 import해다가 적어보면 바뀐 값을 볼 수 있다.

```javascript
import produce from 'immer';

function SimpleChild(){
	const state = {
		number : 1,
		dontChangeMe : 2
	}

	const nextState = produce ( state, draft => {
		draft.number += 1;
	});

	console.log(nextState);
}

export default SimpleChild;
```
얼핏 본 느낌으론 draft는 함께 넘겨주는 state를 딥카피하는 듯 하고, ```draft.수정하고싶은값 = newVal```을 해주면 최종적으로 바뀐 draft가 리턴되는 듯 하다. 즉, produce에 전달하는 화살표 함수 내에서 값 대입 뿐만 아니라 splice, push 등등 써서 draft를 원하는대로 지지고 볶으면 produce 함수는 최종 draft를 리턴하는 구조같다. 전적으로 추측이지만. 이렇게 받은 오브젝트를 상황에 맞는 방법으로 state에 Set해주면 끝. 아무튼 State에서 수정하고자 하는 값이 얕은 곳에 있으면 filter, map, concat을 쓰는 쪽이 더 좋은 코드지만 수정해야하는 값이 깊은 곳에 있을 수록 immer가 도움이 된다. 그런 이유로, 그리 복잡한 구조를 가지지 않는 블로그의 UserList는 지금 상태가 더 좋은 코드이지만 학습을 위해 App.js에 작성했던 Reducer에서 Immter를 적용해보자.
```javascript
import produce from 'immer';

function reducer (state, action){
	switch (action.type){
		case "CREATE_USER" :
			return produce (state, draft => {
				draft.users.push(action.user)
			})
		case "REMOVE_USER" :
			return produce (state, draft => {
				const index = draft.users.findIndex(user => user.id === action.id);
				draft.users.splice(index, 1)
			})
			{
				users : state.users.filter(user => user.id !== action.id )
			}
		case "TOGGLE_USER" :
			return produce( state, draft => {
				const user = draft.users.find(user => user.id === action.id);
				user.active = !user.active;
			})
		default :
			return state
	}
}
```
여기까지 반영된 코드 전문은 아래와 같다.

+ ***App.js***
```javascript
import React, {useMemo, useReducer} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import produce from 'immer';

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
			return produce (state, draft => {
				draft.users.push(action.user)
			})
		case "REMOVE_USER" :
			return produce (state, draft => {
				const index = draft.users.findIndex(user => user.id === action.id);
				draft.users.splice(index, 1)
			})
		case "TOGGLE_USER" :
			return produce( state, draft => {
				const user = draft.users.find(user => user.id === action.id);
				user.active = !user.active;
			})
		default :
			return state
	}
}
export const UserDispatch = React.createContext(null);

function App (){
	const [state, dispatcher] = useReducer(reducer, initialState);

	const { users } = state;

	//const count = countActiveUsers(users);
	const count = useMemo(() => countActiveUsers(users), [users]);
	return (
		<UserDispatch.Provider value={dispatcher}>
			<CreateUser/>
			<UserList users={users} />
			<div>활성사용자 수 : {count}</div>
		</UserDispatch.Provider>
	)
}

export default App;
```
+ ***UserList.js***
```javascript
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
+ ***CreateUser.js***
```javascript
import React, {useRef, useContext} from 'react';
import useInputs from './hooks/useInputs';
import { UserDispatch } from './App';

function CreateUser(){
	const [{username, email}, onChange, reset] = useInputs({username : '', email : ''});

	const dispatcher = useContext(UserDispatch);
	const nextId = useRef(4);

	return (
		<>
			<input name="username" placeholder="이름" onChange={onChange} value={username}/>
			<input name="email" placeholder="이메일" onChange={onChange} value={email}/>
			<button onClick={() => {
				dispatcher({
					type : "CREATE_USER",
					user : {
						id : nextId.current,
						username : username,
						email : email,
						active : false
					}
				});
				reset();
    		nextId.current += 1;
			}}>생성</button>
		</>
	)
}
export default React.memo( CreateUser );
```
추가적으로, immer는 아래와 같은 식으로 사용할 수도 있다.
```javascript
const updater = producer (draft => {
		draft.done = !draft.done;
})

const nextTodo = updater(todo);
```
즉, immer에 state 없이 draft만 넣어주면 특정 값을 바꾸기 위한 updater 함수를 생성할 수 있다. 경우에 따라서 잘 사용해보자.
