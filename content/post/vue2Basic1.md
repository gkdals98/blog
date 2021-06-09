---
title: Vue - 1. 시작하기 및 첫 컴포넌트
tags: ['Frontend', 'Vue']
published: '2021-05-12'
hidden: 'false'
---
## Vue
블로그를 만든 김에 기존에 사용하던 vue에 대해서도 주요 기능들을 정리해보고자 한다. 이번 포스트에선 프로젝트 초기 설정 및 vue.config.js 등을 다룰 것이다.


그 다음 순서로 Vue 3.0의 새 기능들을 다루기 전에, 우선 익숙한 Vue 2.0 컴포넌트의 기능들을 정리하려 한다. 물론 Vue 3.0이 나오며 함께 등장한 Composition API 문법이 기존의 vue 컴포넌트와 매우 달라 Vue2.0의 컴포넌트 문법이 앞으로 얼마나 유효한 지식이 될지는 모를 일이긴하다. 하지만 vue 2.0의 컴포넌트 형태 또한 계속해서 지원한다고 하니, Composition API가 기존 vue component를 완전 대체할지는 지켜볼 일이다.


 잡설은 이 즈음 하고 정리를 시작해보자.

#### vue 프로젝트의 생성
vue 프로젝트를 생성하는데엔 대표적으로 내가 익숙한 vue cli를 통한 생성방법이 있고, 3.0 언저리 즈음 해서 나온 vite를 사용하는 방법이 있다.
+ 우선 과거에는 vue cli를 이용해 아래의 순서로 프로젝트를 생성했다.

