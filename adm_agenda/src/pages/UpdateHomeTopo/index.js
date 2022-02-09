import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/home';

import { Form, FormGroup, Label, Input, UncontrolledButtonDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import SpinnerUp from '../../components/SpinnerUp';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';

class UpdateHomeTopo extends Component {

    state = {
        _id: "",
        tituloHorarioCont: "",
        horarioCont: "",
        tituloEnd: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false,
        dadosApi: false
    }

    componentDidMount() {
        this.props.getViewHomeTopo();
    }

    async componentDidUpdate(nextProps) {
        if (!this.props.home && nextProps.home) this.props.getViewHomeTopo();
        await this.receberDadosApi();
    }

    componentWillUnmount() {
        this.props.limparHomeTopo();
    }

    receberDadosApi() {
        if (typeof this.props.homeDetailsTopo !== "undefined" && this.props.homeDetailsTopo !== null && !this.state.dadosApi) {
            this.setState({ _id: this.props.homeDetailsTopo._id });
            this.setState({ topTitulo: this.props.homeDetailsTopo.topTitulo });
            this.setState({ topSubtitulo: this.props.homeDetailsTopo.topSubtitulo });
            this.setState({ topTextBtn: this.props.homeDetailsTopo.topTextBtn });
            this.setState({ topLinkBtn: this.props.homeDetailsTopo.topLinkBtn });
            this.setState({ dadosApi: true });
        }
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    async updateHomeTopo() {
        this.setState({ erro: "" });
        this.setState({ success: "" });

        await this.receberDadosForm();

        if (!this.validade()) return;

        this.setState({ loading: true });

        const { _id, topTitulo, topSubtitulo, topTextBtn, topLinkBtn } = this.state;

        this.props.putHomeTopo({ _id, topTitulo, topSubtitulo, topTextBtn, topLinkBtn }, (msg) => {
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
        this.setState({ topTitulo: document.querySelector("#topTitulo").value });
        this.setState({ topSubtitulo: document.querySelector("#topSubtitulo").value });
        this.setState({ topTextBtn: document.querySelector("#topTextBtn").value });
        this.setState({ topLinkBtn: document.querySelector("#topLinkBtn").value });
    }

    validade() {
        const { topTitulo, topSubtitulo, topTextBtn, topLinkBtn } = this.state;
        if (!topTitulo) return this.setState({ erro: { message: "Preencha o campo titulo!" } });
        if (!topSubtitulo) return this.setState({ erro: { message: "Preencha o campo Subtitulo!" } });
        if (!topTextBtn) return this.setState({ erro: { message: "Preencha o campo texto do botão!" } });
        if (!topLinkBtn) return this.setState({ erro: { message: "Preencha o campo link do botão!" } });
        return true;
    }

    render() {
        const { _id, topTitulo, topSubtitulo, topTextBtn, topLinkBtn, loading, dadosApi, erro, success, formSuccess } = this.state;

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
                        <Label for="topTitulo">Título</Label>
                        <Input type="text"
                            value={topTitulo}
                            name="topTitulo"
                            id="topTitulo"
                            className="form-control"
                            placeholder={dadosApi ? "Titulo do topo" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="topTitulo"
                            onChange={(ev) => this.onChangeInput("topTitulo", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="topSubtitulo">Subtitulo</Label>
                        <Input type="text"
                            value={topSubtitulo}
                            name="topSubtitulo"
                            id="topSubtitulo"
                            className="form-control"
                            placeholder={dadosApi ? "Subtitulo do topo" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="topSubtitulo"
                            onChange={(ev) => this.onChangeInput("topSubtitulo", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="topTextBtn">Texto do Botão</Label>
                        <Input type="text"
                            value={topTextBtn}
                            name="topTextBtn"
                            id="topTextBtn"
                            className="form-control"
                            placeholder={dadosApi ? "Texto do botão" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="topTextBtn"
                            onChange={(ev) => this.onChangeInput("topTextBtn", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="topLinkBtn">Link do Botão</Label>
                        <Input type="text"
                            value={topLinkBtn}
                            name="topLinkBtn"
                            id="topLinkBtn"
                            className="form-control"
                            placeholder={dadosApi ? "Link do botão" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="topLinkBtn"
                            onChange={(ev) => this.onChangeInput("topLinkBtn", ev)}
                        />
                    </FormGroup>

                    <Link onClick={() => this.updateHomeTopo()} to="#">
                        <SpinnerUp loading={loading} />
                    </Link>

                </Form>
            </>
        )
    }
}

const mapStateToProps = state => ({
    homeDetailsTopo: state.home.homeDetailsTopo
})

export default connect(mapStateToProps, actions)(UpdateHomeTopo);