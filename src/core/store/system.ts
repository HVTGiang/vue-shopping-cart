import { TOKEN_LOCAL_KEY } from '@/core/constants/app'
import localStorageHandle from '@/core/helper/localHandler'
import { defineStore } from 'pinia'

interface IState {
  userToken: string | undefined
  loading: boolean
}

export const useSystem = defineStore('system', {
  state: (): IState => {
    return {
      userToken: '',
      loading: false
    }
  },
  getters: {
    isSignedIn: (state) => {
      return state.userToken || localStorageHandle('get', TOKEN_LOCAL_KEY)
    }
  },
  actions: {
    setToken(payload: string) {
      this.userToken = payload
      localStorageHandle('set', TOKEN_LOCAL_KEY, payload)
    },
    removeToken() {
      this.userToken = undefined
      localStorageHandle('remove', TOKEN_LOCAL_KEY)
    },
    setSystemLoading(payload: boolean) {
      this.loading = payload
    }
  }
})
