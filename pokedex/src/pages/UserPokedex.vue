<script>
import LeftBar from '@/components/LeftBar.vue'
import RightButtons from '@/components/RightButtons.vue'
import fetchPokemons from '@/services/fetchPokemons'
import axios from 'axios'

export default {
    data() {
        return {
            pokemons: [],
            currentPage: 0,
            dataLoaded: false
        }
    }, 
    async beforeMount() {
        await this.fetchAllPokemons()
        this.dataLoaded = false
        await this.loadPokemons() 
        setTimeout(() => {
                    this.dataLoaded = true
        }, 500)
    },
    components: {
        LeftBar,
        RightButtons,
    },
    methods: {
        async fetchAllPokemons(page = this.currentPage) {
            try {
                const response = await fetchPokemons(page)
                this.pokemons = response.content
            } catch (error) {
                console.error('Error fetching random Pokemon:', error)
            }
        },
        async fetchNextPage() {
            this.currentPage++
            await this.fetchAllPokemons()
            this.dataLoaded = false
            await this.loadPokemons() 
            setTimeout(() => {
                    this.dataLoaded = true
            }, 500)
        },
        async fetchPrevPage() {
            if (this.currentPage >= 1) {
                this.currentPage--
                await this.fetchAllPokemons()
                this.dataLoaded = false
                await this.loadPokemons() 
                setTimeout(() => {
                    this.dataLoaded = true
                }, 500)
            }
        },
        async loadPokemons() {
            try {
                const token = JSON.parse(localStorage.getItem('auth')).user.token
                const response = await axios.get('http://localhost:8080/api/pokedex', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const pkmSeen = response.data.pokedexPokemon
                this.pokemons = this.pokemons.map(pokemon => {
                    const seen = pkmSeen.some(pkm => pkm.pokemonId === pokemon.pokemonId)
                    const pkmcaptured = pkmSeen.some(pkm => pkm.pokemonId === pokemon.pokemonId && pkm.captured)
                    if (seen) {
                        const pokemonName = pokemon.name.length >= 10 ? `${pokemon.name.slice(0, 5)}...` : pokemon.name
                        return { ...pokemon, name: pokemonName, captured: pkmcaptured }
                    } else {
                        return { ...pokemon, name: '????' }
                    }
                })
            } catch (error) {
                console.error('Error while loading Pokemon names:', error)
                this.pokemons = []
            }
        },
        infoPokemon(id, name) {
            name != '????'
                ? this.$router.push({ path: `/pokedex/${id}` })
                : ''
        },
    }
}
</script>


<template>
    <LeftBar/>
    <article class="screen">
        <ul class="screen__list" v-if="dataLoaded">
            <li v-for="pokemon in pokemons" :key="pokemon.pokemonId" class="screen__list--element" @click="infoPokemon(pokemon.pokemonId, pokemon.name)">
                    <img class="screen__list--img" :src="pokemon.img" :alt="pokemon.name" :class="{ 'black-filter': pokemon.name === '????', 'captured' : pokemon.captured, 'seen' : pokemon.name != '????' && !pokemon.captured }">
                    <p class="screen__list--name">{{ pokemon.name }}</p>
            </li>
        </ul>
        <h1 class="screen__loadingTitle" v-else>Loading...</h1>
    </article>
    <RightButtons @next-page="fetchNextPage" @prev-page="fetchPrevPage"/>
</template>


<style lang="css" scoped>
    .screen {
        width: 69vw;
        border: 5vh solid #FF321D;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        & .screen__loadingTitle{
                color: #fff;
                text-transform:uppercase;
            }

        & .screen__list {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            list-style: none;
            padding: 0;

            & .screen__list--element {
                width: 15vw;
                display: flex;
                flex-direction: row;
                align-items: center;
                background-color: #D9D9D9;
                margin: .5vh;
                box-shadow: inset 0 0 10px #FF321D;
                text-transform: capitalize;
                border-radius: 5px;
                cursor: pointer;

                & .screen__list--img {
                    width: 4vw;
                    height: 4vw;
                    display: inline;
                }

                & .captured{
                    filter: none;
                }

                & .seen {
                    filter: grayscale(100%);
                }

                & .black-filter{
                    filter: brightness(0);
                }

                & .screen__list--name {
                    font-size: 2vw;
                    margin: 0 1vw;
                    display: inline;
                }
            }
        }
    }

    @media screen and (max-width: 425px){
        .screen {
            width: 100vw;
            position:relative;

            & .screen__list {
                height: 66vh;
                position: absolute;
                top: 2vw;
                overflow: scroll;

                & .screen__list--element{
                    width: 65vw;
                    height: 4.05vh;

                    
                    & .screen__list--img {
                        width: 10vw;
                        height: 10vw;
                    }

                    & .screen__list--name {
                        font-size: 1em;
                    }
                }

            }
        }
    }

    @media screen and (max-width: 320px){
        .screen {

            & .screen__list {
                height:71vh;
                & .screen__list--element{
                width: 55vw;
                }
            }
        }
    }
</style>