<template lang="pug">
  v-app
    v-content
      Innova
      //router-view
</template>

<script>
import Innova from '@/views/InnovaTalkFest'
export default {
  name: 'App',
  components:{
    Innova
  },
  data () {
    return {
      //
    }
  }
}
</script>
<style lang="stylus">
  body
    font-size 16px
</style>
