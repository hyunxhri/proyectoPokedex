<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router/Router'

export default {
    data(){
        return {
            dropdownOpen: false
        }
    },
    create() {
        this.dropdownOpen = false
    },
    computed: {
        isLoginPage() {
            return this.$route.path === '/';
        }
    },
    props: {
        isDisabled: {
        type: Boolean,
        default: false
        }
    },
    methods: {
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen
        },
        logOut() {
            useAuthStore().logOut()
            router.push({ name: 'login' })
        }
    },
    components: {
    FontAwesomeIcon,
}
}
</script>
<template>
    <div id="top-bar">
        <button class="top-bar__button" aria-label="dropdown" :class="{ 'disabled': isLoginPage }" :disabled="isLoginPage" @click="toggleDropdown">
            <font-awesome-icon icon="fa-solid fa-caret-down" />
        </button>
    </div>
      <ul v-if="dropdownOpen" class="dropdown-content">
        <router-link to="/pokedex"><li class="dropdown-content__li">Pokedex</li></router-link>
        <router-link to="/explore"><li class="dropdown-content__li">Search Pokemon</li></router-link>
        <router-link to="/profile"><li class="dropdown-content__li">Profile</li></router-link>
        <router-link to="/contact"><li class="dropdown-content__li">Contact</li></router-link>
        <li class="dropdown-content__li" @click="logOut()">Logout</li>
      </ul>
</template>

<style lang="css">
    #top-bar {
        width: 100%;
        height: 12vh;
        background: linear-gradient(0deg, rgba(255,50,29,1) 39%, rgba(255,202,42,0.94) 65%, rgba(255,50,29,1) 91%);
        border-bottom:3px solid #0C0C0D;
    }

    .top-bar__button {
        background: #00A3FF;
        color: #000;
        font-size: 3vh;
        padding: 0.8vh 2.5vh;
        margin-top: 3vh;
        margin-left: 4vh;
        border: 1px solid #000;
        border-radius: 5px;
        transition: ease-in all 0.2s;


        &.disabled {
                background:#d9d9d9;
                cursor: not-allowed;
            }
    }

    .dropdown-content {
        background: #FF321D;
        position: absolute;
        border-bottom: 0.5vh solid #000;
        width: 100%;
        padding: 1vh 2vh;
        z-index: 1;

        & a {
            text-decoration: none;

        }

        & .dropdown-content__li {
            font-family: 'IBM PLEX MONO';
            text-transform: uppercase;
            list-style: none;
            color: #fff;
            background: rgba(0,0,0,.1);
            margin: 1vh;
            padding: 1vh;
        }
    }

    @media screen and (min-width: 426px){
        .top-bar__button {
            display:none;
            transition: ease-in all 0.2s;
        }

        .dropdown-content {
            display:none;
        }
    }


</style>