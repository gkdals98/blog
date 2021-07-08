---
title: Nuxt의 SSR에 대한 고찰
tags: ['Frontend', 'Nuxt']
published: '2021-07-07'
hidden: 'false'
---

## Nuxt에 대해 잘못 알고 있던 것.
내가 기존에 이해하고 있었던 Nuxt는 Vuejs 프로젝트를 위한 SSR 프레임워크였다. 

포괄적인 의미에서 Nuxt는 미리 구축된 인프라로 체계적이고 자동화된 Vue 프로젝트 관리를 할 수 있는 프레임워크이다. 그래도 역시 일반 Vue 프로젝트로에선 설정하기 까다롭던 SSR 관련 처리 대부분을 자동으로 설정해준다, 라는 게 내가 아는 최대 메리트였고 그래서 그냥 Nuxt = SSR 프레임워크다 라고 인식하고 있었다.

그러던 중, 첫 째로 components 디렉터리와 layout 디렉터리에서의 asyncData 실행이 불가능한 이유를 조사하며, 둘 째로 nuxt의 배포에 대해 조사하며 Nuxt의 SSR을 너무 대충 이해하고 있었다는 사실을 알게되었다. 하여 이 기회에 여러 포스트를 읽으며 아래의 것들에 대해 정리해보려 한다.

+ Nuxt App은 SSR로 기동할 시 일부 동작을 CSR처럼 수행해 CSR의 장점을 활용한다. 이를 자세히 적어보자.
+ Nuxt App의 세 가지 배포형태인 SSR, SPA, Static 배포 시 각각의 동작 및 배포 방식 차이를 간단히 기록한다.
+ components 디렉터리 및 layout 디렉터리의 컴포넌트에서 asyncData 실행이 안되는 이유가 하이드레이션에 의한 것이 맞는지를 확인한다.


이 포스트보다는 아래의 참고 포스트를 읽는 것이 더 이해하기 쉽고 정확하다. 다만 내 study를 위해 기록차원에서 적어보려 한다.
+ https://maxkim-j.github.io/posts/nuxt-ssr

추가로 SSR 프론트를 만들었다 치고, 그래서 서버와의 통신을 어떻게 할 지에 대한 고민도 하였는데 이는 nuxt proxy와 nuxt api 통신, jam stack 구조의 이해 등으로 나누어 다룰 예정이다.

#### 1. CSR (Client Side Rendering)
하이드레이션을 설명하기 위해선 우선 SSR과 CSR의 차이를 알아야한다. CSR은 기본적인 Html Tag만을 브라우저에 전달한 후, Javascript의 동작으로 페이지를 완성시킨다. 주로 SPA(Single Page Application)에 특화된 프레임워크인 React, Vue 에서 자주 사용하는 방법이다. 장단점으로 언급되는 것은 아래와 같다.
+ 장점 - 최초 한 번만 Page를 로드한다. 이후의 화면전환(라우팅)을 전부 javascript 요청으로 받아온 데이터로 기존 page를 고치는 것으로 대체한다. (이 때문에 CSR은 SPA와 거의 동일시 된다.) 즉, 다른 페이지로 넘어갈 때 화면을 새로 받아오는 SSR과 비교하면 최초 로딩 이후 동작의 속도가 빠르다. 또 같은 이유로 서버의 부하를 줄일 수 있다.
+ 단점 - 위에서 설명한 이유로 한 번에 큰 덩어리의 코드를 받아오기에 CSR은 초기 로딩이 느리다. 그러나 그보다도 결정적인 단점이 있는데 페이지 노출이 SSR에 비해 불리하다는 점이다. CSR은 최초 비어있는 HTML을 가져와 javascript로 페이지를 그린다. 그리고 대부분의 웹 크롤링은 Html을 기반으로 이루어진다. 이로 인해 웹 크롤러는 CSR 페이지를 빈페이지로 인식할 수 있고 이는 페이지 노출에 불리하게 작용한다.

