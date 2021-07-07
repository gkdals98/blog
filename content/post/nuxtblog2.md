---
title: Nuxt Blog 만들기 2 - slug
tags: ['Frontend', 'Nuxt']
published: '2020-11-20'
hidden: 'false'
---


## Nuxt Blog 만들기 2 - slug
앞 포스트에선 Nuxt의 간략한 명세를 살펴보았으니 Nuxt로 markdown 블로그를 만들기 위해 알아야할 몇 가지를 적어보려 한다.

#### 1. Nuxt Blog를 만들기 위한 핵심 기능 _slug
slug란 무엇인가를 설명하려면 우선 slug가 왜 필요한지부터 알아야한다.

가령 블로그를 만든다고 쳐보자. 이 때 블로그의 각 포스트들을 보여주는 페이지는 동일한 포멧(예를 들면 이 블로그처럼 타이틀, 날짜, 내용)을 사용할 것이며 내용만 달라질 것이다. 이 때 pages 폴더 내에 각각의 글들을 별도 페이지로 다 정의하는 것은 굉장히 이상한 일이다.


꼭 위 예시가 아니더라도 비슷한 포멧을 공유하나 내용의 차이는 있는 페이지가 여러개 필요할 경우 url의 파라미터 이름을 참조해 동적으로 페이지를 구축하도록 도와주는 것이 slug이다. 아래 간단한 예제를 따라하며 이해해보자.

우선 nuxt app을 하나 생성한다.
```
npx create-nuxt-app slugdemo
```

프로젝트 초기화 설정은 전부 enter로 넘긴다. 다음으로, 우리가 'nuxtblog만들기', 'vue기초' 등의 포스트를 만들 때 사용할 기본 경로를 articles 라고 가정해보자. vue 기초 문서에 접근하기 위해서는 `localhost:3000/articles/vue기초`로 접근하도록 만든다는 뜻이다. 이를 위해 pages 디렉터리 아래에 articles 디렉터리를 만들고 아래의 파일을 생성해 내용을 붙여넣기 한다.

+ ***_slug.vue***

```html
<template>
	<article>
		{{someText}}
	</article>
</template>

<script>
export default {
	//pages 디렉터리의 컴포넌트들은 asyncData의 params로 서버자원 일부에 접근할 수 있다.
	//params의 slug 속성을 참조하면 현재 slug 경로를 받아올 수 있다.
	async asyncData({params}){
		const someText = params.slug;
		return {
			someText
		}
	}
}
</script>
```
이제 yarn dev로 nuxt app을 기동한 후, `localhost:3000/articles/아무string값` 을 주소에 입력해보자. `아무string값` 부분에 정말 아무 값이나 입력해도 화면에 해당 값이 출력되는 것을 볼 수 있을 것이다. params로 받아온 articles 이하의 동적 경로(slug)를 soemText 라는 변수로 받아 화면에 출력하도록 했기 때문이다. 위와 같이 nuxt에선 asyncData 속성을 정의하면 nuxt로부터 params를 받아와 현재 slug, 즉 동적 경로를 참조할 수 있다.

_slug.vue와 같은 컴포넌트를 Dynamic Pages(직역하자면 동적 페이지)라고 한다. **Dynamic Page란**, 위와 같이 url로 동적인 값(slug)이 들어왔을 때 이 동적인 값을 처리하는 페이지이다. Dynamic Page를 만들기 위해서는 위와 같이 _slug.vue 파일을 pages 내의 원하는 경로에 생성해주어야한다. articles 디렉터리를 만들고 그 안에 Dynamic Page를 정의하였으니 이제 `articles/아무string값` 경로의 처리는 해당 Dynamic Page를 통해 이루어지게 된다. Nuxt는 _(언더바)로 시작하는 이름을 가진 vue 파일을 Dynamic Page로 인식하기에 꼭 이름이 _slug.vue일 필요는 없지만, 다른 이름을 사용한다면 굉장히 햇갈릴 것이다.

그렇다면 지금같이 정적인 markdown 문서를 랜더링하고자 할 땐 이를 어떻게 활용하는가. 편한 구현을 위해 content 모듈이 필요하다. 아래와 같이 content 모듈을 추가해보자.

```
yarn add @nuxt/content
```

추가 후 nuxt.config.js의 modules 속성에 content 모듈을 사용함을 명시해줘야한다.

+ ***nuxt.config***
```javascript
export default {
  //...중략
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content'
  ],

```

다음으로 **content** 디렉터리가 필요하다. content 모듈은 content 디렉터리를 찾아 내부의 리소스에 접근한다. 이제 content 폴더 내에 **post** 디렉터리를 만들고 slug를 통해 content 디렉터리 내의 markdown 문서를 참조해보겠다. 우선 우리가 만든 Dynamic Page를 아래와 같이 수정해보자.

