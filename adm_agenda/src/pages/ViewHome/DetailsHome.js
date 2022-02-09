import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/home';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Spinner } from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

class DetailsHome extends Component {

    renderInfoHome() {
        if (!this.props.homeDetails) return null;

        return (

            <>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Topo</h2>
                    </div>
                    <Link to={"/update-home-topo"}>
                        <button className="ml-1 mr-1 btn btn-outline-warning btn-sm">
                            Editar
                        </button>
                    </Link>

                </div>
                <dl className="row">

                    <dt className="col-sm-3">Imagem</dt>
                    <dd className="col-sm-9">
                        {this.props.homeDetails ?
                            <div className="img-perfil">
                                <img src={this.props.homeDetails.url + this.props.homeDetails.topFileName} alt={this.props.homeDetails.topTitulo} width="250" height="141" />
                                <div className="edit">
                                    <Link to={"/update-home-topo-img"}>
                                        <button className="btn btn-outline-warning btn-sm">
                                            <FontAwesomeIcon icon="edit" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            : ""}
                    </dd>

                    <dt className="col-sm-3">Título</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.topTitulo : ""}</dd>

                    <dt className="col-sm-3">Subtitulo</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.topSubtitulo : ""}</dd>

                    <dt className="col-sm-3">Texto do Botão</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.topTextBtn : ""}</dd>

                    <dt className="col-sm-3">Link do Botão</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.topLinkBtn : ""}</dd>
                </dl>

                <hr />
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Serviços</h2>
                    </div>
                    <Link to={"/update-home-serv"}>
                        <button className="ml-1 mr-1 btn btn-outline-warning btn-sm">
                            Editar
                        </button>
                    </Link>
                </div>

                <dl className="row">
                    <dt className="col-sm-3">Título</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.servTitulo : ""}</dd>

                    <dt className="col-sm-3">Subtitulo</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.servSubtitulo : ""}</dd>

                    <dt className="col-sm-3">Ícone Um</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? <FontAwesomeIcon icon={this.props.homeDetails.servUmIcone} /> : ""}</dd>

                    <dt className="col-sm-3">Título Um</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.servUmTitulo : ""}</dd>

                    <dt className="col-sm-3">Descrição Um</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.servUmDesc : ""}</dd>

                    <dt className="col-sm-3">Ícone Dois</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? <FontAwesomeIcon icon={this.props.homeDetails.servDoisIcone} /> : ""}</dd>

                    <dt className="col-sm-3">Título Dois</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.servDoisTitulo : ""}</dd>

                    <dt className="col-sm-3">Descrição Dois</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.servDoisDesc : ""}</dd>

                    <dt className="col-sm-3">Ícone Três</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? <FontAwesomeIcon icon={this.props.homeDetails.servTresIcone} /> : ""}</dd>

                    <dt className="col-sm-3">Título Três</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.servTresTitulo : ""}</dd>

                    <dt className="col-sm-3">Descrição Três</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.servTresDesc : ""}</dd>
                </dl>

                <hr />
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Chamada de Ação</h2>
                    </div>
                    <Link to={"/update-home-acao"}>
                        <button className="ml-1 mr-1 btn btn-outline-warning btn-sm">
                            Editar
                        </button>
                    </Link>
                </div>

                <dl className="row">

                    <dt className="col-sm-3">Imagem</dt>
                    <dd className="col-sm-9">
                        {this.props.homeDetails ?
                            <div className="img-perfil">
                                <img src={this.props.homeDetails.url + this.props.homeDetails.acaoFileName} alt={this.props.homeDetails.acaoTitulo} width="250" height="141" />
                                <div className="edit">
                                    <Link to={"/update-home-acao-img"}>
                                        <button className="btn btn-outline-warning btn-sm">
                                            <FontAwesomeIcon icon="edit" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            : ""}
                    </dd>

                    <dt className="col-sm-3">Título</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.acaoTitulo : ""}</dd>

                    <dt className="col-sm-3">Subtitulo</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.acaoSubtitulo : ""}</dd>

                    <dt className="col-sm-3">Descrição</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.acaoDesc : ""}</dd>

                    <dt className="col-sm-3">Texto do Botão</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.acaoTextBtn : ""}</dd>

                    <dt className="col-sm-3">Link do Botão</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.acaoLinkBtn : ""}</dd>
                </dl>

                <hr />
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Detalhes do Serviço</h2>
                    </div>
                    <Link to={"/update-home-det"}>
                        <button className="ml-1 mr-1 btn btn-outline-warning btn-sm">
                            Editar
                        </button>
                    </Link>
                </div>

                <dl className="row">

                    <dt className="col-sm-3">Imagem</dt>
                    <dd className="col-sm-9">
                        {this.props.homeDetails ?
                            <div className="img-perfil">
                                <img src={this.props.homeDetails.url + this.props.homeDetails.detFileName} alt={this.props.homeDetails.detServTitulo} width="150" height="150" />
                                <div className="edit">
                                    <Link to={"/update-home-det-img"}>
                                        <button className="btn btn-outline-warning btn-sm">
                                            <FontAwesomeIcon icon="edit" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            : ""}
                    </dd>


                    <dt className="col-sm-3">Título</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.detServTitulo : ""}</dd>

                    <dt className="col-sm-3">Subtitulo</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.detSubtitulo : ""}</dd>

                    <dt className="col-sm-3">Descrição</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? this.props.homeDetails.detDesc : ""}</dd>
                    <dt className="col-sm-3">Cadastrado</dt>
                    <dd className="col-sm-9">{this.props.homeDetails ? format(new Date(this.props.homeDetails.createdAt), 'dd/MM/yyyy hh:mm:ss', { locale: pt }) : ""}</dd>

                    <dt className="col-sm-3">Editado</dt>
                    <dd className="col-sm-9">{this.props.homeDetails.updatedAt ? format(new Date(this.props.homeDetails.updatedAt), 'dd/MM/yyyy hh:mm:ss', { locale: pt }) : ""}</dd>


                </dl>
            </>
        )
    }

    render() {
        return (
            <>
                {this.props.homeDetails ? "" : <div className="d-flex justify-content-center"><Spinner color="primary" /></div>}
                {this.renderInfoHome()}
            </>
        )
    }
}

const mapStateToProps = state => ({
    homeDetails: state.home.homeDetails
})

export default connect(mapStateToProps, actions)(DetailsHome);