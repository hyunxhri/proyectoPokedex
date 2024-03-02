<script>
import LeftBar from '@/components/LeftBar.vue'
import RightButtons from '@/components/RightButtons.vue'
import axios from 'axios'

export default {
    data() {
        return {
            user: null,
            isButtonDisabled: true,
            team: [],
            path: 'https://curious-frangipane-e51feb.netlify.app/'
        }
    },
    components: {
        LeftBar,
        RightButtons,
    },
    mounted() {
        this.fetchProfile()
        this.fetchTeam()
    },
    methods: {
        changeImg(gender) {
            return `${this.path}assets/imgs/${gender}.jpg`
        },
        async fetchTeam() {
            const auth = JSON.parse(localStorage.getItem('auth'))
            const token = auth.user.token
            await axios.get('http://localhost:8080/api/pokedex/favorites', {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(response => {
                this.team = response.data
            }).catch(error => {
                console.error('Error fetching team:', error)
            })
        },
        async fetchProfile() {
            const auth = JSON.parse(localStorage.getItem('auth'))
            const token = auth.user.token
            axios.get('http://localhost:8080/api/users/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(response => {         
                this.user = response.data
            }).catch(error => {
                console.error('Error fetching user data:', error)
            })
        }, infoPokemon(pokemonId) {
            this.$router.push(`/pokedex/${pokemonId}`)
        }
    },
}
</script>
<template>
    <LeftBar/>
    <article class="screen">
        <section v-if="user" class="screen__profile">
            <img :src="changeImg(user.gender)" alt="img-profile" class="screen__img">
            <ul class="screen__info">
                <li class="screen__info--li"><h3>Username:</h3> {{ user.username }}</li>
                <li class="screen__info--li"><h3>Gender:</h3> {{ user.gender }}</li>
            </ul>
            <h2 class="screen__divider">EQUIPO POKEMON</h2>
            <!-- Here should be the img and name of pokemon but no time to end it -->
            <ul class="screen__team" v-if="team.length > 0">
                <li v-for="pokemon in team" :key="pokemon.pokemonId" class="screen__team--pokemon" @click="infoPokemon(pokemon.pokemonId)">
                        <p class="screen__team--id">{{ pokemon.pokemonId }}</p>
                </li>
            </ul>
            <h1 v-else>You have not pokemons in your team.</h1>
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
        padding:4vh 4vh 0 4vh;
        display: flex;
        flex-direction: column;
        align-items: center;

        & .screen__profile{
            background: #416E6D;
            width: 100%;
            height: 100%;
            padding: 5vh;

            & .screen__img{
                border-radius: 20px;
                width: 20%;
                transition: ease-in-out all .2s;
            }

            & .screen__info{
                width: 80%;
                float:right;
                transition: ease-in-out all .2s;

            }

            & .screen__info--li{
                padding: 1%;
                margin-bottom: 1.5%;
                margin-left: 1.5%;
                background: #fff;
                color: #000;
                font-size: 1.5vw;
                font-family: 'IBM Plex Mono';
                font-weight: 600;
                text-transform: uppercase;
                text-align: center;
                border-radius: 10px;
                box-shadow: 4px 4px 0px #FF321D;
                list-style: none;

                & h3{
                    background: #FF321D;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    font-size: 1em;
                }
            }

            & .screen__divider{
                font-size: 1.5em;
                width: 100%;
                border-radius: 5px;
                text-align: center;
                padding: 2px;
                background: #07370F;
                color: #fff;
                text-transform: uppercase;
                font-family: 'IBM PLEX MONO';
                margin-top: 2vh;
                margin-bottom: 2vh;
            }
        }

        & .screen__team--pokemon{
            list-style: none;
            width: 100%;
            background: white;
            padding: 1vh;
            margin:1vh 0;
            border-radius:10px;
        }

        & .screen__buttons{
            margin-top: auto;
        }

        & .screen__buttons--button{
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

    @media screen and (max-width: 1043px){
        .screen{
            & .screen__profile{

                & .screen__img{
                    width: 32%;
                    transition: ease-in-out all .2s;
                }

                & .screen__info{
                    width:65%;
                    transition: ease-in-out all .2s;


                    & .screen__info--li{
                        font-size:1em;
                        margin:1vh 0;
                    }
                }

                & .screen__divider{
                    font-size: 1.2em;
                    padding: 1vh;
                }
             }
             
             & .screen__buttons{

                & .screen__buttons--button{
                    width: 20vw;
                }
                
             }
        }
    }

    @media screen and (max-width: 425px){
        .screen{
            width: 100%;
            border: 3vh solid #FF321D;
            padding: 3vh;
            & .screen__profile{
                padding: 3vh;

                & .screen__img{
                    width: 100%;
                }

                & .screen__info{
                    width:100%;
                    float: unset;
                    margin-left:-.5vh;

                    & .screen__info--li{
                        font-size:1em;
                        margin:1vh 0;
                    }
                }

                & .screen__divider{
                    font-size: 1.2em;
                    padding: 1vh;
                }
             }
             
             & .screen__buttons{
                display:none;
             }
        }
    }

    @media screen and (max-width: 375px){
        .screen{

    }
}

    @media screen and (max-width: 320px){

    }


</style>
