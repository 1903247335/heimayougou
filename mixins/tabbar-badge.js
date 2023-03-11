export default {

	data() {
		return {};
	},
	computed: {
		total() {
			return this.$store.getters['modulecart/getTotal']
		}
	},
	watch: {
		total() {
			this.setBadege()
		}
	},
	onShow() {

		this.setBadege()
	},

	methods: {
		setBadege() {
			console.log(this.total)
			uni.setTabBarBadge({
				index: 2,
				text: this.total.toString()
			})

		},
	}
}
