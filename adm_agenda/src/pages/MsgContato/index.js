import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/msgContatos';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import AlertSuccess from '../../components/AlertSuccess';
import AlertDanger from '../../components/AlertDanger';
import SpinnerDeleteSimples from '../../components/SpinnerDeleteSimples';

class MsgContato extends Component {

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
        this.getMsgContatos();
    }

    componentDidUpdate(nextProps) {
        if (!this.props.msgContato && nextProps.msgContato) this.getMsgContatos();
        this.receberDadosApi();
    }

    componentWillUnmount() {
        this.props.limparMsgContato();
        this.props.limparMsgContatos();
    }

    receberDadosApi() {
        if (typeof this.props.msgContatos !== "undefined" && this.props.msgContatos !== null && !this.state.dadosApi && this.props.msgContatos.page === this.state.pageAtual) {
            this.setState({ dadosApi: true });
        }
    }

    getMsgContatos() {
        const { pageAtual, limit } = this.state;
        this.props.getMsgContatos(pageAtual, limit);
        const { msgContatos } = this.props;
        if (this.props.location.state) {
            this.setState({ msg: this.props.location.state.msg });
            this.props.location.state.msg = "";
        }
        if (msgContatos === "undefined") return null;
    }

    changePageAtual = (pageAtual) => {
        this.props.limparMsgContatos();
        this.setState({ dadosApi: false });
        this.setState({ pageAtual }, () => {
            this.getMsgContatos();
        })
    }

    apagarMsgContato() {
        this.setState({ dadosApi: false });
        this.setState({ loading: true });
        this.props.deleteMsgContato(this.state.id_delete, (msg) => {
            if (msg.erro.error) {
                this.setState({ erro: { message: msg.erro.message } });
                this.setState({ loading: false });
                this.props.limparMsgContatos();
                this.setState({ openModal: false });
            } else {
                this.setState({ success: { message: msg.erro.message } });
                this.setState({ loading: false });
                this.getMsgContatos();
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
        var msgContatos = [];
        if (this.props.msgContatos) msgContatos = this.props.msgContatos.docs;

        var hasPrevPage = false;
        if (typeof this.props.msgContatos !== "undefined" && this.props.msgContatos !== null && this.props.msgContatos.page !== "" && this.props.msgContatos.page !== 1) {
            hasPrevPage = true;
        }

        var nextPage = false;
        var hasNextPage = false;
        if (typeof this.props.msgContatos !== "undefined" && this.props.msgContatos !== null && this.props.msgContatos.nextPage <= this.props.msgContatos.totalPages && this.props.msgContatos.nextPage !== null) {
            nextPage = true;
            hasNextPage = true;
        }

        return (
            <>
                <Modal isOpen={openModal}>
                    <ModalHeader className="bg-danger text-white">Confirmar</ModalHeader>
                    <ModalBody>
                        Você realmente deseja apagar essa mensagem de contato?
                     </ModalBody>
                    <ModalFooter>
                        <Button outline color="primary" size="sm" onClick={() => this.closeModal()}>Cancelar</Button>
                        <span onClick={() => this.apagarMsgContato()}>
                            <SpinnerDeleteSimples loading={loading} />
                        </span>
                    </ModalFooter>
                </Modal>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Listar Mensagem de Contato</h2>
                    </div>
                    <Link to={"cad-msg-contato"}>
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
                                    <th>Nome</th>
                                    <th className="d-none d-sm-table-cell">E-mail</th>
                                    <th className="d-none d-sm-table-cell">Assunto</th>
                                    <th className="text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {msgContatos.map(msgContato => (
                                    <tr key={msgContato._id}>
                                        <td>{msgContato.nome}</td>
                                        <td className="d-none d-sm-table-cell">{msgContato.email}</td>
                                        <td className="d-none d-sm-table-cell">{msgContato.assuntoMsg}</td>
                                        <td className="text-center">
                                            <span className="d-none d-md-block">
                                                <Link to={"/view-msg-contato/" + msgContato._id}>
                                                    <button className="btn btn-outline-primary btn-sm mr-1">
                                                        Visualizar
                                                    </button>
                                                </Link>

                                                <Link to={"/update-msg-contato/" + msgContato._id}>
                                                    <button className="btn btn-outline-warning btn-sm mr-1">
                                                        Editar
                                                    </button>
                                                </Link>

                                                <span onClick={() => this.openModal(msgContato._id)}>
                                                    <SpinnerDeleteSimples loading={loading} />
                                                </span>
                                            </span>
                                            <div className="dropdown d-block d-md-none">
                                                <UncontrolledButtonDropdown>
                                                    <DropdownToggle outline color="primary" size="sm" caret>
                                                        Ações
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <Link className="dropdown-item" to={"/view-msg-contato/" + msgContato._id}>Visualizar</Link>
                                                        <Link className="dropdown-item" to={"/update-msg-contato/" + msgContato._id}>Editar</Link>
                                                        <DropdownItem onClick={() => this.openModal(msgContato._id)}>Apagar</DropdownItem>
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

                            {hasPrevPage ? <li className="page-item"><span className="page-link" onClick={() => this.changePageAtual(this.props.msgContatos.prevPage ? this.props.msgContatos.prevPage : 1)}>{this.props.msgContatos.prevPage ? this.props.msgContatos.prevPage : ""}</span></li> : ""}

                            <li className="page-item active">
                                <span className="page-link" href="#">{this.props.msgContatos ? this.props.msgContatos.page : "1"}</span>
                            </li>

                            {nextPage ? <li className="page-item"><span className="page-link" onClick={() => this.changePageAtual(this.props.msgContatos.nextPage ? this.props.msgContatos.nextPage : 1)}>{this.props.msgContatos.nextPage ? this.props.msgContatos.nextPage : ""}</span></li> : ""}

                            <li className={hasNextPage ? "page-item" : "page-item disabled"}>
                                <span className="page-link" onClick={() => this.changePageAtual(this.props.msgContatos ? this.props.msgContatos.totalPages : 1)}>Última</span>
                            </li>
                        </ul>
                    </nav>
                    : ""}

            </>
        )
    }
}

const mapStateToProps = state => ({
    msgContatos: state.msgContato.msgContatos
})

export default connect(mapStateToProps, actions)(MsgContato);