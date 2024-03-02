<script>
import LeftBar from '@/components/LeftBar.vue'
import RightButtons from '@/components/RightButtons.vue'
import fetchRandomPokemon from '@/services/fetchRandomPokemon'
import axios from 'axios'
import { RouterLink } from 'vue-router'

export default {
    components: {
    LeftBar,
    RightButtons,
    RouterLink
},
    data(){
        return{
            isButtonDisabled: true,
            pokemon: null,
            isCapturedMsg: ''
        }
    },
    methods: {
        async fetchNewPokemon() {
            try {
                this.pokemon = await fetchRandomPokemon();
                const auth = JSON.parse(localStorage.getItem('auth'))
                if (!auth || !auth.user || !auth.user.token) {
                    throw new Error('No se encontró un token de autenticación')
                }
                const token = auth.user.token;
                await axios.put(`http://localhost:8080/api/pokedex/pokemons/${this.pokemon.pokemonId}`, {
                    "seen": true
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            } catch (error) {
                console.error('Error al obtener un nuevo pokemon:', error);
            }
        },
        async tryToCapture() {
            const randomNumber = Math.floor(Math.random() * 100) + 1;
            if (randomNumber < 50) {
                this.isCapturedMsg = "¡Enhorabuena, lo has capturado!"
                const token = JSON.parse(localStorage.getItem('auth')).user.token
                await axios.put(`http://localhost:8080/api/pokedex/pokemons/${this.pokemon.pokemonId}`, {
                    "captured": true
                }, {headers : {
                    'Authorization': `Bearer ${token}` 
                }}).then(() => {
                    setTimeout(() => {
                    this.isCapturedMsg = '',
                    this.fetchNewPokemon()
                }, 2000)
                }).catch(error => {
                    console.log(error)
                })
                
            } else {
                this.isCapturedMsg = "Oh, no, ¡el pokemon ha huido!"
                setTimeout(() => {
                    this.isCapturedMsg = '',
                    this.fetchNewPokemon()
                }, 2000)
            }
        }
    },
    async mounted() {
        await this.fetchNewPokemon()
    }
}
</script>
<template>
    <LeftBar/>
    <article class="screen">
        <section class="screen__capture-pokemon">
            <img class="screen__img" :src="pokemon ? this.pokemon.img : '@/assets/imgs/bulbasaur.png' " alt="pokemon_img">
            <p v-if="isCapturedMsg" class="screen__captured-text">{{ isCapturedMsg }}</p>
            <div class="screen__text-buttons">
                <p class="screen__text-buttons--text">
                    A wild {{ pokemon ? this.pokemon.name : 'Loading...' }} just appeared! <br/>
                </p>
                <button class="screen__text-buttons--button" @click="tryToCapture">Capture</button>
                <button class="screen__text-buttons--button" @click="fetchNewPokemon">Search other</button>
            </div>
        </section>
        <div class="screen__buttons">
            <RouterLink to="/pokedex">
                <button class="screen__buttons--button">Pokedex</button>
            </RouterLink>
            <RouterLink to="/profile">
                <button class="screen__buttons--button">Profile</button>
            </RouterLink>
        </div>
    </article>
    <RightButtons :is-disabled="isButtonDisabled"/>
</template>

<style lang="css" scoped>
    .screen {
        width: 69vw;
        border: 5vh solid #FF321D;
        display: flex;
        flex-direction: column;
        align-items: center;

        & .screen__captured-text{
            font-family: 'Kameron';
            font-weight: 600;
            margin: 5px;
            position: absolute;
            top: 55vh;
        }

        & .screen__capture-pokemon{
            background: #416E6D;
            width: 58vw;
            margin-top: 4vh;
            height: 60vh;
            display: flex;
            align-items: center;
            justify-content: space-around;
            flex-direction: column;

            & .screen__img{
                width: 30vh;
                height: 30vh;
                margin:0 auto;
            }


            & .screen__text-buttons {
                background-color: rgba(255, 255, 255, 0.3);
                border:2px solid #fff;
                border-radius:15px;
                padding: 0 5vw;

                & .screen__text-buttons--text{
                font-size: 1.8em;
                text-align: center;
                font-family: 'Kameron';
                color: #000;
                margin-top: 2vh;
                }

                & .screen__text-buttons--button{
                    width:22vw;
                }

            }
        }

        & .screen__buttons{
            margin-top: auto;
        }

        & .screen__buttons--button, .screen__text-buttons--button{
                width: 25vw;
                padding: 0.5vw;
                border: none;
                margin: 15px 7px;
                border-radius: 12px;
                background-color: #D9D9D9;
                color: #000;
                font-size: 1.5em;
                text-transform:uppercase;
                font-family: 'Kameron';
                cursor: pointer;
            }
    }

    @media screen and (max-width: 425px){
        .screen {
            width: 100vw;

            & .screen__capture-pokemon {
                width: 90%;
                height: 100%;
                margin: 2vh;

                & .screen__text-buttons{
                    padding: 0 5vw;

                    & .screen__text-buttons--text{
                        margin:1vh;
                        font-size: 1em;
                    }

                    & .screen__text-buttons--button{
                        width:35vw;
                        margin: 2vw 0vw;
                        padding: 1vw 0;
                        width: 100%;
                        font-size: 1em;
                    }
                }
            }

            & .screen__buttons--button{
                display: none;
            }
        }


    }

    @media screen and (max-width: 320px){

        .screen {
            & .screen__capture-pokemon {

                & .screen__img{
                        width: 70vw;
                        height: 70vw;
                    }
                & .screen__text-buttons{
                    padding: 0;
                }
            }

        }

    }

    @media screen and (max-width: 854px){
        .screen {

            & .screen__capture-pokemon {

                & .screen__text-buttons{
                    margin-top: -20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    & .screen__text-buttons--text{
                        font-size: 1.3em;
                    }

                    & .screen__text-buttons--button{
                        width: 46vw;
                        margin: 5px;
                    }
                }
            }
        }

    @media screen and (min-width: 426px) and (max-width: 600px){
        .screen {

            & .screen__capture-pokemon {
                width: 53vw;
                height:65vh;

                & .screen__text-buttons{
                    padding: 2px;
                }
            }
        }

    }
}


</style>
