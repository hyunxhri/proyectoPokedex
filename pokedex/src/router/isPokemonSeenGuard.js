import { usePokemonSeenStore } from "@/stores/pokemonSeenStore"

const isPokemonSeenGuard = (to, from, next) => {
    const id = parseInt(to.params.id)
    const pokemonSeenStore = usePokemonSeenStore()
    pokemonSeenStore.loadPokemonSeen().then(() => {
      pokemonSeenStore.checkPokemonSeen(id).then((seen) => {
        if (seen) {
          next()
        } else {
          next('/explore')
        }
        })
    })
}

export default isPokemonSeenGuard
