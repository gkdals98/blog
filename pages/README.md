# PAGES
각 페이지를 지정하는 곳.
```
https://ko.nuxtjs.org/guides/directory-structure/pages/
```
레이아웃은 레이아웃스라고 따로 있음. 해당 레이아웃을 아래와 같은 형태로 지정하면 레이아웃이 반영된다.
```
export defulat {
	layout: 'darktheme',
	//또는
	layout(context){
		return 'blog'
	}
}
```
