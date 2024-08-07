<script lang="ts" setup>
import type { RouteQuery } from '~/types/queryParams'
import type { RssItem } from '~/types/rss'
import type { Filter } from '~/types/types'

const props = defineProps<{
	newsData: RssItem[]
}>();
const { newsData } = toRefs(props);

const route = useRoute();
const queryParams = computed<RouteQuery>(() => route.query);
const viewMode = useViewModeStore();

// Получение строки поиска и фильтров
const searchQuery = computed<string>(() => (queryParams.value.search || '').toLowerCase());
const filterQuery = computed<Filter>(() => queryParams.value.filter || 'все');

// Получение текущей страницы
const currentPage = computed<number>(() => Number(route.params.id) ?? 1);

// Сортировка новостей по датам
const sortedNewsData = computed<RssItem[]>(() => {
	if (!newsData.value || newsData.value.length === 0) {
		return [];
	}

	return newsData.value.slice().sort((a, b) =>
		new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
	);
});

// Фильтрация новостей
const filteredNews = computed<RssItem[]>(() => {
	if (!sortedNewsData.value || sortedNewsData.value.length === 0) {
		return [];
	}

	return sortedNewsData.value.filter(item => {
		const matchesFilter = filterQuery.value === 'все' || item.source === filterQuery.value;
		const matchesSearch =
			searchQuery.value === '' ||
			item.title.toLowerCase().includes(searchQuery.value) ||
			item.description?.toLowerCase().includes(searchQuery.value);

		return matchesFilter && matchesSearch;
	});
});

// Общее количество новостей
const totalPages = computed<number>(() => {
	if (!filteredNews.value || filteredNews.value.length === 0) {
		return 1;
	}

	return Math.ceil(filteredNews.value.length / viewMode.pageSize);
});

// Количество новостей на странице в зависимости от режима отображения
const startIndex = computed<number>(() => (currentPage.value - 1) * viewMode.pageSize);
const endIndex = computed<number>(() => startIndex.value + viewMode.pageSize);
const newsToShow = computed<RssItem[]>(() => {
	if (!filteredNews.value || filteredNews.value.length === 0) {
		return [];
	}

	return filteredNews.value.slice(startIndex.value, endIndex.value);
});
</script>


<template>

	<div
		v-if="newsToShow.length"
		:class="viewMode.get === 'grid' ? $style.gridMode :  $style.listMode"
	>
		<NewsCard
			v-for="(item, index) in newsToShow"
			:key="index"
			:title="item.title"
			:link="item.link"
			:source="item.source"
			:pubDate="new Date(item.pubDate)"
			:enclosure="item.enclosure"
			:description="item.description"
		/>
  </div>
	<div v-else-if='isNaN(currentPage)' class='message'>
		<h2 >Выберите страницу:</h2>
	</div>
	<div v-else class='message'>
		<h2>К сожалению ничего не найдено</h2>
		<p>Попробуйте изменить формулировку поиска или фильтры</p>
	</div>
	<Pagination
		:current-page='currentPage'
		:total-pages='totalPages'
		:filter='filterQuery'
		:search-term='searchQuery'
	/>
</template>

<style lang="scss" module scoped>
	.gridMode {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 2rem;
		padding-bottom: 5rem;
	}

	.listMode {
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: 2rem;
		padding-bottom: 5rem;
	}

	@media (max-width: $size-md) {
		.gridMode {
			grid-template-columns: 1fr;
			grid-template-rows: repeat(4, 1fr);
		}
	}
</style>