import { GET_CONTATO, LIMPAR_CONTATO } from '../actions/types';

export default (state = {}, actions) => {
    switch (actions.type) {
        case GET_CONTATO:
            return {
                ...state,
                contatoDetails: actions.payload.contato
            }
        case LIMPAR_CONTATO:
            return {
                ...state,
                contatoDetails: null
            }
        default:
            return state;
    }
}