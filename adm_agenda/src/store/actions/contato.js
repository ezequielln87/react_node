import axios from 'axios';
import { GET_CONTATO, LIMPAR_CONTATO } from './types';
import { api } from '../../config';
import { getHeaders } from './localStorage';
import errorHandling from './errorHandling';

export const getViewContato = () => {
    return function (dispatch) {
        axios.get(api + `/adm-contato`, getHeaders())
            .then((response) => {
                dispatch({ type: GET_CONTATO, payload: response.data });
            })
            .catch(errorHandling)
    }
}

export const postContato = (callback) => {
    return function (dispatch) {
        axios.post(api + `/adm-contato`, {} ,getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const putContato = (dadosContato, callback) => {
    return function (dispatch) {
        axios.put(api + `/adm-contato`, dadosContato, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const limparContato = () => {
    return function (dispatch) {
        dispatch({ type: LIMPAR_CONTATO });
    }
}
