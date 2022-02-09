import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/rodape';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Spinner } from 'reactstrap';

class DetailsRodape extends Component {

    renderInfoRodape() {
        if (!this.props.rodapeDetails) return null;

        return (
            <dl className="row">

                <dt className="col-sm-3">ID</dt>
                <dd className="col-sm-9">{this.props.rodapeDetails ? this.props.rodapeDetails._id : ""}</dd>

                <dt className="col-sm-3">Titulo da Página</dt>
                <dd className="col-sm-9">{this.props.rodapeDetails ? this.props.rodapeDetails.tituloPg : ""}</dd>

                <dt className="col-sm-3">Titulo do Conteúdo</dt>
                <dd className="col-sm-9">{this.props.rodapeDetails ? this.props.rodapeDetails.tituloCont : ""}</dd>

                <dt className="col-sm-3">Telefone</dt>
                <dd className="col-sm-9">{this.props.rodapeDetails ? this.props.rodapeDetails.telCont : ""}</dd>

                <dt className="col-sm-3">Endereço</dt>
                <dd className="col-sm-9">{this.props.rodapeDetails ? this.props.rodapeDetails.endCont : ""}</dd>

                <dt className="col-sm-3">CNPJ</dt>
                <dd className="col-sm-9">{this.props.rodapeDetails ? this.props.rodapeDetails.cnpjCont : ""}</dd>

                <dt className="col-sm-3">Titulo Redes Sociais</dt>
                <dd className="col-sm-9">{this.props.rodapeDetails ? this.props.rodapeDetails.tituloRedSoc : ""}</dd>

                <dt className="col-sm-3">Instagram</dt>
                <dd className="col-sm-9">{this.props.rodapeDetails ? this.props.rodapeDetails.instTitulo : ""}</dd>

                <dt className="col-sm-3">Link do Instagram</dt>
                <dd className="col-sm-9">{this.props.rodapeDetails ? this.props.rodapeDetails.instLink : ""}</dd>

                <dt className="col-sm-3">Facebook</dt>
                <dd className="col-sm-9">{this.props.rodapeDetails ? this.props.rodapeDetails.facTitulo : ""}</dd>

                <dt className="col-sm-3">Link do Facebook</dt>
                <dd className="col-sm-9">{this.props.rodapeDetails ? this.props.rodapeDetails.facLink : ""}</dd>

                <dt className="col-sm-3">Youtube</dt>
                <dd className="col-sm-9">{this.props.rodapeDetails ? this.props.rodapeDetails.youtubeTitulo : ""}</dd>

                <dt className="col-sm-3">Link do Youtube</dt>
                <dd className="col-sm-9">{this.props.rodapeDetails ? this.props.rodapeDetails.youtubeLink : ""}</dd>

                <dt className="col-sm-3">Twiter</dt>
                <dd className="col-sm-9">{this.props.rodapeDetails ? this.props.rodapeDetails.twiterTitulo : ""}</dd>

                <dt className="col-sm-3">Link do Twiter</dt>
                <dd className="col-sm-9">{this.props.rodapeDetails ? this.props.rodapeDetails.twiterLink : ""}</dd>

                <dt className="col-sm-3">Cadastrado</dt>
                <dd className="col-sm-9">{this.props.rodapeDetails ? format(new Date(this.props.rodapeDetails.createdAt), 'dd/MM/yyyy hh:mm:ss', { locale: pt }) : ""}</dd>

                <dt className="col-sm-3">Editado</dt>
                <dd className="col-sm-9">{this.props.rodapeDetails.updatedAt ? format(new Date(this.props.rodapeDetails.updatedAt), 'dd/MM/yyyy hh:mm:ss', { locale: pt }) : ""}</dd>


            </dl>
        )
    }

    render() {
        return (
            <>
                {this.props.rodapeDetails ? "" : <div className="d-flex justify-content-center"><Spinner color="primary" /></div>}
                {this.renderInfoRodape()}
            </>
        )
    }
}

const mapStateToProps = state => ({
    rodapeDetails: state.rodape.rodapeDetails
})

export default connect(mapStateToProps, actions)(DetailsRodape);