import {createStore} from 'vuex'
import moduloLancamentos from './modules/lancamentos';

//Quando a tela é carregada vai trazer meus dados
const store = createStore({
  modules:{
    moduloLancamentos
  }
});

export default store;