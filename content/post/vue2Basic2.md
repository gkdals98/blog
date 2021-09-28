---
title: Vue - 2. 컴포넌트, 컴포넌트 내부의 데이터
tags: ['Frontend', 'Vue']
published: '2021-07-08'
hidden: 'false'
---
## Vue 2.x 컴포넌트, 컴포넌트 내부의 데이터
이번엔 vue 2.x 컴포넌트의 기본 속성 및 가장 간단한 데이터 표현을 위한 몇 가지 속성을 다루어보려한다. 시작 전에, 생성된 project의 components/HelloWorld.vue 파일의 template 내용을 다 지우고 아래와 같이만 남기자. App.vue에 선언된 Logo.vue도 거슬린다면 지워도 무방하다.
**HelloWorld.vue - template**
```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>
```

#### name
HelloWorld.vue의 script tag 안쪽은 아래와 같이 object 형태로 생겼다. 이 object 안에 컴포넌트의 동작과 관련된 정의를 한다.
```javascript
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
```
여기서 name 속성은 export한 컴포넌트의 이름이 된다. 이렇게 export된 vue 컴포넌트를 다른 컴포넌트에서 import해 재사용할 수 있다. HelloWorld.vue가 있는 디렉터리 안에 SimpleChild.vue 파일을 만들어 아래의 내용을 입력해보자.
```vue
<template>
  <div>
    <button>Click!</button>
  </div>
</template>
<script>
export default {
  name: 'SimpleChild'
}
</script>
```

다음, HelloWorld.vue 파일을 아래와 같이 수정해, SimpleChild.vue를 import하고 사용해보자.
```vue
<template>
  <div>
    <h1>{{ msg }}</h1>
    <!--실제 컴포넌트를 렌더링할 위치-->
    <SimpleChild/>
  </div>
</template>
<script>
//파일로부터 컴포넌트 import
import SimpleChild from './SimpleChild';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    //components로 import 받아온 컴포넌트를 vue 컴포넌트에 전달.
    SimpleChild
  }
}
</script>
```
vue의 기본 중 하나는 컴포넌트들을 잘 정의해 재사용성을 높이는 것이다.

#### double mustache와 data 속성을 활용한 기본적 데이터표현
우선 HelloWorld.vue의 template을 살펴보자.
**HelloWorld.vue - template**
```vue
<template>
  <div>
    <h1>{{ msg }}</h1>
    <!--실제 컴포넌트를 렌더링할 위치-->
    <SimpleChild/>
  </div>
</template>
<script>
```
`{{msg}}` 라고 되어있는 부분을 볼 수 있을 것이다. 이것이 vue에서 가장 기본적인 data 표현 문법인 double mustache (mustache는 콧수염이란 뜻이다.)이다. script를 보면 다음 포스트에서 다룰 props 라는 속성에 msg가 선언되어있는 것을 볼 수 있는데, double mustache는 이 props의 msg 데이터를 표시하고 있는 중이다. App.vue를 다시 살펴보면 msg가 어디서 왔는지, props가 무엇인지 짐작할 수 있겠지만 우선은 현재 문단 목적에 맞게 data 속성과 v-model 디렉티브를 배워보려 한다. HelloWorld.vue를 아래와 같이 수정해보자. input의 값을 바꾸면 testmsg가 함께 바뀌는 것을 보면 대충 감이 올 것이다.
```vue
<template>
  <div>
    <div>{{testmsg}}</div>
    <!--v-model로 컴포넌트 데이터를 data와 매핑하는 부분-->
    <input v-model="testmsg"/>
    <SimpleChild/>
  </div>
</template>
<script>
import SimpleChild from './SimpleChild';
export default {
  name: 'HelloWorld',
  //컴포넌트의 data 속성 정의 방법
  data: function(){
    return {
      testmsg : ""
    }
  },
  components: {
    SimpleChild
  }
}
</script>
```
**data** 속성은 vue 컴포넌트가 data를 반응형으로 처리하기 위해 제공하는 가장 기초적인 속성이다. 컴포넌트에서 사용할 데이터를 정의하고, 데이터의 변화를 실시간으로 반영할 수 있다. 컴포넌트 내에서만 사용할 data는 대부분 data 속성이 return하는 object의 속성으로 정의하면 된다. 

