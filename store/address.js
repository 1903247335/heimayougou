export default {
	namespaced: true,
	state: {
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	},
	mutations: {
		updateAddress(state, address) {
			state.address = address
			this.commit('moduleaddress/saveAddress')
		},
		saveAddress(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		}
	},
	actions: {

	}
}
