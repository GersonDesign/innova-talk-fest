<template lang="pug">
  .innova-talk-fest
    .blockA#inicio
      .blockA-back(v-bind:style="{'background-image': 'url(' + imgBanner + ')' }").pt-3.pb-3
        v-container(grid-list-xl)
          v-layout(row,wrap, align-center).blockA-contenido
            v-flex(xs12 sm12 md8).blockA-content-descrip
              h1 Innova Talk Fest
              h2 Sábado 1 de Diciembre - 09:00am
              vue-countdown-timer(@start_callback="startCallBack('event started')", @end_callback="endCallBack('event ended')", :start-time="'2018-12-01 00:00:00'", :end-time="'2018-12-01 00:00:00'",:interval="1000", :start-label="''", :end-label="'Until end:'",  label-position="begin", :end-text="'Event ended!'", :day-txt="'Días'", :hour-txt="'Horas'", :minutes-txt="'Minutos'", :seconds-txt="'Segundos'").blockA-contador.mt-2

            v-flex(xs12 sm12 md4)

              v-form(ref="form",v-model="valid", lazy-validation).blockA-content-form.pr-4.pl-4.pt-3.pb-3
                h2 Registro
                v-text-field(label="Nombre", v-model="name", :rules="nameRules")
                v-text-field(label="Email", v-model="email", :rules="emailRules")
                v-text-field(label="Teléfono", v-model="phone", :rules="phoneRules")
                v-autocomplete(label="Nivel del estudio", :items="nivel_estudio", v-model="nivel", :rules="nivelRules")
                v-text-field(label="Distrito", v-model="distrito", :rules="distritoRules")
                v-autocomplete(label="¿Deseas certificado?", :items="deseas_certificado", v-show="presencialCertificado", v-model="certificado", @change="changeCertificado", :rules="certificadoRules")
                v-btn(color="primary",@click="registrar") Registrar

      //nav.blockA-menu.pt-2.pb-2
        a(v-for="itemMenu in menu", :href="itemMenu.url") {{itemMenu.text}}

    section.blockB#acercaDelEvento.pt-3.pb-3
      v-container
        h2.display-1.font-weight-bold Acerca del evento
        v-layout(wrap)
          v-flex(xs12 sm12 md6).blockB-descrip
            p.mt-3 El evento <Strong>Innova Talk Fest </strong>, un gran evento que reúne a varios expositores donde compartiremos diferentes charlas para que mejores o inicies tu idea de negocios, utilizando herramientas que te ayudarán a potenciar tu emprendimiento.
            p.mt-2 Se realizará en la <a href="https://www.google.com/maps/place/Universidad+Nacional+Mayor+de+San+Marcos/@-12.0562086,-77.0844394,17z/data=!4m8!1m2!2m1!1sunversidad+San+Marcos!3m4!1s0x9105c946680d0099:0xc6def8804064a4e9!8m2!3d-12.0560257!4d-77.0844226" target="_blank">Universidad Nacional San Marcos</a> y  es <strong>totalmente gratuito </strong> el ingreso, solo  a las personas que deseen su certificado digital, deben traer algo para compartir(galletas, jugos, pan, bocaditos, café, agua mineral, etc) en el coffee break.
          v-flex(xs12 sm12 md6)
            .carousel
              v-carousel(hide-delimiters, height="300")
                v-carousel-item(v-for="itemCarousel,i) in carousel", :key="i", :src="itemCarousel.src")
    section.blockC#cronograma.pt-3.pb-3
      v-container
        h2.display-1.font-weight-bold Cronograma
        .blockC-list.mt-4
          v-layout(row, wrap,v-for="itemCronograma in cronograma").mt-4
            v-flex(xs12 sm12 md3)
              v-layout.block-horario.grey.lighten-4.pt-2.pb-2.pl-3.pr-3
                v-icon.pr-2 access_time
                strong {{itemCronograma.hora}}
              //img(:src="itemCronograma.src")
            v-flex(xs12 sm12 md9).pl-4
              h3.headline.font-weight-medium {{itemCronograma.title}}
              p.mt-3(v-html="itemCronograma.descrip")

                //v-icon share


    section.blockD#expositores.pt-3.pb-3
      v-container
        h2.display-1.font-weight-medium Expositores
        v-layout(wrap)
          v-flex(v-for="itemPonente in expositores",xs12 sm12 md4).blockD-item.mt-4.text-xs-center
            img(:src="itemPonente.img").elevation-1
            h3.headline.font-weight-medium.mt-2 {{itemPonente.text}}

    v-dialog(v-model="dialogAcept", max-width="500")
      v-card
        v-card-text
          v-card-title
            h2.headline ¡Felicitaciones!
            p Nos veremos el <strong>sábado 01 de Diciembre en la Universidad San Marcos</strong>
            v-card-actions
            v-btn(color="primary", @click="dialogAcept = !dialogAcept") Aceptar
    v-dialog(v-model="dialog", max-width="500")
      v-card
        v-card-text
          v-card-title
            h2.headline Recuerda
            p Para obtener el <strong>certificado digital</strong> debes traer algo(galletas, jugos, pan, bocaditos, café, agua mineral, etc) para el <strong>coffee break</strong>, por favor llegar temprano para entregar el coffee break.
            v-card-actions
              v-btn(color="error", @click="dialog = !dialog") Aceptar

    footer
      v-container.text-xs-center.text-md-center
        p Este evento organizado por <strong>Aptitud Emprendedora LATAM</strong> & <strong>Club de Marketing UNMSM</strong>
