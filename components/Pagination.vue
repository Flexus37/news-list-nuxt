<script setup lang="ts">
import type { Filter } from '~/types/types'

const props = defineProps<{
	currentPage: number,
	totalPages: number,
	filter: Filter,
	searchTerm: string
}>();

const { currentPage, totalPages, filter, searchTerm } = toRefs(props);

// Получение массива с страницами для пагинации
const pages = computed(() => {
	if (totalPages.value <= 1) {
		return [];
	}

	const delta = 2;
	const range = [];
	const rangeWithDots = [];
	let l;

	if (isNaN(currentPage.value)) {
		for (let i = 1; i <= totalPages.value; i++) {
			range.push(i);
		}
		return range;
	}

	range.push(1);

	for (let i = currentPage.value - delta; i <= currentPage.value + delta; i++) {
		if (i < totalPages.value && i > 1) {
			range.push(i);
		}
	}
	range.push(totalPages.value);

	for (let i of range) {
		if (l) {
			if (i - l === 2) {
				rangeWithDots.push(l + 1);
			} else if (i - l !== 1) {
				rangeWithDots.push('...');
			}
		}
		rangeWithDots.push(i);
		l = i;
	}

	return rangeWithDots;
})

</script>

<template>
	<div :class="$style.pagination">
		<div :class="$style.paginationInner">
			<NuxtLink
				v-for='(page, index) in pages'
				:key='index'
				:to='{
          path: `/${page}`,
          query: {
            filter: filter,
            search: searchTerm
          }
        }'
				:class="`${$style.pageLink} ${currentPage === page ? $style.active : ''}`"
				:replace='true'
			>{{ page }}</NuxtLink>
		</div>
	</div>
</template>

<style lang="scss" module scoped>
	.pagination {
		display: flex;
		width: 100%;
		justify-content: center;

		margin-bottom: 5rem;
	}

	.paginationInner {
		display: flex;
		gap: 2.3rem;
		flex-wrap: wrap;
	}

	.pageLink {
		font-size: 1.8rem;
		font-weight: bold;
		color: $color-text;
		text-decoration: none;

		transition: color .1s ease-in-out;

		&:hover {
			color: $color-blue;
		}
	}

	.active {
		color: $color-blue;
	}
</style>