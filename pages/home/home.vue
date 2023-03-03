<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(value,index) in swiperList">
				<navigator :url="'/subpkg/goods_detail/goods_detail?id='+value.goods_id">

					<image :src="value.image_src"></image>
				</navigator>

			</swiper-item>

		</swiper>
		<view class="nav-list">
			<view v-for="(value,index) in catiems" :key="index" class="nav-item" @click="navClick(value)">
				<image :src="value.image_src" alt=""></image>
			</view>
		</view>
		<view class="floor-list">
			<view class="floor-item" v-for="(value,index) in flootList">
				<image :src="value.floor_title.image_src" mode="" class="floor-title"></image>
				<view class="img-box">

					<navigator class="left-img-box" :url="value.product_list[0].url">
						<image :src="value.product_list[0].image_src"
							:style="{width:value.product_list[0].image_width+'rpx'}" mode="widthFix">
						</image>

					</navigator>


					<view class="right-img-box">

						<navigator :url="item.url" class="right-img-item" v-for="(item,index2) in value.product_list">
							<image v-if="index2!==0" :src="item.image_src" mode="widthFix"
								:style="{width:item.image_width+'rpx'}">
							</image>
						</navigator>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				catiems: [],
				flootList: []
			}
		},
		onLoad() {

			this.getSwiperList()
			this.getCatiems()
			this.getFloatList()
		},
		methods: {
			async getCatiems() {
				const res = await uni.$http.get("/api/public/v1/home/catitems")
				if (res.data.meta.status != 200) {
					return uni.$showMsg()
				}
				this.catiems = res.data.message

			},
			async getSwiperList() {

				const res = await uni.$http.get("/api/public/v1/home/swiperdata")

				if (res.data.meta.status !== 200) {
					return uni.$showMsg('请求失败', 1500)

				}
				uni.$showMsg('成功', 1500)



				this.swiperList = res.data.message

			},
			navClick(item) {
				if (item.name === "分类") { //当点击的时候就会进入该链接
					uni.swithchTab({
						url: '/page/cate/cate'
					})
				}
			},
			async getFloatList() {
				const res = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.data.meta.status != 200) {
					uni.$showMsg()
				}
				res.data.message.forEach(item => {
					item.product_list.forEach(value => {
						value.url = '/subpkg/goods_list/goods_list?' + value.navigator_url.split('?')[
							1]
					})
				})
				this.flootList = res.data.message
				console.log(this.flootList)
			}

		}
	}
</script>

<style lang="scss">
	.nav-list {
		display: flex;
		justify-content: space-around;

		image {
			width: 128rpx;
			height: 140rpx;
		}
	}



	.floor-list {
		.floor-item {
			.floor-title {
				width: 100%;
				height: 60rpx;
			}
		}

		.img-box {
			.right-img-box {
				display: flex;
				flex-wrap: wrap;

				image {
					margin-left: 10px;
				}
			}

			display: flex;


		}


	}
</style>
