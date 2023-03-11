<template>
	<view class="page">
		<view class="cart-contain" v-if="cart.length!==0">
			<view class="top-info">
				<my-address></my-address>
			</view>
			<view class="cart-box">
				<view class="title-cart">
					<uni-icons type="shop" size="18"></uni-icons>
					<text>购物车</text>
				</view>
				<uni-swipe-action>
					<view class="cart-list" v-for="(item,index) in $store.state.modulecart.cart" :key="index">
						<uni-swipe-action-item :right-options="options" @click="goodsDel(item)">

							<my-goods :isCart="true" :goods="item" @radio-change="radioChange"
								@number-change="numberChange">
							</my-goods>

						</uni-swipe-action-item>
					</view>
				</uni-swipe-action>

			</view>
			<view class="bottom-nav">
				<my-settle></my-settle>
			</view>
		</view>
		<view class="cart-empty" v-else>
			<image src="../../static/cart_empty@2x.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import badge from "@/mixins/tabbar-badge"
	export default {
		data() {
			return {
				goods_list: this.$store.state.modulecart.cart,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}]
			};
		},
		computed: {
			cart() {
				return this.$store.state.modulecart.cart
			}
		},
		mixins: [badge],

		methods: {

			radioChange(e) {

				this.$store.commit('modulecart/updateGoodsState', e)

			},
			goodsDel(goods) {

				const arr = this.$store.state.modulecart.cart.filter((item) => {
					return item.goods_id !== goods.goods_id
				})

				this.$store.commit('modulecart/delGoodsList', arr)
			},

			numberChange(e) {
				this.$store.commit('modulecart/updateGoodsCount', e)
			}
		}
	}
</script>

<style lang="scss">
	page,
	.page {
		width: 100%;
		height: 100%;
	}

	.cart-empty {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 90px;
			height: 90px;
		}
	}

	.cart-box {
		margin: 0 10rpx;
	}

	.bottom-nav {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.title-cart {
		display: flex;
		padding: 20rpx 6rpx;
		border-bottom: 1px solid gray;

		text {
			font-size: 14px;
			margin-left: 20rpx;
		}

		uni-icons {}
	}
</style>
