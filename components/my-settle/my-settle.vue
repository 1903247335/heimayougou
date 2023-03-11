<template>
	<view class="bottom-contain">
		<view class="left">
			<label class="radio">
				<radio value="" color="#7b0000" :checked="checkchoose" @click="chooseAll" /><text>全选</text>
			</label>
		</view>
		<view class="amount">
			合计<text>${{checkcheck}}</text>
		</view>
		<view class="right">
			结算({{checkcount}})
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-settle",
		computed: {
			checkcount() {
				return this.$store.getters['modulecart/checkCount']
			},
			checkcheck() {
				return this.$store.getters['modulecart/checkCheck']
			},
			checkchoose() {
				return this.$store.getters['modulecart/checkAllChoose']
			},

		},

		data() {
			return {};
		},
		methods: {
			chooseAll() {
				let all

				const result = this.$store.state.modulecart.cart.every((item) => {
					return item.goods_state
				})

				if (result) {
					all = this.$store.state.modulecart.cart.map((item) => {

						item.goods_state = false
						return item
					})

				} else {
					all = this.$store.state.modulecart.cart.map((item) => {
						item.goods_state = true
						return item
					})

				}

				this.$store.commit('modulecart/updateGoodsList', all)

			}
		}
	}
</script>

<style lang="scss">
	.bottom-contain {
		display: flex;
		align-items: center;

		.radio {
			flex: 2;

			text {
				color: #ac0e00;
			}
		}

		.amount {
			flex: 3;
			text-align: center;
		}

		.right {
			flex: 2;
			text-align: center;
			line-height: 100rpx;
			background: #ac0e00;
			height: 100rpx;
			color: white;

		}
	}
</style>
