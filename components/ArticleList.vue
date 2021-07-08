<template>
  <div>
    <ul class="article-ul">
      <li
        v-for="article of shwonArticle"
        :key="article.slug"
        class="article-li"
      >
        <NuxtLink
          :to="{ name: 'articles-slug', params: { slug: article.slug } }"
          class="link"
        >
	        <div class="article-title">
	            <p>{{ article.title }}</p>
							<p>{{ article.published}}</p>
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
  computed: {
    shwonArticle : function ()  {
      return this.articles.filter(article => article.hidden=='false')
    }
  }
};
</script>
<style scoped lang="scss">
.article-ul{
  list-style-type: none;
	border-style: solid;
	border-width: 0.1em 0 0.1em 0;
	margin: 1em;
  padding: 0 0 1em 0.5em;
	  .article-title{
      margin-bottom: 0.5em;
      height: 1.3em;
    	text-decoration: none;
  		font-size: 1em;
  		display: flex;
  		justify-content: space-between;
		  font-family: spoqahansanr;
      font-weight: bold;
      p {
        color : #001285;
      }
		}
}
</style>
