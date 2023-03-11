<template>
	<view class="box">
		<view class="address" v-if="JSON.stringify($store.state.moduleaddress.address)==='{}'">
			<button type="primary" size="mini" @click="chooseAddress">请选择收货地址</button>
		</view>
		<view class="address-info" v-else @click="chooseAddress">
			<view class="info-top">
				<view class="left">
					<text>收货人:{{address.userName}}</text>
				</view>

				<view class="right">
					<text>电话:{{address.telNumber}}</text>
					<uni-icons type="right"></uni-icons>
				</view>

			</view>
			<view class="info-bottom">
				<text>收货地址:{{address.provinceName}}{{address.cityName}}{{address.countyName}}</text>
			</view>
		</view>
		<image src="@/static/cart_border@2x.png" mode=""></image>
	</view>
</template>

<script>
	export default {
		name: "my-address",
		data() {
			return {
				address: {}
			};
		},
		computed: {
			address() {
				return this.$store.state.moduleaddress.address
			}
		},
		methods: {
			async chooseAddress() {
				const res = await uni.chooseAddress()
				this.$store.commit('moduleaddress/updateAddress', res)

			}
		}
	}
</script>

<style lang="scss">
	.box {


		.address {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 150rpx;
		}

		.address-info {
			padding: 20rpx 10rpx;
			font-size: 12px;
			letter-spacing: 2px;

			.info-top {
				display: flex;
				justify-content: space-between;
			}
		}

		image {
			display: block;
			height: 5px;
			width: 100%;
		}


	}
</style>
