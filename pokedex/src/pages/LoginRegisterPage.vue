<script>
import LeftBar from '@/components/LeftBar.vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

export default {
    data(){
        return {
            username: '',
            gender: '',
            password: '',
            confirmPassword: '',
            isLoginPage: true,
            isGenderValid: true,
            isUserValid: true,
            isPasswordValid: true,
            isConfirmPasswordValid: true,
            formSubmitted: false,
            isLeftBarDisabled: true
        }
    },
    components: {
        LeftBar
    },
    methods: {
    changeForm() {
        this.username= ''
        this.gender= ''
        this.password= ''
        this.confirmPassword= ''
        this.isGenderValid = true
        this.isUserValid = true
        this.isPasswordValid = true
        this.isConfirmPasswordValid = true
        this.formSubmitted = false

        if(this.isLoginPage){
            this.isLoginPage = false
        } else {
            this.isLoginPage = true
        }
    }, 
    login () {
        useAuthStore().logIn(this.username, this.password)
    },
    async register(){
        this.isUserValid = this.username.trim().length >= 4
        this.isGenderValid = this.gender != ''
        this.isPasswordValid = this.password.trim().length >= 6
        this.isConfirmPasswordValid = this.confirmPassword === this.password && this.confirmPassword.length > 0
        if (this.isUserValid && this.isGenderValid && this.isPasswordValid && this.isConfirmPasswordValid) {
            await axios.post("http://localhost:8080/api/users", {
            username: this.username,
            gender: this.gender,
            password: this.password,
            }).then(response => {
            this.formSubmitted = true
            setTimeout(() => {
                this.changeForm()
            }, 2000)
            }).catch(error => {
            console.log(error)
            })
            
        }
    },
    submitForm() {
        this.isLoginPage ? this.login() : this.register()
    }
  }
}
</script>
<template>
        <LeftBar :is-disabled="isLeftBarDisabled"/>
        <section class="auth-container">
            <img class="auth-container__img" src="../assets/imgs/pokeball-login-register.png" alt="pokeball_img">
            <!-- If login --> 
            <form v-if="isLoginPage" class="auth-container__form" @submit.prevent="submitForm">
                <input class="auth-container__form--input" v-model="username" type="text" name="username" placeholder="Username" aria-label="username">
                <input class="auth-container__form--input" v-model="password" type="password" name="password" placeholder="Password" aria-label="password">
                <button class="auth-container__form--button" aria-label="login">Log in</button>
                <p class="auth-container__form--text">Don't have an account? <a href="#" @click="changeForm">Register</a></p>
            </form>
            <!-- If register -->
            <form v-else class="auth-container__form" @submit.prevent="submitForm">
                <input class="auth-container__form--input" v-model="username" type="text" name="username" placeholder="Username" aria-label="username">
                <p v-if="!isUserValid" class="auth-container__form--error-message">Username needs at least 4 characters.</p>
                <select class="auth-container__form--select" v-model="gender" id="gender" name="gender" aria-label="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <p v-if="!isGenderValid" class="auth-container__form--error-message">Select a gender.</p>
                <input class="auth-container__form--input" v-model="password" type="password" name="password" placeholder="Password" aria-label="password">
                <p v-if="!isPasswordValid" class="auth-container__form--error-message">Password needs at least 6 characters.</p>
                <input class="auth-container__form--input" v-model="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm password" aria-label="confirm-password">
                <p v-if="!isConfirmPasswordValid" class="auth-container__form--error-message">Confirm password must match password.</p>
                <button class="auth-container__form--button" aria-label="register">Register</button>
                <p class="auth-container__form--text">Already have an account? <a href="#" @click="changeForm">Log in</a></p>
                <p v-if="formSubmitted" class="auth-container__form--success-message">You've been registered.</p>

            </form>
        </section>
</template>
<style lang="css" scoped>
    .auth-container {
        width: 100vw;
        background: #FF321D;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position:relative;

        & .auth-container__img {
            width: 30vw;
            opacity:30%;
            position:absolute;
            z-index:0;
            transition: ease-in all .2s;

        }

        & .auth-container__form {
            display:flex;
            flex-direction: column;
            align-items: center;
            z-index:1;
            
            & .auth-container__form--input, .auth-container__form--button, .auth-container__form--select {
                font-family: 'Kameron';
                text-align: center;
                color:#000;
                width: 30vw;
                height: 7vh;
                margin: 1vh 0;
                border: 1px solid #000;
                background: #D9D9D9;
                border-radius: 5px;
                padding: 0 1vw;
                font-size: 1.2em;
                transition: ease-in all .2s;

            }

            & .auth-container__form--button {
                color:#D9D9D9;
                border: 1px solid #D9D9D9;
                background: #000;
                cursor: pointer;
            }


            & .auth-container__form--text {
                font-family: 'Kameron';
                font-size: 1.2em;
                margin: 1vh 0;
                
                & a {
                    color: #000;
                    text-decoration: none;
                    font-style: italic;
                }
            }

            & .auth-container__form--error-message, .auth-container__form--success-message {
                background: #000;
                color: #fff;
                width: 30vw;
                padding: 1vw;
                margin: 0vh;
                border-radius: 5px;
                font-family: 'Kameron';
                font-size: 2.5vh;
                text-transform: uppercase;
                text-align: center;
                transition: ease-in all .2s;                    
            }

            & .auth-container__form--success-message {
                background: green;
                color: #fff;
            }
        }
    }

    @media screen and (max-width: 920px){
        .auth-container {            
            & .auth-container__img {
            width: 40vh;
            transition: ease-in all .2s;

            }

            & .auth-container__form {
                & .auth-container__form--input, .auth-container__form--button, .auth-container__form--select {
                    width: 40vh;
                    transition: ease-in all .2s;
                }
                
                & .auth-container__form--error-message, .auth-container__form--success-message{
                width:40vh;
                transition: ease-in all .2s;    
            }
            }
        }

        .connection-bar {
            width:25vw;

            & .connection-bar__button {
                width: 12vw;
                height: 12vw;
                font-size: 8vw;
            }

            & .connection-bar__lights-decoration .light {
                width: 4vw;
                height: 2vw;
            }
        }
    }

    @media screen and (min-width: 920px) and (max-width: 1200px){
        .auth-container {
            & .auth-container__form {
                & .auth-container__form--input, .auth-container__form--button, .auth-container__form--select {
                    width: 60vh;
                    transition: ease-in all .2s;
                }
                
                & .auth-container__form--error-message, .auth-container__form--success-message{
                width:60vh;
                transition: ease-in all .2s; 
            }
        }
    }
}
</style>