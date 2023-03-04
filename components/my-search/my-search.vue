<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}" @click="handleClick">
		<view class="my-search-box" :style="{'border-radius':radius+'px'}">
			<view class="search-context">
				<icon type="search" size="16px"></icon>
				<text>搜索</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			bgcolor: {
				default: '#C00000'
			},
			radius: {
				default: 18
			}
		},
		name: "my-search",
		data() {
			return {

			};
		},
		methods: {
			handleClick() {
				console.log('hellow')
				this.$emit('search')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {

		padding: 10px;

		.my-search-box {
			background: white;
			// border-radius: 15px;
			width: 100%;
			height: 30px;
			display: flex;
			justify-content: center;
			align-items: center;

			.search-context {
				font-size: 12px;
				color: #676a67;

				text {
					margin-left: 5px;

				}

			}
		}
	}
</style>
