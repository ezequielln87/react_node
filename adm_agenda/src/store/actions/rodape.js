import axios from 'axios';
import { GET_RODAPE, LIMPAR_RODAPE } from './types';
import { api } from '../../config';
import { getHeaders } from './localStorage';
import errorHandling from './errorHandling';

export const getViewRodape = () => {
    return function (dispatch) {
        axios.get(api + `/adm-rodape`, getHeaders())
            .then((response) => {
                dispatch({ type: GET_RODAPE, payload: response.data });
            })
            .catch(errorHandling)
    }
}

export const postRodape = (callback) => {
    return function (dispatch) {
        axios.post(api + `/adm-rodape`, {} ,getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const putRodape = (dadosRodape, callback) => {
    return function (dispatch) {
        axios.put(api + `/adm-rodape`, dadosRodape, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const limparRodape = () => {
    return function (dispatch) {
        dispatch({ type: LIMPAR_RODAPE});
    }
}
