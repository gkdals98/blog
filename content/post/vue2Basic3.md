---
title: Vue - 3. 컴포넌트간 통신
tags: ['Frontend', 'Vue']
published: '2021-07-13'
hidden: 'true'
---
## Vue 2.x 컴포넌트간 통신
이번엔 vue 2.x 컴포넌트간의 통신을 다루어보려 한다. 우선 project의 components/HelloWorld.vue 파일의 template 내용을 다 지우고 아래와 같이만 남기자.
**HelloWorld.vue**
```vue
<template>
  <div class="hello">
    {{msg}}
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data: function(){
    return {
        msg: 'Parent Data'
    }
  }
}
</script>
<style scoped>
</style>
```
다음으로 위 컴포넌트와 통신하기 위한 아래의 컴포넌트를 components 폴더 내에 만든다.
**ChildComponent.vue**
```vue
<template>
    <div>
        Child
    </div>
</template>
<script>
export default {
    name: 'ChildComponent',
}
</script>
<style scoped>
</style>
```

#### 부모-자식간의 통신
우선 부모, 자식 컴포넌트 간의 통신을 다루어 보려 한다. 부모-자식에서 자식 컴포넌트란 계층구조상에서 부모컴포넌트의 바로 아래에 있는 컴포넌트를 이야기한다. 이는 CSS에서 이야기하는 부모 자식과 동일한 개념이다. Vue에선 부모가 자식에게 Data를 주는 방법으로 props 라는 문법을 제공한다. 우선 HelloWorld.vue에 ChildComponent를 import해 넣어주자.
**HelloWorld**
```vue
<template>
  <div class="hello">
    {{msg}}
    <ChildComponent/>
  </div>
</template>
<script>
import ChildComponent from './ChildComponent';
export default {
  name: 'HelloWorld',
  components : [ChildComponent],
  data: function(){
    return {
        msg: 'Parent Data'
    }
  }
}
</script>
<style scoped>
</style>
```

#### 비 부모-자식간의 통신

+ reactivility in depth
+ https://ui.toast.com/weekly-pick/ko_20210112
+ https://v3.vuejs.org/guide/reactivity.html#what-is-reactivity


#### this.el
https://medium.com/witinweb/vue-js-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-7780cdd97dd4