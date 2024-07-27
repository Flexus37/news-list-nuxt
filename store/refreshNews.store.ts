export const useRefreshNewsStore = defineStore('refresh', {
	state: () => ({
		refreshKey: 0
	}),
	getters: {
		get: state => state.refreshKey
	},
	actions: {
		refresh() {
			this.refreshKey += 1;
		}
	}
})