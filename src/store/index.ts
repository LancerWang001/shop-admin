import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { UserInfo, Menu } from '@/api/types/common'
import createPersistedState from 'vuex-persistedstate'

const state = {
  isCollapse: false,
  user: null as ({ token: string } & UserInfo) | null,
  menus: [] as Menu[]
}

export type State = typeof state

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol('store')

// 创建一个新的 store 实例
const store = createStore<State>({
  plugins: [createPersistedState()],
  state,
  mutations: {
    setIsCollapse (state, payload) {
      state.isCollapse = payload
    },

    setUser (state, payload) {
      state.user = payload
    },

    setMenus (state, payload) {
      state.menus = payload
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}

export default store
