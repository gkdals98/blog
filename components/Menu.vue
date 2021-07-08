<template>
	<div>
		<div class='menu'>
			<div class="depth multi-button">
				<button class="copy drag-false"
					v-for="(item, index) in depth1"
					v-bind:key=index
					v-on:click="item_selected(item)">
					{{item}}
				</button>
			</div>
			<div class="depth multi-button">
	  		<button class="cut drag-false"
					v-for="(item, index) in depth2"
					v-bind:key=index
					v-on:click="d2item_selected(item)">
					{{item}}
				</button>
			</div>
		</div>

		<ArticleList :articles="Articles" v-if="show_page"/>
		<div ref="pageBottom"></div>
	</div>
</template>
<script>

export default {
  	name : 'Menu',
	props : ['postdata'],
	data : function (){
		return {
			current_depth1 : "",
			current_depth2 : "",
			show_page : false
		}
	},
  	computed : {
		depth1 : function(){
			var li = [];
			for(var i = 0; i < this.postdata.length; i++){
				if(typeof this.postdata[i].tags == "undefined")continue;

				if(!li.includes(this.postdata[i].tags[0]) && this.postdata[i].hidden !== "true"){
					li.push(this.postdata[i].tags[0]);
				}
			}
			return li.sort();
		},
		depth2 : function(){
			var li = [];
			for(var i = 0; i < this.postdata.length; i++){
				if(typeof this.postdata[i].tags == "undefined")continue;

				if(this.current_depth1 == this.postdata[i].tags[0] &&
					!li.includes(this.postdata[i].tags[1]) &&
				 	this.postdata[i].hidden !== "true"){
					li.push(this.postdata[i].tags[1]);
				}
			}
			if(this.isFooter){
				this.scrollToEnd();
			}
			return li.sort();
		},
		Articles : function(){
			var li = [];
			for(var i = 0; i < this.postdata.length; i++){
				if(typeof this.postdata[i].tags == "undefined")continue;

				if(this.current_depth1 == this.postdata[i].tags[0] &&
					this.current_depth2 == this.postdata[i].tags[1] &&
					!li.includes(this.postdata[i])){
					li.push(this.postdata[i]);
				}
			}
			li.sort((a,b) => (a.published > b.published) ? -1 : 1)
			return li;
		}
  	},
	methods : {
		item_selected : function(item){
			if(this.current_depth1 == item){
				this.current_depth1 = "";
				this.show_page = false;

			}else{
				this.current_depth1 = item;
				this.current_depth2 = "";
				this.show_page = false;
			}
		},
		d2item_selected : function(item){
			if(item == this.current_depth2){
				this.current_depth2 = "";
				this.show_page = false;
			}else {
				this.current_depth2 = item;
				this.show_page = true;
			}
	  	},
	},

}
</script>

<style scoped lang="scss">
menu{
	margin-top: 0.5em;
	display: flex;
	flex-direction: column;
}
.depth{
	display: flex;
	flex-direction: row;
	justify-content: center;
}
</style>
