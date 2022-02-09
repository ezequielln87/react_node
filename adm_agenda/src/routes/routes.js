import React from 'react';
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../store/store'

import { history } from '../history';

import Login from '../pages/Login';
import CadUserLogin from '../pages/CadUserLogin';
import RecuperarSenhaLogin from '../pages/RecuperarSenhaLogin';
import AtualizarSenhaLogin from '../pages/AtualizarSenhaLogin';

import Dashboard from '../pages/Dashboard';
import Perfil from '../pages/Perfil';
import User from '../pages/User';
import Viewuser from '../pages/Viewuser';
import CadUser from '../pages/CadUser';
import UpdateUser from '../pages/UpdateUser';
import UpdateUserSenha from '../pages/UpdateUserSenha';
import UpdatePerfil from '../pages/UpdatePerfil';
import UpdatePerfilSenha from '../pages/UpdatePerfilSenha';
import UpdatePerfilFoto from '../pages/UpdatePerfilFoto';

import MsgContato from '../pages/MsgContato';
import ViewMsgContato from '../pages/ViewMsgContato';
import CadMsgContato from '../pages/CadMsgContato';
import UpdateMsgContato from '../pages/UpdateMsgContato';
import ViewContato from '../pages/ViewContato';
import UpdateContato from '../pages/UpdateContato';

import ViewHome from '../pages/ViewHome';
import UpdateHomeTopo from '../pages/UpdateHomeTopo';
import UpdateHomeServ from '../pages/UpdateHomeServ';
import UpdateHomeAcao from '../pages/UpdateHomeAcao';
import UpdateHomeDet from '../pages/UpdateHomeDet';
import UpdateHomeTopoImg from '../pages/UpdateHomeTopoImg';
import UpdateHomeAcaoImg from '../pages/UpdateHomeAcaoImg';
import UpdateHomeDetImg from '../pages/UpdateHomeDetImg';

import Seo from '../pages/Seo';
import ViewSeo from '../pages/ViewSeo';
import CadSeo from '../pages/CadSeo';
import UpdateSeo from '../pages/UpdateSeo';

import Sobre from '../pages/Sobre';
import ViewSobre from '../pages/ViewSobre';
import CadSobre from '../pages/CadSobre';
import UpdateSobre from '../pages/UpdateSobre';
import UpdateSobreFoto from '../pages/UpdateSobreFoto';

import ViewRodape from '../pages/ViewRodape';
import UpdateRodape from '../pages/UpdateRodape';

import baseLogin from '../containers/login';
import baseDashboard from '../containers/dashboard';

export default function Routes() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={baseLogin(Login)} />
                        <Route path="/cad-user-login" exact component={baseLogin(CadUserLogin)} />
                        <Route path="/recuperar-senha-login" exact component={baseLogin(RecuperarSenhaLogin)} />
                        <Route path="/atualizar-senha-login/:chave" exact component={baseLogin(AtualizarSenhaLogin)} />

                        <Route path="/dashboard" exact component={baseDashboard(Dashboard)} />
                        <Route path="/perfil" exact component={baseDashboard(Perfil)} />
                        <Route path="/user" exact component={baseDashboard(User)} />
                        <Route path="/view-user/:id" exact component={baseDashboard(Viewuser)} />
                        <Route path="/cad-user" exact component={baseDashboard(CadUser)} />
                        <Route path="/update-user/:id" exact component={baseDashboard(UpdateUser)} />
                        <Route path="/update-user-senha/:id" exact component={baseDashboard(UpdateUserSenha)} />
                        <Route path="/update-perfil" exact component={baseDashboard(UpdatePerfil)} />
                        <Route path="/update-perfil-senha" exact component={baseDashboard(UpdatePerfilSenha)} />
                        <Route path="/update-perfil-foto" exact component={baseDashboard(UpdatePerfilFoto)} />

                        <Route path="/msg-contato" exact component={baseDashboard(MsgContato)} />
                        <Route path="/view-msg-contato/:id" exact component={baseDashboard(ViewMsgContato)} />
                        <Route path="/cad-msg-contato" exact component={baseDashboard(CadMsgContato)} />
                        <Route path="/update-msg-contato/:id" exact component={baseDashboard(UpdateMsgContato)} />
                        <Route path="/view-contato" exact component={baseDashboard(ViewContato)} />
                        <Route path="/update-contato" exact component={baseDashboard(UpdateContato)} />

                        <Route path="/sobre" exact component={baseDashboard(Sobre)} />
                        <Route path="/cad-sobre" exact component={baseDashboard(CadSobre)} />
                        <Route path="/view-sobre/:id" exact component={baseDashboard(ViewSobre)} />
                        <Route path="/update-sobre/:id" exact component={baseDashboard(UpdateSobre)} />
                        <Route path="/update-sobre-foto/:id" exact component={baseDashboard(UpdateSobreFoto)} />

                        <Route path="/view-rodape" exact component={baseDashboard(ViewRodape)} />
                        <Route path="/update-rodape" exact component={baseDashboard(UpdateRodape)} />

                        <Route path="/view-home" exact component={baseDashboard(ViewHome)} />
                        <Route path="/update-home-topo" exact component={baseDashboard(UpdateHomeTopo)} />
                        <Route path="/update-home-serv" exact component={baseDashboard(UpdateHomeServ)} />
                        <Route path="/update-home-acao" exact component={baseDashboard(UpdateHomeAcao)} />
                        <Route path="/update-home-det" exact component={baseDashboard(UpdateHomeDet)} />
                        <Route path="/update-home-topo-img" exact component={baseDashboard(UpdateHomeTopoImg)} />
                        <Route path="/update-home-acao-img" exact component={baseDashboard(UpdateHomeAcaoImg)} />
                        <Route path="/update-home-det-img" exact component={baseDashboard(UpdateHomeDetImg)} />

                        <Route path="/seo" exact component={baseDashboard(Seo)} />
                        <Route path="/cad-seo" exact component={baseDashboard(CadSeo)} />
                        <Route path="/view-seo/:id" exact component={baseDashboard(ViewSeo)} />
                        <Route path="/update-seo/:id" exact component={baseDashboard(UpdateSeo)} />

                    </Switch>
                </BrowserRouter>
            </Router>
        </Provider>
    );
}