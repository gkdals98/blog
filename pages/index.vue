<template>
  <div>
    <div>
			<div class="welcom">▼ Welcome ▼</div>
						<Menu :postdata="postdata"/>
    </div>
  </div>
</template>

<script>
export default {
	layout : 'blog',
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
