import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/sobre';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import AlertSuccess from '../../components/AlertSuccess';
import AlertDanger from '../../components/AlertDanger';
import SpinnerDeleteSimples from '../../components/SpinnerDeleteSimples';

class Sobre extends Component {

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
        this.getSobres();
    }

    componentDidUpdate(nextProps) {
        if (!this.props.sobre && nextProps.sobre) this.getSobres();
        this.receberDadosApi();
    }

    componentWillUnmount() {
        this.props.limparSobre();
        this.props.limparSobres();
    }

    receberDadosApi() {
        if (typeof this.props.sobres !== "undefined" && this.props.sobres !== null && !this.state.dadosApi && this.props.sobres.page === this.state.pageAtual) {
            this.setState({ dadosApi: true });
        }
    }

    getSobres() {
        const { pageAtual, limit } = this.state;
        this.props.getSobres(pageAtual, limit);
        const { sobres } = this.props;
        if (this.props.location.state) {
            this.setState({ msg: this.props.location.state.msg });
            this.props.location.state.msg = "";
        }
        if (sobres === "undefined") return null;
    }

    changePageAtual = (pageAtual) => {
        this.props.limparSobres();
        this.setState({ dadosApi: false });
        this.setState({ pageAtual }, () => {
            this.getSobres();
        })
    }

    apagarSobre() {
        this.setState({ dadosApi: false });
        this.setState({ loading: true });
        this.props.deleteSobre(this.state.id_delete, (msg) => {
            if (msg.erro.error) {
                this.setState({ erro: { message: msg.erro.message } });
                this.setState({ loading: false });
                this.props.limparSobres();
                this.setState({ openModal: false });
            } else {
                this.setState({ success: { message: msg.erro.message } });
                this.setState({ loading: false });
                this.getSobres();
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
        var sobres = [];
        if (this.props.sobres) sobres = this.props.sobres.docs;

        var hasPrevPage = false;
        if (typeof this.props.sobres !== "undefined" && this.props.sobres !== null && this.props.sobres.page !== "" && this.props.sobres.page !== 1) {
            hasPrevPage = true;
        }

        var nextPage = false;
        var hasNextPage = false;
        if (typeof this.props.sobres !== "undefined" && this.props.sobres !== null && this.props.sobres.nextPage <= this.props.sobres.totalPages && this.props.sobres.nextPage !== null) {
            nextPage = true;
            hasNextPage = true;
        }

        return (
            <>
                <Modal isOpen={openModal}>
                    <ModalHeader className="bg-danger text-white">Confirmar</ModalHeader>
                    <ModalBody>
                        Você realmente deseja apagar esse sobre?
                     </ModalBody>
                    <ModalFooter>
                        <Button outline color="primary" size="sm" onClick={() => this.closeModal()}>Cancelar</Button>
                        <span onClick={() => this.apagarSobre()}>
                            <SpinnerDeleteSimples loading={loading} />
                        </span>
                    </ModalFooter>
                </Modal>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Listar Sobre</h2>
                    </div>
                    <Link to={"cad-sobre"}>
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
                                    <th>Titulo</th>
                                    <th className="text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sobres.map(sobre => (
                                    <tr key={sobre._id}>
                                        <td>{sobre.titulo}</td>
                                        <td className="text-center">
                                            <span className="d-none d-md-block">
                                                <Link to={"/view-sobre/" + sobre._id}>
                                                    <button className="btn btn-outline-primary btn-sm mr-1">
                                                        Visualizar
                                                    </button>
                                                </Link>

                                                <Link to={"/update-sobre/" + sobre._id}>
                                                    <button className="btn btn-outline-warning btn-sm mr-1">
                                                        Editar
                                                    </button>
                                                </Link>

                                                <span onClick={() => this.openModal(sobre._id)}>
                                                    <SpinnerDeleteSimples loading={loading} />
                                                </span>
                                            </span>
                                            <div className="dropdown d-block d-md-none">
                                                <UncontrolledButtonDropdown>
                                                    <DropdownToggle outline color="primary" size="sm" caret>
                                                        Ações
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <Link className="dropdown-item" to={"/view-sobre/" + sobre._id}>Visualizar</Link>
                                                        <Link className="dropdown-item" to={"/update-sobre/" + sobre._id}>Editar</Link>
                                                        <DropdownItem onClick={() => this.openModal(sobre._id)}>Apagar</DropdownItem>
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

                            {hasPrevPage ? <li className="page-item"><span className="page-link" onClick={() => this.changePageAtual(this.props.sobres.prevPage ? this.props.sobres.prevPage : 1)}>{this.props.sobres.prevPage ? this.props.sobres.prevPage : ""}</span></li> : ""}

                            <li className="page-item active">
                                <span className="page-link" href="#">{this.props.sobres ? this.props.sobres.page : "1"}</span>
                            </li>

                            {nextPage ? <li className="page-item"><span className="page-link" onClick={() => this.changePageAtual(this.props.sobres.nextPage ? this.props.sobres.nextPage : 1)}>{this.props.sobres.nextPage ? this.props.sobres.nextPage : ""}</span></li> : ""}

                            <li className={hasNextPage ? "page-item" : "page-item disabled"}>
                                <span className="page-link" onClick={() => this.changePageAtual(this.props.sobres ? this.props.sobres.totalPages : 1)}>Última</span>
                            </li>
                        </ul>
                    </nav>
                    : ""}

            </>
        )
    }
}

const mapStateToProps = state => ({
    sobres: state.sobre.sobres
})

export default connect(mapStateToProps, actions)(Sobre);