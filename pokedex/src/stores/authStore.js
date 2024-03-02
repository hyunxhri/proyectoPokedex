import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router/Router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    async logIn(username, password) {
        await axios.post("http://localhost:8080/api/users/login", {
            username: username,
            password: password
        }).then(response => {
            console.log(response)
            this.isAuthenticated = true
            this.user = { username: username, token: response.data.token }
            router.push({path: '/explore'})
        }).catch(error => {
            console.log(error)
        })
      },
    logOut() {
      this.isAuthenticated = false;
      this.user = null;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      { key: "auth",
        storage: localStorage
      }
    ]
  }
})
