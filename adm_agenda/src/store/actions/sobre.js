import axios from 'axios';
import { GET_SOBRES, GET_SOBRE, LIMPAR_SOBRE, LIMPAR_SOBRES } from './types';
import { api } from '../../config';
import { getHeaders } from './localStorage';
import errorHandling from './errorHandling';

export const getSobres = (pageAtual, limit) => {
    return function (dispatch) {
        axios.get(api + `/adm-sobre?page=${pageAtual}&limit=${limit}`, getHeaders())
            .then((response) => {
                dispatch({ type: GET_SOBRES, payload: response.data });
            })
            .catch(errorHandling)
    }
}

export const getViewSobre = (id) => {
    return function (dispatch) {
        axios.get(api + `/adm-sobre/${id}`, getHeaders())
            .then((response) => {
                dispatch({ type: GET_SOBRE, payload: response.data });
            })
            .catch(errorHandling)
    }
}

export const postSobre = (dadosSobre, callback) => {
    return function (dispatch) {
        axios.post(api + `/adm-sobre`, dadosSobre, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const putSobre = (dadosSobre, callback) => {
    return function (dispatch) {
        axios.put(api + `/adm-sobre`, dadosSobre, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const deleteSobre = (_id, callback) => {
    return function (dispatch) {
        axios.delete(api + `/adm-sobre/${_id}`, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const postSobreFoto = (dadosSobre, callback) => {
    return function (dispatch) {
        axios.put(api + `/adm-sobre-img`, dadosSobre, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const limparSobre = () => {
    return function (dispatch) {
        dispatch({ type: LIMPAR_SOBRE });
    }
}

export const limparSobres = () => {
    return function (dispatch) {
        dispatch({ type: LIMPAR_SOBRES })
    }
}
