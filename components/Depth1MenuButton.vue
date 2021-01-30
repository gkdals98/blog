<template>
  <button class="copy drag-false" v-on:click="selected">
    {{item}}
  </button>
</template>

<script>
export default{
  name : 'Depth1MenuButton',
  methods : {
    selected : function(){
      this.$emit("d1selected", this.item);
    }
  },
  props : ["item"]
}
</script>

<style scoped lang="scss">
.depth1_component{
  margin: 0.2em;
	padding: 0.2em 0.5em 0.2em 0.5em;
	border-style: solid;
	border-radius: 0.5em;
  color : #C93A3A;
  text-align: center;
  vertical-align: middle;
	font-size: 1.2em;
	font-weight: bold;

  align-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
	&:hover{
  	color : white;
		background-color: #C93A3A;
		cursor: pointer;

	}
}
</style>
