import axios from 'axios';
import { GET_SEOS, GET_SEO, LIMPAR_SEO, LIMPAR_SEOS } from './types';
import { api } from '../../config';
import { getHeaders } from './localStorage';
import errorHandling from './errorHandling';

export const getSeos = (pageAtual, limit) => {
    return function (dispatch) {
        axios.get(api + `/adm-seo?page=${pageAtual}&limit=${limit}`, getHeaders())
            .then((response) => {
                dispatch({ type: GET_SEOS, payload: response.data });
            })
            .catch(errorHandling)
    }
}

export const getViewSeo = (id) => {
    return function (dispatch) {
        axios.get(api + `/adm-seo/${id}`, getHeaders())
            .then((response) => {
                dispatch({ type: GET_SEO, payload: response.data });
            })
            .catch(errorHandling)
    }
}

export const postSeo = (dadosSeo, callback) => {
    return function (dispatch) {
        axios.post(api + `/adm-seo`, dadosSeo, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const putSeo = (dadosSeo, callback) => {
    return function (dispatch) {
        axios.put(api + `/adm-seo`, dadosSeo, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const deleteSeo = (_id, callback) => {
    return function (dispatch) {
        axios.delete(api + `/adm-seo/${_id}`, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const limparSeo = () => {
    return function (dispatch) {
        dispatch({ type: LIMPAR_SEO });
    }
}

export const limparSeos = () => {
    return function (dispatch) {
        dispatch({ type: LIMPAR_SEOS })
    }
}
