<template>
  <div>
    <div>
			<div class="welcom">▼ Welcome ▼</div>
			<Menu :allArticles="allArticles" :tag="tag"/>
    </div>
  </div>
</template>

<script>
export default {
	layout : 'blog',
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
	}
}
</script>

<style scoped lang="scss">
.welcom{
	font-family: Heebo-b;
	text-align: center;
	font-size: 2.5em;
	line-height: 1.8em;
}
</style>
