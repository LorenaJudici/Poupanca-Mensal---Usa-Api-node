import api from '../api';

export default {
  listar: () => api.get('/financeiros'),
  salvar: (financeiro) => api.post('/financeiro', financeiro),
  // deleteFinanceiro: (financeiro) => api.delete('/financeiro', { financeiro }),
  deleteFinanceiro: (financeiro) => api.delete('/financeiro', { data: financeiro }),
};
