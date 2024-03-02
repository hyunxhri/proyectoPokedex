async function fetchRandomPokemon() {
    try {
        const response = await fetch('http://localhost:8080/api/pokemons/random')
        if (!response.ok) {
            throw new Error('Failed to fetch random Pokemon')
        }
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error('Error fetching random Pokemon:', error)
    }
}

export default fetchRandomPokemon