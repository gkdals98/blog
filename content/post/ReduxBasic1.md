---
title: React 기초 학습 - Redux 1
tags: ['Frontend', 'React']
published: '2021-03-30'
hidden: 'false'
---
## Redux 기초 학습 -1-
React의 상태관리 라이브러리 Redux에 대해 공부해보자.
#### Redux란?
Redux는 Global State를 관리하기 위한 라이브러리이다. Facebook이 고안한 Flux 패턴의 구현체로 useContext Hook을 기반으로 작성되었다. 많은 UI들이 동시에 참조하고 있는 값이 있을 때, 이를 부모 컴포넌트에 정의하고 Porps를 타고 타고 자식들에게 전달하는 것은 비효율 적이다. 이렇게 다같이 참조해야하는 global한 값이 있을 때 Redux를 이용해 global state를 관리할 수 있다. Redux의 모체인 useContext 또한 같은 기능을 제공하지만
1. 적은 데이터를
2. 단순한 페이지에서  
3. 비교적 적은 빈도로 업데이트할 수록
별다른 종속성 없이 간결하게 작성가능한 useContext가,
1. 복잡한 데이터를
2. 복잡한 페이지에서
3. 빈번하게 업데이트할 수록
구조가 복잡하지만 다양한 미들웨어(redux-saga, redux-thunk 등)를 사용해 코드 정리가 가능하고 디버깅 툴(Redux-devtools)을 사용할 수 있는 Redux가 유리해진다. 퍼포먼스적으론 업데이트가 굉장히 자주 일어나는 경우가 아니라면 큰 차이가 없다. 선택은 자유이다. 추가로 Redux는 vue나 anguler에서도 사용 가능하다. 우선은 react에서 사용하기 위해 아래와 같이 시작해보자.
```
> npx create-react-app redux-demo
> cd redux-demo
> yarn add redux
```

#### Redux의 핵심 키워드와 주의사항.
우선 Redux의 핵심 키워드들을 살펴보자.

1. ***Store*** : 어플리케이션에 단 하나뿐이며 Redux의 핵심인 global state를 관리하는 객체이다. Store에는 global state 이외에도 내부적으로 Reducer 및 몇 가지 내장 함수를 정의하곤 한다. useState 때와 마찬가지로 state는 읽기 전용이며 갱신할 때에는 절대 state를 직접 수정해선 안되고 새로운 객체로 state를 교채해 주어야한다. 이는 여러 이유가 있지만 특히 React의 변화 감지와 관련있다.

2. ***Action*** : Object 형태의 상태변화 지시용 객체로 보통 아래와 같은 형태를 취한다. 이를 reducer 메서드에 넘겨주면 reducer가 action을 기반으로 State를 교체한다. useReducer의 Action과 동일 개념이다.
```javascript
{
	type : "ADD_ITEM_TO_RECENTLY_VIEWED",
	data : {
		item_code : 279143
	}
}
```

3. ***Action Creator*** : action을 생성하기 위한 함수. data를 받아와 action을 return해주며 필수요소는 아니다.

4. ***Reducer*** : state 와 action을 인자로 넘겨받고, 이를 참조해 state를 갱신하기 위한 객체를 만들어 return해준다. 이 때 주의할 점은 ***useContext가 default로 error를 리턴하는 것이 일반적이라면 Redux에선 변경하지 않은 state를 다시 넘겨주는 것이 일반적*** 이라는 점이다. 또한 ***reducer는 순수 함수여야한다.*** 순수 함수는 일반적으로 아래의 두 조건을 만족시키는 함수를 의미한다. 다만 Redux에선 순수함수의 조건을 만족하는 State 변화만 있을 수는 없기에 미들웨어를 사용해 이를 처리한다. 리듀서가 작업을 처리하기 전에, 미들웨어가 랜덤값이나
  * 동일한 Input에 대한 결과라면 반드시 동일한 Output이 반환되어야한다.
	* 함수의 수행 과정에서 return만을 전달하며 다른 출력이 있어서는 안된다.

5. ***dispatch*** : Store의 내장 함수로 action을 reducer에 전달해주는 역할을 한다. 일반적으론 dispatch 과정에 미들웨어를 넣어 Reducer의 순수성을 해치는 동작들을 수행하는 듯.