#### 2. SSR (Server Side Rendering) 
서버 사이드 랜더링은 서버에서 완성된 Html을 전달하는 방식이다. 브라우저는 완성된 Html과 그에 해당하는 javascript 파일을 받아 페이지 내에서 작동시킨다. 사용자가 다른 페이지로 이동할 때, 브라우저는 서버로부터 이동할 페이지의 Html 및 Javascript, css등을 새로 받아온다. CSR이 등장하며 강조된 SPA가 CSR과 거의 동일시되다보니 SSR은 SPA의 반대 개념인 MPA(Multi Page Application)와 동일시되곤 한다. 다만 이 쪽은 SPA - CSR의 관계와는 달리 공통분모가 살짝 덜한 편이다. SSR엔 Next, Nuxt의 SSR 모드부터 예전 Web 생태계를 담당하던 JSP, Spring이나 Django등의 템플릿 엔진 등등 많은 예시가 있다. 서버가 Page 생성에 관여하지 않더라도 Apache 등의 웹서버를 이용한 정적 Web 호스팅 또한 SSR이라고 할 수 있다.
+ 장점 - 각각의 Page 로드 속도가 CSR의 최초 로드보단 빠르다. CSR과는 달리 완성된 Html을 받기에 웹 크롤러가 찾기 쉬우며 이로 인해 Page 노출의 기회가 늘어난다.
+ 단점 - 일반적인 경우, 각각의 Page에 대한 접근 요청마다 Client는 Page를 새로 로드해야한다. 이로인해 Page 이동 간 화면의 깜빡임이 발생하게 된다.

#### 3. 새로운 SSR(Server Side Rendering)의 개념과 Nuxt
결론적으론 CSR과 SSR은 모두 장단점이 있다. 다만 두 개념의 구조는 SSR에선 흑과 백처럼 양립할 수 없는 것이 아니며 혼용이 가능하다. 이에 SSR에는 프리 랜더링과 하이드레이션이란 두 가지 개념이 등장한다.
+ **프리 랜더링**은 React나 Vue로 만들어진 CSR 페이지에 위 크롤링의 단점을 극복하기 위해 어느정도 기본이 갖추어진 Html 페이지를 전송하는 것을 의미한다. 또 프리 랜더링은 라우팅이 발생할 시엔 작은 html 컴포넌트를 전달받아 페이지를 다시 그린다. 즉, SSR이다. 이를 위해 Nuxt 등의 SSR 특화 라이브러리는 Build 결과물로 javascript 외에도 작은 서버를 산출하며 이 서버는 페이지 라우팅 시 요청에 맞는 페이지 컴포넌트를 프리랜더링해 브라우저로 전달하는 역할을 한다.
+ **하이드레이션**은 사전적으론 '수용액 속에서 용해된 용질 분자나 이온을 물 분자가 둘러싸고 상호작용하면서 마치 하나의 분자처럼 행동하게 되는 현상'을 말한다. 꽤 어려운 단어인데 SSR에선 프리랜더링을 마친 Html이 Javascript를 이용해 마치 SPA와도 같이 동작하는 것을 의미한다. 이를 통해 SSR 페이지도 SPA와도 같은 반응성을 얻을 수 있다.

위 두 개념을 적용한 것이 현 트랜드의 SSR이다. Nuxt에선 SSR 모드에서 nuxt build로 빌드한 결과물들이 해당한다. SSR로 빌드된 Nuxt App은 SSR과 CSR의 장점 모두를 사용하고 있다. Nuxt SSR app은 모든 조건에서 SSR에 부합하지만 각각의 페이지가 설계에 따라 CSR과 비슷한 느낌이 될 수 있는 것이다.

#### 4. nuxt app build
이제 CSR, SSR 그리고 프리 랜더링과 하이드레이션을 알았으니 Nuxt에서 이것들이 어떻게 적용되는지 다시 보아야할 차래이다. 추가로 아주 살짝 다른 이야기인 SSG에 대해서도 다뤄보자.

##### CSR
+ nuxt.config.js를 아래와 같이 설정하면 된다.

**nuxt.config.js**
```javascript
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  mode: "spa",
  //중략
}
```
+ build시엔 package.json에서 `nuxt build`에 해당하는 script를 수행하면 된다. 
+ 산출물은 .nuxt/dist 경로에 client 폴더로 생성되며 번들링된 정적 js가 들어있다.
+ 배포는 서버의 라우팅 경로에 해당 정적 산출물을 옮기면 끝난다.


