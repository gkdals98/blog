---
title: React 기초 학습 1
tags: ['Frontend', 'React']
published: '2021-03-04'
hidden: 'false'
---

## React의 기초 학습 -1-
Vue와 React가 생각보다 많이 달라 React를 기초부터 차근차근 배워야할 것 같다. 공식 문서와 함께 velog에서 잘 정리된 튜토리얼을 학습하려한다. 튜토리얼 프로젝트를 진행한 후의 목표는 간단한 게임 제작이다. 이하는 아래 Study log에서 사용하려하는 포스트의 주소이다. Study의 복기가 아닌 정확하고 친절한 정보가 필요하다면 아래의 링크를 참조하면 된다.

+ https://react.vlpt.us/basic/03-first-component.html

#### # 프로젝트 생성
시작하기 위해 우선 별도 환경 없는 튜토리얼 프로젝트를 만들려고 한다. 공식자료를 따라 create-react-app(이하 CRA)를 이용해 아래와 같이 프로젝트를 생성해보자.
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
여기서 eject란 CRA가 숨긴 config 파일들을 꺼내는 명령어라고 한다. 기본적인 config들은 CRA가 알아서 잘 해주니 아마 쓸 일은 거의 없을 것이다. 이제 아래 명령어로 dev server를 기동하면 된다.
```
yarn run start
```

#### # Component
컴포넌트를 작성하기 위해서는, 우선 React를 import 해와야한다. React에선 기본적으로 두 가지 형식으로 Component를 작성할 수 있는데 우선 함수 컴포넌트에 대해서만 기록해보자. 이는 현 트랜드상 함수 컴포넌트가 대세이기 때문이다. 다른 이유도 꽤 있지만 코딩 효울상(This의 사용 여부, 재사용성이 있는 상태와 관련된 Hook의 사용 등)의 이점이 가장 크다고 한다. 단, 클래스형은 나중에 React의 라이프사이클을 이해하고자 할 때 도움이 된다고 하니, 자세한 것은 ***클래스 컴포넌트의 라이프사이클*** 과 ***cdm과 useEffect의 차이*** 라는 키워드로 다시 다뤄보겠다. 아무튼 실제 사용할 것은 함수 컴포넌트로 아래와 같이 작성되는 것이 함수 컴포넌트이다.
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

#### # Fragment
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

#### # 변수 참조
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

#### # Style
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

#### # JSX 구문 내의 주석
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

export default App;
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

export default App;
```

#### # props
하위 컴포넌트에 상위 컴포넌트의 값을 전달하고자 할 때, props를 통해 값을 받아올 수 있다. 주의할 점은 동적인 값을 전달할 때는 useState 와 함께 React Hook을 사용해야 한다는 점이다. Redux를 사용하는게 더 권장되는 방법일지는 모르겠지만... 아무튼 props는 페이지 초기화 시 받아온 변하지 않는 값을 랜더링할 때 사용된다. 예를 들자면 로그인된 유저의 닉네임 등을 로드할 때이다. 그런 값들은 페이지가 새로 로드되지 않는 한 바뀔 일이 없다. 이럴 때 Hook을 사용하는 것은 자원낭비이다.

아무튼, 아래는 name이란 이름의 Props를 전달할 때의 문법이다.

+ ***App.js***
```javascript
import React from 'react';
import SimpleChild from './SimpleChild'

function App () {
	return (
		<>
			<SimpleChild name="React">
		</>
	)
}

export default App;
```

아래는 자식 컴포넌트인 SimpleChild가 name을 전달받기 위한 문법이다. 함수형 컴포넌트의 전달인자로 props를 주고, JSX 내에선 props로 부터 변수 명을 참조한다.

+ ***SimpleChild.js***
```javascript
import React from 'react';

function SimpleChild (props) {
	return (
		<>
			Hello {props.name}
		</>
	)
}

