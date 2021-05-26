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
vue에는 내가 익숙한 2.0의 생성방법이 있고, 3.0 언저리 즈음 해서 나온 새로운 프로젝트 생성 방법이 있다. 우선 과거에는 이런 식으로 프로젝트를 생성했다.
1. global에 vue cli 설치
```
C:\Users\~>npm install -g @vue/cli-service-global

C:\Users\~>npm install -g @vue/cli-init
```
2. vue cli를 통한 프로젝트 생성
```
vue create <프로젝트 명>
```
요즘은 이렇게 시작한다고 한다.
```
yarn create vite-app <프로젝트 명>
```
vite라는 새로운 빌드 툴을 데려왔다는데. (https://github.com/vitejs/vite)

#### vue.config.js