+ **_slug.vue**

```javascript
<template>
	<article>
		<div>
			{{article}}
		</div>
	</article>
</template>
<script>
export default {
	//content 모듈을 이용하는 부분. nuxt.config.js에 content 모듈을 선언해야한다.
	async asyncData({ $content, params }) {
		const article = await $content('post', params.slug).fetch()

		return {
			article
		}
	},
}
</script>
```
여기서 $content는 content 모듈이 제공하는 기능이다. 첫 인자로 참조할 디렉터리를, 둘 째 인자로 참조 대상을 넘겨준다. 따라서 ``` const article = await $content('post', params.slug).fetch() ``` 라는 구문은 content 디렉터리 내에서 post 디렉터리를 찾아 params.slug, 즉 주소창에 들어온 제목의 문서를 읽어오겠다는 뜻이 된다. fetch를 통해 받아온 데이터엔 이렇게 받아온 문서의 전체 내용이 들어가있다. 이를 확인하기 위해 프로젝트 root에 `content/post` 디렉터리를 만들고 안에 sample.md를 만든 뒤 아래 내용을 입력해보자.

+ sample.md
```markdown
## Hello! 첫 포스트에요.

첫 포스트입니다.
```

이제 `localhost:3000/articles/sample`로 접속해보면 object 형태로 읽어들인 markdown을 확인할 수 있을 것이다. 또 content 모듈은 읽어들인 markdown 문서를 html 형태로 변경해주는 nuxt-content 컴포넌트를 제공한다. template 에서 article object를 쌩으로 출력하던 것을 아래와 같이 수정하고 결과를 보자. 꽤 봐줄만하게 바뀔 것이다.

+ ***_slug.vue***

```html
<template>
	<article>
		<div>
			<nuxt-content :document="article"/>
		</div>
	</article>
</template>
```

#### 2. content 모듈을 이용한 markdown 문서 read의 심화
위 예제에서 가져온 포스트들의 제목을 모아 메뉴를 만들려면 어떻게 해야할까. 읽어온 markdown을 파싱해 제목을 찾는 것 보다는 추가로 제목 속성을 정의해 주는 것이 좋을 것이다. 또 포스트의 테그, 작성 날짜 등의 속성도 정의할 수 있으면 편할 거라는 생각이 든다. content 모듈은 이를 위해 markdown object를 읽어올 때 참조할 속성을 markdown 내에 정의하는 방법을 만들었다. 위에서 만든 sample.md 문서의 시작부분에 아래와 같이 ```---```로 시작 및 끝나는 부분을 넣고 그 안에 정보를 작성하면 된다.

+ sample.md
```markdown
---
title: 첫 포스트
tags: ['vue', 'nuxt']
published: '2020-11-20'
---
## Hello! 첫 포스트에요.

첫 포스트입니다.
```
이제 content 모듈이 sample.md를 읽어올 때 정의한 속성들을 markdown object의 속성으로 추가해준다. 확인을 위해 _slug.vue의 template을 아래와 같이 수정하고 localhost:3000/articles/sample로 접속해보자.
```html
<template>
	<article>
		<div>
			{{article.title}}
		</div>
		<span v-for="(tag, index) in article.tags"
					v-bind:key=index>
			{{tag}}
		</span>
		<div>
			{{article.published}}
		</div>
		<nuxt-content class="post-area" :document="article"/>
	</article>
</template>
```
다음으론 공식문서에서 나온  prev, next 버튼을 이용한 post간의 이동 예제를 보려한다. 아래는 published 값을 기준으로 post 디렉터리 내의 모든 markdown을 가져온 후 현재 참조 중인 params.slug의 앞 뒤의 문서만 가져오는 예제이다.

```javascript
export default {
	async asyncData({ $content, params }) {
		//post로부터 title과 slug만을 읽어오되 published를 기준으로 정렬 후 현재 slug 입력값의 앞 뒤 객체를 가져옴.
		const [prev, next] = await $content('post')
		  .only(['title', 'slug'])
			.sortBy('published', 'asc')
			.surround(params.slug)
			.fetch()

		return {
			prev,
			next
		}
	},
}
```
위와 같이 fetch를 받아오기 전, 받아올 값들에 다양한 조건을 걸 수 있으며 완성된 값은 return을 통해 내보내주면 컴포넌트 내에서 일반 data처럼 접근 가능해진다. 이를 응용하면 블로그의 기타 기능들을 구현할 수 있을 것이다.
