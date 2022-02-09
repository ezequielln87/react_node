import axios from 'axios';
import { GET_HOME, LIMPAR_HOME, GET_HOME_TOPO, LIMPAR_HOME_TOPO, GET_HOME_SERV, LIMPAR_HOME_SERV, GET_HOME_ACAO, LIMPAR_HOME_ACAO, GET_HOME_DET, LIMPAR_HOME_DET, GET_HOME_TOPO_IMG, LIMPAR_HOME_TOPO_IMG, GET_HOME_ACAO_IMG, LIMPAR_HOME_ACAO_IMG, GET_HOME_DET_IMG, LIMPAR_HOME_DET_IMG } from './types';
import { api } from '../../config';
import { getHeaders } from './localStorage';
import errorHandling from './errorHandling';

export const getViewHome = () => {
    return function (dispatch) {
        axios.get(api + `/adm-home`, getHeaders())
            .then((response) => {
                dispatch({ type: GET_HOME, payload: response.data });
            })
            .catch(errorHandling)
    }
}

export const postHome = (callback) => {
    return function (dispatch) {
        axios.post(api + `/adm-home`, {} ,getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const limparHome = () => {
    return function (dispatch) {
        dispatch({ type: LIMPAR_HOME});
    }
}

export const getViewHomeTopo = () => {
    return function (dispatch) {
        axios.get(api + `/adm-home-topo`, getHeaders())
            .then((response) => {
                dispatch({ type: GET_HOME_TOPO, payload: response.data });
            })
            .catch(errorHandling)
    }
}

export const putHomeTopo = (dadosHome, callback) => {
    return function (dispatch) {
        axios.put(api + `/adm-home-topo`, dadosHome, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const limparHomeTopo = () => {
    return function (dispatch) {
        dispatch({ type: LIMPAR_HOME_TOPO});
    }
}

export const getViewHomeServ = () => {
    return function (dispatch) {
        axios.get(api + `/adm-home-serv`, getHeaders())
            .then((response) => {
                dispatch({ type: GET_HOME_SERV, payload: response.data });
            })
            .catch(errorHandling)
    }
}

export const putHomeServ = (dadosHome, callback) => {
    return function (dispatch) {
        axios.put(api + `/adm-home-serv`, dadosHome, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const limparHomeServ = () => {
    return function (dispatch) {
        dispatch({ type: LIMPAR_HOME_SERV});
    }
}

export const getViewHomeAcao = () => {
    return function (dispatch) {
        axios.get(api + `/adm-home-acao`, getHeaders())
            .then((response) => {
                dispatch({ type: GET_HOME_ACAO, payload: response.data });
            })
            .catch(errorHandling)
    }
}

export const putHomeAcao = (dadosHome, callback) => {
    return function (dispatch) {
        axios.put(api + `/adm-home-acao`, dadosHome, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const limparHomeAcao = () => {
    return function (dispatch) {
        dispatch({ type: LIMPAR_HOME_ACAO});
    }
}

export const getViewHomeDet = () => {
    return function (dispatch) {
        axios.get(api + `/adm-home-det`, getHeaders())
            .then((response) => {
                dispatch({ type: GET_HOME_DET, payload: response.data });
            })
            .catch(errorHandling)
    }
}

export const putHomeDet = (dadosHome, callback) => {
    return function (dispatch) {
        axios.put(api + `/adm-home-det`, dadosHome, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const limparHomeDet = () => {
    return function (dispatch) {
        dispatch({ type: LIMPAR_HOME_DET});
    }
}

export const getViewHomeTopoImg = () => {
    return function (dispatch) {
        axios.get(api + `/adm-home-topo-img`, getHeaders())
            .then((response) => {
                dispatch({ type: GET_HOME_TOPO_IMG, payload: response.data });
            })
            .catch(errorHandling)
    }
}

export const putHomeTopoImg = (dadosHome, callback) => {
    return function (dispatch) {
        axios.put(api + `/adm-home-topo-img`, dadosHome, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const limparHomeTopoImg = () => {
    return function (dispatch) {
        dispatch({ type: LIMPAR_HOME_TOPO_IMG});
    }
}

export const getViewHomeAcaoImg = () => {
    return function (dispatch) {
        axios.get(api + `/adm-home-acao-img`, getHeaders())
            .then((response) => {
                dispatch({ type: GET_HOME_ACAO_IMG, payload: response.data });
            })
            .catch(errorHandling)
    }
}

export const putHomeAcaoImg = (dadosHome, callback) => {
    return function (dispatch) {
        axios.put(api + `/adm-home-acao-img`, dadosHome, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const limparHomeAcaoImg = () => {
    return function (dispatch) {
        dispatch({ type: LIMPAR_HOME_ACAO_IMG});
    }
}

export const getViewHomeDetImg = () => {
    return function (dispatch) {
        axios.get(api + `/adm-home-det-img`, getHeaders())
            .then((response) => {
                dispatch({ type: GET_HOME_DET_IMG, payload: response.data });
            })
            .catch(errorHandling)
    }
}

export const putHomeDetImg = (dadosHome, callback) => {
    return function (dispatch) {
        axios.put(api + `/adm-home-det-img`, dadosHome, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}

export const limparHomeDetImg = () => {
    return function (dispatch) {
        dispatch({ type: LIMPAR_HOME_DET_IMG});
    }
}