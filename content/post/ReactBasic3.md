---
title: React 기초 학습 3
tags: ['react', 'basic']
published: '2021-03-10'
---

## React의 기초 학습 -3-
velog의 포스팅을 보며 Study를 이어나가보자.
https://react.vlpt.us/basic/03-first-component.html

#### 배열 랜더링
vue에 v-for가 있다면 react에는 javascript의 map 함수를 사용하는 프로그래밍적 배열 랜더링이 존재한다. 아래와 같은 식이다.
```javascript
import React from 'react';

function Item({item}){
	const style = {
		display : 'flex',
		flexDirection : 'column',
		borderStyle : 'solid',
		margin : '0.5em',
		padding : '0.5em',
		width : '15em'
	}
	return (
		<div style={style}>
			<div>{item.name}</div>
			<div>{item.price}</div>
		</div>
	)
}

function SimpleChild (){
	const items = [
		{
			name : 'banana',
			price : '3$'
		},
		{
			name : 'apple',
			price : '1$'
		},
		{
			name : 'pitch',
			price : '2$'
		}
	];
	return (
		<div>
			{items.map((item, index) => (
				<Item item={item} key={index}/>
			))}
		</div>
	)
}

export default SimpleChild;
```

#### useRef를 이용한 컴포넌트 안의 변수 만들기
useRef또한 useState와 마찬가지로 .current의 초기 값을 setting할 수 있다.
```javascript
import React, {useRef} from 'react';

function App () {
	const number = useRef(4);
	const onIncrease = () => {
		number.current += 1;
	}
}
```
중요한 점은 useRef의 경우, 이 값의 갱신이 컴포넌트를 리랜더링하지 않는다는 점이다. 화면에 표시되지 않을 값이 화면을 갱신한다면 자원낭비이기에, 화면에 보이지 않으며 State처럼 동적으로 관리되는 값이 있다면 useRef를 사용하면 된다. 또한 State의 경우 Setter가 호출될 때 랜더링이 이루어진 후에야 변경된 State값이 조회되는데 useRef는 랜더링이 없어 변경과 동시에 변경된 값을 조회할 수 있다. 그렇다면 왜 일반 변수를 사용해서 이를 해결하지 않는가? 이는 함수 컴포넌트 내에 일반 변수를 선언하면 렌더링이 이루어질 때마다 값이 초기값으로 돌아가기 때문이다. useRef는 heap 영역에 저장되며 어플리케이션이 종료되거나 가비지 컬렉팅이 되기 전까지 같은 메모리 주소를 가지게 된다. 쉽게 말해 일반 변수와는 달리 같은 컴포넌트를 호출한 것이라면 값이 유지된다. 이를 이용해 관리해야할, 변경은 감지해야하나 화면은 갱신해선 안되는 값들은 주로 아래와 같다.
+ scroll 위치
+ setTimeout, setInterval을 통해 만들어진 id
+ 기타, 위 조건에 해당 안되지만 원래 용도인 외부 라이브러리를 사용하여 생성된 인스턴스

#### 랜더링 되는 배열의 CRUD
지금까지 배운 내용들을 활용해 랜더링 되는 배열의 CRUD 코드를 살펴보자. 우선 코드 전문이다. UserList부터 살펴보자.
***UserList.js***
```javascript
import React from 'react';

function User({user, onRemove, onToggle}){
	const style = {
		display : 'flex',
		flexDirection : 'row',
		padding : '0.5em',
		margin : '0.2em'
	}
	return (
		<div style = {style}>
			<div onClick={() => onToggle(user.id)}
				style = {
					{color : user.active ? 'red' : 'black'}
				}
			>
				{user.username}
			</div>
			<div>{user.email}</div>
			<button onClick={() => onRemove(user.id)}>삭제</button>
		</div>
	)
}

function UserList ({users, onRemove, onToggle}){
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
					onRemove={onRemove}
					onToggle={onToggle}
				/>
			))}
		</div>
	)
}

export default UserList;
```

UserList를 보면, props를 통해 users 이외에도 onRemove, onToggle을 받아온 것을 볼 수 있다. 여기만 봐도 대충 감이 오겠지만 이는 Callback 함수이다. 즉, 리엑트에서는 자식이 부모의 값을 수정할 때, 콜백 메서드를 통해 이를 수행한다. 따지고보면 vue에서도 event와 함께 값을 전달했으니 구현 방법은 어느정도 동일하다 볼 수 있겠다. 다만 리엑트가 코드에 좀 더 직접적으로 관여할 수 있다는 느낌이 들 뿐. 이제 Callback을 생각하며 마찬가지로 Callback을 통해 Create를 수행할 CreateUser 컴포넌트를 보자.

***CreateUser***
```javascript
import React from 'react';

function CreateUser({username, email, onChange, onCreate}){
	return (
		<>
			<input name="username" placeholder="이름" onChange={onChange} value={username}/>
			<input name="email" placeholder="이메일" onChange={onChange} value={email}/>
			<button onClick={onCreate}></button>
		</>
	)
}
export default CreateUser;
```
마찬가지로 Callback을 통해 onChange, onCreate를 수행해 부모인 App의 값을 바꾸는 형태이다. 값을 저장하는 부분은 부모 컴포넌트인 App에서 볼 예정이다. 이제 App.js를 보자.

