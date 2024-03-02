<script>
import router from '@/router/Router'
import { useAuthStore } from '@/stores/authStore'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
    props: {
        isDisabled: {
        type: Boolean,
        default: false
        }
    },
    components: {
    FontAwesomeIcon
    },
    methods: {
        logOut() {
            useAuthStore().logOut()
            router.push({ name: 'login' })
        }
    }   
}
</script>
<template lang="">
    <aside class="connection-bar">
        <div class="connection-bar__lights-decoration">
            <div class="light" :class="{ 'disabled': isDisabled }"></div>
            <div class="light" :class="{ 'disabled': isDisabled }"></div>
        </div>
        <button class="connection-bar__button" aria-label="disconnect" :class="{ 'disabled': isDisabled }" :disabled="isDisabled" @click="logOut">
            <font-awesome-icon icon="fa-solid fa-power-off" />
        </button>
    </aside>
</template>
<style lang="css">
    .connection-bar {
        width: 14vw;
        height: inherit;
        background: #FF321D;
        border-bottom-left-radius: 70px;
        border-right: 3px solid #0C0C0D;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;


        & .connection-bar__button {
            width: 8vw;
            height: 8vw;
            background: #00A3FF;
            border: 2px solid #0C0C0D;
            border-radius: 50%;
            color: rgba(0, 0, 0, 0.5);
            font-size: 5vw;
            margin-top: 50vh;
            display:flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            &:not(.disabled):hover {
                color: rgba(0, 0, 0, 0.8);
            }

            &.disabled {
                    background: #D9D9D9;
                    cursor: not-allowed;
                }
        }

        & .connection-bar__lights-decoration {
            list-style: none;
            margin: 0;
            padding: 0;
            align-self: baseline;

            & .light{
                width: 3vw;
                height: 1vw;
                background: #00FF29;
                margin-bottom: 10px;
                border-top: 2px solid #0C0C0D;
                border-bottom: 2px solid #0C0C0D;
                border-right: 2px solid #0C0C0D;

                &.disabled {
                    background: #D9D9D9;
                }
            }
        }
    }

    @media screen and (max-width: 425px){
        .connection-bar {
            display:none;

        }
    }

</style>