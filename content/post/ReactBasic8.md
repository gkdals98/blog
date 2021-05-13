---
title: React 기초 학습 8
tags: ['Frontend', 'React']
published: '2021-03-25'
---

## React의 기초 학습 - API 연동
velog의 포스팅을 보며 통신 예제를 살펴보자.
https://react.vlpt.us/integrate-api/01-basic.html

#### axois 호출
우선 새로운 프로젝트를 생성하고 axios 모듈을 아래와 같이 추가한다.
```javascript
yarn add axios
```
axois는 기본적으로 아래의 형태로 사용한다.
```javascript
import axios from 'axios';

axios.get('/location');

axios.post('/toComment', {
	username : "CROMESS",
	comment : "Hello"
})
```

#### Data 로딩
학습 중인 블로그 포스트에선 Redux를 사용하지 않을 때 기준, ***Data 로딩 타이밍 설정에는 useEffect*** 를, ***Data를 관리하는데에는 State*** 를 사용하는 것을 권장했다. 우선 아래 URL로 부터 Get Data를 받아보자.
+ https://jsonplaceholder.typicode.com/users
위 URL을 통해 json data를 받을 수 있다. 우선 아래의 코드를 수행해보자.
```javascript
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Users () {
	const [users, setUsers] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchUsers = async() => {
		try {
			//요청 시작 시 error, users를 초기화한 후 loading 상태를 true로 변경
			setError(null);
			setUsers(null);
			setLoading(true);

			const response = await axios.get(
				'https://jsonplaceholder.typicode.com/users'
			);
			setUsers(response.data);
		}catch (e) {
			setError (e);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	if(loading) return <div>로딩중..</div>;
	if(error) return <div>에러가 발생했습니다</div>;
	if(!users) return null;
	return (
		<>
			<ul>
				{users.map(user => (
					<li key={user.id}>
						{user.username} ({user.name})
					</li>
				))}
			</ul>
			<button onClick={fetchUsers}>Refresh</button>
		</>
	)
}

export default Users;
```
차차 몇 가지를 더 적용하며 수정하겠지만, 첫 코드에서 중요하다 생각되는 부분들은 아래와 같다.
1. 통신의 결과 및 상태에 따라 ***Error, Loading, 정상출력*** 로 페이지 상태를 나누고 이를 State를 통해 관리하는 점.
2. ***useEffect 내에선 async 메서드를 사용할 수 없기에*** 내부에 async 메서드를 정의해 호출하는 부분.
3. if조건으로 페이지 상태를 정의한 state가 null이 아니라면 그를 통해 랜더링을 달리 하는 부분.

#### useReducer를 이용한 구현
위의 코드를 UseReducer를 사용하도록 바꿔보면 아래와 같다.
```javascript
import React, {useEffect, useState, useReducer} from 'react';
import axios from 'axios';

function reducer (state, action) {
	switch (action.type) {
		case "LOADING" :
			return {
				users : null,
				loading : true,
				error : null
			}
		case "ERROR" :
			return {
				users : null,
				loading : false,
				error : action.error
			}
		case "SUCCESS" :
			return {
				users : action.users,
				loading : false,
				error : null
			}
		default :
			return state
	}
}

function Users () {
	const [state, dispatch] = useReducer(reducer, {
		users : null,
		loading : false,
		error : null
	})
	const {users, loading, error} = state;

	const fetchUsers = async() => {
		try {
			//요청 시작 시 error, users를 초기화한 후 loading 상태를 true로 변경
			dispatch({type:"LOADING"});

			const response = await axios.get(
				'https://jsonplaceholder.typicode.com/users'
			);
			dispatch({
				type : "SUCCESS",
				users : response.data
			});
		}catch (e) {
			dispatch({
				type : "ERROR",
				error : e
			});
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	if(loading) return <div>로딩중..</div>;
	if(error) return <div>에러가 발생했습니다</div>;
	if(!users) return null;
	return (
		<>
			<ul>
				{users.map(user => (
					<li key={user.id}>
						{user.username} ({user.name})
					</li>
				))}
			</ul>
			<button onClick={fetchUsers}>Refresh</button>
		</>
	)
}

export default Users;
```
전체 State를 하나로 묶고 Reducer를 사용하여 각 상태에 대한 Data 처리를 정의하였다.