</template>

<script>
import imgBanner from '@/assets/img/back.png'
import img1Carousel from '@/assets/img/organizadores/aptitud.png'
import img2Carousel from '@/assets/img/organizadores/club.png'
import img1Cronograma from '@/assets/img/cronograma/img1.jpg'
import img1Ponente from '@/assets/img/expositores/img1.jpg'
import img2Ponente from '@/assets/img/expositores/img2.jpg'
import img3Ponente from '@/assets/img/expositores/img3.jpg'
import img4Ponente from '@/assets/img/expositores/img4.jpg'
import img5Ponente from '@/assets/img/expositores/img5.jpg'
import img6Ponente from '@/assets/img/expositores/img1.jpg'
import firebase from 'firebase'

export default {

  data: () => ({
    imgBanner: imgBanner,
    carousel:[
      {
        src: img1Carousel
      },
      {
        src: img2Carousel
      }
    ],
    nameRules:[
      v => !!v || 'Ingresa tu nombre y apellidos'
    ],
    emailRules:[
      v => !!v || 'Ingresa su email',
     v => /.+@.+/.test(v) || "El email no es válido"

    ],
    phoneRules: [
       v => !!v || 'Ingrese su teléfono',
    ],
    nivelRules: [
      v => !!v || 'Seleccione un nivel de estudio'
    ],
    modoRules:[
      v => !!v || 'Seleccione el modo en que estará'
    ],
    distritoRules:[
      v => !!v || 'Ingrese el distrito'
    ],
    certificadoRules:[
      v => !!v || 'Seleccione la opción'
    ],
    dialog: false,
    dialogAcept: false,
    certificado: '',
    nivel_estudio: [
      {
       text: 'Estudiante'
      },{
       text: 'Técnico'
     },{
       text: 'Universitario'
     },{
       text: 'Profesional'
     }
    ],
    modo: '',
    participaras_modo: [
      {
       text: 'Presencial'
      },{
       text: 'Online'
      }
    ],
    deseas_certificado:[
      {
       text: 'Si quiero mi certificado'
      },{
       text: 'No quiero el certificado'
      }
    ],
    name: '',
    phone: '',
    email: '',
    nivel: '',
    pais: '',
    distrito: '',
    presencialCertificado: true,
    cronograma: [
      {
        src: img1Cronograma,
        title: 'Recepción del evento',
        descrip: 'Estaremos dando la bienvenida desde las 08:30 am a todos los participantes. Es un día para compartir a lo grande, así que si deseas un CERTIFICADO DIGITAL DE PARTICIPACIÓN no olvides traer algo de comer o beber(galletas, jugos, pan, bocaditos, café, agua mineral, etc) para compartir durante nuestro coffee break.',
        hora: '08:30am - 09:00am'
      },
      {
        src: img1Cronograma,
        title: 'Inaguración del evento',
        descrip: 'Daremos comienzo al evento con unas palabras de bienvenida.',
        hora: '09:00am - 09:15am'
      },
      {
        src: img1Cronograma,
        title: 'El propósito de las metodologías agiles',
        descrip: 'Descubriremos porque es importante el uso de las metodologías ágiles para los proyectos, para qué hacemos lo que hacemos; no se trata de "<strong>parecer</strong>" ágil, se trata de "<strong>ser</strong>" ágil',
        hora: '09:15am - 10:15am'
      },
      {
        src: img1Cronograma,
        title: '',
        descrip: '',
        hora: '10:15am - 11:15am'
      },
      {
        src: img1Cronograma,
        title: 'COFFEE BREAK',
        descrip: 'Tendremos un breve coffee break de <strong>15 minutos</strong>',
        hora: '11:15am - 11:30am'
      },
      {
        src: img1Cronograma,
        title: ' Branding para Startups',
        descrip: '',
        hora: '11:30am - 12:30pm'
      },
      {
        src: img1Cronograma,
        title: 'ALMUERZO LIBRE',
        descrip: '',
        hora: '12:30pm - 02:00pm'
      },
      {
        src: img1Cronograma,
        title: 'Cómo contar historias en redes sociales',
        descrip: '',
        hora: '02:00pm - 03:00pm'
      },
      {
        src: img1Cronograma,
        title: 'Marketing en la era digital',
        descrip: '',
        hora: '03:00pm - 04:00pm'
      },
      {
        src: img1Cronograma,
        title: 'Design Thinking: experimenta la metodología de la innovación',
        descrip: '',
        hora: '04:00pm - 05:00pm'
      },
      {
        src: img1Cronograma,
        title: 'CLAUSURA DEL EVENTO',
        descrip: '',
        hora: '05:00pm - 05:30pm'
      },
    ],
    expositores: [
      {
        img: img1Ponente,
        text: 'Freddy Cahuas'
      },
      /*{
        img: img2Ponente,
        text: 'Yahir'
      }, */
      {
        img: img3Ponente,
        text: 'Naut Aguilera'
      },
      {
          img: img4Ponente,
          text: 'Salvador Julián'
      },
      {
          img: img5Ponente,
          text: 'Luigui Meza'
      } /*,
      {
          img: img6Ponente,
          text: 'Pedro'
      } */

    ],
    menu: [
      {
        url: '#inicio', text: 'Inicio'
      },
      {
        url: '#acercaDelEvento', text: 'Acerca del evento'
      },
      {
        url: '#cronograma', text: 'Cronograma'
      },
      {
        url: '#expositores', text: 'Expositores'
      }
    ],
    valid: true,
  }),
  methods:{

    changeCertificado(){
      if(this.certificado == 'Si'){
        this.dialog = true
      }else if(this.certificado == 'No'){
        this.dialog = false
      }
    },
    startCallBack: function (x) {
     console.log(x)
   },
   endCallBack: function (x) {
     console.log(x)
   },
   registrar(){
     if(this.$refs.form.validate()){
       let x = this
       const db = firebase.firestore();
       db.collection("InnovaTalkFest").add({
       nombre: this.name,
       telefono: this.phone,
       email: this.email,
       nivel_estudio: this.nivel,
       distrito:this.distrito,
       certificado: this.certificado
       }).then(function() {
          x.dialogAcept = true
       }).catch(function(error) {
           console.error("Error writing document: ", error);
       });
     }


   }
 }
}
</script>

