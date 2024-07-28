<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div v-if='error?.statusCode === 404'>
    <h1>{{ error?.statusCode }}</h1>
		<h2>Страница не найдена</h2>
    <NuxtLink to="/1?filter=все">Вернуться на главную</NuxtLink>
  </div>
	<div v-else>
    <h1>{{ error?.statusCode }}</h1>
		<h2>Перезагрузите страницу или попробуйте позже</h2>
  </div>
</template>

<style lang="scss" scoped>
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		height: 100vh;
	}

	h2 {
		margin-bottom: 1rem;
	}

	h1 {
		font-size: 7rem;
		color: $color-blue;
	}
</style>