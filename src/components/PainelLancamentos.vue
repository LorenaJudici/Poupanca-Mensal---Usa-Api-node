<template>
  <div 
    class="blocoLancamento"
    v-for="lancamento in todosLancamentos"
    v-bind:key="lancamento.id"
    :lancamento="lancamento"
  >
    <div class="botoes">
       <img :src="lancamento.tipo === 0 ? positivo : negativo">
    </div>
    
    <div class="descricaoLancamento">
      <span>{{lancamento.descricao}}</span>
    </div>

    <div class="valorLancamento">
      <span>R$ 
        {{
          lancamento.valor.toLocaleString(undefined,{minimumFractionDigits:2})
        }}
      </span>
      <span>{{new Date(lancamento.data).toLocaleDateString('pt-BR',{timeZone:'UTC'})}}</span>
      
     
    </div>
     <div class="btnExcluir">
      <button class="botaoRemover"  @click="excluir(lancamento)">
        <img :src="excluirbtn"> 
      </button>
        
       <!-- <img :src="lancamento.tipo === 0 ? positivo : negativo"> -->
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import positivo from '../img/positivo.png'
import negativo from '../img/negativo.png'
import excluirbtn from '../img/excluir1.png'
import mesFiltroHeader from './Header.vue'

export default {
  
  name:"PainelLancamento",
  data:() => {
    return {
      lancamento:[],
      positivo,
      negativo,
      excluirbtn,
      isModalVisible: false,
    };
  },
  created() {
    this.carregaDados();
  },
  methods:{
    carregaDados(){
      const lancamentoFiltro = mesFiltroHeader.data([0]).mesFiltro;
      this.carregarLancamentos(lancamentoFiltro)
    },
    ...mapActions(["carregarLancamentos","excluirLancamento"]), 
    excluir(lancamento){
      this.excluirLancamento(lancamento);
      const lancamentoFiltro = mesFiltroHeader.data([0]).mesFiltro;
      this.carregarLancamentos(lancamentoFiltro)

    }
  },
  computed:mapGetters(["todosLancamentos"]),
 
}
</script>

<style scoped>
.blocoLancamento {
  display: flex;
  background-color: rgb(203, 219, 218);
  border-radius: 20px;
  font-family: "padrao";
  padding: 20px;
  margin-bottom: 10px;
  height: 45px;
  margin-top: 15px;
}

.botoes {
  position:relative;
}

.botoes img{
  width: 30px;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  margin-left: 10px;
}

.descricaoLancamento{
  font-size: 20px;
  position:relative;
  width: 80%;
}

.descricaoLancamento span{
  position:absolute;
  top:50%;
  left: 20%;
  transform:translate(0%,-50%)
}
.valorLancamento {
  width: 50%;
  float: right;
  text-align: right;
}
.valorLancamento span {
  display: block;
  font-size: 120%;
}

.imagemLancamento {
  width: 50px;
  vertical-align: middle;
}
.botaoRemover {
  border: none;
  outline: none;
  background-color: unset;
  vertical-align: middle;
}
.botaoRemover:hover {
  cursor: pointer;
}
.botaoRemover img {
  width: 30px;
  margin-left: 8px;
}
.botaoRemover img:active {
  filter: invert(100%);
}

.ValorLancamento span {
  display: block;
  font-size: 80%;
}
.valor {
  font-family: "negrito";
  font-size: 150% !important;
}

</style>