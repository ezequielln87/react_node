import { GET_SEOS, GET_SEO, LIMPAR_SEOS, LIMPAR_SEO } from '../actions/types';

export default (state = {}, actions) => {
    switch (actions.type) {
        case GET_SEOS:
            return {
                ...state,
                seos: actions.payload.seo
            }
        case GET_SEO:
            return {
                ...state,
                seoDetails: actions.payload.seo
            }
        case LIMPAR_SEOS:
            return {
                ...state,
                seos: null
            }
        case LIMPAR_SEO:
            return {
                ...state,
                seoDetails: null
            }
        default:
            return state;
    }
}