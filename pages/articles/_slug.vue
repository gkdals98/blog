<template>
	<article>
		<h1 class="drag-false">{{article.title}}</h1>
    <p class="date drag-false">{{ formatDate(article.published) }}</p>
		<nuxt-content :document="article"/>
		<div id='footer'>
			{{tag}}
		</div>
	</article>
</template>
<script>
export default {
	layout: 'blog',
	layout (context) {
		return 'blog'
	},
	async asyncData({$content, params}){
		//현재 화면에 표시될 article
		const article = await $content('post', params.slug).fetch()

		//메뉴바에 표시될 테그들
		const tag = await $content('articles')
			.only(['tag'])

		return {
			article,
			tag
		}
	},
	methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
 }
}
</script>
<style>
h1{
	font-size: 4em;
	line-height: 1.8em;
}
.date{
	font-size: 1.2em;
	font-weight: bold;
}
.nuxt-content h2{
	color : #001285;
	line-height: 2.5em;
}
.nuxt-content h4{
	line-height: 4em;
	font-size: 1.2em;
}
.nuxt-content p{
	line-height: 2em;
	font-family: nanumsr;
}
.nuxt-content li{
	line-height: 2em;
	font-family: nanumsrr;
	color : #33237D;
}

#footer{
	height: 4em;
}
</style>
