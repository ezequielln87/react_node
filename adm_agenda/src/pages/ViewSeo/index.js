import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/seo';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

import DetailsSeo from './DetailsSeo';
import AlertSuccess from '../../components/AlertSuccess';
import AlertDanger from '../../components/AlertDanger';
import SpinnerDeleteSimples from '../../components/SpinnerDeleteSimples';

class ViewSeo extends Component {

    state = {
        _id: "",
        msg: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false,
        openModal: false
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.setState({ _id: id });
        this.getSeo(id);
    }

    componentDidUpdate(nextProps) {
        const { id } = this.props.match.params;
        if (!this.props.seo && nextProps.seo) this.getSeo(id);
    }

    componentWillUnmount() {
        this.props.limparSeo();
    }

    getSeo(id) {
        this.props.getViewSeo(id);
        if (this.props.location.state) {
            this.setState({ msg: this.props.location.state.msg });
        }
    }

    apagarSeo() {
        this.setState({ loading: true });
        const { _id } = this.state;
        this.props.deleteSeo(_id, (msg) => {
            if (msg.erro.error) {
                this.setState({ erro: { message: msg.erro.message } });
                this.setState({ loading: false });
            } else {
                this.setState({ success: { message: msg.erro.message } });
                this.setState({ loading: false });
                this.setState({ formSuccess: true });
            }
        })
    }

    openModal() {
        this.setState({ openModal: true });
    }

    closeModal() {
        this.setState({ openModal: false });
    }

    render() {
        const { msg, erro, success, loading, formSuccess, openModal } = this.state;

        if (formSuccess) {
            return <Redirect to={{
                pathname: '/seo',
                state: { msg: 'Seo da página apagado com sucesso!' }
            }} />
        }

        return (
            <>
                <Modal isOpen={openModal}>
                    <ModalHeader className="bg-danger text-white">Confirmar</ModalHeader>
                    <ModalBody>
                        Você realmente deseja apagar esse seo da página?
                     </ModalBody>
                    <ModalFooter>
                        <Button outline color="primary" size="sm" onClick={() => this.closeModal()}>Cancelar</Button>
                        <span onClick={() => this.apagarSeo()}>
                            <SpinnerDeleteSimples loading={loading} />
                        </span>
                    </ModalFooter>
                </Modal>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Detalhes do Seo da Página</h2>
                    </div>

                    <span className="d-none d-md-block">
                        <Link to={"/seo"}>
                            <button className="btn btn-outline-info btn-sm">
                                Listar
                        </button>
                        </Link>

                        <Link to={"/update-seo/" + this.props.match.params.id}>
                            <button className="ml-1 mr-1 btn btn-outline-warning btn-sm">
                                Editar
                        </button>
                        </Link>

                        <span onClick={() => this.openModal()}>
                            <SpinnerDeleteSimples loading={loading} />
                        </span>
                    </span>
                    <div className="dropdown d-block d-md-none">
                        <UncontrolledButtonDropdown>
                            <DropdownToggle outline color="primary" size="sm" caret>
                                Ações
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link className="dropdown-item" to={"/seo"}>Listar</Link>
                                <Link className="dropdown-item" to={"/update-seo/" + this.props.match.params.id}>Editar</Link>
                                <DropdownItem onClick={() => this.openModal()}>Apagar</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>
                </div><hr />
                {msg ? <AlertSuccess erros={{ message: msg }} /> : ""}
                <AlertDanger erros={erro} />
                <AlertSuccess erros={success} />
                <DetailsSeo />
            </>
        )
    }
}
const mapStateToProps = state => ({
    seoDetails: state.seo.seoDetails
})

export default connect(mapStateToProps, actions)(ViewSeo);