1. global에 vue cli 설치 (한 번만 설치하면 됨)
```
C:\Users\~>npm install -g @vue/cli-service-global

C:\Users\~>npm install -g @vue/cli-init
```
2. 설치된 vue cli 툴로 프로젝트 생성
```
vue create <프로젝트 명>
```
+ 허나 요즘은 vite라는 툴을 사용하며 이렇게 시작한다고 한다.
```
yarn create vite-app <프로젝트 명>
```
vite에 대한 깊은 학습은 필요해졌을 때 하자. (https://github.com/vitejs/vite) 우선은 기존대로 vue-cli를 통해 프로젝트를 진행한다. default 옵션과 manually select features로 나뉘는데 나중엔 vuex, vue-router, typescript, 유닛 테스트 등도 함께 초기화하기 위해 후자가 권장되지만 이번엔 기초를 짚고 넘어가는 것이기에 default로 프로젝트를 생성한다. 이제부턴 다른 프레임 워크 경험은 있으나 vue는 처음인 사람이 읽는 포스트라는 생각으로 포스트를 작성하려 한다.

#### vue 프로잭트 구성요소의 간략한 설명
시작해보면 src와 public, 두 개의 디렉터리가 있다. 이 중 public 디렉터리는 webpack의 처리를 받지 않고 퍼블리싱되는 정적 리소스가 들어가있다. 생성 직후의 public에 들어가보면 브라우저 탭 아이콘인 favicon.ico와 함께 webpack 빌드의 엔트리 포인트인 index.html이 있다.
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
그리고 실제 vue 컴포넌트 작업 공간인 src의 main.js를 보면 아래 내용을 볼 수 있다.
```javascript
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```
아래의 new Vue로 시작하는 부분은 위 index.js의 app div에 App.vue의 컴포넌트를 마운트하겠다는 뜻이다. 즉, 코드는 App.vue로 부터 시작해서 작성하면 된다. 이렇게 생성된 프로젝트에 없는게 하나 있는데 ***vue.config.js*** 파일이다. vue 프로젝트의 자체적인 설정들을 지정하기 위한 파일인데, 이후 설명 중 가장 첫 번째로 사용하게 되는 단락에서 생성할 예정이다.

#### vue component의 구조
vue를 처음 시작하는 사람이라면 인터넷 가이드에 나오는 여러 vue 컴포넌트 정의법 때문에 혼란을 느끼곤 한다. 특히 기초를 다루는 문서에서는 아래와 같은 형태로 vue 컴포넌트를 만든다.
```javascript
var vm = new Vue({
	data: data
})
```
위 방법은 일반 js 파일 내에서 vue 컴포넌트를 정의하는 방법으로 사용 케이스에 따라서 충분히 실용적이지만 주로 테스트를 위해 사용되는 방법으로 webpakc환경에서 틀이 되는 컴포넌트를 작성하기에 적절한 방법은 아니다. 따라서 study 포스트에선 위 방법으로 컴포넌트를 작성하지 않을 예정이다. 구체적으론 아래와 같은 문법으로 컴포넌트 로직을 작성할 예정인데, 이는 .vue 파일의 script 부분만을 때온 것이다.
+ .vue 파일의 일부인 script 부분.
```javascript
<script>
export default {
	name: 'HelloWorld'
}
</script>
```
여기서 ***.vue*** 파일이란 무엇일까. ***.vue*** 파일은 한 파일에 css, script, template을 함께 관리하기 위한 vue 컴포넌트 작성 양식으로 default vue2.x 를 기준으로 가장 기본적인 vue 컴포넌트 작성법이다. 우리가 생성한 vue 프로젝트 내의 src/App.vue는 아래와 같으며 이는 vue2.x 문법 기반의 vue 컴포넌트 전반의 공통 형태이다.
+ ***App.vue***
```javascript
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```
이 .vue 파일의 script 부분을 작성하는 방법은 vue 2.x 문법 이외에도 대표적으로 typescript를 기반으로 작성되는 class형 컴포넌트, 새로 생긴 composition 컴포넌트 등이 있으나, 이는 우선 vue2.x 문법을 다룬 다음에 다뤄보려한다. vue2.x 파일 내용이 위에서부터 template, script, style의 세 구획으로 나뉜 것을 볼 수 있다. 하나씩 간략하게 설명해보자.

#### template
```html
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>
```

`<template></template>` 태그로 감싸지는 영역으로 이곳에 일반 html 작성에서와 마찬가지로, 해당 컴포넌트가 어떤 구조로 되어있는지를 정의한다. 이 때, ***template 내의 html 정의는 반드시 가장 큰 하나의 태그로 감싸져 있어야한다.***

#### # script
```javascript
<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>
```
`<script></script>` 태그로 감싸지는 영역으로 해당 vue 컴포넌트의 동작을 정의한다. export default 부분은 기타 webpack 프로젝트에서 보아온대로, 최종 생성된 결과물을 파일 밖으로 export하는 부분으로 script 내에서 최종 정의된 component를 밖으로 내보낸다. 컴포넌트 안의 속성들은 다음 포스트에서 순차적으로 살펴볼 예정이다. 추가로 import 부분은 다른 파일에서 export한 vue 컴포넌트 내지는 기타 요소들을 받아오는 부분이다.

#### style
`<style></style>` 태그로 감싸지는 영역으로 해당 컴포넌트에 적용될 css 스타일을 정의하는 부분이다. 여기서, class 단위의 스타일을 지정할 경우 하위 컴포넌트에게도 스타일이 영향을 끼칠 수가 있다. 이것을 막기위해 App.vue를 제외한 직접 작성하는 컴포넌트들의 style 태그엔 <style scoped> 와 같이 ***scoped를 붙여*** 적용 범위를 해당 컴포넌트로 한정해야한다. 아래는 초기 생성 시 함께 있는 HelloWorld.vue에 정의된 style로 style 태그에 scoped라고 작성된 것을 볼 수 있다.
```html
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```

또 scss 모듈을 설치하였다면 style 태그에 아래와 같이 lang을 적어주어야한다.
```html
<style scoped lang="scss">
</style>
```
node-sass 및 sass-loader 설치한 후에 위와 같이 작성하면 버전 불일치 문제 등으로 오류를 뱉어내는 경우가 많다. 아니 사실상 거의 무조건 에러를 뱉는다. 버전에 따라 다르겠지만 요즘은 주로 아래와 같이 생겼다. 
```
Syntax Error: TypeError: this.getoptions is not a function
```
당황하지 말고 호환되는 버전을 인터넷에서 열심히 찾아(...) 적용해주면 된다. 21년 5월 기준, vue환경에서 node 버전 15와 사용하도록 권장되는 조합은 아래와 같다.
```
"node-sass": "^5.0.0",
"sass-loader": "10.1.0",
```
이후 포스트는 scss 기준으로 작성된다.
