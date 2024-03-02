<script>
import LeftBar from '@/components/LeftBar.vue'
import RightButtons from '@/components/RightButtons.vue'
import { RouterLink } from 'vue-router';

export default {
    components: {
    LeftBar,
    RightButtons,
    RouterLink
},
    data() {
        return {
            isButtonDisabled: true,
        }
    }
}
</script>
<template>
    <LeftBar/>
    <article class="content">
        <img class="content__pokeball" src="@/assets/imgs/pokeball.png" alt="pokeball">
        <div class="content__text-container">
            <h1 class="content__text-container--title">404</h1>
            <h2 class="content__text-container--subtitle">Page Not Found</h2>
            <RouterLink to="/pokedex">
                <!-- TO DO : SI NO ESTÁ LOGEADO ENTONCES BACK TO LOG IN -->
                <button class="content__text-container--button">Back to pokedex</button>
            </RouterLink>
        </div>
    </article>
    <RightButtons :is-disabled="isButtonDisabled"/>
</template>

<style lang="css" scoped>
    .content {
        width: 69vw;
        border: 5vh solid #FF321D;
        font-family: 'Kameron';
        text-transform: uppercase;
        position:relative;

        & .content__pokeball{
            width: 29vw;
            display: block;
            opacity: 0;
            animation-name: pokeball;
            animation-duration: 4s;
            animation-iteration-count: 1;
            position:absolute;
            left:0;
            right:0;
            top:0;
            bottom:0;
            margin:auto;
        }

        & .content__text-container {
            height: 28vw;
            position:absolute;
            left:0;
            right:0;
            top:3vw;
            bottom:0;
            margin:auto;
            animation-name: appear;
            animation-duration: 5s;
            animation-iteration-count: 1;

            & .content__text-container--title {
            font-size: 10vw;
            color: #FF321D;
            text-align: center;
            margin:0;
            }

            & .content__text-container--subtitle {
                font-size: 5vw;
                color: #FF321D;
                text-align: center;
                margin: 0 0 2vw 0;
            }

            & a {
                text-decoration: none;
            }

            & .content__text-container--button {
                width: 40vw;
                display: block;
                margin: 0 auto;
                padding: 2vh;
                font-family: 'Kameron';
                font-size: 2.5vw;
                text-transform: uppercase;
                background: #d9d9d9;
                color: #000;
                border-radius: 5vh;
                cursor: pointer;
            }
        }
    }

    @keyframes pokeball {
        0% {transform: scale(0.1); opacity:1;}
        30% {transform: rotate(45deg) scale(1);}
        45% {transform: rotate(-45deg)}
        60% {transform: rotate(0deg); filter:brightness(100%) invert(0%);}
        80% {filter:brightness(0%) invert(100%);opacity: 1;}
        100% {opacity:0;}
    }

    @keyframes appear {
        0% {opacity:0;}
        70% {transform: scale(1);
            opacity:0;
            color: white;
            text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff;
        }
        100% {transform: scale(1);
              opacity:1;
        }
    }

</style>