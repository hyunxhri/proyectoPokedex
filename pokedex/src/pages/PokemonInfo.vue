<script>
import LeftBar from '@/components/LeftBar.vue'
import RightButtons from '@/components/RightButtons.vue'
import fetchPokemonById from '@/services/fetchPokemonById'
import { RouterLink } from 'vue-router'
import axios from 'axios'

export default {
  data() {
    return {
      pokemonId: null,
      pokemon: null,
      imgShiny: false,
      captured: false,
      isCapturedMessage: ''
    }
  },
  created() {
    this.pokemonId = parseInt(this.$route.params.id)
    this.fetchPokemon()
  },
  methods: {
    fetchPokemon() {
      this.imgShiny = false
      fetchPokemonById(this.pokemonId)
        .then(response => {
          this.pokemon = response
          this.isPokemonCaptured()
        })
        .catch(error => {
          console.error('Error fetching Pokemon:', error)
        })
    },
    fetchNextPage() {
      if (this.pokemonId < 500) {
        this.pokemonId++
      } else {
        this.pokemonId = 1
      }
      this.isCapturedMessage = ''
      this.$router.push({ path: `/pokedex/${this.pokemonId}` })
      this.fetchPokemon()
    },
    fetchPrevPage() {
      if (this.pokemonId > 1) {
        this.pokemonId--
      } else {
        this.pokemonId = 500
      }
      this.isCapturedMessage = ''
      this.$router.push({ path: `/pokedex/${this.pokemonId}` })
      this.fetchPokemon()
    },
    getPokemonTypeBackground() {
      if (this.pokemon) {
        return `background-color: var(--${this.pokemon.type})`
      }
    },
    getPokemonType2Background() {
      if (this.pokemon) {
        return `background-color: var(--${this.pokemon.type2})`
      }
    },
    changeImgToShiny() {
      this.imgShiny = !this.imgShiny
    },
    addPokemonToTeam() {
      const token = JSON.parse(localStorage.getItem('auth')).user.token
      axios.put(`http://localhost:8080/api/pokedex/pokemons/${this.pokemonId}`, {
        favorite: true
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(() => {
        return this.isCapturedMessage = "Pokemon added to team!"
      }).catch(error => {
        console.error('Error adding Pokemon to team:', error)
      })
    },
    async isPokemonCaptured() {
      const auth = JSON.parse(localStorage.getItem('auth'))
      if (!auth || !auth.user || !auth.user.token) {
        throw new Error('No se encontró un token de autenticación')
      }
      const token = auth.user.token

      try {
        const response = await axios.get(`http://localhost:8080/api/pokedex`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const capturedPokemon = response.data.pokedexPokemon.find(pokemon => pokemon.pokemonId === this.pokemonId)
        this.captured = !!capturedPokemon // if capturedPokemon is undefined, captured will be false
      } catch (error) {
        console.error('Error fetching captured Pokemon:', error)
        throw error
      }
    }
  },
  components: { LeftBar, RightButtons, RouterLink },
}
</script>


<template>
    <LeftBar />
    <article class="screen">
      <div class="screen__background">
        <section class="screen__infoPokemon">
          <h2 class="screen__pokemonId">{{ pokemonId }}</h2>
          <h1 class="screen__pokemonName" :style="getPokemonTypeBackground()">{{ pokemon ? this.pokemon.name : '' }}</h1>
          <img v-if="pokemon" class="screen__img" :src="imgShiny ? this.pokemon.imgShiny : this.pokemon.img" alt="pokemon_img">
          <ul class="screen__typeList">
            <li class="screen__typeList--type" :class="{ 'fullWidth': pokemon && !pokemon.type2 }" :style="getPokemonTypeBackground()">{{ pokemon ? this.pokemon.type : '' }}</li>
            <li v-if="pokemon ? this.pokemon.type2 : ''" class="screen__typeList--type" :class="{ 'fullWidth': !pokemon.type2 }" :style="getPokemonType2Background()">{{ this.pokemon.type2 }}</li>
          </ul>
          <button class="screen__shinyButton" @click="changeImgToShiny">Shiny</button>
        </section>
        <div class="screen__right-side">
            <ul class="screen__stadistics">
              <li class="screen__stadistics--li"><h3>Hp</h3> {{ pokemon ? this.pokemon.hp : ''}}</li>
              <li class="screen__stadistics--li"><h3>Attack</h3> {{ pokemon ? this.pokemon.attack : ''}}</li>
              <li class="screen__stadistics--li"><h3>Defense</h3> {{ pokemon ? this.pokemon.defense : ''}}</li>
              <li class="screen__stadistics--li"><h3>S-Attack</h3> {{ pokemon ? this.pokemon.sattack : ''}}</li>
              <li class="screen__stadistics--li"><h3>S-Defense</h3> {{ pokemon ? this.pokemon.sdefense : ''}}</li>
              <li class="screen__stadistics--li"><h3>Speed</h3> {{ pokemon ? this.pokemon.speed : ''}}</li>
            </ul>
            <h2 v-if="isPokemonCaptured()" class="screen__capturedText">{{ isCapturedMessage }}</h2>
            <button class="screen__capturedButton" @click="addPokemonToTeam()" :disabled="!captured">Add to team</button>
        </div>
      </div>

      <div class="screen__buttons">
            <RouterLink to="/explore">
                <button class="screen__buttons--button">Search</button>
            </RouterLink>
            <RouterLink to="/profile">
                <button class="screen__buttons--button">Profile</button>
            </RouterLink>
        </div>

    </article>
    <RightButtons @next-page="fetchNextPage" @prev-page="fetchPrevPage" />
</template>

<style lang="css" scoped>
    .screen {
        width: 69vw;
        border: 5vh solid #FF321D;
        padding: 2vw;

        & .screen__background{
          width:100%;
          height:90%;
          background-color: #416E6D;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-evenly;

          & .screen__infoPokemon{
            width: 36vh;
            height: 90%;
            background:#07370F;
            padding:1vw;
            border-radius:10px;

            & .screen__pokemonId, .screen__pokemonName {
              text-align: left;
              font-family: "IBM Plex Mono";
              display: inline-block;
              font-size:1em;
            }

            & .screen__typeList{
              margin: 1vh 0;
              list-style: none;
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-direction: row;

              & .screen__typeList--type{
                width: 49%;
                padding: .5vw;
                text-align: center;
                border-radius: 10px;
                color: #fff;
                font-size: 1em;
                font-family: 'IBM Plex Mono';
                text-transform: uppercase;
                text-shadow: 0px 2px 2px rgba(0,0,0,.75);
              }
              
              & .fullWidth {
                width: 100%;
              }
            }

            & .screen__shinyButton {
              width: 100%;
              padding: 0.5vh;
              font-size: 2vw;
              text-transform: uppercase;
              font-family: 'Kameron';
              letter-spacing: 1px;
              border-radius: 10px;
              border: none;
              cursor: pointer;
            }

          & .screen__pokemonId {
            width: 35%;
            height: auto;
            padding: 2vh;
            background: #fff;
            color: #000;
            border-top-left-radius: 10px;
            clip-path: polygon(0% 100%, 50% 100%, 100% 0%, 0% 0%);
          }

          & .screen__pokemonName {
            height: auto;
            width: 83%;
            margin-left:-18%;
            padding: 2vh;
            text-transform: uppercase;
            text-align: right;
            color: #fff;
            border-top-right-radius: 10px;
            clip-path: polygon(0% 100%, 20% 0%, 100% 0%, 100% 100%, 0% 100%);
            text-shadow: 0px 2px 2px rgba(0,0,0,.75);
          }

          & .screen__img{
            background: white;
            margin: 0 auto;
            width: 100%;
            border-bottom-right-radius: 10px;
            border-bottom-left-radius: 10px;
          }
        }

        & .screen__stadistics {
          width: 35vw;
          list-style: none;
          

          & .screen__stadistics--li {
            width: 45%;
            padding: 1vh;
            margin:1vh;
            background: #fff;
            color: #000;
            font-size: 1.5vw;
            display: inline-block;
            font-family: 'IBM Plex Mono';
            font-weight: 600;
            text-transform: uppercase;
            text-align: center;
            border-radius: 10px;
            box-shadow: 4px 4px 0px #FF321D;
            transition: .3s all ease-in-out;

            & h3 {
              background: #FF321D;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
              font-size:1em;
            }
          }
        }

        
        & .screen__right-side {
            width:60%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        
            & .screen__capturedText {
              font-size: 2vw;
              font-family: 'Kameron';
              text-align: center;
              margin: 1vh 0;
            }

            & .screen__capturedButton {
              width: 94%;
              margin: 0.5vw;
              padding: 2vh;
              border-radius: 15px;
              border: none;
              font-family: 'IBM Plex Mono';
              text-transform: uppercase;
              font-weight: 600;
              font-size: 1em;
            }
        }

        
      }

          
        & .screen__buttons{
            width: 53vw;
            margin: 0 auto;
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

    @media screen and (max-width: 933px){

      .screen {

        & .screen__buttons {
          width: 52vw;

          & .screen__buttons--button {
            width: 24vw;
          }
        }
      }
    }

    @media screen and (max-width: 699px){

    .screen {

      & .screen__buttons {
        width: 51vw;

        & .screen__buttons--button {
          width: 23vw;
        }
      }
    }
  }


  @media screen and (max-width: 559px){
    .screen {

      & .screen__buttons {
        width: 50vw;

        & .screen__buttons--button {
          width: 22vw;
        }
      }
    }
  }

  @media screen and (max-width: 828px){
  .screen {

    & .screen__background {
      & .screen__stadistics {
        width: 20vw;

        & .screen__stadistics--li {
          width: 100%;
          margin: 1vh 0;
          transition: all .3s ease-in-out;
        }
      }
    }
  }
}


@media screen and (max-width: 1207px){
    .screen {
        & .screen__background {
          flex-direction: column;

          & .screen__infoPokemon{
            width:90%;
            position:relative;
            height: 32%;

            & .screen__pokemonId{
              margin-left:1vh;
              width: 25%;
            }

            & .screen__pokemonName{
              float: right;
              width: 56%;
            }

            & .screen__img{
                margin: 0;
                width: 30%;
                display: block;
                border-radius:10px;
                float:left;
            }

            & .screen__typeList{
              align-items: end;
              flex-direction: column;
              width: 60%;
              margin: 1vh auto;

              & .screen__typeList--type{
                width: 100%;
              }
            }

            & .screen__shinyButton{
              position: absolute;
              right: 0;
              width: 66%;
              margin: 1.2vh;
              bottom: 0;
            }
          }


          & .screen__stadistics{
            width: 90%; 
            & .screen__stadistics--li{
              width: 47%;
              margin: 0.5vh;
              transition: all .3s ease-in-out;
            }
          }
        }

      }
  }

  @media screen and (max-width: 900px){
    .screen {
        & .screen__background {

          & .screen__infoPokemon{

            & .screen__img{
              width: 13vh;
            }

            & .screen__shinyButton{
              width: 95%;
                  height: 5vh;
            }
          }
        }

      }
  }

  @media screen and (max-width: 787px){
    .screen {
        & .screen__background {

          & .screen__infoPokemon{

            & .screen__img{
              width: 6.3vh;
            }

            & .screen__pokemonId{
              width: 29%;
            }

            & .screen__pokemonName{
              width: 66%;
            }

            & .screen__typeList{
              width: 100%;

              & .screen__typeList--type{
                margin-bottom: 0.7vh;
              }
            }

            & .screen__shinyButton{
              width: 94%;
            }
          }
        }

      }
  }

  @media screen and (max-width: 425px){
    .screen {
      width:100%;
        & .screen__background {

          & .screen__infoPokemon{
            height: 42%;
            & .screen__img{
              margin: 1vh;
              width: 40%;
            }

            & .screen__pokemonId{
              width: 35%;
              margin-top: 1vh;
            }

            & .screen__pokemonName{
              width: 76%;
              margin-top: 1vh;
              margin-right: 1vh;
            }

            & .screen__shinyButton{
              width: 92%;
              font-size: 1em;
            }

            & .screen__typeList{
              width: 50%;
              & .screen__typeList--type{
                width: 100%;
                margin: 1vh 0;
                padding: 1.5vh;
                margin: 0.5vh 0;
              }
            
            }
          }

          
          & .screen__stadistics{
              width: 90%;
              & .screen__stadistics--li{
                margin: 0.6vh 0;
                width: 100%;
                font-size:1vh;
              }
            }
            
        }

        & .screen__buttons{
          display:none;
        }

      }
  }

  @media screen and (max-width: 375px){
    .screen {
        & .screen__background {

          & .screen__infoPokemon{

            & .screen__pokemonName{
              width: 75%;
            }
            & .screen__typeList{
              margin: 1vh 0;
            
            }
          }
            
        }

      }
  }

  @media screen and (max-width: 320px){
    .screen {
      height: 88vh;
      border: 3vh solid #FF321D;

        & .screen__background {

          & .screen__infoPokemon{
            height:37.5%;
            & .screen__pokemonName{
              width: 74%;
            }

            & .screen__img{
              margin: 1vh;
              height: 10vh;
              width: 10vh;
            }
            & .screen__typeList{
              & .screen__typeList--type{
                padding: 0.9vh;
              }
            
            }

            & .screen__shinyButton{
              width: 90%;
            }
          }
            
        }

      }
  }
  
</style>

  