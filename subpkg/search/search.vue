<template>
	<view>
		<uni-search-bar :focus="true" @input="input" class="search">

		</uni-search-bar>
		<view class="suggest" v-if="context.length!==0">
			<view class="suggest-item" v-for="(value,index) in suggestList" :key="index"
				@click="handleClick(value.goods_id)">
				<view class="left">
					{{value.goods_name}}
				</view>
				<view class="right">
					<uni-icons type="right" size="12"></uni-icons>
				</view>
			</view>
		</view>
		<view class="history" v-else>
			<view class="history-top">
				<view class="left">
					<text>搜索历史</text>
				</view>
				<view class="right">
					<uni-icons type="trash-filled" size="24" @click="clear"></uni-icons>
				</view>
			</view>
			<view class="history-context">
				<uni-tag class="history-item" v-for="(value,index) in historyList" @click='gotoGoodsList(value)'
					:key=" index" :text="value">
				</uni-tag>
			</view>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '123456',
				context: '',
				contain: null,
				suggestList: [],
				historyList: []
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('storage') || '[]')
		},
		methods: {
			clear() {
				this.historyList = []
				uni.setStorageSync('storage', '[]')
			},
			handleClick(id) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
				})
			},
			input(res) {
				clearTimeout(this.contain)
				this.contain = setTimeout(() => {
					this.context = res
					if (this.context.length !== 0) {

						this.getSuggestionList()
						if (!this.historyList.includes(this.context)) {
							this.historyList.unshift(this.context)
							uni.setStorageSync('storage', JSON.stringify(this.historyList))
						}



					}

				}, 500)

			},
			gotoGoodsList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + item
				})
			},
			async getSuggestionList() {
				const res = await uni.$http.get('/api/public/v1/goods/qsearch?query=' + this.context)

				if (res.data.meta.status !== 200) {
					uni.showMsg()
				}
				this.suggestList = []
				this.suggestList = res.data.message

			}
		}

	}
</script>

<style lang="scss">
	.search {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.suggest-item {
		width: 100%;
		overflow: hidden;
		padding: 10px 5px;

		border-bottom: 1px solid gray;
		white-space: nowrap;
		text-overflow: ellipsis;
		display: flex;

		.right {}

		.left {
			font-size: 14px;
			width: 90%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;

		}
	}

	.history {
		.history-top {
			display: flex;
			padding: 10px;
			border-bottom: 1px gray solid;
			justify-content: space-between;
		}

		.history-item {
			margin: 0 15px;
		}
	}
</style>
