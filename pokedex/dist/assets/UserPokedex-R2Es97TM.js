import{_ as f,L as p,a as P,c as r,b as h,d as l,F as m,h as g,r as u,o as c,n as k,t as w}from"./index-Bv-oI6JQ.js";import{R as L}from"./RightButtons-PgbPVb6b.js";async function y(t=0){try{const e=await fetch(`http://localhost:8080/api/pokemons?page=${t}`);if(!e.ok)throw new Error("Failed to fetch all Pokemons");return await e.json()}catch(e){throw new Error("Error fetching Pokemons:",e)}}const x={data(){return{pokemons:[],currentPage:0,dataLoaded:!1}},async beforeMount(){await this.fetchAllPokemons(),this.dataLoaded=!1,await this.loadPokemons(),setTimeout(()=>{this.dataLoaded=!0},500)},components:{LeftBar:p,RightButtons:L},methods:{async fetchAllPokemons(t=this.currentPage){try{const e=await y(t);this.pokemons=e.content}catch(e){console.error("Error fetching random Pokemon:",e)}},async fetchNextPage(){this.currentPage++,await this.fetchAllPokemons(),this.dataLoaded=!1,await this.loadPokemons(),setTimeout(()=>{this.dataLoaded=!0},500)},async fetchPrevPage(){this.currentPage>=1&&(this.currentPage--,await this.fetchAllPokemons(),this.dataLoaded=!1,await this.loadPokemons(),setTimeout(()=>{this.dataLoaded=!0},500))},async loadPokemons(){try{const t=JSON.parse(localStorage.getItem("auth")).user.token,i=(await P.get("http://localhost:8080/api/pokedex",{headers:{Authorization:`Bearer ${t}`}})).data.pokedexPokemon;this.pokemons=this.pokemons.map(s=>{const d=i.some(o=>o.pokemonId===s.pokemonId),n=i.some(o=>o.pokemonId===s.pokemonId&&o.captured);if(d){const o=s.name.length>=10?`${s.name.slice(0,5)}...`:s.name;return{...s,name:o,captured:n}}else return{...s,name:"????"}})}catch(t){console.error("Error while loading Pokemon names:",t),this.pokemons=[]}},infoPokemon(t,e){e!="????"&&this.$router.push({path:`/pokedex/${t}`})}}},B={class:"screen"},I={key:0,class:"screen__list"},N=["onClick"],v=["src","alt"],E={class:"screen__list--name"},A={key:1,class:"screen__loadingTitle"};function $(t,e,i,s,d,n){const o=u("LeftBar"),_=u("RightButtons");return c(),r(m,null,[h(o),l("article",B,[d.dataLoaded?(c(),r("ul",I,[(c(!0),r(m,null,g(d.pokemons,a=>(c(),r("li",{key:a.pokemonId,class:"screen__list--element",onClick:C=>n.infoPokemon(a.pokemonId,a.name)},[l("img",{class:k(["screen__list--img",{"black-filter":a.name==="????",captured:a.captured,seen:a.name!="????"&&!a.captured}]),src:a.img,alt:a.name},null,10,v),l("p",E,w(a.name),1)],8,N))),128))])):(c(),r("h1",A,"Loading..."))]),h(_,{onNextPage:n.fetchNextPage,onPrevPage:n.fetchPrevPage},null,8,["onNextPage","onPrevPage"])],64)}const T=f(x,[["render",$],["__scopeId","data-v-406d5a50"]]);export{T as default};