#### 커스텀 Hook을 만들어 위 Reducer 사용부를 재사용하기
위 통신 과정을 하나의 Hook으로 관리하기 위해 아래와 같은 코드를 구현하였다는데...

+ ***useAsync.js***
```javascript
import {useReducer, useEffect} from 'react';

function reducer (state, action) {
	switch (action.type) {
		case "LOADING" :
			return {
				data : null,
				loading : true,
				error : null
			}
		case "ERROR" :
			return {
				data : null,
				loading : false,
				error : action.error
			}
		case "SUCCESS" :
			return {
				data : action.data,
				loading : false,
				error : null
			}
		default :
			return new Error(`Unhandled action type: ${action.type}`);
	}
}

function useAsync (callback, deps=[], skip=false) {
	const [state, dispatch] = useReducer(reducer, {
		data : null,
		loading : false,
		error : null
	})

	const fetchData = async() =>{
		dispatch({type:"LOADING"});
		try {
			const data = await callback();
			dispatch({
				type : "SUCCESS",
				data
			});
		}catch (e) {
			dispatch({
				type : "ERROR",
				error : e
			});
		}
	}

	useEffect((dispatch) => {
		if(skip) return;
		fetchData();
	}, deps);

	return [state, fetchData];
}

export default useAsync;
```
위와 같은 Hook을 써 구현한 Users의 코드는 아래와 같다.

+ ***Users.js***
```javascript
import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUsers() {
	const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
	)
	return response.data;
}

function Users () {
	const [state, refetch] = useAsync(getUsers, []);

	const {data : users, loading, error} = state;

	if(loading) return <div>로딩중..</div>;
	if(error) return <div>에러가 발생했습니다</div>;
	if(!users) return null;
	return (
		<>
			<ul>
				{users.map(user => (
					<li key={user.id}>
						{user.username} ({user.name})
					</li>
				))}
			</ul>
			<button onClick={refetch}>Refresh</button>
		</>
	)
}

export default Users;
```
꽤나 복잡한데, 중요해보이는 부분들을 메모해보자면 아래와 같다.
1. 커스텀 Hook 작성에 대해, useReducer처럼 참조 메서드와 deps 배열을 넘겨주면 state와 state 갱신을 위한 함수를 리턴하는 구조를 택했다. 방법적인 부분이지만 꽤 멋있는 것 같고 구조도 일관성있으니 커스텀 Hook을 작성할 때 비슷하게 흉내내보는 것도 나쁘지 않겠다.
2. useEffect가 Hook 안에서도 동작한다. useEffect 학습 시에 함수 컴포넌트의 랜더링 시에 동작한다고 적어놓았지만, 실제론 좀 더 다양한 케이스가 적용되는 모양이다.
3. Hook 적용 전에 없던 skip 인자는 랜더링 시에는 데이터를 로드하고 싶지 않은 경우에 true로 설정해 Data 로딩 여부를 설정할 수 있도록 한 부분이다. useEffect에서 마운트 시에 skip이 true라면 fetch 없이 return을 하도록 구현했다. 기법적인 부분으로 이해하면 될 거 같고 자주 쓸 거 같기도 하다.

상기 커스텀 Hook을 사용해 개별 유저를 부르는 코드를 작성해보자. 현재 테스트에 사용하고 있는 서버는 아래와 같이 요청하면 해당 id의 User를 반환한다.
+ https://jsonplaceholder.typicode.com/users/1
이를 호출하는 예제 구현을 위해 새로 User 컴포넌트를 만든다.

