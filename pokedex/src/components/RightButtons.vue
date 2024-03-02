<script>
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
  }, methods: {
        nextPage() {
            this.$emit('next-page');
        },
        prevPage() {
            this.$emit('prev-page');
        }
    }
}
</script>
<template>
    <aside class="buttons-bar">
        <!-- Apply disabled class if the button is disabled -->
        <button class="buttons-bar__button" @click="nextPage" aria-label="next" :class="{ 'disabled': isDisabled }" :disabled="isDisabled">
            <font-awesome-icon icon="fa-solid fa-caret-right" />
        </button>
        <button class="buttons-bar__button" @click="prevPage" aria-label="back" :class="{ 'disabled': isDisabled }" :disabled="isDisabled">
            <font-awesome-icon icon="fa-solid fa-caret-left" />
        </button>
    </aside>
</template>
<style lang="css">
    .buttons-bar{
        width: 17vw;
        height: inherit;
        margin-left: auto;

        & .buttons-bar__button{
            width: 17vw;
            height: 44vh;
            display:block;
            background: #0C0C0D;
            border-bottom-right-radius: 11vw;
            border-top-right-radius: 11vw;
            border: 4vh solid #FF321D;
            border-left:none;
            color: #D9D9D9;
            font-size: 10vw;
            cursor: pointer;

            /*Only apply hover if is not disabled*/
            &:not(.disabled):hover {
                background: #212124;
            }

            &.disabled {
                cursor: not-allowed;
            }
        }
    }

    @media screen and (max-width: 425px){
        .buttons-bar {
            width: 80vw;
            height: 24vw;
            display: flex;
            flex-direction: row-reverse;
            position: absolute;
            left: 0;
            right: 0;
            bottom:1vh;
            margin: auto;

            & .buttons-bar__button{
                width: 40vw;
                height: 15vw;
                background: #0C0C0D;
                border-radius: 11vw;
                border: 1vh solid #FF321D;
                color: #D9D9D9;
                font-size: 10vw;
                cursor: pointer;

                &.disabled {
                    display:none;
                }
            }

        }
    }

    @media screen and (max-width: 375px){
        .buttons-bar {
            bottom:3vh;
            height: 22vw;

            .buttons-bar__button{

                &.disabled {
                    display:none;
                }

                }
        }

    }

    @media screen and (max-width: 320px){
        .buttons-bar {
            bottom: 2vh;
            width: 72vw;

            .buttons-bar__button{
                

                &.disabled {
                    display:none;
                }

            }

        }

    }
</style>