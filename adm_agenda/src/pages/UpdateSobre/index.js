import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/sobre';

import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import SpinnerUp from '../../components/SpinnerUp';
import SpinnerDeleteSimples from '../../components/SpinnerDeleteSimples';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';

class UpdateSobre extends Component {

    state = {
        _id: "",
        titulo: "",
        descricao: "",
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
        this.props.getViewSobre(id);
    }

    async componentDidUpdate(nextProps) {
        const { id } = this.props.match.params;
        if (!this.props.sobre && nextProps.sobre) this.props.getViewSobre(id);
        await this.receberDadosApi();
    }

    componentWillUnmount() {
        this.props.limparSobre();
    }

    receberDadosApi() {
        const { id } = this.props.match.params;
        if (typeof this.props.sobreDetails !== "undefined" && this.props.sobreDetails !== null && this.props.sobreDetails._id === id && !this.state.dadosApi) {
            this.setState({ _id: this.props.sobreDetails._id });
            this.setState({ titulo: this.props.sobreDetails.titulo });
            this.setState({ descricao: this.props.sobreDetails.descricao });
            this.setState({ dadosApi: true });
        }
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    async updateSobre() {
        this.setState({ erro: "" });
        this.setState({ success: "" });

        await this.receberDadosForm();

        if (!this.validade()) return;

        this.setState({ loading: true });

        const { _id, titulo, descricao} = this.state;

        this.props.putSobre({ _id, titulo, descricao }, (msg) => {
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
        this.setState({ titulo: document.querySelector("#titulo").value });
        this.setState({ descricao: document.querySelector("#descricao").value });
    }

    validade() {
        const { titulo, descricao } = this.state;
        if (!titulo) return this.setState({ erro: { message: "Preencha o campo titulo!" } });
        if (!descricao) return this.setState({ erro: { message: "Preencha o campo descrição!" } });
        return true;
    }

    apagarSobre() {
        this.setState({ loading: true });
        const { _id } = this.state;
        this.props.deleteSobre(_id, (msg) => {
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
        const { _id, titulo, descricao, loading, dadosApi, erro, success, formSuccess, deleteSuccess, openModal } = this.state;

        if (formSuccess) {
            return <Redirect to={{
                //pathname: '/user',
                pathname: '/view-sobre/' + _id,
                state: { msg: 'Sobre editado com sucesso!' }
            }} />
        }
        if (deleteSuccess) {
            return <Redirect to={{
                pathname: '/sobre',
                state: { msg: 'Sobre apagado com sucesso!' }
            }} />
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
                        <h2 className="display-4 titulo">Editar Sobre</h2>
                    </div>

                    <span className="d-none d-md-block">
                        <Link to={"/sobre"}>
                            <button className="btn btn-outline-info btn-sm">
                                Listar
                        </button>
                        </Link>

                        <Link to={"/view-sobre/" + this.props.match.params.id}>
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
                                <Link className="dropdown-item" to={"/sobre"}>Listar</Link>
                                <Link className="dropdown-item" to={"/view-sobre/" + this.props.match.params.id}>Visualisar</Link>
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
                        <Label for="titulo">Título</Label>
                        <Input type="text"
                            value={titulo}
                            name="titulo"
                            id="titulo"
                            className="form-control"
                            placeholder={dadosApi ? "Titulo do sobre" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="titulo"
                            onChange={(ev) => this.onChangeInput("titulo", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="descricao">Descrição</Label>
                        <Input type="textarea"
                            value={descricao}
                            name="descricao"
                            id="descricao"
                            className="form-control"
                            placeholder={dadosApi ? "Descrição do sobre" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="descricao"
                            onChange={(ev) => this.onChangeInput("descricao", ev)}
                        />
                    </FormGroup>

                    <Link onClick={() => this.updateSobre()} to="#">
                        <SpinnerUp loading={loading} />
                    </Link>

                </Form>
            </>
        )
    }
}

const mapStateToProps = state => ({
    sobreDetails: state.sobre.sobreDetails
})

export default connect(mapStateToProps, actions)(UpdateSobre);