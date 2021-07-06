---
title: Nuxt Blog 만들기 2 - slug
tags: ['Frontend', 'Vue']
published: '2020-11-20'
hidden: 'false'
---


## Nuxt Blog 만들기 -2-
Nuxt의 간략한 명세를 살펴보았으니 Nuxt를 다루는데 있어 학습해야할 기초적 기능들을 적어본다.

#### 3. Nuxt Blog 개발을 위한 핵심 기능, _slug
slug란 무엇인가.

가령 블로그를 만든다고 쳐보자. 이 때 블로그의 각 포스트들을 보여주는 페이지는 동일한 layout을 사용할 것이며 문서의 내용만 달라질 것이다. 이 때 pages 폴더 내에 각각의 페이지들을 다 정의하는 것은 관리도 힘들고 이상한 일이다.


이와 같이 동일한 레이아웃을 공유하는 페이지가 여러개 있을 경우, 각 정적 리소스의 이름을 경로로 동적으로 페이지를 형성할 수 있게 도와주는 것이 슬러그이다.


지금같이 정적 리소스를 랜더링할 경우엔 content 모듈이 필요하다. slug를 적용하기 사용하기 위해서는 두 가지 준비가 필요하다.


첫 째는 동적 주소에 매핑할 slug 파일이다. Nuxt는 _(언더바)로 시작하는 이름을 가진 js 파일을 슬러그 파일로 인식한다. 이는 page 디렉터리 내에 원하는 곳에 만들어주면 된다.


또한 **content** 디렉터리가 필요한데 content 모듈이 해당 디렉터리 내의 정적 리소스에 접근한다. 아래는 공식 문서에 나온 방법으로 content 폴더 내에 **post** 디렉터리를 만들고 슬러그에서 해당 경로를 링크하고자 할 때의 예시이다. slug의 vue 컴포넌트 안에 아래와 같이 작성해준다.

```javascript
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
여기서 asyncData는 서버의 디렉터리에 접근하기 위한 SSR 요소이다. 학습이 부족하여 아직 추측일 뿐이지만 asyncData를 호출하며 받아오는 $content는 content 모듈로부터 content 디렉터리를 받아오는 것으로 보인다. 또한 또다른 input값인 params는 슬러그가 동적으로 읽어오고자 하는 대상, 즉 주소창에 들어온 값이다. 따라서 ``` const article = await $content('post', params.slug).fetch() ``` 라는 구문은 content 디렉터리 내에서 post 디렉터리를 찾아 params.slug에 해당하는, 즉 주소창에 들어온 제목의 문서를 읽어오겠다는 뜻이 된다. fetch를 통해 받아온 article엔 이렇게 받아온 문서의 전체 내용이 들어가있다.

위와 같이 지정하면 post 디렉터리 내의 정적 문서는 slug 파일이 있는 디렉터리의 url + 파일 명을 통해 접근 가능하게 된다. 가령 slug 파일이 nuxt의 지정 디렉터리중 하나인 pages 내의 article 밑에 있으며 content의 제목이 test.md이면 **/article/test**로 접근 가능하다.

---

#### 4. Slug의 심화와 그를 활용한 메뉴 생성
예제를 몇 개 보자. 아래는 공식문서에서 나온 post간의 이동을 위한 prev, next 버튼에 사용할 정보를 가져오는 방법이다. 우선 markdown 문서의 시작부분에 아래와 같은 테그가 들어가야한다.
```
---
title: Making Nuxt Blog 2
tags: ['vue', 'nuxt']
published: '2020-11-20'
---
```
위와 같이 작성해주면 content 모듈이 정적 문서를 읽어올 때 title, tags, published 등의 속성을 오브젝트 안에 넣어줘 해당 속성의 접근이 가능해진다. 아래는 published 속성순으로 정렬된 title 속성을 가져오되, params.slug의 앞 뒤의 문서만 가져오도록 지정해주는 방법이다.

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
위와 같이 fetch를 받아오기 전, 받아올 값들에 다양한 조건을 걸 수 있으며 완성된 값은 return을 통해 내보내주면 컴포넌트 내에서 일반 data처럼 접근 가능해진다.

http://ccambo.github.io/Dev/Nuxt/6.how-to-use-axios-in-nuxt/
