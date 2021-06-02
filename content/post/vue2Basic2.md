---
title: Vue - 2. 컴포넌트 기초 속성
tags: ['Frontend', 'Vue']
published: '2021-06-02'
hidden: 'true'
---
## Vue 2.x 컴포넌트의 기본 속성
이번엔 vue 2.x 컴포넌트의 기본 속성 및 가장 간단한 데이터 표현을 위한 몇 가지 속성을 다루어보려한다. 시작 전에, 생성된 project의 components/HelloWorld.vue 파일의 template 내용을 다 지우고 아래와 같이만 남기자.
```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>
```

#### # name
HelloWorld.vue의 script tag 안쪽은 아래와 같이 object 형태로 생겼다. 이 object 안에 컴포넌트의 동작과 관련된 정의를 한다.
```javascript
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
```
여기서 name 속성은 export한

#### # data, 가장 기본적인 data 리턴 속성

#### # double mustache, 가장 기본적인 data 표현 문법

#### # computed, data를 가공 후 보여주기 위한 리턴 속성

#### # methods,

#### this.el
https://medium.com/witinweb/vue-js-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-7780cdd97dd4
