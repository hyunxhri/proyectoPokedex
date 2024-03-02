import { createRouter, createWebHashHistory } from 'vue-router'
import LoginRegisterPage from '@/pages/LoginRegisterPage.vue'
import isAuthenticatedGuard from './authGuard'
import isPokemonSeenGuard from './isPokemonSeenGuard'

const routes = [
    { path: '/', name: "login", beforeEnter: [isAuthenticatedGuard], component: LoginRegisterPage },
    { path: '/explore', name: "explore", beforeEnter: [isAuthenticatedGuard], component: () => import('@/pages/SearchPokemon.vue') },
    { path: '/profile', name: "profile", beforeEnter: [isAuthenticatedGuard], component: () => import('@/pages/UserProfile.vue') },
    { path: '/pokedex', name: "pokedex", beforeEnter: [isAuthenticatedGuard], component: () => import('@/pages/UserPokedex.vue') }, 
    { path: '/pokedex/:id', name: "pokemonInfo", beforeEnter: [isAuthenticatedGuard, isPokemonSeenGuard], component: () => import('@/pages/PokemonInfo.vue') }, 
    { path: '/contact', name: "contact", component: () => import('@/pages/ContactPage.vue') },
    { path: '/:pathMatch(.*)*', name:"error", component: () => import('@/pages/NoPageFound.vue')} 

]

const router = createRouter({ 
    history: createWebHashHistory(),
    routes, 
})

export default router