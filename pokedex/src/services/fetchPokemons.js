async function fetchPokemons(page = 0) {
    try {
        const response = await fetch(`http://localhost:8080/api/pokemons?page=${page}`)
        if (!response.ok) {
            throw new Error('Failed to fetch all Pokemons')
        }
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error('Error fetching Pokemons:', error)
    }
}

export default fetchPokemons