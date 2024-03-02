async function fetchPokemons(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/pokemons/${id}`)
        if (!response.ok) {
            throw new Error(`Failed to fetch Pokemon with id: ${id}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(`Error fetching Pokemon with id: ${id}`, error)
    }
}

export default fetchPokemons