##### SSR
+ nuxt.config.js의 ssr, mode 설정을 지워버리면 된다.(즉 default이다.) 
+ build시엔 package.json에서 `nuxt build`에 해당하는 script를 수행하면 된다.
+ 산출물은 .nuxt/dist 경로에 client, server 두 개의 폴더로 생성되며 서비스를 위해 최적화 및 번들링을 마친 javascript와 server측 구성요소가 들어있다. 이는 이 산출물로 호스팅을 할 시 node.js 서버가 필요함을 의미한다.
+ 공식문서에도 올라와있는 가장 심플한 배포 방법은 프로젝트를 호스팅할 서버에 올려 nuxt build 한 후에 nuxt start를 하는 것이다. 다만 서버가 산출물에 포함되는 만큼, 환경과 프로젝트 구조에 따라 배포 방식이 극과 극으로 갈리는 것 같다. 아마 nuxt proxy를 다룰 때 즈음 한 번 더 이야기를 하게될 것 같다.


##### SSG
+ SSG는 위에선 다루지 않았던 개념인데 Static Site Generate의 약어로 정적 사이트 생성을 의미한다. 말 그대로 Nuxt가 정적 html의 생성에만 관여한다. SSG로 정적 사이트를 gen하면 SPA나 현대적인 SSR이 아닌 보편적이고 가장 단순한 형태의 SSR 산출물이 나온다.
+ nuxt.config.js를 아래와 같이 설정하면 된다.
**nuxt.config.js**
```javascript
export default {
  ssr: true,
  target: 'static',
  //중략
}
```
+ build시엔 위와 같이 설정했다면 `nuxt generate`가 실행된다.
+ 산출물은 dist 경로에 생성된다.
+ 배포는 SPA와 마찬가지로 서버 호스팅 경로에 올리면 된다. 또 이러한 정적 웹사이트 생성에 한해 vercel, netlify 등의 좋은 무료 호스팅 서비스를 사용할 수 있는데 이 블로그도 vercel을 사용해 SSG로 배포되고 있다.

#### 5. components, layout 디렉터리에서 asyncData 호출
이제 이 포스트를 작성하게 된 계기만 남았다. components, layout 디렉터리에서 비동기 데이터 처리를 할 수 없는 것은 이 디렉터리의 컴포넌트들이 CSR로 렌더링되기 때문일까? 거의 확실한거지 완벽한 결론을 얻은 것은 아니지만 어쨌건 **결론은 맞다.** 아래는 공식문서이다.

+ https://nuxtjs.org/docs/2.x/features/data-fetching#async-data-in-components

asyncData는 서버의 자원을 참조해 SSR을 지원하기 위한 속성이며, 위 하이드레이션의 관점에서 접근해보자면 Nuxt에서 SSR로 랜더링되는 요소는 ***Pages*** 디렉터리 뿐이다. SSR로 Nuxt를 빌드한 뒤 각 라우팅 경로에 매핑되는 프리 렌더링 html 산출물이 무엇을 기준으로 만들어지는지를 보면 된다. 즉, 기타 directory의 컴포넌트는 client sdie에서 랜더링되며, 때문에 asyncData로 서버자원에 접근을 시도해도 서버에 뭐가있는지 알 길이 없다. 이에 Nuxt에선 SSR이 아닌 디렉터리에서 server측에 데이터를 요청할 수 있도록 아래와 같은 fetch Hook 모듈이 제공된다.

**공식 문서 예제**
```html
<script>
  export default {
    data() {
      return {
        posts: []
      }
    },
    activated() {
      // Call fetch again if last fetch more than 30 sec ago
      if (this.$fetchState.timestamp <= Date.now() - 30000) {
        this.$fetch()
      }
    },
    async fetch() {
      this.posts = await fetch('https://api.nuxtjs.dev/posts').then(res =>
        res.json()
      )
    }
  }
</script>
```

다만 딱 봐도 알 수 있듯 이는 Client에 로드된 이후 서버에 데이터를 요청하는 구문이며 컴포넌트가 SSR로 프리 렌더링 되어 나오는 것이 아님을 유의하자.

