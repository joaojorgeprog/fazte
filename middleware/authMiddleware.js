const authMiddleware = (store) => (next) => (action) => {
    // Verifica se a aplicação foi inicializada
    if (action.type === '@@INIT') {
      const token = localStorage.getItem('token'); 
      const refreshToken = localStorage.getItem('refreshToken');// Exemplo: pegando o token ou usuário do localStorage
  
      if (token) {
        let data = {
            token: token,
            haveLogin: true,
            refreshToken: refreshToken,
            errorLogin: null,
            loadingLogin: false
          }
          //let b = handleTableHeaders(response.data.response);
        // Se o usuário estiver salvo, despacha uma ação para atualizar o estado
        store.dispatch({ type: 'auth/setLogin', payload: data });
      }
    }
  
    return next(action);
};
  
  export default authMiddleware;