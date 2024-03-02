import { defineStore } from 'pinia'
import axios from 'axios'

export const usePokemonSeenStore = defineStore('pokemonSeen', {
  state: () => ({
    pokemonSeenList: []
  }),
  actions: {
    async checkPokemonSeen(id) {
        return this.pokemonSeenList.some(pokemon => pokemon.pokemonId === id)
    },
    async loadPokemonSeen() {
      try {
        const token = JSON.parse(localStorage.getItem('auth')).user.token
        const response = await axios.get("http://localhost:8080/api/pokedex", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.pokemonSeenList = response.data.pokedexPokemon
      } catch (error) {
        console.error(error)
      }
    }
  }
})
