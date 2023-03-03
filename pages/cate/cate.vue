<template>
	<view>
		<view class="scroll-view-contain">
			<scroll-view scroll-y="true" :style="{height:height+'px'}" class="scroll-left">
				<view :class="['left-scroll-item',index===leftActive?'active':'']" v-for="(item,index) in cateList"
					:key="index" @click="handleLeft(index)">
					{{item.cat_name}}
				</view>

			</scroll-view>
			<scroll-view scroll-y="true" class="scroll-right" :style="{height:height+'px'}" :scrollTop="scrollTop">
				<view class="right-level2" v-for="(value,index) in cateChildren">
					<view class="right-title">{{value.cat_name}}</view>
					<view class="right-level3">
						<view class="right-scroll-item" v-for="(children,i2) in value.children"
							@click="gotGoodsList(children)">
							<image :src="children.cat_icon"></image>
							<text>{{children.cat_name}}</text>
						</view>
					</view>

				</view>



			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height: 0,
				cateList: [],
				leftActive: 0,
				cateChildren: [],
				scrollTop: 0
			}

		},
		onLoad() {
			this.getHeight()
			this.getCateList()

		},
		methods: {
			getHeight() {
				const res = uni.getSystemInfoSync()
				this.height = res.windowHeight
			},
			async getCateList() {
				const res = await uni.$http.get('/api/public/v1/categories')

				if (res.data.meta.status !== 200) {
					return uni.$showMsg()
				}

				this.cateList = res.data.message
				this.cateChildren = this.cateList[0].children

			},
			handleLeft(item) {
				this.leftActive = item

				this.cateChildren = this.cateList[item].children

				this.scrollTop = this.scrollTop === 0 ? 1 : 0

			},
			gotGoodsList(item) {

				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			}

		}
	}
</script>

<style lang="scss">
	.scroll-view-contain {
		display: flex;

		.scroll-left {
			width: 120px;

			.left-scroll-item {
				line-height: 60px;
				text-align: center;
				background-color: #f2f2f2;
				position: relative;

				&.active {
					background-color: white;

					&:before {
						content: '';
						display: block;
						width: 5px;
						height: 30px;
						background-color: red;
						border-radius: 10px;
						position: absolute;
						top: 15px;
					}
				}
			}

		}

		.scroll-right {



			.right-title {
				text-align: center;
				margin-bottom: 15px;
			}

			.right-level3 {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
			}

			.right-scroll-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 33%;

				image {
					width: 60px;
					height: 60px;
				}

				text {
					text-align: center;
				}
			}
		}
	}
</style>
