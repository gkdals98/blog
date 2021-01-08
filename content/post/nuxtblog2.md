---
title: Making Nuxt Blog 2
tags: ['vue', 'nuxt']
published: '2020-11-20'
---


## Nuxt Blog 만들기 -2-
Nuxt의 간략한 명세를 살펴보았으니 Nuxt를 다루는데 있어 학습해야할 기초적 기능들을 적어본다.

#### 1. _slug
content 모듈은 파일 앞에 _(언더바)가 붙은 파일을 슬러그 파일로 인식할 수 있다. content 모듈은 전용 디렉토리인 content 내에 있는 markdown 문서 등을 url 값을 통해 접근가능하게 해준다. 이 때, 웹페이지에서 보여주고자 하는 정적 문서에 원하는 포멧을 정의해주는 파일이 슬러그 파일이다. 아래는 content 내에 **articles**라는 디렉터리를 만들고 해당 경로를 링크하는 슬러그 파일을 만들고자 할 때의 예시이다.

```
export default {
	//content 모듈을 이용하는 부분. nuxt.config.js에 content 모듈을 선언해야한다.
	async asyncData({ $content, params }) {
		const article = await $content('articles', params.slug).fetch()

		const [prev, next] = await $content('articles')
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
위 vue 모듈에서 ``` const article = await $content('articles', params.slug).fetch() ``` 는 articles 디렉터리 내의 정적 문서에 접근할 때, 해당 vue 컴포넌트를 슬러그로 지정하겠다는 의미이다. 위와 같이 지정하면 articles 내의 정적 문서는 slug 파일이 있는 디렉터리의 url + 파일 명을 통해 접근 하능하게 된다. 가령 slug 파일이 nuxt의 지정 디렉터리중 하나인 pages 내의 article 밑에 있으며 content의 제목이 test.md이면 **/article/test**로 접근 가능하다.
