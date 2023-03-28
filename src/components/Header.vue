<template>
  <div>
     <div class="home">
      <button class="btn-add" @click="callModal">
        <img :src="adicionar">
      </button>
      <ModalAdd 
      v-if="isShowModal"
      :title="'ModalTitle'"
      @close="close"
      >
      </ModalAdd>
    </div>

    <div class="header">
      <button class="botaoMesBefore" @click="beforeMonth()">
        <img :src="before">
      </button>

      <span>{{retornoMes}}</span>
      <button class="botaoMesAfter" @click="afterMonth()">
        <img :src="after">
      </button>
    </div>
    
    <div>
      <div class="valoresSaldo">
        <span>Saldo em conta</span>
        <span><br>R$ {{
            dinheiroEmCaixa.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })
          }}</span>
      </div>
    </div>

  <div class="container">
    <div class="valoresEntrada">
      <img :src="positivo">
      <span class="spanEntrada">Entrada</span>
      <span > R$ {{
          dinheiroEntrada.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })
        }}</span>

      <img :src="negativo">
      <span>Saida</span>
      <span >R$ {{
          dinheiroSaida.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })
        }}</span>
    </div>

    <!-- <div class="valoresSaida"> 
       <img :src="negativo">
      <span>Saida</span>
      <span >R$ {{
          dinheiroSaida.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })
        }}</span>
    </div> -->
  </div>
</div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import after from '../img/arrow-right-circle.png'
import adicionar from '../img/botao-adicionar.png'
import before from '../img/arrow-left-circle.png'
import positivo from '../img/positivo.png'
import negativo from '../img/negativo.png'
import ModalAdd from './Modal.vue';
const now = new Date();
const mesCompleto = `${now.getFullYear()}-${now.getMonth() + 1}`;
const splitResult = mesCompleto.split("-");
const anoFiltro = splitResult[0];
const mesFiltro = splitResult[1];
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
const retornoMes = `${months[mesFiltro - 1]} de ${anoFiltro} `;
export default {
  name: "Header-Header",
  components:{
    ModalAdd,
  },
  computed: mapGetters(["dinheiroEmCaixa", "dinheiroEntrada", "dinheiroSaida"]),
  data: () => ({
    retornoMes,
    mesFiltro,
    after,
    before,
    adicionar,
    positivo,
    negativo,
    isShowModal: false,
  }),
  created() {
    this.atualizarCaixa();
  },
  methods: {
    ...mapActions(["atualizarCaixa"]),
    beforeMonth() {
      this.retornoMes = now.setMonth(now.getMonth() - 1);
      const retornoMess = `${months[now.getMonth()]} de ${now.getFullYear()} `;
      this.retornoMes = retornoMess;
      this.mesFiltro = `0${now.getMonth() + 1}`.slice(-2);
      const lancamentoFiltro = this.mesFiltro;
      this.carregarLancamentos(lancamentoFiltro);
      //this.listar();
    },
    afterMonth() {
      this.retornoMes = now.setMonth(now.getMonth() + 1);
      const retornoMess = `${months[now.getMonth()]} de ${now.getFullYear()} `;
      this.retornoMes = retornoMess;
      this.mesFiltro = `0${now.getMonth() + 1}`.slice(-2);
      const lancamentoFiltro = this.mesFiltro;
      this.carregarLancamentos(lancamentoFiltro);
    },
    ...mapActions(["carregarLancamentos"]),
    callModal() {
      this.isShowModal = true
    },
      close() {
        this.isShowModal = false
      }
  },
};
</script>

<style scoped>
div {
  /* background-image: linear-gradient(to right,#1f2186, #59e3dc);  */
  padding: px 2px 2px 2px;
  /* background-color: rgb(112, 204, 112); */
  background: linear-gradient(to right, rgb(81, 197, 133), rgb(53, 175, 118));
   /* background: linear-gradient(to right, purple, darkblue); */
  border-radius: 20px;
}

h1 {
  font-size: 180%;
}

p {
  font-size: 150%;
}

.header {
  padding: 20px;
  font-size: 26px;
  text-align: center;
}

.container{
  width: 100%;
  text-align: center;
}
.valoresEntrada {
    width: 100%;
    font-size: 18px;
    background-color: unset;
    margin-top:3%;
    padding: 0px 0px 20px 0px;
    
}

.valoresEntrada:first img {
  width: 30px;
  top: 30px;
  margin-right: 60%;
}

.valoresEntrada img {
  width: 30px;
  top: 30px;
}


.valoresEntrada span{
  display: block;
}

.spanEntrada{
  margin-right: 60%;
}



.valoresSaida {
   top:24%;
  font-size: 18px;
 left:90%;
}

.divValorSaida{
  margin-top: 5px;
}

.valoresSaida img{
  width: 30px;
  position:absolute;
  right:90%;
  top:50%;
  transform:translate(-50%,-50%);
  background-color: unset;
}

.valoresSaldo {
  text-align: center;
  font-size: 19px;
  vertical-align: middle;
}

.valoresSaldo span:last-child{
  font-weight: bold;
} 

.btn-add{
   border: none;
  outline: none;
  background-color: unset;
  vertical-align: middle;
  float: right;
  text-align: right;
  width: 100%;
  margin-right: 10px;
  margin-top: 5px;
}
.btn-add:hover {
  cursor: pointer;
}
.btn-add img:active {
  color: gray;
}
.btn-add img {
  width: 26px;
}

.botaoMesBefore {
  border: none;
  outline: none;
  vertical-align: middle;
  background-color: unset;

}
.botaoMesBefore:hover {
  cursor: pointer;
  
}
.botaoMesBefore img:active {
  color: gray;
}
.botaoMesBefore img {
  width: 26px;
}
.botaoMesAfter {
  border: none;
  outline: none;
  vertical-align: middle;
  background-color: unset;
}
.botaoMesAfter:hover {
  cursor: pointer;
}
.botaoMesAfter img:active {
  color: green;
}
.botaoMesAfter img {
  width: 26px;
}


</style>