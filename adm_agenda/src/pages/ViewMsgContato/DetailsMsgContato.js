import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/msgContatos';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Spinner } from 'reactstrap';

class DetailsMsgContato extends Component {

    renderInfoMsgContato() {
        if (!this.props.msgContatoDetails) return null;

        return (
            <dl className="row">

                <dt className="col-sm-3">ID</dt>
                <dd className="col-sm-9">{this.props.msgContatoDetails ? this.props.msgContatoDetails._id : ""}</dd>

                <dt className="col-sm-3">Nome</dt>
                <dd className="col-sm-9">{this.props.msgContatoDetails ? this.props.msgContatoDetails.nome : ""}</dd>

                <dt className="col-sm-3">E-mail</dt>
                <dd className="col-sm-9">{this.props.msgContatoDetails ? this.props.msgContatoDetails.email : ""}</dd>

                <dt className="col-sm-3">Assunto</dt>
                <dd className="col-sm-9">{this.props.msgContatoDetails ? this.props.msgContatoDetails.conteudoMsg : ""}</dd>

                <dt className="col-sm-3">Conteúdo</dt>
                <dd className="col-sm-9">{this.props.msgContatoDetails ? this.props.msgContatoDetails.conteudoMsg : ""}</dd>

                <dt className="col-sm-3">Cadastrado</dt>
                <dd className="col-sm-9">{this.props.msgContatoDetails ? format(new Date(this.props.msgContatoDetails.createdAt), 'dd/MM/yyyy hh:mm:ss', { locale: pt }) : ""}</dd>

                <dt className="col-sm-3">Editado</dt>
                <dd className="col-sm-9">{this.props.msgContatoDetails.updatedAt ? format(new Date(this.props.msgContatoDetails.updatedAt), 'dd/MM/yyyy hh:mm:ss', { locale: pt }) : ""}</dd>


            </dl>
        )
    }

    render() {
        return (
            <>
                {this.props.msgContatoDetails ? "" : <div className="d-flex justify-content-center"><Spinner color="primary" /></div>}
                {this.renderInfoMsgContato()}
            </>
        )
    }
}

const mapStateToProps = state => ({
    msgContatoDetails: state.msgContato.msgContatoDetails
})

export default connect(mapStateToProps, actions)(DetailsMsgContato);