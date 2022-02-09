import { GET_RODAPE, LIMPAR_RODAPE } from '../actions/types';

export default (state = {}, actions) => {
    switch (actions.type) {
        case GET_RODAPE:
            return {
                ...state,
                rodapeDetails: actions.payload.rodape
            }
        case LIMPAR_RODAPE:
            return {
                ...state,
                rodapeDetails: null
            }
        default:
            return state;
    }
}