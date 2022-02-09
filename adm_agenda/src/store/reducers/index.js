import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import userReducer from './users_reducer';
import msgContatoReducer from './msg_contato_reducer';
import sobreReducer from './sobre_reducer';
import contatoReducer from './contato_reducer';
import rodapeReducer from './rodape_reducer';
import homeReducer from './home_reducer';
import seoReducer from './seo_reducer';

const reducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    msgContato: msgContatoReducer,
    sobre: sobreReducer,
    contato: contatoReducer,
    rodape: rodapeReducer,
    home: homeReducer,
    seo: seoReducer
});

export default reducers;