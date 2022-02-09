import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/contato';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Spinner } from 'reactstrap';

class DetailsContato extends Component {

    renderInfoContato() {
        if (!this.props.contatoDetails) return null;

        return (
            <dl className="row">

                <dt className="col-sm-3">ID</dt>
                <dd className="col-sm-9">{this.props.contatoDetails ? this.props.contatoDetails._id : ""}</dd>

                <dt className="col-sm-3">Titulo Horário</dt>
                <dd className="col-sm-9">{this.props.contatoDetails ? this.props.contatoDetails.tituloHorarioCont : ""}</dd>

                <dt className="col-sm-3">Horário</dt>
                <dd className="col-sm-9">{this.props.contatoDetails ? this.props.contatoDetails.horarioCont : ""}</dd>

                <dt className="col-sm-3">Titulo do Endereço</dt>
                <dd className="col-sm-9">{this.props.contatoDetails ? this.props.contatoDetails.tituloEnd : ""}</dd>

                <dt className="col-sm-3">Logradouro</dt>
                <dd className="col-sm-9">{this.props.contatoDetails ? this.props.contatoDetails.logradouroEnd : ""}</dd>

                <dt className="col-sm-3">Bairro</dt>
                <dd className="col-sm-9">{this.props.contatoDetails ? this.props.contatoDetails.bairroEnd : ""}</dd>

                <dt className="col-sm-3">Telefone</dt>
                <dd className="col-sm-9">{this.props.contatoDetails ? this.props.contatoDetails.telCont : ""}</dd>

                <dt className="col-sm-3">Whatsapp</dt>
                <dd className="col-sm-9">{this.props.contatoDetails ? this.props.contatoDetails.whatsappCont : ""}</dd>

                <dt className="col-sm-3">Cadastrado</dt>
                <dd className="col-sm-9">{this.props.contatoDetails ? format(new Date(this.props.contatoDetails.createdAt), 'dd/MM/yyyy hh:mm:ss', { locale: pt }) : ""}</dd>

                <dt className="col-sm-3">Editado</dt>
                <dd className="col-sm-9">{this.props.contatoDetails.updatedAt ? format(new Date(this.props.contatoDetails.updatedAt), 'dd/MM/yyyy hh:mm:ss', { locale: pt }) : ""}</dd>


            </dl>
        )
    }

    render() {
        return (
            <>
                {this.props.contatoDetails ? "" : <div className="d-flex justify-content-center"><Spinner color="primary" /></div>}
                {this.renderInfoContato()}
            </>
        )
    }
}

const mapStateToProps = state => ({
    contatoDetails: state.contato.contatoDetails
})

export default connect(mapStateToProps, actions)(DetailsContato);