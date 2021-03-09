---
title: Redux 기초 학습 1
tags: ['react', 'redux']
published: '2021-03-04'
---
## Redux 기초 학습 -1-
React의 상태관리 라이브러리 Redux에 대해 궁금점들을 짚어나가며 기초를 다진다.
#### Redux란?
Redux는 Global State를 관리하기 위한 라이브러리이다. 많은 UI들이 동시에 참조하고 있는 값이 있을 때, 이를 부모 컴포넌트에 정의하고 Porps를 타고 타고 자식들에게 전달하는 것은 비효율 적이다. 이렇게 다같이 참조해야하는 global한 값이 있을 때 Redux를 이용해 global state를 관리할 수 있다. Redux는 Faceboot이 고안한 Flux 패턴을 구현한 라이브러리이나, Flux와 달리 dispatcher가 존재하지 않으며 여러개의 store를 사용하지 않고 하나의 root에 하나의 store만을 가지고 있다. redux의 핵심 개념은 아래와 같다.

#### store
global state가 될 state, 무엇이 일어날지를 의미하는 action, 그리고 action에 따라 state를 수정하는 함수들인 reducer를 들고있는 어플리케이션 전체에 단 하나뿐인 객체이다.
```

```

#### Action Type

#### Action

#### Reducer


#### Redux, React Redux, Redux tool kit

#### Redux tool kit
https://velog.io/@velopert/using-redux-in-2021
위 포스트를 읽으며 작업해보자.

리덕스의 보일러 플레이트에는 액션 타입, 액션 생성 함수, 리듀서 이렇게 세 종류 코드가 들어가야하는데 toolkit은 이를 쉽게쉽게 만들어준다 한다. 포함하는 API 수도 많지 않아서 햇갈릴 일도 많이 없다. 아래 링크 참조.

#### 참고 link
https://stackoverflow.com/questions/38405571/what-are-differences-between-redux-react-redux-redux-thunk/38405713
https://medium.com/@jsh901220/react%EC%97%90-redux-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-a8e6efd745c9
https://redux-toolkit.js.org/introduction/getting-started
