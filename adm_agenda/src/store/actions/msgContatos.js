import axios from 'axios';
import { GET_MSG_CONTATOS, GET_MSG_CONTATO, LIMPAR_MSG_CONTATO, LIMPAR_MSG_CONTATOS } from './types';
import { api } from '../../config';
import { getHeaders } from './localStorage';
import errorHandling from './errorHandling';

export const getMsgContatos = (pageAtual, limit) => {
    return function (dispatch) {
        axios.get(api + `/adm-msg-contato?page=${pageAtual}&limit=${limit}`, getHeaders())
            .then((response) => {
                dispatch({ type: GET_MSG_CONTATOS, payload: response.data });
            })
            .catch(errorHandling)
    }
}

export const getViewMsgContato = (id) => {
    return function (dispatch) {
        axios.get(api + `/adm-msg-contato/${id}`, getHeaders())
            .then((response) => {
                dispatch({ type: GET_MSG_CONTATO, payload: response.data });
            })
            .catch(errorHandling)
    }
}

export const postMsgContato = (dadosMsgContato, callback) => {
    return function (dispatch) {
        axios.post(api + `/adm-msg-contato`, dadosMsgContato, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const putMsgContato = (dadosMsgContato, callback) => {
    return function (dispatch) {
        axios.put(api + `/adm-msg-contato`, dadosMsgContato, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const deleteMsgContato = (_id, callback) => {
    return function (dispatch) {
        axios.delete(api + `/adm-msg-contato/${_id}`, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const limparMsgContato = () => {
    return function (dispatch) {
        dispatch({ type: LIMPAR_MSG_CONTATO });
    }
}

export const limparMsgContatos = () => {
    return function (dispatch) {
        dispatch({ type: LIMPAR_MSG_CONTATOS })
    }
}
