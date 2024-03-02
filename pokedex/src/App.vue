<script>
import TopBar from '@/components/TopBar.vue'
export default {
  name: 'App',
  components: {
        TopBar
  }
}
</script>

<template>
  <TopBar/>
  <main id="wrapper">
    <router-view/>
  </main>
</template>

<style>
  @font-face {
    font-family: "Kameron";
    src: url('./assets/fonts/Kameron-VariableFont_wght.ttf') format('woff2'),
        url('./assets/fonts/Kameron-VariableFont_wght.ttf') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "IBM Plex Mono";
    src: url('./assets/fonts/IBM_Plex_Mono/IBMPlexMono-Medium.ttf') format('woff2'),
        url('./assets/fonts/IBM_Plex_Mono/IBMPlexMono-Medium.ttf') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "IBM Plex Mono";
    src: url('./assets/fonts/IBM_Plex_Mono/IBMPlexMono-Light.ttf') format('woff2'),
        url('./assets/fonts/IBM_Plex_Mono/IBMPlexMono-Light.ttf') format('woff');
    font-weight: lighter;
    font-style: normal;
  }

  * {
    margin:0;
    padding:0;
    box-sizing: border-box;
  }
  #app {
    width: 100%;
    background-color: #0C0C0D;
  }
  #wrapper{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 88vh;
  }

  :root {
    --bug: #1B4B27;
    --dark: #040707;
    --dragon: #448A95;
    --electric: #E2E32A;
    --fairy: #961A45;
    --fighting: #994025;
    --fire: #AB1F23;
    --flying: #4A677D;
    --ghost: #33336B;
    --grass: #147B3D;
    --ground: #A8702D;
    --ice: #86D2F5;
    --normal: #75525C;
    --poison: #5E2D89;
    --psychic: #A52A6C;
    --rock: #48190A;
    --steel: #60756E;
    --water: #1452E1;
  }

  @media screen and (max-width: 320px){


      
  }
</style>
