import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { UserInfo } from '@/api/types/common'
import { setItem, getItem } from '@/utils/storage'
import { USER } from '@/utils/constant'

const state = {
  count: 0,
  isCollapse: false,
  user: getItem<UserInfo>(USER)
}

export type State = typeof state

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol('store')

// 创建一个新的 store 实例
const store = createStore<State>({
  state,
  mutations: {
    increment (state) {
      state.count++
    },
    setIsCollapse (state, payload) {
      state.isCollapse = payload
    },
    setUser (state, payload) {
      state.user = payload
      setItem(USER, state.user)
    }
  }
})

export const useStore = () => baseUseStore(key)

export default store
