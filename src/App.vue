<template>
  <div>
    <Header/>
    <PainelLancamento/>

  </div>
</template>

<script>
import Header from './components/Header.vue'
import PainelLancamento from './components/PainelLancamentos.vue'
export default {
  name: 'App',
    components: {
    Header,
    PainelLancamento
}
}
</script>

<style scope>
body{
  background-color: white;
}
</style>
