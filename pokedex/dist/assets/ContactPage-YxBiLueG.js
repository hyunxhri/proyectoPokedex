import{_ as h,L as g,c as i,b as d,d as o,j as b,k as n,v as m,e as l,F as V,r as u,o as a,p as B,g as v}from"./index-Bv-oI6JQ.js";import{R as S}from"./RightButtons-PgbPVb6b.js";const k={components:{LeftBar:g,RightButtons:S},data(){return{title:"",email:"",message:"",isButtonDisabled:!0,isTitleValid:!0,isEmailValid:!0,isMessageValid:!0,formSubmitted:!1}},methods:{submitForm(){this.isEmailValid=this.email.endsWith(".com")||this.email.endsWith(".es"),this.isTitleValid=this.title.trim().length>3,this.isMessageValid=this.message.trim().length>20,this.isEmailValid&&this.isTitleValid&&this.isMessageValid&&(this.formSubmitted=!0,setTimeout(()=>{this.formSubmitted=!1},2e3))}}},_=r=>(B("data-v-e912d9cb"),r=r(),v(),r),x={class:"content"},E=_(()=>o("h1",{class:"content__title"},"Contact us!",-1)),M={key:0,class:"content__form--error-message"},T={key:1,class:"content__form--error-message"},y={key:2,class:"content__form--error-message"},F=_(()=>o("button",{class:"content__form--button"},"Send",-1)),w={key:3,class:"content__form--success-message"};function C(r,t,I,L,e,c){const p=u("LeftBar"),f=u("RightButtons");return a(),i(V,null,[d(p),o("article",x,[E,o("form",{class:"content__form",onSubmit:t[3]||(t[3]=b((...s)=>c.submitForm&&c.submitForm(...s),["prevent"])),action:"mailto:sbulmar842@g.educaand.es"},[n(o("input",{class:"content__form--input",type:"text","onUpdate:modelValue":t[0]||(t[0]=s=>e.title=s),placeholder:"Title","aria-label":"title",required:""},null,512),[[m,e.title]]),e.isTitleValid?l("",!0):(a(),i("p",M,"Por favor ingresa un título de al menos 4 carácteres.")),n(o("input",{class:"content__form--input",type:"email","onUpdate:modelValue":t[1]||(t[1]=s=>e.email=s),placeholder:"Email","aria-label":"email",required:""},null,512),[[m,e.email]]),e.isEmailValid?l("",!0):(a(),i("p",T,"El correo electrónico debe terminar en .com o .es.")),n(o("textarea",{class:"content__form--textarea",cols:"30",rows:"3","onUpdate:modelValue":t[2]||(t[2]=s=>e.message=s),placeholder:"Message","aria-label":"message",required:""},null,512),[[m,e.message]]),e.isMessageValid?l("",!0):(a(),i("p",y,"Por favor ingresa un mensaje de al menos 20 caracteres.")),F,e.formSubmitted?(a(),i("p",w,"Formulario enviado")):l("",!0)],32)]),d(f,{"is-disabled":e.isButtonDisabled},null,8,["is-disabled"])],64)}const D=h(k,[["render",C],["__scopeId","data-v-e912d9cb"]]);export{D as default};
