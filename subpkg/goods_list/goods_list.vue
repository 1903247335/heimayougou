<template>
	<view>
		<view class="goods-List">
			<view class="goods-item" v-for="(item,index) in goodlist" :key="index" @click="gotoDetail(item)">
				<view class="goods-left">
					<image :src="item.goods_small_logo" mode=""></image>
				</view>
				<view class="goods-right">
					<text class="title">{{item.goods_name}}</text>
					<text class="price">${{item.goods_price}}</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				query: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 20
				},
				total: 0,
				goodlist: [],
				isLoading: false
			}
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		onLoad(option) {
			this.query.query = option.query || ''
			this.query.cid = option.cid || ''
			this.getGoodsList()
		},

		methods: {
			gotoDetail(item) {
				console.log(item.goods_id)
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			async getGoodsList(fun) {

				this.isLoading = true
				const res = await uni.$http.get('/api/public/v1/goods/search', this.query)
				this.goodlist = [...this.goodlist, ...res.data.message.goods]
				this.total = res.data.message.total
				this.isLoading = false
				console.log(fun)
				fun && fun()




			},

		},
		onReachBottom() {
			if (!this.isLoading && (this.total >= this.query.pagenum * this.query.pagesize)) {
				uni.$showMsg("加载中")
				this.query.pagenum += 1
				this.getGoodsList()

			} else {
				uni.$showMsg("加载完毕")
			}

		},
		onPullDownRefresh() {

			this.query.pagenum = 1
			this.query.pagesize = 0
			this.goodlist = []
			this.getGoodsList(uni.stopPullDownRefresh)
		}
	}
</script>

<style>
	.goods-item {
		display: flex;

	}

	.goods-left image {
		width: 240rpx;
		height: 240rpx;
	}

	.goods-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 5px;
	}

	.title {
		font-size: 12px;
	}

	.price {
		color: red;
	}
</style>
