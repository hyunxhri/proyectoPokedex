<script>
import LeftBar from '@/components/LeftBar.vue'
import RightButtons from '@/components/RightButtons.vue'

export default {
  components: {
    LeftBar,
    RightButtons,
  },
  data() {
    return {
      title: '', 
      email: '',
      message: '',
      isButtonDisabled: true,
      isTitleValid: true, 
      isEmailValid: true,
      isMessageValid: true,
      formSubmitted: false
    }
  },
  methods: {
    submitForm() {
      this.isEmailValid = this.email.endsWith('.com') || this.email.endsWith('.es')
      this.isTitleValid = this.title.trim().length > 3
      this.isMessageValid = this.message.trim().length > 20
      if (this.isEmailValid && this.isTitleValid && this.isMessageValid) {
        this.formSubmitted = true
        setTimeout(() => {this.formSubmitted = false }, 2000)
      }
    }
  }
}
</script>

<template>
  <LeftBar/>
  <article class="content">
    <h1 class="content__title">Contact us!</h1> 
    <form class="content__form" @submit.prevent="submitForm" action="mailto:sbulmar842@g.educaand.es">
      <input class="content__form--input" type="text" v-model="title" placeholder="Title" aria-label="title" required> 
      <p v-if="!isTitleValid" class="content__form--error-message">Por favor ingresa un título de al menos 4 carácteres.</p>
      <input class="content__form--input" type="email" v-model="email" placeholder="Email" aria-label="email" required>
      <p v-if="!isEmailValid" class="content__form--error-message">El correo electrónico debe terminar en .com o .es.</p>
      <textarea class="content__form--textarea" cols="30" rows="3" v-model="message" placeholder="Message" aria-label="message" required></textarea>
      <p v-if="!isMessageValid" class="content__form--error-message">Por favor ingresa un mensaje de al menos 20 caracteres.</p>
      <button class="content__form--button">Send</button>
      <p v-if="formSubmitted" class="content__form--success-message">Formulario enviado</p>

    </form>
  </article>
  <RightButtons :is-disabled="isButtonDisabled" />
</template>

<style lang="css" scoped>
.content{
    width:69vw;
    border:5vh solid #FF321D;

    & .content__title{ 
        color: #FF321D;
        font-size: 7vh;
        text-transform: uppercase;
        font-family: "Kameron";
        text-align: center;
        margin: 4vh;
    }

    & .content__form{
      width: auto;
      margin: 0 auto;

      & .content__form--input, .content__form--textarea, .content__form--button {
        width: 40vw;
        display: block;
        margin: 1vh auto;
        font-family: "Kameron";
        padding: 2vh;
        background: #d9d9d9;
        font-size: 2.5vh;
        border: 2px solid #000;
      }

      & .content__form--error-message, .content__form--success-message {
      color: #d9d9d9;
      width: 40vw;
      font-size: 2vh;
      border: 1px solid #FF321D;
      padding: 1vh 2vh;
      margin: 1vh auto;
      text-align:center;
      text-transform: uppercase;
      font-family: "Kameron";
      }

      & .content__form--success-message {
        color: green;
        border: 1px solid green;
      }
    }
}

@media screen and (max-width: 425px){
  .content{
    width: 100%;

    & .content__form{

      & .content__form--input, .content__form--error-message, .content__form--success-message, .content__form--textarea, .content__form--button{
        width: 70vw;
        padding:1vh;
        font-size: 1em;
      }
    }
  }
}

@media screen and (max-width: 375px){
  .content{
    width: 100%;
    border: 3vh solid #FF321D;

    & .content__title{
      margin:2vh;
    }

    & .content__form{

      & .content__form--input, .content__form--error-message, .content__form--success-message, .content__form--textarea, .content__form--button{
        width: 70vw;
        padding:1vh;
        font-size: 1em;
      }
    }
  }
}

@media screen and (max-width: 320px){
  .content{
    & .content__title{
      font-size:2em;
    }
  }
}
</style>
