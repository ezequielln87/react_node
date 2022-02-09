import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/home';

import { Form, FormGroup, Label, Input, UncontrolledButtonDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import SpinnerUp from '../../components/SpinnerUp';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';

class UpdateHomeAcao extends Component {

    state = {
        _id: "",
        acaoTitulo: "",
        acaoSubtitulo: "",
        acaoDesc: "",
        acaoTextBtn: "",
        acaoLinkBtn: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false,
        dadosApi: false
    }

    componentDidMount() {
        this.props.getViewHomeAcao();
    }

    async componentDidUpdate(nextProps) {
        if (!this.props.home && nextProps.home) this.props.getViewHomeAcao();
        await this.receberDadosApi();
    }

    componentWillUnmount() {
        this.props.limparHomeAcao();
    }

    receberDadosApi() {
        if (typeof this.props.homeDetailsAcao !== "undefined" && this.props.homeDetailsAcao !== null && !this.state.dadosApi) {
            this.setState({ _id: this.props.homeDetailsAcao._id });
            this.setState({ acaoTitulo: this.props.homeDetailsAcao.acaoTitulo });
            this.setState({ acaoSubtitulo: this.props.homeDetailsAcao.acaoSubtitulo });
            this.setState({ acaoDesc: this.props.homeDetailsAcao.acaoDesc });
            this.setState({ acaoTextBtn: this.props.homeDetailsAcao.acaoTextBtn });
            this.setState({ acaoLinkBtn: this.props.homeDetailsAcao.acaoLinkBtn });
            this.setState({ dadosApi: true });
        }
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    async updateHomeAcao() {
        this.setState({ erro: "" });
        this.setState({ success: "" });

        await this.receberDadosForm();

        if (!this.validade()) return;

        this.setState({ loading: true });

        const { _id, acaoTitulo, acaoSubtitulo, acaoDesc, acaoTextBtn, acaoLinkBtn } = this.state;

        this.props.putHomeAcao({ _id, acaoTitulo, acaoSubtitulo, acaoDesc, acaoTextBtn, acaoLinkBtn }, (msg) => {
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
        this.setState({ acaoTitulo: document.querySelector("#acaoTitulo").value });
        this.setState({ acaoSubtitulo: document.querySelector("#acaoSubtitulo").value });
        this.setState({ acaoDesc: document.querySelector("#acaoDesc").value });
        this.setState({ acaoTextBtn: document.querySelector("#acaoTextBtn").value });
        this.setState({ acaoLinkBtn: document.querySelector("#acaoLinkBtn").value });
    }

    validade() {
        const { acaoTitulo, acaoSubtitulo, acaoDesc, acaoTextBtn, acaoLinkBtn } = this.state;
        if (!acaoTitulo) return this.setState({ erro: { message: "Preencha o campo titulo!" } });
        if (!acaoSubtitulo) return this.setState({ erro: { message: "Preencha o campo Subtitulo!" } });
        if (!acaoDesc) return this.setState({ erro: { message: "Preencha o campo Descrição!" } });
        if (!acaoTextBtn) return this.setState({ erro: { message: "Preencha o campo texto do botão!" } });
        if (!acaoLinkBtn) return this.setState({ erro: { message: "Preencha o campo link do botão!" } });
        return true;
    }

    render() {
        const { _id, acaoTitulo, acaoSubtitulo, acaoDesc, acaoTextBtn, acaoLinkBtn, loading, dadosApi, erro, success, formSuccess } = this.state;

        if (formSuccess) {
            return <Redirect to={{
                pathname: '/view-home',
                state: { msg: 'Conteúdo da página home editada com sucesso!' }
            }} />
        }

        return (
            <>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Editar Conteúdo da Página Home</h2>
                    </div>

                    <span className="d-none d-md-block">

                        <Link to={"/view-home"}>
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
                                <Link className="dropdown-item" to={"/view-home"}>Visualisar</Link>
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
                        <Label for="acaoTitulo">Título</Label>
                        <Input type="text"
                            value={acaoTitulo}
                            name="acaoTitulo"
                            id="acaoTitulo"
                            className="form-control"
                            placeholder={dadosApi ? "Titulo da ação" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="acaoTitulo"
                            onChange={(ev) => this.onChangeInput("acaoTitulo", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="acaoSubtitulo">Subtitulo</Label>
                        <Input type="text"
                            value={acaoSubtitulo}
                            name="acaoSubtitulo"
                            id="acaoSubtitulo"
                            className="form-control"
                            placeholder={dadosApi ? "Subtitulo da ação" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="acaoSubtitulo"
                            onChange={(ev) => this.onChangeInput("acaoSubtitulo", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="acaoDesc">Descrição</Label>
                        <Input type="textarea"
                            value={acaoDesc}
                            name="acaoDesc"
                            id="acaoDesc"
                            className="form-control"
                            placeholder={dadosApi ? "Descrição da ação" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="acaoDesc"
                            onChange={(ev) => this.onChangeInput("acaoDesc", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="acaoTextBtn">Texto do Botão</Label>
                        <Input type="text"
                            value={acaoTextBtn}
                            name="acaoTextBtn"
                            id="acaoTextBtn"
                            className="form-control"
                            placeholder={dadosApi ? "Texto do botão" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="acaoTextBtn"
                            onChange={(ev) => this.onChangeInput("acaoTextBtn", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="acaoLinkBtn">Link do Botão</Label>
                        <Input type="text"
                            value={acaoLinkBtn}
                            name="acaoLinkBtn"
                            id="acaoLinkBtn"
                            className="form-control"
                            placeholder={dadosApi ? "Link do botão" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="acaoLinkBtn"
                            onChange={(ev) => this.onChangeInput("acaoLinkBtn", ev)}
                        />
                    </FormGroup>

                    <Link onClick={() => this.updateHomeAcao()} to="#">
                        <SpinnerUp loading={loading} />
                    </Link>

                </Form>
            </>
        )
    }
}

const mapStateToProps = state => ({
    homeDetailsAcao: state.home.homeDetailsAcao
})

export default connect(mapStateToProps, actions)(UpdateHomeAcao);