---
title: Starting Vue Project
tags: ['vue', 'basic']
published: '2021-01-04'
---

## Vue App 초기화하기
Window상에 Vue app을 초기화하는 과정을 정리한다. (2021년 1월 기준으로 해당 과정은 Vue 및 기타 도구들의 버전업에 따라 변경될 수 있음) Window상의 Directory에 yarn으로 관리되는 vue 앱을 만들고 편집툴은 Atom을 사용하는 학습용 환경이다. 가상머신 Linux 환경상에 node를 기반으로 작업환경을 구축하는 방법은 추후에 학습하도록 하자.

+ 요즘은 npx를 사용해 글로벌 의존성을 안만드는게 유행이지만 vue는 아직까지 global로 툴을 설치해주어야 한다.
```
C:\Users\~>npm install -g @vue/cli-service-global

C:\Users\~>npm install -g @vue/cli-init
```
+ 상기 설치가 완료되면 하기 명령어를 통해 project 생성이 가능하다.
```
vue create <프로젝트 명>
```
+ Multipage App을 만들 예정이라면  vue create로 프로젝트를 생성한 뒤 아래와 같은 vue.config.js 파일을 생성해 entry object를 만들어준다.
```
module.exports = {
    pages:{
        login:{
            entry: 'src/pages/login/indexlogin.js',
            template: 'public/login.html',
            filename: 'login.out.html'
        }
    }
}
```
