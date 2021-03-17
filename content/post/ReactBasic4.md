---
title: React 기초 학습 4
tags: ['react', 'basic']
published: '2021-03-16'
---

## React의 기초 학습 -4-
velog의 포스팅을 보며 Study를 이어나가보자.
https://react.vlpt.us/basic/03-first-component.html

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
이렇게 수정하면 더 이상 Input의 값 변화가 UserList를 렌더링하지 않게 된다. 하지만 User 중 하나라도 Toggle에 의해 수정이 되거나 추가되거나 삭제될 경우엔 여전히 UserList 전체와 CreateUser를 리렌더링하는 모습을 볼 수 있다. 이는 users 배열이 바뀔 때 마다 onCreate도, onToggle도, onRemove도 다시 만들어지기 때문이다. useCallback의 deps에 users를 넘겨주었기 때문으로 users의 값이 바뀌었다면 해당 메서드를 다시 생성하는 것은 동작상 당연하다.
