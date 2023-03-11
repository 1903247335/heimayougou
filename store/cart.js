export default {
	namespaced: true,
	state: {
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	},
	mutations: {
		addToCart(state, goods) {
			const result = state.cart.find((item) => {
				return item.goods_id === goods.goods_id
			})

			if (result) {
				result.goods_count++
			} else {

				goods.goods_count = 1
				state.cart.push(goods)
			}

		},
		delGoodsList(state, arr) {
			state.cart = arr
			this.commit('modulecart/saveStorage')
		},
		saveStorage(state) {
			uni.setStorageSync("cart", JSON.stringify(state.cart))
		},
		updateGoodsList(state, arr) {
			state.cart = arr
			this.commit('modulecart/saveStorage')
		},
		updateGoodsState(state, goods) {
			const result = state.cart.find((item) => {
				return item.goods_id === goods.goods_id
			})
			if (result) {
				result.goods_state = !goods.goods_state
				this.commit('modulecart/saveStorage')
			}
		},
		updateGoodsCount(state, goods) {
			const result = state.cart.find((item) => {

				return item.goods_id === goods.goods_id
			})
			if (result) {

				result.goods_count = goods.goods_count

				this.commit('modulecart/saveStorage')
			}
		},

	},
	getters: {
		getTotal(state) {
			return state.cart.filter((item) => {
				return item.goods_state
			}).reduce((pre, cur) => {


				return pre += cur.goods_count
			}, 0)
		},
		checkCount(state) {
			return state.cart.filter((item) => {
				return item.goods_state
			}).reduce((pre, cur) => {


				return pre += cur.goods_count
			}, 0)
		},
		checkCheck(state) {
			return state.cart.filter((item) => {
				console.log(item)
				return item.goods_state
			}).reduce((pre, cur) => {
				return pre += cur.goods_price * cur.goods_count
			}, 0)
		},
		checkAllChoose(state) {
			return state.cart.every((item) => {
				return item.goods_state
			})
		}
	}
}
