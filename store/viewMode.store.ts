export type ViewMode = 'grid' | 'list';

interface IState {
	viewMode: ViewMode;

  // Количество новостей на страницу
  gridPageSize: number; // в режиме grid
  listPageSize: number; // в режиме list

}

const defaultValue: IState = {
	viewMode: 'grid',
  gridPageSize: 4,
  listPageSize: 3
}

export const useViewModeStore = defineStore('viewMode', {
	state: () => defaultValue,
	getters: {
		get: state => state.viewMode,
    pageSize: (state) => state.viewMode === 'grid'
    ? state.gridPageSize
    : state.listPageSize
	},
	actions: {
		change(viewMode: ViewMode) {
			this.$patch({viewMode})
			localStorage.setItem('viewMode', viewMode);
		}
	}
})