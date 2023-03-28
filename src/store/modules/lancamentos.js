import axios from 'axios'

const http = axios.create({
  baseURL: 'https://localhost:3001/',
});

const moduloLancamentos = {
  //onde os dados vão ficar armazenados
  state:{
    // lancamentos:[
    //   {
    //     id: Math.random().toString(36).substring(2, 5),
    //     valor:-50,
    //     descricao:"compra no mercado",
    //     data:"2022-09-10"

    //   },
    //   {
    //     id: Math.random().toString(36).substring(2, 5),
    //     valor:100,
    //     descricao:"Pix",
    //     data:"2022-09-20"

    //   },
    //   {
    //     id: Math.random().toString(36).substring(2, 5),
    //     valor:-25,
    //     descricao:"Famracia",
    //     data:"2022-09-29"

    //   }
    // ],
    lancamentos:[],
    caixa:0
  }, 
  //devolve os dados para aplicação
  getters:{
    todosLancamentos: state =>state.lancamentos,
    dinheiroEmCaixa: state => state.caixa,
    dinheiroEntrada:state => state.caixaEntrada,
    dinheiroSaida:state => state.caixaSaida,
  },
  // chama para remover, listar, alterar(camada em cima das mutatios, invota a mutations) 
  actions:{
    carregarLancamentos: async ({ commit }, lancamentoFiltro) => {
      const newList = [];
      const resposta = await http.get("/financeiros");
      for (let i = 0; i < resposta.data.length; i += 1) {
        if (resposta.data[i].data.split('-')[1] === lancamentoFiltro) {
          newList.push(resposta.data[i]);
        }
      }
      commit("atualizarLancamentos", newList);
      commit("calcularCaixa");
  },
    salvarLancamento: async ( commit , lancamento) =>{
      await http.post("/financeiro", lancamento);
    },
    atualizarCaixa:({commit}) => commit('calcularCaixa'),

    excluirLancamento: async ({commit}, lancamento) => {
      await http.delete('/financeiro', { data: lancamento });
      commit("removerLancamento");
    }
  }, 
  
  // cria as funciones para remover, listar, alterar, atualizar
  mutations:{
    atualizarLancamentos: 
    (state, lancamentos) => {
      state.lancamentos = lancamentos
    },
    calcularCaixa:(state) => {        
        let caixaSaida = 0;
        let caixaEntrada = 0;

         for (let i = 0; i < state.lancamentos.length; i += 1) {
          if(state.lancamentos[i].tipo === 0){
            caixaEntrada += state.lancamentos[i].valor
          }else{
            caixaSaida +=state.lancamentos[i].valor
          }
        }
       
         state.caixaEntrada = caixaEntrada
         state.caixaSaida = caixaSaida
         state.caixa = caixaEntrada - caixaSaida;
    },
    removerLancamento:() => {
      alert( 'Registro excluido')
      //state.lancamentos = state.lancamentos.filter(lancamento => lancamento.id !== id) //recebe todo mundo sem o registro que estou deletando
    }
  } 
};

export default moduloLancamentos;