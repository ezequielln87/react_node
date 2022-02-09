import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/sobre';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Spinner } from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

class DetailsSobre extends Component {

    renderInfoSobre() {
        if (!this.props.sobreDetails) return null;

        return (
            <dl className="row">
                <dt className="col-sm-3">Foto</dt>
                <dd className="col-sm-9">
                    {this.props.sobreDetails ?
                        <div className="img-perfil">
                            <img src={this.props.sobreDetails.url + this.props.sobreDetails.fileName} alt={this.props.sobreDetails.titulo} width="150" height="150" />
                            <div className="edit">
                                <Link to={"/update-sobre-foto/" + this.props.sobreDetails._id}>
                                    <button className="btn btn-outline-warning btn-sm">
                                        <FontAwesomeIcon icon="edit" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                        : ""}
                </dd>

                <dt className="col-sm-3">ID</dt>
                <dd className="col-sm-9">{this.props.sobreDetails ? this.props.sobreDetails._id : ""}</dd>

                <dt className="col-sm-3">Titulo</dt>
                <dd className="col-sm-9">{this.props.sobreDetails ? this.props.sobreDetails.titulo : ""}</dd>

                <dt className="col-sm-3">Descrição</dt>
                <dd className="col-sm-9">{this.props.sobreDetails ? this.props.sobreDetails.descricao : ""}</dd>

                <dt className="col-sm-3">Assunto</dt>
                <dd className="col-sm-9">{this.props.sobreDetails ? this.props.sobreDetails.conteudoMsg : ""}</dd>

                <dt className="col-sm-3">Cadastrado</dt>
                <dd className="col-sm-9">{this.props.sobreDetails ? format(new Date(this.props.sobreDetails.createdAt), 'dd/MM/yyyy hh:mm:ss', { locale: pt }) : ""}</dd>

                <dt className="col-sm-3">Editado</dt>
                <dd className="col-sm-9">{this.props.sobreDetails.updatedAt ? format(new Date(this.props.sobreDetails.updatedAt), 'dd/MM/yyyy hh:mm:ss', { locale: pt }) : ""}</dd>


            </dl>
        )
    }

    render() {
        return (
            <>
                {this.props.sobreDetails ? "" : <div className="d-flex justify-content-center"><Spinner color="primary" /></div>}
                {this.renderInfoSobre()}
            </>
        )
    }
}

const mapStateToProps = state => ({
    sobreDetails: state.sobre.sobreDetails
})

export default connect(mapStateToProps, actions)(DetailsSobre);