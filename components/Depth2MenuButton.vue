<template>
  <div class="depth1_component drag-false" v-on:click="selected">
    {{item}}
  </div>
</template>

<script>
export default{
  name : 'Depth2MenuButton',
  methods : {
    selected : function(){
      this.$emit("d2selected", this.item);
    }
  },
  props : ["item"]
}
</script>

<style scoped lang="scss">
.depth1_component{
  margin: 0.1em;
	padding: 0.1em 0.3em 0.1em 0.3em;
	border-style: solid;
	border-radius: 0.5em;
  color : #001285;
  text-align: center;
  vertical-align: middle;
	font-size: 1em;
	font-weight: bold;

  align-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
	&:hover{
  	color : white;
		background-color: #001285;
		cursor: pointer;

	}
}
</style>
