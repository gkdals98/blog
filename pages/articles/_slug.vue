<template>
	<article>

			<Menu :allArticles="allArticles" :tag="tag"/>
		<div id="post">

			<h1 class="drag-false">{{article.title}}</h1>
    	<p class="date drag-false">{{ formatDate(article.published) }}</p>
			<nuxt-content class="post-area" :document="article"/>

		</div>
	</article>
</template>

<script>
/*
*slug로 구현되는 포스트 영역.
*절대, 절대, 절대 공통으로 들어가는건 여기서 작업하지 않는다.
*/

export default {
	layout: 'blog',
	layout (context) {
		return 'blog'
	},

	async asyncData({$content, params}){
		//현재 화면에 표시될 article
		//params.slug를 통해 현재 경로를 입력받아 post 디렉터리에서 article을 read
		const article = await $content('post', params.slug).fetch()

		//메뉴바에 표시될 테그들
		const tag = await $content('post').only(['tags']).fetch();

		const allArticles = await $content('post').fetch();

		return {
			article,
			tag,
			allArticles,
		}
	},

	methods: {
    formatDate : function (date) {
			//긁어온 소스. 아직 분석 더 필요함
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
	}
}
</script>
