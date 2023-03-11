<template>
	<view class="cart-item" @click="gotoDetail(goods)">
		<view class="left">
			<label class="radio" v-if="isCart">
				<radio :checked="goods.goods_state" color="#7b0000" @click="radioHandle(goods)" /><text></text>
			</label>

			<view class="img">
				<image :src="goods.goods_big_logo" mode=""></image>

			</view>
		</view>

		<view class="good-info">
			<text class="good-name">{{goods.goods_name}}</text>
			<view class="bottom">


				<text class="good-price">${{goods.goods_price}}</text>
				<uni-number-box :min="1" class="number-box" :value="goods.goods_count" v-if="isCart" @blur="blur"
					@focus="focus" @change="changeValue" />

			</view>

		</view>

	</view>
</template>

<script>
	export default {
		name: "my-goods",
		props: ["goods", "isCart"],


		data() {
			return {

			};

		},
		methods: {
			blur(event) {
				const number = parseInt(event.detail.value)

				if (!number) {
					event.detail.value = 1
				}
				this.goods.goods_count = event.detail.value
				this.$store.commit('modulecart/updateGoodsCount', {
					goods_id: this.goods.goods_id,
					goods_state: this.goods.goods_count
				})
			},
			gotoDetail(item) {
				console.log(this.$store)
				if (!this.isCart) {
					uni.navigateTo({
						url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
					})
				}
			},
			radioHandle(goods) {
				this.$emit('radio-change', {
					goods_id: goods.goods_id,
					goods_state: goods.goods_state
				})


			},

			changeValue(e) {
				this.$emit('number-change', {
					goods_id: this.goods.goods_id,
					goods_count: e
				})
			}
		}
	}
</script>

<style lang="scss">
	.cart-item {
		margin-bottom: 20rpx;
		display: flex;

		.left {
			display: flex;
			align-items: center;
		}

		image {
			width: 250rpx;
			height: 250rpx;
		}

		.good-info {
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.bottom {
				display: flex;
				justify-content: space-between;

			}
		}

		.good-price {
			font-size: 18px;
			color: #be4e31;
		}

	}
</style>
