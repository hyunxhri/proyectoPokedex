import { useAuthStore } from "@/stores/authStore"

const isAuthenticatedGuard = (to, from, next) => {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated && to.name !== 'login') {
        next({ name: 'login' }) 
    } else if (authStore.isAuthenticated && to.name === 'login') {
        next({ name: 'explore' }) 
    } else {
        next()
    }
}

export default isAuthenticatedGuard