+ ***User.js***
```javascript
import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUser(id) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

function User ({id}) {
	const [state] = useAsync(() => getUser(id), [id]);
	const {loading, data: user, error} = state;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

	return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
	)
}

export default User;
```
우선 짚고 넘어갈 주의 사항은 ***getUsers 내의 URL을 감쌀 때 `(GRAVE)를 사용한 점이다.*** Grave로 처리된 String는 큰 따옴표, 작은 따옴표와 달리 ```${}```를 사용한 변수 참조 등이 가능하다. vue에서도 꽤 자주 썼던 것 같은데. 아무튼 위 User를 포함하는 Users의 코드는 아래와 같다.

+ ***Users.js***
```javascript
import React, {useState} from 'react';
import axios from 'axios';
import useAsync from './useAsync';
import User from './User';

async function getUsers() {
	const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
	)
	return response.data;
}

function Users () {
	const [userId, setUserId] = useState(null);
	const [state, refetch] = useAsync(getUsers, []);

	const {data : users, loading, error} = state;


	if(loading) return <div>로딩중..</div>;
	if(error) return <div>에러가 발생했습니다</div>;
	if(!users) return null;
	return (
		<>
			<ul>
				{users.map(user => (
					<li key={user.id} onClick={() => setUserId(user.id)}>
						{user.username} ({user.name})
					</li>
				))}
			</ul>
			<button onClick={refetch}>Refresh</button>
			{userId && <User id={userId}/>}
		</>
	)
}

export default Users;
```

#### react-async
react-async는 위에서 따라 만든 커스텀 Hook의 라이브러리 버전이다. 기능이 많이 내장되어있다고 한다. 아래와 같이 설치하면 되겠다.
```
yarn add react-async
```
사용법은 나중에 별도 포스트로 다룬다. 현재는 가급적 커스텀 Hook을 구현해 해당 동작을 처리하고자 한다.

#### ContextAPI의 적용
아래는 Velog의 예시 Code의 1단계이다. Velog Study의 2단계에서 getData를 수행하는 부분에서 비슷한 코드가 반복되는 점을 지적하며 이를 리펙토링한 코드를 다루지만 리펙토링 코드는 우선 학습만 하고 Study 기록은 하지 않고 넘어가자. 아래는 기본 코드에서 Context를 어떻게 구성하는지 예시이다.

+ ***UserContext***
```javascript
import React, {createContext, useReducer, useContext} from 'react';
import axios from 'axios';

export async function getUsers(dispatch) {
	dispatch ({type : 'GET_USERS'});
	try {
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/users'
		);
		dispatch({type: 'GET_USERS_SUCCESS', data : response.data});
	} catch (e) {
		dispatch({type: 'GET_USERS_ERROR', error : e});
	}
}

