---
title: React 기초 학습 1
tags: ['react', 'basic']
published: '2021-03-04'
---

## React의 기초 학습 -1-
Vue와 React가 생각보다 많이 달라 React를 기초부터 차근차근 배워야할 것 같다. 공식 문서와 함께 velog에서 잘 정리된 튜토리얼을 학습하려한다. 튜토리얼 프로젝트를 진행한 후의 목표는 간단한 게임 제작이다. 이하는 아래 Study log에서 사용하려하는 포스트의 주소이다. Study의 복기가 아닌 정확하고 친절한 정보가 필요하다면 아래의 링크를 참조하면 된다.
https://react.vlpt.us/basic/03-first-component.html

#### 프로젝트 생성
시작하기 위해 우선 별도 환경 없는 튜토리얼 프로젝트를 만들려고 한다. 공식자료를 따라 아래와 같이 프로젝트를 생성해보자.
```
npx create-react-app tutorial
```
동시에 심화 학습으로 만들 게임을 위한 프로젝트는 별도로 아래와 같이 생성한다. 이는 redux storage와 typescript 환경을 포함한다.
```
npx create-react-app reactrogue --template redux-typescript
```
tutorial도, 심화 학습용 프로젝트도 스타일링은 우선 sass를 사용하기로 한다. steyled-component라는걸 알아보고싶었지만 이는 추후에 학습한다. 두 프로젝트 모두 아래와 같이 sass 관련 종속성을 넣어주자.
```
yarn add node-sass sass-loader
```
마지막으로, 심화 프로젝트에 미리 추가해놓을 라이브러리이다. redux에서 공식적으로 toolkit 라이브러리를 만들었다는데 상당히 유용하다고 한다. 당장은 다룰 줄 모르지만 미리 환경을 갖출 겸 심화 프로젝트에는 아래의 의존성도 추가한다. 초기에는 일반 redux를 사용하다가 중간부터 업그레이드 해보자.
```
yarn add @reduxjs/toolkit
```
추가적인 Redux관련 Study 내용은 별도의 Redux 포스팅에서 자세히 다룬다. 이후 tutorial 프로젝트에서 학습을 진행하고 어느정도 학습을 마친 후에 심화 프로젝트로 넘어가도록 하자.

최종적으로 package.json에 정의된 스크립트는 아래와 같다.
```
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

아래와 같이 dev server를 기동하면 된다.
```
yarn run start
```

#### Component
컴포넌트를 작성하기 위해서는, 우선 React를 import 해와야한다. React에선 기본적으로 두 가지 형식으로 Component를 작성할 수 있는데 우선 함수형 Component에 대해 알아보자. 아래와 같이 작성되는 것이 함수형 컴포넌트이다.
```javascript
import React from 'react';

function First() {
	return <div>First</div>
}

export default First;
```
여기서 function 내의 return에 정의된 내용이 jsx 형식으로 정의된 html 컴포넌트이다. 마지막에 적히는 export default는 다른 jsx에서 해당 컴포넌트를 import할 수 있도록 도와준다. 사용은 아래와 같다.

```javascript
import React from 'react';
import First from './First';

function App(){
	return (
		<div>
			<First />
		</div>
	);
}

```
기타 css및 svg, js util파일 등을 import하는 방식과 같다.

#### Fragment
React 컴포넌트 내의 JSX 부분은 기본적으로 하나의 커다란 Tag로 감싸져있어야 한다. 이 때, div등을 사용할 경우, css의 import 과정에서 특정 스타일이 함께 적용되거나 스타일 적용 시 생각할 문제가 많아지는 일 등이 발생할 수 있다. 이에 JSX에선 Fragment라는 빈 태그를 지원한다. 아래와 같은 식이다.
```javascript
import React from 'react';

function Test() {
	return (
		<>
			<div>1번 div</div>
			<div>2번 div</div>
		</>
	)
}

export default Test;
```
컴파일된 결과물를 보면 내부의 컴포넌트들이 별도의 엘리멘트에 둘러싸이지 않은채로 해당 위치에 작성되는 것을 볼 수 있다. 무조건 적으로 권장되는 방법이라기보다는 적절히 사용하면 유용한 기능이라 할 수 있다.

#### 변수 참조
JSX 내부에서 변수를 참조하기 위해서는 {}로 감싼 부분 안에 변수 명을 적어주면 된다.
```javascript
import React from 'react';

function Test () {
	const text = 'test';
	return (
		<>
			<div>{text}</div>
		</>
	);
}

export default Test;
```

#### Style
인라인 스타일을 적용할 수 있다. vue 쓰던 입장에선 별도의 sass import보다는 이쪽이 더 편할 수도 있겠다. 써봐야 알겠지만...
```javascript
import React from 'react';

function App(){
	const style = {
		backgroundColor: 'black',
		color: '#59C2FF',
		fontSize: 24, //기본 단위는 px이다.
		padding: '1em' //다른 단위 사용 시 문자열로 설정해야한다.
	}
	return (
		<>
			<div style={style}>React</div>
		</>
	)
}

export default App;
```
또한 JSX에선 컴포넌트의 class를 지정하려 할 때, class가 아닌 className이란 속성을 정의해주어야 한다.
```javascript
import React from 'react';

function App(){
	return (
		<>
			<div className="inner-title"></div>
		</>
	)
}

export default App;
```

#### JSX 구문 내의 주석
JSX 내의 주석은 아래와 같이 중괄호를 통해 표현한다. 코딩 관련 처리는 대부분 중괄호를 통해 이루어질듯.
```javascript
import React from 'react';

function App() {
	return (
		<>
	{/*주석은 이렇게 처리*/}
	/*중괄호 없으면 보임.*/
		</>
		)
}
```
추가로 열리는 태그 내부에 `//` 형태의 주석을 사용할 수 있다. 해당 컴포넌트에 대한 주석을 달기 딱일 것 같다.
```javascript
import React from 'react';
import Test from './Test';

function App(){
	return (
		<>
			<Test
				//여기에 이렇게 주석을 달 수 있다.
			/>
		</>
	)
}
```

#### props
하위 컴포넌트에 상위 컴포넌트의 값을 전달하고자 할 때, props를 통해 값을 받아올 수 있다.
```javascript

```
