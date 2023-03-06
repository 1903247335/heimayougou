<template>
	<view>
		<view class="swiper-contain">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,index) in goodsdeatil.pics" :key="index">
					<image :src="item.pics_big" mode="widthFix" @click="preview(index)"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="goods-info-box">
			<view class="price">
				${{goodsdeatil.goods_price}}
			</view>
			<view class="goods-info-body">
				<view class="goods-name">
					{{goodsdeatil.goods_name}}
				</view>
				<view class="favi">
					<uni-icons type="star" size="20"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">
				快递 : 免运费
			</view>
		</view>
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsdeatil: {},
				options: [{
						text: '客服',
						icon: 'headphones'
					}, {
						text: '店铺',
						icon: 'shop',

					},

					{
						text: '购物车',
						icon: 'cart',
						info: '2'
					}
				],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff1c03',
						color: 'white'
					},
					{
						text: '立即购买',
						backgroundColor: '#f09100',
						color: 'white'
					}
				]
			};
		},
		onLoad(options) {

			this.getGoodsDetail(options.goods_id)
		},
		methods: {
			async getGoodsDetail(id) {
				const res = await uni.$http.get('/api/public/v1/goods/detail?goods_id=' + id)
				this.goodsdeatil = res.data.message
				console.log(res)
			},
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			preview(index) {
				uni.previewImage({
					current: index,
					urls: this.goodsdeatil.pics.map(item => item.pics_big)
				})
			}
		}
	}
</script>

<style lang="scss">
	.swiper-contain swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}

	}

	.goods-info-box {
		margin-top: 40rpx;
	}



	.price {
		font-size: 25px;
		color: red;
		margin-bottom: 40rpx;
	}

	.goods-info-box {
		margin: 20rpx;
	}

	.goods-info-body {
		display: flex;

	}

	.goods-name {
		width: 85%;
		border-right: 1px solid gray;
	}

	.favi {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		text {
			font-size: 14px;
		}
	}

	.yf {

		font-size: 12px;
		color: #c8c8c8;
	}

	.goods-nav {
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 999;

	}
</style>
