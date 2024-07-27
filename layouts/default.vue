<template>
	<div class='container'>
		<Header />
	</div>
	<main>
		<div class='container'>
			<hr class='line' />
			<Toolbar />
			<slot />
		</div>
	</main>
</template>

<style lang='scss'>
	.container {
		max-width: 106rem;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.line {
		border: none;
		border-top: .1rem solid $color-gray;
		margin-bottom: 2.6rem;
	}
</style>