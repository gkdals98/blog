---
title: React 기초 학습 - Redux 2
tags: ['Frontend', 'React']
published: '2021-04-15'
hidden: 'true'
---
## Redux 기초 학습 -2-
중요한 미들웨어 중 하나인 thunk를 Study 한다.
+ 참고 - https://react.vlpt.us/redux-middleware/04-redux-thunk.html
#### Redux-thunk
Redux-thunk는 비동기 작업을 처리하기 위한 미들웨어이다. 구체적으론 thunk는 ***액션 객체가 아닌 함수가 Dispatch 되었을 때 이를 실행하는 역할을 한다.*** 간단히 요약한 동작 원리는 아래와 같다.
```javascript
const thunk = store => next => action => {
	typeof action === 'function'
	? action(store.dispatch, store.getState)
	: next(action)
}
```
이를 어떤 식으로 쓰는가, 예시는 아래와 같다.
```javascript
const getComments = () => (dispatch, getState) => {
	//getState를 통한 현재 상태 조회의 예시
	const id = getState().post.activeId;

	// 요청이 시작되었음을 액션으로 알림.
	dispatch({type : 'GET_COMMENTS'});

	//댓글을 조회하기 위한 promise를 반환하는 getComments가 있다고 과정
	api
		.getComments(id)
		.then(comments => dispatch({ type : 'GET_COMMENTS_SUCCESS', id, comments}))
		.catch(e => dispatch ({type : 'GET_COMMENTS_ERROR', error : e}));
}
```

#### Redux tool kit
https://velog.io/@velopert/using-redux-in-2021
위 포스트를 읽으며 작업해보자.

리덕스의 보일러 플레이트에는 액션 타입, 액션 생성 함수, 리듀서 이렇게 세 종류 코드가 들어가야하는데 toolkit은 이를 쉽게쉽게 만들어준다 한다. 포함하는 API 수도 많지 않아서 햇갈릴 일도 많이 없다. 아래 링크 참조.

#### 참고 link
https://redux-toolkit.js.org/introduction/getting-started
