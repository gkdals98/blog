---
title: Nuxt Blog 만들기 1 - 시작하기
tags: ['Frontend', 'Nuxt']
published: '2020-11-11'
hidden: 'false'
---


## Nuxt Blog 만들기 1 - 시작하기
Nuxt는 Vue의 SSR 프레임워크이다. backend 서버와 api 통신을 하는 웹페이지 제작에도 유용하지만 vercel 등의 호스팅 서비스를 활용해 간단한 정적 페이지를 배포하는 데에도 제격이다. 이에 Nuxt를 이용해서 간단한 학습용 Blog를 만들며 배운 것들을 정리해보고자 한다. 목표로 하는 기능은 아래와 같다.

+ Markdown 문서를 이용한 포스팅 ( 포스트는 심플하게 github에 push하는 방식. )
+ 포스트 내의 Tag 를 이용해 메뉴 구현
+ 특정 테그 선택 시 해당 테그의 Markdown 문서를 5개 단위로 확인할 수 있는 Pagination 기능 제공.

또 아래 환경으로 프로젝트를 진행하려 한다.

+ SSR 프레임워크 - Nuxt
+ 코드 관리 - Github
+ 배포툴 - Vercel

이후부터는 Blog를 만들기위해 Nuxt를 학습한 내용이다. vercel은 가이드가 잘되어있으므로 vercel 이야기는 생략하자.

#### 1. 프로젝트 초기 설정
nuxt app을 생성하기 위해서는 create-nuxt-app 을 사용하면 된다. 공식 문서에는 현재 기준으로 npx를 사용해 project를 생성하는 것을 권장하고 있다. cmd를 열어 아래와 같이 입력해주자. 현재는 nuxt에만 집중할 것이기에 모든 설정은 default 값으로 가져가면 된다.
```
npx create-nuxt-app blog
```
추가로 나는 하기와 같은 모듈을 설치(yarn add)했다. content 모듈은 우리가 목표로 하는 markdown 문서를 이용한 포스팅에 굉장히 많은 도움을 주기에 이번 예제에선 필수이다. scss는 개인적으로 선호하기에 설치했다.
+ **@nuxt/content** : content 디렉터리를 path로 정적 리소스를 관리하기 쉽도록 도와준다.
+ **node-sass** : node가 sass 스타일 시트를 해석할 수 있게 해줌.
+ **sass-loader** : sass 로더.

기타 나는 사용하지 않았지만 상황에 따라 유용할지도 모르는 모듈은 아래와 같다. 이는 이번 포스트에선 생략하고 나중에 기회가 되면 다루자.

+ **@nuxtjs/feed** : 피드를 사용한다면 필요한 모듈이다. 뉴스 피드 개념 및 RSS(Rich Site Summary), ATOM 1.0, JSON 1.0 등에 대해 알아볼 것.

#### 2. Project Directory 구성 살피기
Nuxt는 framework인 만큼 고정 경로 몇 가지를 지정해 해당 디렉터리에 지정된 파일을 넣어주는 것 만으로도 관련 구성을 전부 알아서 준비해준다. 이를 활용하기 위해서는 Nuxt가 어떤 디렉터리에 무엇을 넣었을 때 이를 자동으로 읽고 동작을 처리하는 지를 알아야할 것이다.

+ **pages** : url의 경로로 사용되는 디렉토리. url 뒤에 입력하는 경로는 pages 디렉터리에 매칭된다. 자세한 내용은 다음 포스트에서 다시 다룬다.

+ **components** : 각 page에서 사용할 vue 컴포넌트들을 정의하는 디렉토리. nuxt config 상에 아래 옵션을 추가하면 components 디렉터리 하위의 component들이 자동으로 import 된다. 해당 객체들은 SSR에 해당하지 않는다. 즉 nuxt 서버측 데이터에 접근할 수 없다.
```javascript
export default {
	//중략 
	//Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,
}
```

+ **layouts** : 각 페이지에서 사용할 레이아웃을 정의하는 디렉토리. 설정에 따라 프로젝트 초기화 시에 없어 직접 만들어줘야할 수도 있다. 예제로 layouts 디렉터리 아래에 ```blog.vue``` 레이아웃을 아래와 같이 작성하자.

 + **blog.vue**
```html
<template>
	<div>
		<div>
			Blog Title
		</div>
		<Nuxt />
	</div>
</template>

<script>
export default {
}
</script>
```

