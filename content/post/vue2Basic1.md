---
title: Vue - 시작하기
tags: ['Frontend', 'Vue']
published: '2021-05-12'
hidden: 'true'
---
## Vue 컴포넌트의 지원 기능들
블로그를 만든 김에 기존에 사용하던 vue에 대해서도 주요 기능들을 정리해보고자 한다. 이번 포스트에선 프로젝트 초기 설정 및 vue.config.js 등을 다룰 것이다.

그 다음 순서로 Vue 3.0의 새 기능들을 다루기 전에, 우선 익숙한 Vue 2.0 컴포넌트의 기능들을 정리하려 한다. 물론 Vue 3.0이 나오며 함께 등장한 Composition API 문법이 기존의 vue 컴포넌트와 매우 달라 Vue2.0의 컴포넌트 문법이 앞으로 얼마나 유효한 지식이 될지는 모를 일이긴하다. 하지만 vue 2.0의 컴포넌트 형태 또한 계속해서 지원한다고 하니, Composition API가 기존 vue component를 완전 대체할지는 지켜볼 일이다.

 잡설은 이 즈음 하고 정리를 시작해보자.

#### vue 프로젝트의 생성
vue에는 내가 익숙한 2.0의 생성방법이 있고, 3.0 언저리 즈음 해서 나온 새로운 프로젝트 생성 방법이 있다.
+ 우선 과거에는 아래의 순서로 프로젝트를 생성했다.
  1. global에 vue cli 설치 (한 번만 설치하면 됨)
```
C:\Users\~>npm install -g @vue/cli-service-global

C:\Users\~>npm install -g @vue/cli-init
```
  2. 설치된 vue cli 툴로 프로젝트 생성
```
vue create <프로젝트 명>
```
+ 허나 요즘은 이렇게 시작한다고 한다.
```
yarn create vite-app <프로젝트 명>
```
vite라는 새로운 빌드 툴을 데려왔다던데 그를 활용한 방법이다. 이에 대한 깊은 학습은 필요해졌을 때 하자. (https://github.com/vitejs/vite) 우선은 기존대로 vue-cli를 통해 프로젝트를 진행한다. default 옵션과 manually select features로 나뉘는데 나중엔 vuex, vue-router, typescript, 유닛 테스트 등도 함께 초기화하기 위해 후자가 권장되지만 이번엔 기초를 짚고 넘어가는 것이기에 default로 프로젝트를 생성한다.

#### vue 프로잭트 구성요소의 간략한 설명
시작해보면 src와 public, 두 개의 디렉터리가 있다.이 중 public에 들어가보면 webpack 빌드의 엔트리 포인트인 index.html이 있다.
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title>vue2basic</title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but vue2basic doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```
그리고 src의 main.js를 보면 아래와 같이 되어있다.
```javascript
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```
아래의 new Vue로 시작하는 부분은 위 index.js의 app div에 App.vue의 컴포넌트를 마운트하겠다는 뜻이다. 즉, 코드는 App.vue로 부터 시작해서 작성하면 된다. 단,

#### this.el
https://medium.com/witinweb/vue-js-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-7780cdd97dd4
