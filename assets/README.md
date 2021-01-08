# ASSETS
SASS, Image, font 등등 서버사이드 랜더링과는 관련없는 자료를 놓읍시다.
```
https://ko.nuxtjs.org/guides/directory-structure/assets/
```
이미지를 가져오고 싶을 때는 아래와 같은 식으로 가져올 수 있음.
```
<template>
  <img src="~/assets/your_image.png" />
	<img :src="require(`~/assets/img/${image}.jpg`)" />
</template>
```
글로벌로 사용될 스타일은 nuxt.config.js에서 임포트하도록 하자.