여기서 Nuxt 태그가 해당 레이아웃을 사용하는 페이지가 들어갈 곳이다. 이 레이아웃을 적용할 페이지 컴포넌트에는 아래와 같이 layout 속성을 주면 된다. pages 디렉터리 밑에 index.js를 아래와 같이 수정하고 ***dev 서버가 기동 중이였다면 dev 서버를 재기동한 후*** localhost:3000으로 접속해보자. 적용된 레이아웃을 볼 수 있다.

+ **index.js**
```html
<template>
	<div>
		<div>
			여기에 제목
		</div>
		<div>
			여기에 컨텐츠
		</div>
	</div>
</template>

<script>
export default {
	layout: 'blog',
	layout (context) {
		return 'blog'
	},
}
</script>
```
참고로 layout 디렉터리의 컴포넌트들은 SSR에 해당하지 않는다. 즉 nuxt 서버측 데이터에 접근할 수 없다.


+ **assets** : css, 이미지, 폰트 등을 놓는 디렉토리. global로 적용될 css 테마는 이 디렉터리에 생성한 후 nuxt.config.js에서 css 옵션을 통해 읽어오는 것이 관리하기 편하다. 이 방법에 대해선 이 포스트의 아래쪽에서 다시 설명한다.

+ **static** : 정적 리소스를 위한 디렉토리. 대표적으로 적용될 favicon이 해당 디렉터리에 있다.

+ **store** : VUEX 컴포넌트를 위한 디렉토리. index.js 를 통해 클래식 vuex를 사용할 지, module 타입의 vuex를 사용할 지 선택할 수 있다. 블로그에선 vuex를 사용할 일이 아직 없기에 비워뒀다.

+ **utils** : 보조기능을 담당할 js 파일들을 넣을 디렉토리이다. nuxt의 규격이 아닌 관습적으로 만드는 디렉터리이다.

#### 5.  nuxt.config.js
순수 vue에 프로젝트 세팅을 위한 vue.config.js가 있듯, nuxt에는 nuxt.config.js가 있다. 해당 파일에서 export되는 object의 속성으로 nuxt 프로젝트의 설정들을 지정해주면 된다. 여기서 설정 가능한 값들은 아래 공식 문서에 자세하게 나와있다. 디테일한 내용은 최신 공식문서를 읽는게 가장 정확하다.

+ https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-alias

다만, 링크로 끝내기는 아쉬우니 내가 생각하기에 중요한 것 몇 가지만 간략히 짚고 넘어가려한다.

#### alias

alias는 특정 경로를 alias로 단축해 지정할 수 있는 설정이다. 공통으로 쓰는 style 디렉터리 등에 접근할 때 '../../../../style' 과 같은 코드가 반복되면 읽기도 힘들고 리펙토링 시 디렉터리 구조가 바뀌게 되면 수정사항 또한 많아진다. 아래와 같이 path 모듈로부터 resolve를 import 받아와 alias 속성을 정의해보자.

+ **nuxt.config.js**
```javascript
import { resolve } from 'path'
exrpot default {
	//중략
	alias : {
    	'images': resolve(__dirname, './assets/images'),
    	'style': resolve(__dirname, './assets/style'),
    	'data': resolve(__dirname, './assets/other/data')
	}
}
```
이제 nuxt component 파일에서 위 디렉터리의 자원에 아래와 같이 접근할 수 있다.
```html
<template>
  <img src="~images/main-bg.jpg"/>
</template>

<script>
import data from 'data/test.json'

// etc.
</script>

<style>
@import '~style/variables.scss';
@import '~style/utils.scss';
@import '~style/base.scss';

body {
  background-image: url('~images/main-bg.jpg');
}
</style>
```

#### css
프로젝트 전체에 적용될 global css를 설정한다. 아래와 같이 배열 안에 경로를 설정해주면 해당 css 파일은 프로젝트 전체에 적용되게 된다. 아래와 같이 선언한 이후엔 해당 파일에 적용된 font, class등은 프로젝트 어디에서나 사용할 수 있다.
```javascript
export default {
	//중략
 	css: [
		'~/assets/css/globaltheme.scss',
		'~/assets/css/globalfonts.scss'
	]
}
```

#### header  
html head 테그 안에 적용되는 페이지 제목, 인코딩 등의 속성들을 여기서 정의할 수 있다. 아래와 같은 형태인데 보다 자세한 이야기는 공식 문서를 읽도록 하자.
```javascript
export default {
	head: {
    	title: "CHM's Blog",
    	meta: [
      		{ charset: 'utf-8' },
      		{ name: 'viewport', content: 'width=device-width, 			initial-scale=1' },
      		{
        		hid: 'description',
        		name: 'description',
        		content: process.env.npm_package_description || '',
      		},
    	],
    	link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  	},
}
```