import { GET_HOME, LIMPAR_HOME, GET_HOME_TOPO, LIMPAR_HOME_TOPO, GET_HOME_SERV, LIMPAR_HOME_SERV, GET_HOME_ACAO, LIMPAR_HOME_ACAO, GET_HOME_DET, LIMPAR_HOME_DET, GET_HOME_DET_IMG, LIMPAR_HOME_DET_IMG, GET_HOME_ACAO_IMG, LIMPAR_HOME_ACAO_IMG, GET_HOME_TOPO_IMG, LIMPAR_HOME_TOPO_IMG } from '../actions/types';

export default (state = {}, actions) => {
    switch (actions.type) {
        case GET_HOME:
            return {
                ...state,
                homeDetails: actions.payload.home
            }
        case LIMPAR_HOME:
            return {
                ...state,
                homeDetails: null
            }
        case GET_HOME_TOPO:
            return {
                ...state,
                homeDetailsTopo: actions.payload.home
            }
        case LIMPAR_HOME_TOPO:
            return {
                ...state,
                homeDetailsTopo: null
            }
        case GET_HOME_SERV:
            return {
                ...state,
                homeDetailsServ: actions.payload.home
            }
        case LIMPAR_HOME_SERV:
            return {
                ...state,
                homeDetailsServ: null
            }
        case GET_HOME_ACAO:
            return {
                ...state,
                homeDetailsAcao: actions.payload.home
            }
        case LIMPAR_HOME_ACAO:
            return {
                ...state,
                homeDetailsAcao: null
            }
        case GET_HOME_DET:
            return {
                ...state,
                homeDetailsDet: actions.payload.home
            }
        case LIMPAR_HOME_DET:
            return {
                ...state,
                homeDetailsDet: null
            }
        case GET_HOME_TOPO_IMG:
            return {
                ...state,
                homeDetailsTopoImg: actions.payload.home
            }
        case LIMPAR_HOME_TOPO_IMG:
            return {
                ...state,
                homeDetailsTopoImg: null
            }
        case GET_HOME_ACAO_IMG:
            return {
                ...state,
                homeDetailsAcaoImg: actions.payload.home
            }
        case LIMPAR_HOME_ACAO_IMG:
            return {
                ...state,
                homeDetailsAcaoImg: null
            }
        case GET_HOME_DET_IMG:
            return {
                ...state,
                homeDetailsDetImg: actions.payload.home
            }
        case LIMPAR_HOME_DET_IMG:
            return {
                ...state,
                homeDetailsDetImg: null
            }
        default:
            return state;
    }
}