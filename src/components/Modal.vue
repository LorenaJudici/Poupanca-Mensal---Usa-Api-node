<template >
            
            
  <div class="modal-backdrop">
   
    
    <div class="modal">
       <div class="container">
        <!-- tela de login -->
        <div class="login-screen">
          <!-- formulário de login -->
          <form @submit="salvar"  class="form">
            <h3 class="title">Cadastro</h3>
            <div id="tiposLancamento">
              <input class="input" type="radio" name="tipo" id="entrada" value=0 checked v-model="tipo"/>
              <label for="entrada">Entrada</label>
              <input class="input" type="radio" name="tipo" id="saida" value=1  v-model="tipo"/>
              <label for="saida">Saida</label>
            </div>
            <input type="text" placeholder="Descrição" class="inputs"  name="descricao" required v-model="descricao"/>
            <input type="number" placeholder="Valor" class="inputs" min="0" step="0.01" name="valor" required v-model.number="valor"/>
            <input type="date" placeholder="Data" class="inputs" name="data"  required v-model="data"/>
            <button class="btn">Salvar</button>
            <button class="btn-close" @click="close">X</button>
            <p></p>
          </form>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import Lancamento from '../models/Lancamento'
import mesFiltroHeader from './Header.vue'
  export default {
    name: 'ModalAdd',
     data: () => {
    return {
      tipo: 0,
      valor:undefined,
      descricao:"",
      data: "",
    };
  },
    methods: {
      ...mapActions(["salvarLancamento","carregarLancamentos"]),
      salvar(){
      //event.preventDefault(); //impede que a pagina recarrega
      const lancamento = new Lancamento(this.valor, this.descricao, this.data, this.tipo);
      this.salvarLancamento(lancamento);
       const lancamentoFiltro = mesFiltroHeader.data([0]).mesFiltro;
      console.log(lancamentoFiltro)
      this.carregarLancamentos(lancamentoFiltro)
      // this.close()
    },
    close() {
     
        this.$emit('close')
      }
    }
  };
</script>

<style scoped>

#painelLancamento {
  width: 40%;
  padding: 20px;
  
}

#formularioLancamento {
  border-radius: 20px;
  padding: 20px;
  font-family: "padrao";
  
}

#tiposLancamento {
  margin-bottom: 25px;
  font-family: "negrito";
  display: flex;
  
}

#tiposLancamento label {
  margin-left: 5px;
}

#tiposLancamento input {
  cursor: pointer;
  margin-left: 20px;
}

/* #tiposLancamento label:first-of-type {
  color: #22a7f0;
}

#tiposLancamento label:last-of-type {
  color: red;
} */

.title{
  margin-top:0px
}
  .modal-backdrop {
    position: fixed;
    z-index: 999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    
  }

  .modal {
    position: relative;
    width: 300px;
    background: rgb(209, 219, 219);
    /* background-image: linear-gradient(to right,#72ceba, #29b48b);  */
     border-radius: 40px;
  }

  .btn-close {
    position: absolute;
    top: 17px;
    right: 17px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    color: #2196F3;
    background: transparent;
  }

  /*container*/
.container{
	width: 100%;
	height: 100%;
}

.login-screen{
	width: 240px;
	background: linear-gradient(rgb(81, 197, 133), rgb(53, 175, 118));
  /* background: linear-gradient(to right, orangered, orange); */
	border-radius: 15px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	padding-top: 50px;
	color: #fff;
	align-items: center;
}

.form{
	display: flex;
	flex-direction: column;
}

.inputs{
	width: 80%;
	margin: 0 auto;
	padding: 10px;
	border: none;
	margin-bottom: 20px;
	border-radius: 50px;
}

.btn{
	padding: 10px;
	width: 80%;
	margin: 0 auto;
	border-radius: 50px;
	border: none;
	text-transform: uppercase;
	font-weight: 700;
	color: #fff;
	background: linear-gradient(to right, rgb(99, 151, 14), rgb(171, 231, 58));
	cursor: pointer;
}

/* 
.inputBorder{
  width: 80%;
	margin: 0 auto;
	padding: 8px;
	border: none;
	border-radius: 50px;
  margin-top: 5px;
} */
</style>