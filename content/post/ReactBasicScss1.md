---
title: React 기초 학습 - SCSS 1
tags: ['Frontend', 'React']
published: '2021-03-26'
hidden: 'false'
---

## React의 기초 학습 React + SCSS -1-
velog의 포스팅을 보며 Study를 이어나가보자.
+ 참고 - https://react.vlpt.us/basic/03-first-component.html

React를 SCSS와 함께 사용하는 팁들이 있다. 그에 대해 학습해보자.
```
yarn add node-sass
```

#### 최초 예제 코드
우선 최초 예제의 코드는 블로그의 것을 그대로 가져온다. Button과 App, 그리고 그를 위한 각각의 scss파일을 아래와 같이 생성하자.
***Button.js***
```javascript
import React from 'react';
import './Button.scss';

function Button ({children}) {
	return (
		<button className="Button">{children}</button>
	)
}
export default Button;
```
***Button.scss***
```css
$blue : #228be6;

.Button {
	display : inline-flex;
	color : white;
	font-weight: bold;
	outline: none;
	border-radius: 4px;
	border: none;
	cursor: pointer;

	height: 2.25rem;
	padding-left: 1rem;
	padding-right: 1rem;
	font-size: 1rem;
	align-items: center;

	background: $blue;
	&:hover {
		background: lighten($blue, 10%);
	}

	&:active {
		background: darken($blue, 10%);
	}
}
```
***App.js***
```javascript
import React from 'react';
import Button from './Button';
import './App.scss'

function App() {
  return (
		<div className="App">
			<div className="buttons">
				<Button>BUTTON</Button>
			</div>
		</div>
  );
}

export default App;
```
***App.scss***
```css
.App {
  width: 512px;
	margin:0 auto;
	margin-top: 4rem;
	border: 1px solid black;
	padding: 1rem;
}
```

#### sub class 주기
아래와 같은 두 클래스의 중첩에 따른 SCSS 문법을 쓸 일이 자주 있다.
```css
.Button {
	&.small {
		font-size : 0.8rem;
		width : calc($buttonWidth * 0.8);
	}
}
```
이를 className에 적용할 때 아래와 같은 코딩적 기법을 이용할 수 있다.
```javascript
import React from 'react';
import './Button.scss';

function Button ({children, size}) {
	return (
		<button className={['Button', size].join(' ')}>{children}</button>
	)
}
export default Button;
```
혹은 아래의 npm 모듈을 설치해보자.
```
yarn add classnames
```
위 모듈을 사용하면 아래와 같이 적을 수도 있다.
```javascript
import React from 'react';
import classNames from 'classnames';
import './Button.scss'

function Button ({children, size}) {
	return <button className={classNames('Button', size)}>{children}</button>
}

Button.defaultProps = {
	size : 'medium'
}
export default Button
```

#### plus 선택자
CSS 선택자 기본 포스팅에서 다루겠지만 아래와 같은 + 선택자가 있다. scss에서 저렇게 작성하면 컴파일된 CSS는 ```.Button + .Button```가 된다.
```css
.Button {
	& + & {
		margin-left: 1rem;
	}
}
```

#### scss mixin
아래와 같은 mixin에 대한 이야기. 별도 scss 포스트에서 정리할 예정이지만 여기서도 한 번 적는다.
```css
$blue: #228be6;

@mixin button-color($color) {
	background : $color;
	&:hover {
		background : lighten($color, 10%);
	}
	&:active {
		background : darken($color, 10%);
	}
}

.Button {
	&.blue {
		@include button-color($blue);
	}
}
```
위 mixin을 발전시켜 outline class가 있을 시 outline만 있는 스타일을 적용하려면 아래와 같이 된다. 복잡한 scss를 작성하는 주춧돌같은 느낌이라서 함께 메모하였다.
```css
@mixin button-color($color) {
	background : $ color;
	&:hover {
		background : lighten($color, 10%);
	}
	&:active {
		background : darken($color, 10%);
	}
	&.outline {
		color : $color;
		background: none;
		border: 1px solid $color;
		&:hover {
			background: $color;
			color: white;
		}
	}
}
```

디테일한 css, scss의 문법 정리는 별도의 포스트에서 다시 한 번 할 예정이다.
