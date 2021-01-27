---
title: Making Nuxt Blog 2
tags: ['vue', 'nuxt']
published: '2020-11-20'
---


## Nuxt Blog 만들기 -2-
Nuxt의 간략한 명세를 살펴보았으니 Nuxt를 다루는데 있어 학습해야할 기초적 기능들을 적어본다.

#### 1. _slug
slug란 무엇인가.

가령 블로그를 만든다고 쳐보자. 이 때 블로그의 각 포스트들을 보여주는 페이지는 동일한 layout을 사용할 것이며 문서의 내용만 달라질 것이다. 이 때 pages 폴더 내에 각각의 페이지들을 다 정의하는 것은 관리도 힘들고 이상한 일이다.

이와 같이 동일한 레이아웃을 공유하는 정적 문서들이 여러개 있을 경우, 각 정적 리소스의 이름을 통해 동적으로 페이지를 형성할 수 있게 도와주는 것이 슬러그이다.

우선 content 모듈이 필요하다. content 모듈은 파일 앞에 _(언더바)가 붙은 파일을 슬러그 파일로 인식할 수 있다. content 라는 디렉터리를 프로젝트 내에 생성해주면 content 모듈이 디렉터리 내의 정적 리소스의 접근을 도와준다. 아래는 공식 문서에 나온 방법으로 content 폴더 내에 **post** 디렉터리를 만들고 슬러그에서 해당 경로를 링크하고자 할 때의 예시이다. slug의 vue 컴포넌트 안에 아래와 같이 작성해준다.

```
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

#### 2. Slug의 심화
```
export default {
	//content 모듈을 이용하는 부분. nuxt.config.js에 content 모듈을 선언해야한다.
	async asyncData({ $content, params }) {
		const article = await $content('post', params.slug).fetch()


		const [prev, next] = await $content('post')
		  .only(['title', 'slug'])
			.sortBy('createdAt', 'asc')
			.surround(params.slug)
			.fetch()

		return {
			article,
			prev,
			next
		}
	},
}
```
