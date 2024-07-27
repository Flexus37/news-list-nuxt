export type ViewMode = 'grid' | 'list';

interface IState {
	viewMode: ViewMode;
}

const defaultValue: IState = {
	viewMode: 'grid'
}

export const useViewModeStore = defineStore('viewMode', {
	state: () => defaultValue,
	getters: {
		get: state => state.viewMode
	},
	actions: {
		change(viewMode: ViewMode) {
			this.$patch({viewMode})
			localStorage.setItem('viewMode', viewMode);
		}
	}
})