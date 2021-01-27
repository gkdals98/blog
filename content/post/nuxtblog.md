---
title: Making Nuxt Blog 1
tags: ['vue', 'nuxt']
published: '2020-11-11'
---


## Nuxt Blog 만들기 -1-
Nuxt를 이용해서 간단한 학습 결과 저장용 Blog를 만들고자 한다. 목표로 하는 기능은 아래와 같다.

+ Markdown 문서를 이용한 포스팅
+ 포스팅 문서관리는 심플하게 git에 commit하는 방식
+ **Tag**를 이용한 카테고리 분류
+ 특정 테그 선택 시 해당 테그의 Markdown 문서를 5개 단위로 확인할 수 있는 Pagination 기능 제공.

이에 아래 환경으로 프로젝트를 진행하려 한다.

+ SSR 프레임워크 - Nuxt
+ 코드 관리 - Github
+ 배포툴 - Vercel

이후부터는 Blog를 만들기위해 Nuxt를 학습한 내용이다.

#### 1. Node 모듈 설치
설치된 모듈의 용도를 적는다. 히스토리 기록 및 관리이슈도 겸한 단락으로 추가설치 있을 시 업데이트할 것. 프로젝트 초기화는 아래 명령어를 통해서 했다.
```
npx create-nuxt-app
```
이후 하기와 같은 모듈을 추가로 설치(yarn add)했다.

+ **@nuxt/content** : content 디렉터리를 path로 정적 리소스를 관리하기 쉽도록 도와준다.
+ **@nuxtjs/feed** : 아직은 잘 모르겠음. 일단 대기.
+ **node-sass** : node가 sass 스타일 시트를 해석할 수 있게 해줌.
+ **sass-loader** : sass 로더.

#### 2. Project Directory 구성
Nuxt 및 nuxt 모듈을 활용하기 위해 알아야하는 지정 directory를 정리한다.

+ **pages** : url로 사용되는 디렉토리. 각각의 페이지를 지정한다. pages 내의 객체들은 서버사이드 랜더링링이다.

+ **components** : 각 page에서 사용할 vue 컴포넌트들을 정의하는 디렉토리. nuxt config 상에 아래 옵션을 추가하면 components 디렉터리 하위의 component들이 자동으로 import 된다. SSR에 해당하지 않는다.
```
// Auto import components (https://go.nuxtjs.dev/config-components)
components: true,
```

+ **layouts** : 전체 페이지에서 사용할 레이아웃등을 정의하는 디렉토리. 정의한 레이아웃을 사용하려면 해당 레이아웃을 적용할 페이지의 component에 아래와 같이 정의하면 된다. SSR에 해당하지 않는다.
```
export default {
	layout: 'blog',
	layout (context) {
		return 'blog'
	},
}
```

+ **assets** : css, 추가적인 자바스크립트, 이미지, 폰트 등을 놓는 디렉토리.

+ **static** : 정적 리소스를 위한 디렉토리.

+ **store** : VUEX 컴포넌트를 위한 디렉토리. index.js 를 통해 클래식 vuex를 사용할 지, module 타입의 vuex를 사용할 지 선택할 수 있다.
