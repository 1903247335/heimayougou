import {
	createStore
} from 'vuex'
import modulecart from "@/store/cart.js"
import moduleaddress from "@/store/address.js"
//Vuex.Store 构造器选项
const store = createStore({
	modules: {
		modulecart,
		moduleaddress
	},
})
export default store