<style lang="stylus">
  img
    max-width 100%
  p
  li
  strong
    color #0E0F0F
  footer
    animation Gradient 15s ease infinite
    background: linear-gradient(-45deg,#000025 , #00175C, #0E0F0F);
    background-size: 400% 400%;
    p
    strong
      color white
    p
      margin-bottom 0
  .innova-talk-fest
    .container
      margin auto
      max-width 1124px
  .blockB
  .blockC
  .blockD
    h2
      color #03278E
    h3
      color #00175C

  .blockA-back
    background-attachment fixed
    background-position center
    background-repeat no-repeat
    background-size 150% 165%
    animation Gradient 30s ease infinite
  .block-horario
    strong
      font-size 1.1em
  .blockA-content-descrip
    color white
    h1
      font-size 3em
    h2
      font-size 1.5em
  .blockA
    position relative
  .blockA-content-form
    h2
      color #00175C
  .blockA-menu
    background white
    bottom 0
    position absolute
    display flex
    justify-content space-around
    width 100%
    a
      font-size 1.3em
      text-decoration none

  .blockA-content-form
    background white
  .blockC
    background white
  .blockD-item
    img
      border-radius 50%
      width 200px
  .carousel
    margin auto
    width 300px
  .blockA-contador
    font-size 1.3em
  .blockA-contador i
    font-style normal!important
    margin-left 7px
  .blockB-descrip
    a
      color  #0E0F0F
      font-weight bold
      text-decoration none
  @media screen and (max-width 930px)
    .blockC-list
      h3
        margin-top 15px


  @keyframes Gradient
  	0%
  		background-position 0% 50%

  	50%
  		background-position 100% 50%

  	100%
  		background-position 0% 50%

  @media screen and (max-width: 768px)
    .blockA-content-descrip
      text-align center
  @media screen and (min-width 736px)
    .blockA-content-descrip
      h1
        font-size 4.3em
      h2
        font-size 1.7em
  @media screen and (min-width 1124px)
    .blockA-content-descrip
      h1
        font-size 5em
      h2
        font-size 2em
</style>
