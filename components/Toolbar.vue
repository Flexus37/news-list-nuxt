<script lang="ts" setup>
import type { ViewMode } from '~/store/viewMode.store'
import type { Filter } from '~/types/types'

const route = useRoute();
const router = useRouter();

const viewMode = useViewModeStore();

const currentFilter = ref<Filter>('все');

// Получение режима отображения из localStorage
onMounted(() => {
	const savedViewMode = localStorage.getItem('viewMode') as ViewMode;
	if (savedViewMode) {
		viewMode.change(savedViewMode)
	}

	// Получение фильтра из query params и запись его в ref-объект
	const filterFromQuery = route.query.filter as Filter;
	if (filterFromQuery) {
		currentFilter.value = filterFromQuery;
	}
})

// Отслеживание изменений у query params filter
watch(
  () => route.query.filter as Filter,
  (newFilter: Filter) => {
    currentFilter.value = newFilter;
  }
);

// Изменение фильтра и запись в query params
const handleChangeFilter = (filterName: Filter) => {
	currentFilter.value = filterName;
	router.push({
		path: '/1',
		query: {
			...route.query,
			filter: filterName
		}
	})
}

// Изменение режима отображение, запись его в store, запись в query params
const handleChangeViewMode = (viewModeParam: ViewMode) => {
	viewMode.change(viewModeParam);
	router.push({
		path: '/1',
		query: {
			filter: currentFilter.value,
			search: route.query.search
		}
	})
}
</script>


<template>
	<div :class="$style.toolbar">
		<ul :class="$style.filter">
			<li
				:class="currentFilter === 'все' ? $style.active : ''"
				@click="handleChangeFilter('все')"
			>
				Все
			</li>
			<li
				:class="currentFilter === 'lenta.ru' ? $style.active : ''"
				@click="handleChangeFilter('lenta.ru')"
			>
				Lenta.ru
			</li>
			<li
				:class="currentFilter === 'mos.ru' ? $style.active : ''"
				@click="handleChangeFilter('mos.ru')"
			>
				Mos.ru
			</li>
		</ul>
		<div :class="$style.viewMode">
			<button :class="viewMode.get === 'list' ? $style.active : ''" @click="handleChangeViewMode('list')">
				<svg :class="$style.icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="18" height="8" fill="currentColor"/>
					<rect y="10" width="18" height="8" fill="currentColor"/>
				</svg>

			</button>
			<button :class="viewMode.get === 'grid' ? $style.active : ''" @click="handleChangeViewMode('grid')">
				<svg :class="$style.icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="8" height="8" fill="currentColor"/>
					<rect y="10" width="8" height="8" fill="currentColor"/>
					<rect x="10" width="8" height="8" fill="currentColor"/>
					<rect x="10" y="10" width="8" height="8" fill="currentColor"/>
				</svg>
			</button>
		</div>
	</div>
</template>

<style lang="scss" module scoped>
	.toolbar {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2.7rem;
	}

	.filter {
		display: flex;
		gap: 1.6rem;
		list-style-type: none;

		li {
			font-size: 1.4rem;
			font-weight: bold;
			color: $color-blue;
			cursor: pointer;

			&.active {
				color: $color-text;
			}
		}
	}

	.viewMode {
		display: flex;
		gap: 1rem;

		button {
			cursor: pointer;

			&.active {
				.icon {
					color: $color-blue;
				}
			}
		}
	}

	.icon {
		color: $color-gray;
	}
</style>