여기서 공식문서를 따라가다보면 **function data 와 object data**의 문제를 발견하게 된다. vue 공식 문서의 초반부에는 data 속성 선언을 아래와 같이 object 형태로 하고 있다.
```javascript
new Vue({
  data : {
    message : "Hello"
  }
})
```
이는 공식 문서 예문처럼 `new Vue()`문법으로 선언한 임시 vue 컴포넌트에선 훌륭하게 동작한다. 이는 해당 vue 컴포넌트가 페이지상에 하나만 존재하는 전역 객체이기 때문이다. 반면 우리의 컴포넌트는 .vue로 선언된 vue 컴포넌트 파일에서 export default를 통해 파일 밖으로 나온다. 또 우리는 이렇게 export된 객체를 이곳 저곳에서 재사용 할 예정이다. 그리고 아마도 문제가 되는 것은 `export default`로 export된 객체는 싱글톤 오브젝트처럼 하나라는 점이다.

**오해가 없도록 부연 설명을 하자면** vue의 산출물은 vue 컴파일러를 거쳐 나온다. 따라서 이 설명이 정확하려면 vue 컴파일러도 export default를 하나의 오브젝트로 산출하는지에 관해 찾아야하는데 애석하게도 자료를 찾기가 힘들었다. 때문에 이 설명이 정확한 것은 아니다. (나중에 수정될 수도 있다.)

다만 적어도 data 속성에 한해서는 동일한 룰이 적용되는 것 같다. 때문에 컴포넌트 내 data를 object로 선언해버리면 같은 컴포넌트를 여러 곳에서 import해 사용할 때 모든 컴포넌트가 동일한 data object를 참조하게 된다. 그리고 이는 HelloWorld 내의 SimpleChild에서 data를 조작했는데 App에 있는 SimpleChild의 data가 함께 바뀌어 버리는 불상사를 일으킨다. 대부분의 경우 이는 절대 의도한 동작은 아닐 것이다. 

**따라서** 컴포넌트 파일로 정의된 vue 컴포넌트의 data 속성은 function이 object를 리턴하는 형태가 되어야한다. 이렇게 하면 컴포넌트는 생성될 때 data function으로부터 새로운 data object를 return받는다. 따라서 컴포넌트를 여러번 import해도 각각의 컴포넌트 객체는 자신의 data를 참조하게 된다.

또 이번 예제에서 data와 함께 보아야할 다른 부분은 v-model이다. **디렉티브**란, vue에서 사용되는 약속어들로 일반적으로 **v-** 로 시작하는 문법들을 가르킨다. **v-model**은 해당 컴포넌트의 value를 특정 data와 동기화 시키는 디렉티브로, 위와 같이 input에 v-model로 testmsg를 걸어주었다면 input의 값이 testmsg의 값과 연동된다. vue의 디렉티브들은 굉장히 간단하고 직관적이기에 잘 외워서 적절한 때 사용하면 된다. 다만 네 번째 포스트 즈음 해서 한 번 몰아서 요약을 할 생각이다.

#### computed를 활용한 data 가공
computed의 가장 기본적 용도는 data를 가공해서 보여주는 것이다. SimpleChild.vue를 열어 아래와 같이 수정해보자.
**SimpleChild.vue**
```vue
<template>
  <div>
    <div>{{message}}</div>
    <div>{{emphasizedMessage}}</div>
    <input v-model="message"/>
    <button>Click!</button>
  </div>
</template>
<script>
export default {
  name: 'SimpleChild',
  data : function(){
      return {
          message : "Text"
      }
  },
  //computed로 message 뒤에 !!!를 붙이는 가공처리를 구현
  computed: {
    emphasizedMessage: function () {
      return this.message + "!!!"
    }
  }
}
</script>
```
input을 수정하면 computed의 룰에 맞게 가공된 message가 emphasizedMessage를 통해 출력되는 것을 볼 수 있다. 가공 처리를 마친 data를 반응형으로 구현하기 위해선 computed의 속성으로 가공된 데이터를 return하는 함수를 정의해주면 된다.

