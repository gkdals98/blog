<template>
	<div id="layout">
		<div id="form">
			<div id="title-bar" class="drag-false">
				CROMESS
			</div>
			<hr/>
			<div id="line"/>
			<Nuxt />
			<div id='footer'>
			</div>
		</div>
	</div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
#layout {
	display: flex;
	flex-direction: column;
	align-items: center;
	#form{
		width: 60vw;
		display: flex;
		flex-direction: column;
		align-items: center;

		#title-bar{
			font-family: pinkblue;
			font-size: 6em;
		}
		hr{
			style: 0.2em solid;
			min-width: 50em;
		}
		#line{
			border-style: solid;
			min-width: 50em;
			border-radius: 0.3em;
		}
	}
}
#footer {
		height: 4em;
}
</style>
