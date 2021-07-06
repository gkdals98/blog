<template>
	<article>

			<Menu :postdata="postdata"/>
			<div id="post">

				<h1 class="drag-false">{{article.title}}</h1>
    			<p class="date drag-false">{{ formatDate(article.published) }}</p>
				<nuxt-content class="post-area" :document="article"/>

			</div>

			<Menu :postdata="postdata"/>
	</article>
</template>

<script>
/*
*slug에 content 모듈로 로드 된 포스트를 로드하기 위한 영역.
*/

export default {
	layout: 'blog',
	layout (context) {
		return 'blog'
	},

	async asyncData({$content, params}){
		//현재 화면에 표시될 article
		//params.slug를 통해 현재 참조중 인 경로를 알아낸다.
		//이후 post 디렉터리에서 article을 read
		const article = await $content('post', params.slug).fetch()

		//데이터 표시를 위해 사용할 값들
		const postdata = await $content('post').only(['tags', 'title', 'published', 'hidden', 'slug']).fetch();

		return {
			article,
			postdata,
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
