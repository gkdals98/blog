<template>
  <div>
    <ul class="article-ul">
      <li
        v-for="article of articles"
        :key="article.slug"
        class="article-li"
      >
        <NuxtLink
          :to="{ name: 'articles-slug', params: { slug: article.slug } }"
          class="link"
        >
	        <div>
	          <h2 class="article-title" v-if="!article.hidden">
	            <p>{{ article.title }}</p>
							<p>{{ article.published}}</p>
	          </h2>
	        </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    articles: {
      type: Array,
      default: Array,
    }
  },
};
</script>
<style scoped lang="scss">
.article-ul{
  list-style-type: none;
	border-style: solid;
	border-width: 0.1em 0 0.1em 0;
	margin: 1em;
	padding: 1em;
	.article-title{
  	text-decoration: none;
		font-size: 1em;
		width: 35em;
		padding: 0.1em;
		border-width: 0 0 0.05em 0;
		display: flex;
		justify-content: space-between;
		}
}
</style>