단, computed의 용도는 여기서 끝이 아니다. computed의 최중요 사항 중 하나는 참조 중인 값이 vue의 반응형 데이터라면, 해당 값의 변화를 감지할 수 있다는 점이다. 이는 다른 컴포넌트의 data를 참조하는 컴포넌트간 통신에서 특히 유용하다. vue2.x까지는 배열의 내부 변화를 감지하지 못한다는 미묘한 단점(React에서 하듯 배열을 새로 만들어 덮어 씌우면 그만이기에)이 있지만 그 이외의 경우엔 적어도 내가 보아온 케이스에선 문제없이 잘 동작했다. 이러한 computed의 동작 원리에 대해서는 아래의 참고 글에 자세히, 정확하게 정리되어있다.
+ https://mygumi.tistory.com/311

#### methods를 활용한 기타 로직 구현
이제 컴포넌트의 동작을 구현할 차래이다. 아래에 후술할 watch를 비롯해 vue는 컴포넌트의 동작을 구현하기 위한 다양한 방법을 제공하지만 그 중 가장 무난히 쓰이는 것은 역시 methods일 것이다. SimpleChild를 아래와 같이 바꾸어보자.
**SimpleChild.vue**
```vue
<template>
  <div>
    <div>{{message}}</div>
    <div>{{emphasizedMessage}}</div>
    <input v-model="message"/>
    <!--v-on 디렉티브로 click이벤트를 등록. click시 resetText를 호출-->
    <button v-on:click="resetText">Click!</button>
  </div>
</template>
<script>
export default {
  name: 'SimpleChild',
  data : function(){
      return {
          message : "Text"
      }
  },
  computed: {
    emphasizedMessage: function () {
      return this.message + "!!!"
    }
  },
  //methods에서 resetText란 이름으로 message를 비우는 동작 구현.
  methods : {
    resetText : function () {
      this.message = "";
    }
  }
}
</script>
```
methods 속성은 위와 같이 컴포넌트의 동작을 구현하는 부분이다. 이는 컴포넌트의 복잡한 로직을 구현한 것일 수도 있고 지금처럼 click같은 단순한 이벤트에 매핑되는 동작일 수도 있다. 언제나 그렇듯, 적절히 사용해주면 된다. 

또 이 예제에는 v-on이라는 중요하고 굉장히 자주 쓰이는 디렉티브가 포함되어있는데, v-on은 설명할 것이 많기에 디렉티브를 정리하는 포스트에서 자세히 다루겠다. 우선은 click 이벤트는 저렇게 등록하는구나, 하고 알고 넘어가자.

#### watch
computed의 이야기가 나올 때 항상 같이 이야기되는 속성이 watch이다. 이는 위에서도 잠깐 언급한 computed의 값의 변화를 탐지하는 기능 때문인데, watch도 마찬가지로 vue 컴포넌트에서 처리하는 반응형 data의 변화를 감지하는 기능을 탑제하고 있다. 다만 값을 return하며 해당 return을 참조할 수 있는 computed와는 달리, watch 속성은 순수하게 특정 data에 대한 callback만을 제공한다. 이번엔 공식 문서의 예제를 그대로 들고왔다.
```javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```
얼핏봐선 위에서 본 computed나 methods와 같은 구조로 보이지만, 정의된 속성 명들을 보면 변화를 탐지할 data에 무명 함수로 callback을 걸어놓은 형태임을 알 수 있다. Data의 firstName의 값이 바뀌면 firstName에 할당된 무명 함수가 callback으로 호출되는 형식이다.

