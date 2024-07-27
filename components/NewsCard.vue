<script lang="ts" setup>

interface IRssItem {
	title: string;
	link: string;
	source: string;
	pubDate: Date;
	description?: string;
	enclosure: { url: string };
}

const props = defineProps<IRssItem>()

const stringDate = props.pubDate.toLocaleDateString();

const viewMode = useViewModeStore();
</script>

<template>
	<div v-if="viewMode.get === 'grid'" :class="$style.card">
		<div :class="$style.cardGridMode">
			<h2>
				<a
					:href="props.link"
					target="_blank"
					rel="noopener noreferrer"
				>{{props.title}}</a>
			</h2>
			<p>{{props.description}}</p>
			<a
				:class="$style.newsLink"
				:href="props.link"
				target="_blank"
				rel="noopener noreferrer"
			>Подробнее</a>
			<div :class="$style.metaInfo">
				<div :class="$style.metaInfoInner">
					<a
						:class="$style.resourceLink"
						target="_blank"
						rel="noopener noreferrer"
					>{{props.source}}</a>
					<time :datetime="stringDate">{{stringDate}}</time>
				</div>
			</div>
		</div>
	</div>

	<div v-else :class="$style.card">
		<div :class="$style.cardListMode">
			<div :class="$style.cardListModeInner">
				<NuxtImg
					:class="$style.image"
					:src='props.enclosure.url'
					alt='Картинка новости'
					:width='338'
					:height='166'
				/>
				<div>
					<h2>
						<a
							:href="props.link"
							target="_blank"
							rel="noopener noreferrer"
						>{{props.title}}</a>
					</h2>
					<p>{{props.description}}</p>
					<a
						:class="$style.newsLink"
						:href="props.link"
						target="_blank"
						rel="noopener noreferrer"
					>Подробнее</a>
				</div>
			</div>
			<div :class="$style.metaInfo">
				<div :class="$style.metaInfoInner">
					<a
						:class="$style.resourceLink"
						:href='props.source'
						target="_blank"
						rel="noopener noreferrer"
					>{{props.source}}</a>
					<time :datetime="stringDate">{{stringDate}}</time>
				</div>
			</div>
		</div>

	</div>
</template>

<style lang="scss" module scoped>
	.card {
		position: relative;
		width: 100%;
		padding: 3rem 3rem 0;
		background-color: $color-white;
		box-shadow: $shadow-1,$shadow-2;
		border-radius: .3rem;

		time {
			font-size: 1.4rem;
			font-weight: normal;
			line-height: 2rem;
			color: $color-gray;
		}
	}

	.cardGridMode {
		h2 {
			margin-bottom: 2.5rem;

			a {
				font-size: 1.8rem;
				font-weight: bold;
				text-decoration: none;
				color: $color-blue;
				line-height: 2.2rem;
			}
		}

		p {
			margin-bottom: 2rem;
		}

		.newsLink {
			display: block;
			margin-bottom: 5.5rem;
		}

		.metaInfo {
			display: block;
			width: 100%;
			border-radius: .3rem;

			position: absolute;
			left: 0;
			bottom: 0;

			&Inner {
				padding: 0rem 3rem 1.6rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}

	.cardListMode {
		margin-bottom: 5.9rem;

		h2 {
			margin-bottom: 2rem;

			a {
				font-size: 1.8rem;
				font-weight: bold;
				text-decoration: none;
				color: $color-blue;
				line-height: 2.2rem;
			}
		}

		p {
			margin-bottom: 2rem;
		}

		&Inner {
			display: grid;
			grid-template-columns: 20rem 1fr;
			gap: 3rem;
		}

		.newsLink {
			display: none;
		}

		.metaInfo {
			display: block;
			width: 100%;
			border-radius: .3rem;

			background-color: $color-white-gray;

			position: absolute;
			left: 0;
			bottom: 0;

			&Inner {
				padding: .4rem 2.2rem .4rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}

	.resourceLink {
		color: $color-gray;
	}

	.image {
		object-fit: cover;
		width: 20rem;
		height: 10rem;
	}

	@media (max-width: $size-md) {
		.card {
			padding: 2rem 2.2rem 0;
		}

		.cardGridMode {
			.newsLink {
				display: block;
				margin-bottom: 4.3rem;
			}
		}

		.cardListMode {
			margin-bottom: 0;

			&Inner {
				display: flex;
				flex-direction: column;
				gap: 2rem;
			}
		}

		.image {
			width: 100%;
			height: 16.6rem;;
		}

		.cardGridMode, .cardListMode {
			.newsLink {
				display: block;
				margin-bottom: 4.3rem;
			}

			.metaInfo {
				background-color: $color-white-gray;

				position: absolute;
				left: 0;
				bottom: 0;

				&Inner {
					padding: .4rem 2.2rem .4rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
		}



	@media (max-width: $size-sm) {

		.card {
			padding: 2rem 2.2rem 0;
		}

		.metaInfo {
			background-color: $color-white-gray;

			position: absolute;
			left: 0;
			bottom: 0;

			&Inner {
				padding: .4rem 2.2rem .4rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}

	}
</style>