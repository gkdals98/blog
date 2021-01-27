<template>
  <div>
    <div>
			<div id='menu'>
				<div id="depth1">
				<Depth1MenuButton
					v-for="(item, index) in depth1"
          v-bind:key="index"
          v-bind:item="item"
          @selected="item_selected"
				/>
				</div>
			</div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
	layout : 'blog',
  components: {
  },
	async asyncData({$content, params}){
		//현재 화면에 표시될 article
		//params.slug를 통해 현재 경로를 입력받아 post 디렉터리에서 article을 read
		const article = await $content('post', params.slug).fetch()

		//메뉴바에 표시될 테그들
		const tag = await $content('post').only(['tags']).fetch();

		var depth1 = [];
		for(var i = 0; i < tag.length; i++){
			if(!depth1.includes(tag[i].tags[0])){
				depth1[i] = tag[i].tags[0];
			}
		}

		return {
			article,
			depth1
		}
	},
	methods: {
    formatDate : function (date) {
			//긁어온 소스. 아직 분석 더 필요함
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
		item_selected : function (item){

		}
 }
}
</script>

<style scoped lang="scss">
#menu{
	margin-top: 0.5em;
	display: flex;
	flex-direction: column;
}
#depth1{
	display: flex;
	flex-direction: row;
	justify-content: center;
}
</style>
