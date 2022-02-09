import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/seo';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Spinner } from 'reactstrap';

class DetailsSeo extends Component {

    renderInfoSeo() {
        if (!this.props.seoDetails) return null;

        return (
            <dl className="row">

                <dt className="col-sm-3">ID</dt>
                <dd className="col-sm-9">{this.props.seoDetails ? this.props.seoDetails._id : ""}</dd>

                <dt className="col-sm-3">Página</dt>
                <dd className="col-sm-9">{this.props.seoDetails ? this.props.seoDetails.seoPg : ""}</dd>

                <dt className="col-sm-3">Título</dt>
                <dd className="col-sm-9">{this.props.seoDetails ? this.props.seoDetails.seoTitle : ""}</dd>

                <dt className="col-sm-3">Descrição</dt>
                <dd className="col-sm-9">{this.props.seoDetails ? this.props.seoDetails.seoDesc : ""}</dd>

                <dt className="col-sm-3">Autor</dt>
                <dd className="col-sm-9">{this.props.seoDetails ? this.props.seoDetails.seoAutor : ""}</dd>

                <dt className="col-sm-3">Cadastrado</dt>
                <dd className="col-sm-9">{this.props.seoDetails ? format(new Date(this.props.seoDetails.createdAt), 'dd/MM/yyyy hh:mm:ss', { locale: pt }) : ""}</dd>

                <dt className="col-sm-3">Editado</dt>
                <dd className="col-sm-9">{this.props.seoDetails.updatedAt ? format(new Date(this.props.seoDetails.updatedAt), 'dd/MM/yyyy hh:mm:ss', { locale: pt }) : ""}</dd>


            </dl>
        )
    }

    render() {
        return (
            <>
                {this.props.seoDetails ? "" : <div className="d-flex justify-content-center"><Spinner color="primary" /></div>}
                {this.renderInfoSeo()}
            </>
        )
    }
}

const mapStateToProps = state => ({
    seoDetails: state.seo.seoDetails
})

export default connect(mapStateToProps, actions)(DetailsSeo);