7. ***subscribe*** : Store의 내장 함수로 브로드캐스터의 역할을 한다. subscriber에 함수 형태의 인자를 넘겨주면 action이 dicpatch되었을 때 subscribe가 전달받은 함수를 실행시켜준다. 일종의 옵져버 패턴인 셈이다.

#### Redux, React Redux의 차이
https://stackoverflow.com/questions/38405571/what-are-differences-between-redux-react-redux-redux-thunk/38405713


redux는 React만의 종속 라이브러리가 아니다. 그 사실을 생각해보면 yarn add redux와 yarn add react-redux의 차이에 대해 감이 온다. 위 링크에 따르면 redux는 바닐라 js에서도 사용가능한 redux이고 react-redux는 react 특화로 제공되는 추가적인 Hook들을 제공해 React에서 Redux를 사용할 수 있게 해준다고 한다. 일단 ***React 프로젝트라면 둘 다 add 하여 사용*** 해야 한다. 아래의 의존성을 추가하자.
```
yarn add react-redux
```

#### Redux 구현체의 관리
+ 참고 - https://react.vlpt.us/redux/04-make-modules.html


이번에도 Velog를 참조하며 정리해보자.

1. Redux 모듈 - 액션 타입, 액션 생성 함수, 리듀서를 포함하는 자바스크립트. 액션 생성 함수와 리듀서를 export하여 밖에서 ```reducer(stateChange())``` 의 형태로 사용할 수 있도록 구현한다. ***Store는 Redux 모듈 내에 정의되지 않는다.*** 종합적으로 아래와 같은 구조이다.
**counter.js**
```javascript
//action의 type string
const SET_DIFF = 'counter/SET_DIFF';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

//Container 컴포넌트에서 action dispatch 시 호출할 action 생성 함수
export const setDiff = diff => ({ type : SET_DIFF, diff });
export const increase = () => ({ type : INCREASE });
export const decrease = () => ({ type : DECREASE });

//store를 초기화할 때 사용할 initial state
const initialState = {
	number : 0,
	diff : 1
};

//reducer들을 합쳐 root reducer를 생성하기 위한 지협적 reducer
export default function counter (state = initialState, action) {
	switch (action.type) {
		case SET_DIFF :
			return {
				...state,
				diff : state.diff
			}
		case INCREASE :
			return {
				...state,
				number : state.number + state.diff
			}
		case DECREASE :
			return {
				...state,
				number : state.number - state.diff
			}
		default:
			return state;
	}
}
```

2. modules 디렉터리 - actions, reducers 디렉터리를 포함하는 redux 모듈들을 정의하는 디렉터리. 다만 action과 reducer를 별도 정의하는 것은 관리상에 혼란을 줄 수 있어 요즘(2021년 즈음)은 위 예시ㅘ 같이 reducer와 action을 하나의 js 파일에 정의하는 것을 권장한다.

3. 루트 리듀서 - 상기 Redux 모듈을 하나로 묶어 한 개의 Reducer로 만들어준다. redux로 부터 combineReducers를 import 받아온 뒤 전달인자로 합칠 리듀서들을 넘기면 된다. 넘긴 리듀서의 이름들은 그대로 store내의 각 리듀서로 관리되는 상태에 접근하기 위한 이름이 된다. 자세한 예시는 5에 있다. modules 내에 파일을 생성하며 이름은 index.js로 통일하는게 관례이다. 형태는 아래와 같다.
**index.js**
```javascript
import {combineReducers} from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers ({
	counter,
	todos
})

export default rootReducer;
```

4. 프레젠테이셔널 컴포넌트 -  store에 직접 접근하지 않고 필요한 값, 또는 함수를 props로 받아와 사용하는 컴포넌트. 범용 컴포넌트의 디렉터리. 프레젠테이셔널 컴포넌트는 redux와 직접 연관되지 않기에 components 디렉터리 내에 정의한다. 형태는 일반적인 props를 받고 Callback 메서드를 호출하는 컴포넌트와 대동소이하다.