export async function getUser(dispatch, id) {
	dispatch ({type : 'GET_USER'});
	try {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/users/${id}`
		);
		dispatch({type: 'GET_USER_SUCCESS', data : response.data});
	} catch (e) {
		dispatch({type: 'GET_USER_ERROR', error : e});
	}
}
// UserContext에서 사용할 기본 상태
const initialState = {
	users : {
		loading : false,
		data : null,
		error : null
	},
	user : {
		loading : false,
		data : null,
		error : null
	}
};

//로딩 중 적용될 상태 객체
const loadingState = {
	loading : true,
	data : null,
	error : null
}

//성공했을 때의 data 적용 함수
const success = data => ({
	loading : false,
	data,
	error : null
});

//에러 시 적용될 상태 객체
const error = error => ({
	loading : false,
	data : null,
	error : error
})

function usersReducer (state, action) {
	switch (action.type) {
		case "GET_USERS":
			return {
				...state,
				users : loadingState
			}
		case "GET_USERS_SUCCESS" :
			return {
				...state,
				users : success(action.data)
			}
		case "GET_USERS_ERROR" :
			return {
				...state,
				users : error(action.error)
			}
		case "GET_USER" :
			return {
				...state,
				user : loadingState
			}
		case "GET_USER_SUCCESS" :
			return {
				...state,
				user : success(action.data)
			}
		case "GET_USER_ERROR" :
			return {
				...state,
				user : success(action.data)
			}
		default:
			return new Error(`Unhandled action type: ${action.type}`);
	}
}

//state 용 Context와 Dispatch Context의 분리
const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

//위의 두 Context의 Provider로 children을 감싸주는 컴포넌트
export function UsersProvider({children}){
	const [state, dispatch] = useReducer(usersReducer, initialState);
	return (
		<UsersStateContext.Provider value={state}>
			<UsersDispatchContext.Provider value={dispatch}>
				{children}
			</UsersDispatchContext.Provider>
		</UsersStateContext.Provider>
	)
}

//State를 쉽게 조회할 수 있게 해주는 커스텀 Hook
//useContext를 컴포넌트에서 직접 호출할 필요 없이 Hook을 통해 State 바로 조회
export function useUsersState(){
	const state = useContext(UsersStateContext);
	if(!state){
		throw new Error('Cant find UsersProvider');
	}
	return state;
}

//Dispatch를 쉽게 할 수 있게 해주는 커스텀 Hook
//위와 마찬가지
export function useUsersDispatch() {
	const dispatch = useContext(UsersDispatchContext);
	if(!dispatch){
		throw new Error('Cant find UsersProvider');
	}
	return dispatch;
}
```
1. 두 state를 하나로 묶어 관리하지만 두 State의 구조가 같고 data 속성의 이름이 같게 설계했기에 같은 loadingState, success, error Object를 공유할 수 있다.
2. 1번을 이용해 success 시, error 시 전달받은 데이터로 Object를 만드는 동작을 짧은 메서드로 정의할 수 있으며 Reducer에서는 해당 메서드를 사용해 코드를 간결하게 줄였다.
3. State와 Dispatch를 전달하기 위한 두 개의 Provider를 별도로 생성했으며 4번 항목을 위해 export 하지 않았다.
4. 3을 이용해 커스텀 Hook을 두 개 정의해 state 및 dispatch 함수를 쉽게 참조할 수 있도록 했다.

위 Context를 이용해 Users 컴포넌트의 데이터를 받아와보자. 우선 App.js에서 위 Context의 Porvider를 불러와 Users를 감싸준다.

+ ***App.js***
```javascript
import './App.css';
import Users from './Users';
import {UsersProvider} from './UsersContext';

function App() {
  return (
    <UsersProvider>
      <Users/>
    </UsersProvider>
  );
}

export default App;
```
이후 Users 컴포넌트에서는 Context에 정의된 커스텀 Hook을 들고와서 Provider 및 데이터 fetch 메서드를 참조하면 된다.

+ ***Users.js***
```javascript
import React, {useState} from 'react';
import {useUsersState, useUsersDispatch, getUsers} from './UsersContext';
import User from './User';

function Users () {
	const [userId, setUserId] = useState(null);
	const state = useUsersState();
	const dispatch = useUsersDispatch();

	const {data : users, loading, error} = state.users;

	const fetchData = () => {
		getUsers(dispatch);
	};


	if(loading) return <div>로딩중..</div>;
	if(error) return <div>에러가 발생했습니다</div>;
  if (!users) return <button onClick={fetchData}>불러오기</button>;

	return (
		<>
			<ul>
				{users.map(user => (
					<li
						key={user.id}
						onClick={() => setUserId(user.id)}>
						{user.username} ({user.name})
					</li>
				))}
			</ul>
			<button onClick={fetchData}>Refresh</button>
			{userId && <User id={userId}/>}
		</>
	)
}

export default Users;
```
User 또한 비슷하다.

+ ***User.js***
```javascript
import React, {useEffect} from 'react';
import {useUsersState, useUsersDispatch, getUser} from './UsersContext';

function User ({id}) {
	const state = useUsersState();
	const dispatch = useUsersDispatch();

	useEffect(() => {
		getUser(dispatch, id);
	}, [dispatch, id])

	const {loading, data: user, error} = state.user;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

	return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
	)
}

export default User;
```