***App.js***
```javascript
import React, {useRef, useState} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

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
	return (
		<>
			<CreateUser
				username={username}
				email={email}
				onChange={onChange}
				onCreate={onCreate}/>
			<UserList users={users} onRemove={onRemove} onToggle={onToggle} />
		</>
	)
}

export default App;
```
App.js는 현재 입력 중인 ID, email 및 배열을 들고있다. ***첫 번째로 짚고 넘어갈 부분*** 은 ***nextId*** 인데 nextId는 동적으로 변하는 값이지만 그 자체의 변화로 인해 컴포넌트를 갱신할 필요는 없는 값이다. 즉, useRef 항목에서 설명했던 조건에 부합하는 값이다.
***두 번째로 짚고 넘어가야할 부분*** 은 각각의 콜백 메서드에서 사용중인 메서드들이다. 해당 메서드들은 배열에서 제공하는 기본 메서드로 결과를 완전히 새로운 배열로 반환하기에 Setter를 통해 값을 Set해야 변화를 인지하는 React에선 꽤나 유용한 메서드 들이다.

각각 아래와 같다.

+ ***concat*** 은 기존 배열에 새 인자를 추가한 배열을 리턴해준다. onCreate에서 사용한 메서드로 배열의 끝에 User를 추가해주었다.
```javascript
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
```
+ ***filter*** 는 배열의 내장 함수로 배열의 구성 요소 중, 조건 함수를 만족하는 요소들만을 모아 새 배열을 만들어 리턴해준다. onRemove에서 사용하였으며 id가 일치하는 요소를 삭제한 배열을 리턴해주었다.
```javascript
const onRemove = (id) => {
	setUsers(
		users.filter(user => user.id !== id);
	)
}
```
+ 마찬가지로 ***map*** 또한 각각의 원소에 대해 ()의 값을 대입한 결과를 새 배열로 리턴해주는 메서드이다. 값이 변화한 배열을 Setter로 넘겨주는데 안성맞춤이다. 사족으로 햇갈리지 않게 적자면 지금 App.js에서 Toggle은 각각의 컴포넌트에 대해 동작하며 라디오버튼처럼 하나의 객체만 active 되는 구조가 아니다.
```javascript
const onToggle = (id) => {
	setUsers	(
		users.map(user =>
			user.id === id ? { ...user, active: !user.active } : user
		)
	)
}
```

#### 마운트, 언마운트, 업데이트의 수명주기 메서드.
useEffect를 사용하면 특정 컴포넌트가 화면상에 마운트/언마운트 될 때의 추가 동작을 관리할 수 있다. 구체적으로는 아래와 같은 구조를 가지고 있다. 다만, 두 번에 나눠서 단계적으로 살펴보려 한다. 위에 CRUD에서 사용한 UserList 컴포넌트 내의 User에 넣어보자.
```javascript
import React, {useEffect} from 'react';

function User({user, onRemove, onToggle}){
	useEffect(() => {
		console.log('useEffect 메서드 내에선 컴포넌트 마운트 시의 동작.')
		return () =>{
			console.log('Return되는 메서드는 컴포넌트 삭제 시 동작.')
		}
	}, []);

	return (
		<div>
			<b onClick={() => onToggle(user.id)}
				style = {
					{color : user.active ? 'red' : 'black'}
				}
			>
				{user.username}
			</b>
			<div>{user.email}</div>
			<button onClick={() => onRemove(user.id)}>삭제</button>
		</div>
	)
}
```
위에 console에 적은 대로, useEffect 메서드에 function과 배열을 넘겨주면 된다. 첫 번째 인자인 ***function*** 은 useEffect가 함수 컴포넌트가 마운트 될 때 수행시킬 function이다. useEffect에 넘겨준 funtion이 수행되며 컴포넌트가 언마운트될 때 해당 function의 return값에 넣어준 function이 실행된다. React에선 이 언마운트 주기에 수행되는 function을 cleanup 함수라고 부른다. 두 번째 인자인 배열은 생명주기 함수가 참조할 값이다. 이를 deps배열이라고 하며 useEffect 이외의 Hook들에서도 비슷한 용도로 많이 사용한다. 이하 deps 배열로 표기한다.  위 컴포넌트를 아래와 같이 바꾸면
```javascript
import React, {useEffect} from 'react';

function User({user, onRemove, onToggle}){
	useEffect(() => {
		console.log('useEffect 메서드 내에선 컴포넌트 마운트 시의 동작. 아래 유저가 마운트됨.')
		console.log(user)
		return () =>{
			console.log('Return되는 메서드는 컴포넌트 삭제 시 동작. 아래 유저가 언마운트됨.')
			console.log(user)
		}
	}, [user]);

	return (
		<div>
			<b onClick={() => onToggle(user.id)}
				style = {
					{color : user.active ? 'red' : 'black'}
				}
			>
				{user.username}
			</b>
			<div>{user.email}</div>
			<button onClick={() => onRemove(user.id)}>삭제</button>
		</div>
	)
}
```
이제는 참조 값으로 넣어준 user의 값이 변화했을 때에도 useEffect의 함수가 실행되는 것을 볼 수 있다. 구체적으로는 값이 변경되었을 때, unmount -> mount의 순서로 메서드가 한 번 더 수행된다. 만약 deps 배열을 비운체로 넘겨준다면 두 함수는 각각 컴포넌트 최초 마운트, 컴포넌트의 완전한 언마운트 시에만 수행된다.
