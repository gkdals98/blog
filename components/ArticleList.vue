<template>
  <div>
    <ul class="">
      <li
        v-for="article of articles"
        :key="article.slug"
        class=""
      >
        <NuxtLink
          :to="{ name: 'articles-slug', params: { slug: article.slug } }"
          class=""
        >
	        <div>
	          <h2 class="">
	            {{ article.title }}
	          </h2>
	          <p class="">{{ article.description }}</p>
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
