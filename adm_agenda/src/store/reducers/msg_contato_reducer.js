import { GET_MSG_CONTATOS, GET_MSG_CONTATO, LIMPAR_MSG_CONTATO, LIMPAR_MSG_CONTATOS } from '../actions/types';

export default (state = {}, actions) => {
    switch (actions.type) {
        case GET_MSG_CONTATOS:
            return {
                ...state,
                msgContatos: actions.payload.msgContatos
            }
        case GET_MSG_CONTATO:
            return {
                ...state,
                msgContatoDetails: actions.payload.msgContato
            }
        case LIMPAR_MSG_CONTATOS:
            return {
                ...state,
                msgContatos: null
            }
        case LIMPAR_MSG_CONTATO:
            return {
                ...state,
                msgContatoDetails: null
            }
        default:
            return state;
    }
}