import { GET_SOBRES, GET_SOBRE, LIMPAR_SOBRE, LIMPAR_SOBRES } from '../actions/types';

export default (state = {}, actions) => {
    switch (actions.type) {
        case GET_SOBRES:
            return {
                ...state,
                sobres: actions.payload.sobre
            }
        case GET_SOBRE:
            return {
                ...state,
                sobreDetails: actions.payload.sobre
            }
        case LIMPAR_SOBRES:
            return {
                ...state,
                sobres: null
            }
        case LIMPAR_SOBRE:
            return {
                ...state,
                sobreDetails: null
            }
        default:
            return state;
    }
}