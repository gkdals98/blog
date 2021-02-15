export default {
  ssr: true,
  /*
   ** Headers of the page
   */
  head: {
    title: "CROMESS's Blog",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
		'~/assets/css/globaltheme.scss',
		'~/assets/css/globalfonts.scss'
	],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

	// Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content'
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
};