5. Container 컴포넌트 - 현재 store의 상태 조회 및 action의 dispatch를 할 수 있는 컴포넌트를 의미한다. 아래의 두 Hook을 react-redux로 부터 import 받아온다.
  * useSelector - Redux Store의 상태를 조회할 수 있다. 아래와 같은 구조이다.
	```javascript
	import {useSelector} from 'react-reduc';

	function SimpleChild () {
		const {number, diff} = useSelector(store => ({
			number : state.counter.number,
			diff : state.counter.diff
		}))
	}
	```
	* useDispatch - 현재 store의 dispatch 메서드를 받아온다. 아래와 같이 사용한다.
	```javascript
	import {useSelector} from 'react-reduc';

	function SimpleChild () {
		const dispatch = useDispatch();

		const onIncrease = () => dispatch(increase());
	}
	```

6. Store 생성 - index 상에서 createStore를 redux로부터 import 받아온다. createStore에 Root reducer를 넘겨주면 해당 reducer를 바탕으로 store가 생성된다. 이후 react-redux로부터 Provider로 App을 감싸주는데 구체적으론 아래와 같다.
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

#### Redux 개발자도구
useContext와 Redux의 가장 중요한 차이점 중 하나로, redux 개발자 도구의 사용 가능 여부를 언급했었다. project에 아래의 의존성을 추가해준다.
```
yarn add redux-devtools-extension
```
이후 크롬 웹스토어에서 Redux DevTools를 설치하여 사용하도록 하자.

## Redux 미들웨어
#### 기초
redux 라이브러리에 기본 내장되어있는 Redux middleware는 Reducer의 순수성을 지켜주기 위한 도구이다. 대표적으론 위에서 언급한 ***redux-thunk, redux-saga*** 등이 있다. ***Reducer의 순수성을 해치는 작업***, 예를 들어 logging, 랜덤 값의 입력, 현재 시각 등을 미들웨어에서 처리하며 구체적으론 ***Redux의 Action dispatch가 일어날 때, action을 중간에서 가로채 중간 처리를 한다.*** middleware는 일반적으로 아래와 같은 템플릿으로 작성된다.
```javascript
const middleware = store => next => action => {
	// 작업 내역
}
```
위 템플릿을 하나하나 뜯어보자.
* ***store*** - Redux store의 인스턴스를 의미한다. dispatch, getState, subscribe 등을 포함한다.
* ***next*** - 액션을 다음 미들웨어에게 전달하는 함수. 미들웨어 내에서 next(action)을 호출해주어야한다. 호출하지 않는다면 action은 다음 미들웨어뿐만 아니라 reducer에게도 가지 않는다. 다만 권장되는지는 모르나 이를 활용하여 action을 처리하지 않는 방법도 있겠다.
* ***action*** - 현재 처리중인 action.

위 템플릿을 따라 작성된 velog의 예시 미들웨어는 아래와 같다.
```javascript
const myLogger = store => next => action => {
	console.log(action);
	const result = next(action); //재귀함수의 형태. 다음 middleware의 수행 결과를 받아온다. 재귀의 끝에는 dispatch가 있다.
	return result; //최종적으로 dispatch(action)의 결과물을 리턴
}

export default myLogger;
```
주석에 이미 적었지만 위 형태에서 주의깊게 봐야할 것은 아래와 같다.
1. next(action)을 통해 다음 미들웨어를 호출하며 더 이상 거칠 미들웨어가 없다면 reducer를 호출한다. 즉 재귀함수 구조이다.
2. 위 코드의 return은 result이다. dispatch에 가야할 action을 중간에 낚아채 처리하는 구조이기에 재귀 함수 끝, dispatch로 부터 받은 state를 넘겨넘겨 밖으로 빼주어야한다. 최종적으론 가장 앞에서 처리되는 미들웨어가 최종 반영되어야 할 state값을 result로 return해줄 것이다.

위 미들웨어를 redux 상에 적용하기 위해선 createStore에 applyMiddleware 를 통해 작성한 미들웨어를 넘겨주어야한다. 주체적인 방법은 아래와 같다.
**~/index.js**
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import myLogger from './middlewares/myLogger';

const store = createStore(rootReducer, applyMiddleware (myLogger) );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

예시코드로 Logger를 만들었지만 Redux엔 같은 기능을 하는 Logger 미들웨어가 존재한다. 아래와 같이 의존성을 추가해보자.
```
yarn add redux-Logger
```
추가했다면 import한 후 store를 생성하는 부분에 아래와 같이 예시로 만든 logger를 대체해주면 된다.
```javascript
import logger from 'redux-logger';

const store = createStore(rootReducer, applyMiddleware(logger));
```
이제부터는 그 중 대표적인 middleware들을 살펴본다.