export default SimpleChilde;
```

props를 여러 개 전달하고자 할 때, 비구조화 할당 문법을 사용하면 위 코드를 조금 더 알기 쉽게 만들 수 있다. 아래는 그 예시이다.

+ ***App.js***
```javascript
import React from 'react';
import SimpleChild from 'SimpleChild';

function App(){
	return (
		<SimpleChild name="React" color="#59C2FF" />
	);
}

export default App;
```
위와 같이 여러개의 props가 존재할 경우, 비구조화 할당 문법을 사용하면 아래와 같이 받을 수 있다. vue 사용자로서 햇갈리면 안되는건 inline Style 사용할 때 들어간 중괄호 두 개는 더블 머스테시 태그가 아니라는 점. 바닐라 javascript 코딩에서 원래 inline 스타일 지정을 어떻게 했는지, 그리고 react가 JSX상에 코드를 넣을 때 어떻게 했는지를 떠올려보면 왜 저렇게 됐는지 대충 알 것이다.

+ ***SimpleChild***
```javascript
import React from 'react';

function SimpleChild ({color, name}){
	return <div style={{color}}>{name}</div>
}
export default SimpleChild;
```
당연하지만 JSX가 아닌 부분에서도 props를 이용할 수 있다.
```javascript
import React from 'react';

function SimpleChild (props){
    const weight = props.isHighlight ? "normal" : "bold";
    const size = props.isHighlight ? "23px" : "12px";

    const style = {
        fontWeight : weight,
        fontSize : size
    };
    return (
        <div className="highlightable" style={style}>
            Hello {props.name}
        </div>
    )
}

export default SimpleChild;
```
props에 default 값을 지정해줄 수도 있다. 아래와 같이 컴포넌트의 속성으로 defaultProps를 정의하면 된다. 해당 컴포넌트에 name을 전달하지 않으면 default 값이 출력된다.

+ ***SimpleChild***
```javascript
import React from 'react';

function SimpleChild({name}){
	return (
		<>
			{name}
		</>
	)
}
SimpleChild.defaultProps = {
	name : 'None'
}

export default SimpleChild;
```

#### # props.children을 이용한 Wrapper 컴포넌트 만들기
특정 Wrapper로 여러 종류의 컴포넌트를 감싸는 경우가 꽤 있다. 가령 같은 포멧 안에 어느 페이지에선 그래프가 들어가고 어느 페이지에선 테이블이 들어가는 등.... 이럴 때 재사용 가능한 Wrapper 컴포넌트를 정의해야하는데 Wrapper내에서 Child를 다루면 종속성이 생겨버린다. 이 때는 props.children을 이용하는 컴포넌트를 정의하면 Wrapper 컴포넌트를 정의하기 용이하다. props.children은 props로 부터 children component를 넘겨받겠다는 뜻 정도로 이해하면 좋다. 우선 아래와 같은 Child 컴포넌트를 정의하자.
```javascript
import React from 'react';

function SimpleChild(){
	return (
		<div>
			Child!
		</div>
	)
}

export default SimpleChild;
```
이를 부모 컴포넌트에서 아래와 같이 Wrapper라는 컴포넌트로 감싸려 한다면,
```javascript
import React from 'react';
import Wrapper from './Wrapper';
import SimpleChild from './SimpleChild';

function App(){
	return (
		<>
			<Wrapper>
				<SimpleChild/>
			</Wrapper>
		</>
	)
}
```
Wrapper는 자신이 감싸야할 Child 컴포넌트를 아래와 같이 받아오면 된다. 당연하지만 여기서 children은 예약어로 다른 변수명을 사용할 수 없다.
```javascript
import React from 'react';

function Wrapper ({children}){
	const style = {
		border : '2px solid black',
		padding : '16px',
	};

	return (
		<div style={style}>
			{children}
		</div>
	)
}
```

포스트가 길어져 이후는 2부에서 다룰 예정이다.
