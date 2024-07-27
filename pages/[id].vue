<script lang="ts" setup>

	import type { RssItem } from '~/types/rss'

	const refreshKey = useRefreshNewsStore();

	const { data: news, status, error, refresh } = useFetch<RssItem[]>('/api/news', {
		watch: [refreshKey]
	});

</script>


<template>
	<div v-if="status === 'pending'">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" style="margin: 60px auto 0; shape-rendering: auto; display: block; background: transparent;" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle stroke-linecap="round" fill="none" stroke-dasharray="50.26548245743669 50.26548245743669" stroke="#0029ff" stroke-width="8" r="32" cy="50" cx="50">
		<animateTransform values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
		</circle><g></g></g>
		</svg>
	</div>
	<NewsList v-else-if='news' :newsData='news' />
	<div v-else>
		<h2>Не удалось получить новости :(</h2>
	</div>
</template>