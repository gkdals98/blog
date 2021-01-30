<template>
  <div>
    <div>
			<div id='menu'>
				<div class="welcom">▼ Welcome ▼</div>
				<div class="depth multi-button">
				<Depth1MenuButton
					v-for="(item, index) in depth1"
          v-bind:key="index"
          v-bind:item="item"
          @d1selected="item_selected"
				/>
				</div>
				<div class="depth multi-button">
				<Depth2MenuButton
					v-for="(item, index) in depth2"
	        v-bind:key="index"
	        v-bind:item="item"
	        @d2selected="d2item_selected"
				/>
				</div>
				<ArticleList :articles="Articles" v-if="show_page"/>
			</div>
    </div>
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList';

export default {
	layout : 'blog',
  component: {
		ArticleList
  },
	data : function (){
		return {
			current_depth1 : "",
			current_depth2 : "",
			show_page : false
		}
	},
  computed: {
		depth1 : function(){
			var li = [];
			for(var i = 0; i < this.tag.length; i++){
				if(!li.includes(this.tag[i].tags[0])){
					li.push(this.tag[i].tags[0]);
				}
			}
			return li;
		},
		depth2 : function(){
			var li = [];
			for(var i = 0; i < this.tag.length; i++){
				if(this.current_depth1 == this.tag[i].tags[0] && !li.includes(this.tag[i].tags[1])){
					li.push(this.tag[i].tags[1]);
				}
			}
			return li;
		},
		Articles : function(){
			var li = [];
			for(var i = 0; i < this.allArticles.length; i++){
				if(this.current_depth1 == this.allArticles[i].tags[0] &&
					this.current_depth2 == this.allArticles[i].tags[1] &&
					!li.includes(this.allArticles[i])){
					li.push(this.allArticles[i]);
				}
			}
			return li;
		}
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
		item_selected : function (item){
			if(this.current_depth1 == item){
				this.current_depth1 = "";
			}else{
				this.current_depth1 = item;
			}
			this.current_depth2 = "";
			this.show_page = false;
		},
		d2item_selected : function (item){
			if(item == this.current_depth2){
				this.current_depth2 = "";
				this.show_page = false;
			}else {
				this.current_depth2 = item;
				this.show_page = true;
			}
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
#menu{
	margin-top: 0.5em;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.depth{
	display: flex;
  align-items: center;
	justify-content: center;
}
</style>
