import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/msgContatos';

import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import SpinnerUp from '../../components/SpinnerUp';
import SpinnerDeleteSimples from '../../components/SpinnerDeleteSimples';
import validator from 'validator';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';

class UpdateMsgContato extends Component {

    state = {
        _id: "",
        nome: "",
        email: "",
        assuntoMsg: "",
        conteudoMsg: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false,
        deleteSuccess: false,
        dadosApi: false,
        openModal: false
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getViewMsgContato(id);
    }

    async componentDidUpdate(nextProps) {
        const { id } = this.props.match.params;
        if (!this.props.msgContato && nextProps.msgContato) this.props.getViewMsgContato(id);
        await this.receberDadosApi();
    }

    componentWillUnmount() {
        this.props.limparMsgContato();
    }

    receberDadosApi() {
        const { id } = this.props.match.params;
        if (typeof this.props.msgContatoDetails !== "undefined" && this.props.msgContatoDetails !== null && this.props.msgContatoDetails._id === id && !this.state.dadosApi) {
            this.setState({ _id: this.props.msgContatoDetails._id });
            this.setState({ nome: this.props.msgContatoDetails.nome });
            this.setState({ email: this.props.msgContatoDetails.email });
            this.setState({ assuntoMsg: this.props.msgContatoDetails.assuntoMsg });
            this.setState({ conteudoMsg: this.props.msgContatoDetails.conteudoMsg });
            this.setState({ dadosApi: true });
        }
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    async updateMsgContato() {
        this.setState({ erro: "" });
        this.setState({ success: "" });

        await this.receberDadosForm();

        if (!this.validade()) return;

        this.setState({ loading: true });

        const { _id, nome, email, assuntoMsg, conteudoMsg } = this.state;

        this.props.putMsgContato({ _id, nome, email, assuntoMsg, conteudoMsg }, (msg) => {
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

    receberDadosForm() {
        this.setState({ _id: document.querySelector("#_id").value });
        this.setState({ nome: document.querySelector("#nome").value });
        this.setState({ email: document.querySelector("#email").value });
        this.setState({ assuntoMsg: document.querySelector("#assuntoMsg").value });
        this.setState({ conteudoMsg: document.querySelector("#conteudoMsg").value });
    }

    validade() {
        const { nome, email, assuntoMsg, conteudoMsg } = this.state;
        if (!nome) return this.setState({ erro: { message: "Preencha o campo nome!" } });
        if (!email) return this.setState({ erro: { message: "Preencha o campo e-mail!" } });
        if (!validator.isEmail(email)) return this.setState({ erro: { message: "Preencha com e-mail válido!" } });
        if (!assuntoMsg) return this.setState({ erro: { message: "Preencha o campo assunto!" } });
        if (!conteudoMsg) return this.setState({ erro: { message: "Preencha o campo conteúdo!" } });
        return true;
    }

    apagarMsgContato() {
        this.setState({ loading: true });
        const { _id } = this.state;
        this.props.deleteMsgContato(_id, (msg) => {
            if (msg.erro.error) {
                this.setState({ erro: { message: msg.erro.message } });
                this.setState({ loading: false });
            } else {
                this.setState({ success: { message: msg.erro.message } });
                this.setState({ loading: false });
                this.setState({ deleteSuccess: true });
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
        const { _id, nome, email, assuntoMsg, conteudoMsg, loading, dadosApi, erro, success, formSuccess, deleteSuccess, openModal } = this.state;

        if (formSuccess) {
            return <Redirect to={{
                //pathname: '/user',
                pathname: '/view-msg-contato/' + _id,
                state: { msg: 'Mensagem de contato editada com sucesso!' }
            }} />
        }
        if (deleteSuccess) {
            return <Redirect to={{
                pathname: '/msg-contato',
                state: { msg: 'Mensagem de contato apagada com sucesso!' }
            }} />
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
                        <h2 className="display-4 titulo">Editar Mensagem de Contato</h2>
                    </div>

                    <span className="d-none d-md-block">
                        <Link to={"/msg-contato"}>
                            <button className="btn btn-outline-info btn-sm">
                                Listar
                        </button>
                        </Link>

                        <Link to={"/view-msg-contato/" + this.props.match.params.id}>
                            <button className="ml-1 mr-1 btn btn-outline-primary btn-sm">
                                Visualisar
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
                                <Link className="dropdown-item" to={"/msg-contato"}>Listar</Link>
                                <Link className="dropdown-item" to={"/view-msg-contato/" + this.props.match.params.id}>Visualisar</Link>
                                <DropdownItem onClick={() => this.openModal()}>Apagar</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>
                </div><hr />
                <AlertDanger erros={erro} />
                <AlertSuccess erros={success} />
                <Form>
                    <Input type="hidden"
                        value={_id}
                        name="_id"
                        id="_id"
                    />

                    <FormGroup>
                        <Label for="nome">Nome</Label>
                        <Input type="text"
                            value={nome}
                            name="nome"
                            id="nome"
                            className="form-control"
                            placeholder={dadosApi ? "Nome do usuário" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="nome"
                            onChange={(ev) => this.onChangeInput("nome", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="email">E-mail</Label>
                        <Input type="email"
                            value={email}
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder={dadosApi ? "Melhor e-mail do usuário" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="email"
                            onChange={(ev) => this.onChangeInput("email", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="assuntoMsg">Assunto</Label>
                        <Input type="text"
                            value={assuntoMsg}
                            name="assuntoMsg"
                            id="assuntoMsg"
                            className="form-control"
                            placeholder={dadosApi ? "Assunto da Mensagem" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="assuntoMsg"
                            onChange={(ev) => this.onChangeInput("assuntoMsg", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="conteudoMsg">Conteúdo</Label>
                        <Input type="textarea"
                            value={conteudoMsg}
                            name="conteudoMsg"
                            id="conteudoMsg"
                            className="form-control"
                            placeholder={dadosApi ? "Conteúdo da Mensagem" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="conteudoMsg"
                            onChange={(ev) => this.onChangeInput("conteudoMsg", ev)}
                        />
                    </FormGroup>

                    <Link onClick={() => this.updateMsgContato()} to="#">
                        <SpinnerUp loading={loading} />
                    </Link>

                </Form>
            </>
        )
    }
}

const mapStateToProps = state => ({
    msgContatoDetails: state.msgContato.msgContatoDetails
})

export default connect(mapStateToProps, actions)(UpdateMsgContato);