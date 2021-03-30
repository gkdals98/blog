---
title: React 기초 학습 - Redux 1
tags: ['react', 'basic']
published: '2021-03-30'
---
## Redux 기초 학습 -1-
React의 상태관리 라이브러리 Redux에 대해 공부해보자.
#### Redux란?
Redux는 Global State를 관리하기 위한 라이브러리이다. Facebook이 고안한 Flux 패턴의 구현체로 useContext Hook을 기반으로 작성되었다. 많은 UI들이 동시에 참조하고 있는 값이 있을 때, 이를 부모 컴포넌트에 정의하고 Porps를 타고 타고 자식들에게 전달하는 것은 비효율 적이다. 이렇게 다같이 참조해야하는 global한 값이 있을 때 Redux를 이용해 global state를 관리할 수 있다. Redux의 모체인 useContext 또한 같은 기능을 제공하지만
1. 적은 데이터를
2. 단순한 페이지에서  
3. 비교적 적은 빈도로 업데이트할 수록
별다른 종속성 없이 간결하게 작성 가능한 useContext가,
1. 복잡한 데이터를
2. 복잡한 페이지에서
3. 빈번하게 업데이트할 수록
구조가 복잡하지만 다양한 미들웨어(redux-saga, redux-thunk, redux-devtools)를 사용가능하고 디버깅 툴을 사용할 수 있는 Redux가 더 유리해진다. 물론 선택은 자유이다. 추가로 Redux는 vue나 anguler에서도 사용 가능하다. 아래와 같이 시작해보자.
```
> npx create-react-app redux-demo
> cd redux-demo
> yarn add redux
```

#### Redux의 핵심 키워드와 주의사항.
우선 Redux의 핵심 키워드들을 살펴보자.

1. ***Store*** : 어플리케이션에 단 하나뿐이며 Redux의 핵심인 global state를 관리하는 객체이다. 내부적으로 Reducer 및 몇 가지 내장 함수를 정의하곤 한다.

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

4. ***Reducer*** : state 와 action을 인자로 넘겨받고, 이를 참조해 state를 갱신하기 위한 객체를 만들어 return해준다. 이 때 주의할 점은 ***useContext가 default로 error를 리턴하는 것이 일반적이라면 Redux에선 변경하지 않은 state를 다시 넘겨주는 것이 일반적*** 이라는 점이다. 또한 ***reducer는 순수 함수여야한다.*** 순수 함수는 일반적으로 아래의 두 조건을 만족시키는 함수를 의미한다. 다만 Redux에선 
  * 동일한 Input에 대한 결과라면 반드시 동일한 Output이 반환되어야한다.
	* 함수의 수행 과정에서 return만을 전달하며 다른 출력이 있어서는 안된다.

5. ***dispatch*** : Store의 내장 함수로 action을 reducer에 전달해주는

7. ***subscribe***

#### Redux, React Redux, Redux tool kit

#### Redux tool kit
https://velog.io/@velopert/using-redux-in-2021
위 포스트를 읽으며 작업해보자.

리덕스의 보일러 플레이트에는 액션 타입, 액션 생성 함수, 리듀서 이렇게 세 종류 코드가 들어가야하는데 toolkit은 이를 쉽게쉽게 만들어준다 한다. 포함하는 API 수도 많지 않아서 햇갈릴 일도 많이 없다. 아래 링크 참조.

#### 참고 link
https://stackoverflow.com/questions/38405571/what-are-differences-between-redux-react-redux-redux-thunk/38405713
https://medium.com/@jsh901220/react%EC%97%90-redux-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-a8e6efd745c9
https://redux-toolkit.js.org/introduction/getting-started
