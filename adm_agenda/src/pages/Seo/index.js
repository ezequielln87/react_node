import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/seo';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import AlertSuccess from '../../components/AlertSuccess';
import AlertDanger from '../../components/AlertDanger';
import SpinnerDeleteSimples from '../../components/SpinnerDeleteSimples';

class Seo extends Component {

    state = {
        pageAtual: 1,
        limit: 40,
        //limit: 3,
        msg: "",
        erro: "",
        success: "",
        loading: false,
        openModal: false,
        id_delete: "",
        dadosApi: false
    }

    componentDidMount() {
        this.getSeos();
    }

    componentDidUpdate(nextProps) {
        if (!this.props.seo && nextProps.seo) this.getSeos();
        this.receberDadosApi();
    }

    componentWillUnmount() {
        this.props.limparSeo();
        this.props.limparSeos();
    }

    receberDadosApi() {
        if (typeof this.props.seos !== "undefined" && this.props.seos !== null && !this.state.dadosApi && this.props.seos.page === this.state.pageAtual) {
            this.setState({ dadosApi: true });
        }
    }

    getSeos() {
        const { pageAtual, limit } = this.state;
        this.props.getSeos(pageAtual, limit);
        const { seos } = this.props;
        if (this.props.location.state) {
            this.setState({ msg: this.props.location.state.msg });
            this.props.location.state.msg = "";
        }
        if (seos === "undefined") return null;
    }

    changePageAtual = (pageAtual) => {
        this.props.limparSeos();
        this.setState({ dadosApi: false });
        this.setState({ pageAtual }, () => {
            this.getSeos();
        })
    }

    apagarSeo() {
        this.setState({ dadosApi: false });
        this.setState({ loading: true });
        this.props.deleteSeo(this.state.id_delete, (msg) => {
            if (msg.erro.error) {
                this.setState({ erro: { message: msg.erro.message } });
                this.setState({ loading: false });
                this.props.limparSeos();
                this.setState({ openModal: false });
            } else {
                this.setState({ success: { message: msg.erro.message } });
                this.setState({ loading: false });
                this.props.limparSeos();
                this.getSeos();
                //this.setState({formSuccess: true});
                this.setState({ openModal: false });
            }
        })
    }

    openModal(id) {
        this.setState({ id_delete: id });
        this.setState({ openModal: true });
    }

    closeModal() {
        this.setState({ openModal: false });
    }

    render() {
        const { msg, loading, erro, success, openModal, dadosApi } = this.state;
        var seos = [];
        if (this.props.seos) seos = this.props.seos.docs;

        var hasPrevPage = false;
        if (typeof this.props.seos !== "undefined" && this.props.seos !== null && this.props.seos.page !== "" && this.props.seos.page !== 1) {
            hasPrevPage = true;
        }

        var nextPage = false;
        var hasNextPage = false;
        if (typeof this.props.seos !== "undefined" && this.props.seos !== null && this.props.seos.nextPage <= this.props.seos.totalPages && this.props.seos.nextPage !== null) {
            nextPage = true;
            hasNextPage = true;
        }

        return (
            <>
                <Modal isOpen={openModal}>
                    <ModalHeader className="bg-danger text-white">Confirmar</ModalHeader>
                    <ModalBody>
                        Você realmente deseja apagar esse seo?
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
                        <h2 className="display-4 titulo">Listar Seo das Páginas</h2>
                    </div>
                    <Link to={"cad-seo"}>
                        <button className="btn btn-outline-success btn-sm">
                            Cadastrar
                        </button>
                    </Link>
                </div><hr />
                {msg ? <AlertSuccess erros={{ message: msg }} /> : ""}
                <AlertDanger erros={erro} />
                <AlertSuccess erros={success} />


                {dadosApi ?
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>Página</th>
                                    <th className="text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {seos.map(seo => (
                                    <tr key={seo._id}>
                                        <td>{seo.seoPg}</td>
                                        <td className="text-center">
                                            <span className="d-none d-md-block">
                                                <Link to={"/view-seo/" + seo._id}>
                                                    <button className="btn btn-outline-primary btn-sm mr-1">
                                                        Visualizar
                                                    </button>
                                                </Link>

                                                <Link to={"/update-seo/" + seo._id}>
                                                    <button className="btn btn-outline-warning btn-sm mr-1">
                                                        Editar
                                                    </button>
                                                </Link>

                                                <span onClick={() => this.openModal(seo._id)}>
                                                    <SpinnerDeleteSimples loading={loading} />
                                                </span>
                                            </span>
                                            <div className="dropdown d-block d-md-none">
                                                <UncontrolledButtonDropdown>
                                                    <DropdownToggle outline color="primary" size="sm" caret>
                                                        Ações
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <Link className="dropdown-item" to={"/view-seo/" + seo._id}>Visualizar</Link>
                                                        <Link className="dropdown-item" to={"/update-seo/" + seo._id}>Editar</Link>
                                                        <DropdownItem onClick={() => this.openModal(seo._id)}>Apagar</DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledButtonDropdown>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    : ""}

                {dadosApi ? "" : <div className="d-flex justify-content-center"><Spinner color="primary" /></div>}

                {dadosApi ?
                    <nav aria-label="paginacao">
                        <ul className="pagination pagination-sm justify-content-center">

                            <li className={hasPrevPage ? "page-item" : "page-item disabled"}>
                                <span className="page-link" onClick={() => this.changePageAtual(1)}>Primeira</span>
                            </li>

                            {hasPrevPage ? <li className="page-item"><span className="page-link" onClick={() => this.changePageAtual(this.props.seos.prevPage ? this.props.seos.prevPage : 1)}>{this.props.seos.prevPage ? this.props.seos.prevPage : ""}</span></li> : ""}

                            <li className="page-item active">
                                <span className="page-link" href="#">{this.props.seos ? this.props.seos.page : "1"}</span>
                            </li>

                            {nextPage ? <li className="page-item"><span className="page-link" onClick={() => this.changePageAtual(this.props.seos.nextPage ? this.props.seos.nextPage : 1)}>{this.props.seos.nextPage ? this.props.seos.nextPage : ""}</span></li> : ""}

                            <li className={hasNextPage ? "page-item" : "page-item disabled"}>
                                <span className="page-link" onClick={() => this.changePageAtual(this.props.seos ? this.props.seos.totalPages : 1)}>Última</span>
                            </li>
                        </ul>
                    </nav>
                    : ""}

            </>
        )
    }
}

const mapStateToProps = state => ({
    seos: state.seo.seos
})

export default connect(mapStateToProps, actions)(Seo);