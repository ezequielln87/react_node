import axios from 'axios';
import { GET_USERS, GET_USER, LIMPAR_USER, LIMPAR_USERS, LOGIN_USER, LOGOUT_USER } from './types';
import { api } from '../../config';
import { getHeaders, cleanToken } from './localStorage';
import errorHandling from './errorHandling';

export const getUsers = (pageAtual, limit) => {
    return function (dispatch) {
        axios.get(api + `/users?page=${pageAtual}&limit=${limit}`, getHeaders())
            .then((response) => {
                dispatch({ type: GET_USERS, payload: response.data });
            })
            .catch(errorHandling)
    }
}

export const getViewUser = (id) => {
    return function (dispatch) {
        axios.get(api + `/users/${id}`, getHeaders())
            .then((response) => {
                dispatch({ type: GET_USER, payload: response.data });
            })
            .catch(errorHandling)
    }
}

export const postUser = (dadosUser, callback) => {
    return function (dispatch) {
        axios.post(api + `/users`, dadosUser)
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const putUser = (dadosUser, callback) => {
    return function (dispatch) {
        axios.put(api + `/users`, dadosUser, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const deleteUser = (_id, callback) => {
    return function (dispatch) {
        axios.delete(api + `/users/${_id}`, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const limparUser = () => {
    return function (dispatch) {
        dispatch({ type: LIMPAR_USER });
    }
}

export const limparUsers = () => {
    return function (dispatch) {
        dispatch({ type: LIMPAR_USERS })
    }
}

export const viewPerfil = (callback) => {
    return function (dispatch) {
        axios.get(api + '/perfil', getHeaders())
            .then((response) => {
                //console.log(response.data);
                dispatch({ type: LOGIN_USER, payload: response.data });
                callback({ erro: response.data });
            })
            .catch((err) => {
                dispatch({ type: LOGOUT_USER });
                callback(errorHandling(err));
            })
    }
}

export const putPerfil = (dadosUser, callback) => {
    return function (dispatch) {
        axios.put(api + `/perfil`, dadosUser, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const putPerfilFoto = (dadosUser, callback) => {
    return function (dispatch) {
        axios.put(api + `/perfil-img`, dadosUser, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const putPerfilSenha = (dadosUser, callback) => {
    return function (dispatch) {
        axios.put(api + `/perfil`, dadosUser, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const recuperarSenha = (dadosUser, callback) => {
    return function (dispatch) {
        axios.post(api + `/recuperar-senha`, dadosUser)
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const validarChave = (chave, callback) => {
    return function (dispatch) {
        axios.get(api + `/recuperar-senha/${chave}`)
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const atualizarSenha = (dadosUser, callback) => {
    return function (dispatch) {
        axios.put(api + `/recuperar-senha`, dadosUser)
            .then((response) => {
                cleanToken();
                dispatch({type: LOGOUT_USER});
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}