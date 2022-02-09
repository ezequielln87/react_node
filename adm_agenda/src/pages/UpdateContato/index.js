import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/contato';

import { Form, FormGroup, Label, Input, UncontrolledButtonDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import SpinnerUp from '../../components/SpinnerUp';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';

class UpdateContato extends Component {

    state = {
        _id: "",
        tituloHorarioCont: "",
        horarioCont: "",
        tituloEnd: "",
        logradouroEnd: "",
        bairroEnd: "",
        telCont: "",
        whatsappCont: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false,
        dadosApi: false
    }

    componentDidMount() {
        this.props.getViewContato();
    }

    async componentDidUpdate(nextProps) {
        if (!this.props.contato && nextProps.contato) this.props.getViewContato();
        await this.receberDadosApi();
    }

    componentWillUnmount() {
        this.props.limparContato();
    }

    receberDadosApi() {
        if (typeof this.props.contatoDetails !== "undefined" && this.props.contatoDetails !== null && !this.state.dadosApi) {
            this.setState({ _id: this.props.contatoDetails._id });
            this.setState({ tituloHorarioCont: this.props.contatoDetails.tituloHorarioCont });
            this.setState({ horarioCont: this.props.contatoDetails.horarioCont });
            this.setState({ tituloEnd: this.props.contatoDetails.tituloEnd });
            this.setState({ logradouroEnd: this.props.contatoDetails.logradouroEnd });
            this.setState({ bairroEnd: this.props.contatoDetails.bairroEnd });
            this.setState({ telCont: this.props.contatoDetails.telCont });
            this.setState({ whatsappCont: this.props.contatoDetails.whatsappCont });
            this.setState({ dadosApi: true });
        }
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    async updateContato() {
        this.setState({ erro: "" });
        this.setState({ success: "" });

        await this.receberDadosForm();

        if (!this.validade()) return;

        this.setState({ loading: true });

        const { _id, tituloHorarioCont, horarioCont, tituloEnd, logradouroEnd, bairroEnd, telCont, whatsappCont } = this.state;

        this.props.putContato({ _id, tituloHorarioCont, horarioCont, tituloEnd, logradouroEnd, bairroEnd, telCont, whatsappCont }, (msg) => {
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
        this.setState({ tituloHorarioCont: document.querySelector("#tituloHorarioCont").value });
        this.setState({ horarioCont: document.querySelector("#horarioCont").value });
        this.setState({ tituloEnd: document.querySelector("#tituloEnd").value });
        this.setState({ logradouroEnd: document.querySelector("#logradouroEnd").value });
        this.setState({ bairroEnd: document.querySelector("#bairroEnd").value });
        this.setState({ telCont: document.querySelector("#telCont").value });
        this.setState({ whatsappCont: document.querySelector("#whatsappCont").value });
    }

    validade() {
        const { tituloHorarioCont, horarioCont, tituloEnd, logradouroEnd, bairroEnd, telCont, whatsappCont } = this.state;
        if (!tituloHorarioCont) return this.setState({ erro: { message: "Preencha o campo titulo do horário de atendimento!" } });
        if (!horarioCont) return this.setState({ erro: { message: "Preencha o campo horário de atendimento!" } });
        if (!tituloEnd) return this.setState({ erro: { message: "Preencha o campo titulo do endereço!" } });
        if (!logradouroEnd) return this.setState({ erro: { message: "Preencha o campo logradouro!" } });
        if (!bairroEnd) return this.setState({ erro: { message: "Preencha o campo bairro!" } });
        if (!telCont) return this.setState({ erro: { message: "Preencha o campo telefone de contato!" } });
        if (!whatsappCont) return this.setState({ erro: { message: "Preencha o campo Whatsapp!" } });
        return true;
    }

    render() {
        const { _id, tituloHorarioCont, horarioCont, tituloEnd, logradouroEnd, bairroEnd, telCont, whatsappCont, loading, dadosApi, erro, success, formSuccess } = this.state;

        if (formSuccess) {
            return <Redirect to={{
                pathname: '/view-contato',
                state: { msg: 'Conteúdo da página de contato editada com sucesso!' }
            }} />
        }

        return (
            <>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Editar Conteúdo da Página de Contato</h2>
                    </div>

                    <span className="d-none d-md-block">

                        <Link to={"/view-contato"}>
                            <button className="ml-1 mr-1 btn btn-outline-primary btn-sm">
                                Visualisar
                        </button>
                        </Link>
                    </span>
                    <div className="dropdown d-block d-md-none">
                        <UncontrolledButtonDropdown>
                            <DropdownToggle outline color="primary" size="sm" caret>
                                Ações
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link className="dropdown-item" to={"/view-contato"}>Visualisar</Link>
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
                        <Label for="tituloHorarioCont">Título do Horário</Label>
                        <Input type="text"
                            value={tituloHorarioCont}
                            name="tituloHorarioCont"
                            id="tituloHorarioCont"
                            className="form-control"
                            placeholder={dadosApi ? "Titulo do horário de contato" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="tituloHorarioCont"
                            onChange={(ev) => this.onChangeInput("tituloHorarioCont", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="horarioCont">E-mail</Label>
                        <Input type="text"
                            value={horarioCont}
                            name="horarioCont"
                            id="horarioCont"
                            className="form-control"
                            placeholder={dadosApi ? "Horário de contato" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="horarioCont"
                            onChange={(ev) => this.onChangeInput("horarioCont", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="tituloEnd">Titulo do Endereço</Label>
                        <Input type="text"
                            value={tituloEnd}
                            name="tituloEnd"
                            id="tituloEnd"
                            className="form-control"
                            placeholder={dadosApi ? "Titulo do endereço" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="tituloEnd"
                            onChange={(ev) => this.onChangeInput("tituloEnd", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="logradouroEnd">Logradouro</Label>
                        <Input type="text"
                            value={logradouroEnd}
                            name="logradouroEnd"
                            id="logradouroEnd"
                            className="form-control"
                            placeholder={dadosApi ? "Avenida, rua" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="logradouroEnd"
                            onChange={(ev) => this.onChangeInput("logradouroEnd", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="bairroEnd">Bairro</Label>
                        <Input type="text"
                            value={bairroEnd}
                            name="bairroEnd"
                            id="bairroEnd"
                            className="form-control"
                            placeholder={dadosApi ? "Bairro" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="bairroEnd"
                            onChange={(ev) => this.onChangeInput("bairroEnd", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="telCont">Telefone</Label>
                        <Input type="text"
                            value={telCont}
                            name="telCont"
                            id="telCont"
                            className="form-control"
                            placeholder={dadosApi ? "Telefone" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="telCont"
                            onChange={(ev) => this.onChangeInput("telCont", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="whatsappCont">Logradouro</Label>
                        <Input type="text"
                            value={whatsappCont}
                            name="whatsappCont"
                            id="whatsappCont"
                            className="form-control"
                            placeholder={dadosApi ? "Whatsapp" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="whatsappCont"
                            onChange={(ev) => this.onChangeInput("whatsappCont", ev)}
                        />
                    </FormGroup>

                    <Link onClick={() => this.updateContato()} to="#">
                        <SpinnerUp loading={loading} />
                    </Link>

                </Form>
            </>
        )
    }
}

const mapStateToProps = state => ({
    contatoDetails: state.contato.contatoDetails
})

export default connect(mapStateToProps, actions)(UpdateContato);