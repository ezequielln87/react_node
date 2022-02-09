import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/home';

import { Form, FormGroup, Label, Input, UncontrolledButtonDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import SpinnerUp from '../../components/SpinnerUp';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';

class UpdateHomeDet extends Component {

    state = {
        _id: "",
        detServTitulo: "",
        detSubtitulo: "",
        detDesc: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false,
        dadosApi: false
    }

    componentDidMount() {
        this.props.getViewHomeDet();
    }

    async componentDidUpdate(nextProps) {
        if (!this.props.home && nextProps.home) this.props.getViewHomeDet();
        await this.receberDadosApi();
    }

    componentWillUnmount() {
        this.props.limparHomeDet();
    }

    receberDadosApi() {
        if (typeof this.props.homeDetailsDet !== "undefined" && this.props.homeDetailsDet !== null && !this.state.dadosApi) {
            this.setState({ _id: this.props.homeDetailsDet._id });
            this.setState({ detServTitulo: this.props.homeDetailsDet.detServTitulo });
            this.setState({ detSubtitulo: this.props.homeDetailsDet.detSubtitulo });
            this.setState({ detDesc: this.props.homeDetailsDet.detDesc });
            this.setState({ dadosApi: true });
        }
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    async updateHomeDet() {
        this.setState({ erro: "" });
        this.setState({ success: "" });

        await this.receberDadosForm();

        if (!this.validade()) return;

        this.setState({ loading: true });

        const { _id, detServTitulo, detSubtitulo, detDesc } = this.state;

        this.props.putHomeDet({ _id, detServTitulo, detSubtitulo, detDesc }, (msg) => {
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
        this.setState({ detServTitulo: document.querySelector("#detServTitulo").value });
        this.setState({ detSubtitulo: document.querySelector("#detSubtitulo").value });
        this.setState({ detDesc: document.querySelector("#detDesc").value });
    }

    validade() {
        const { detServTitulo, detSubtitulo, detDesc } = this.state;
        if (!detServTitulo) return this.setState({ erro: { message: "Preencha o campo titulo!" } });
        if (!detSubtitulo) return this.setState({ erro: { message: "Preencha o campo Subtitulo!" } });
        if (!detDesc) return this.setState({ erro: { message: "Preencha o campo Descrição!" } });
        return true;
    }

    render() {
        const { _id, detServTitulo, detSubtitulo, detDesc, loading, dadosApi, erro, success, formSuccess } = this.state;

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
                        <Label for="detServTitulo">Título</Label>
                        <Input type="text"
                            value={detServTitulo}
                            name="detServTitulo"
                            id="detServTitulo"
                            className="form-control"
                            placeholder={dadosApi ? "Titulo do detalhe do serviço" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="detServTitulo"
                            onChange={(ev) => this.onChangeInput("detServTitulo", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="detSubtitulo">Subtitulo</Label>
                        <Input type="text"
                            value={detSubtitulo}
                            name="detSubtitulo"
                            id="detSubtitulo"
                            className="form-control"
                            placeholder={dadosApi ? "Subtitulo do detalhe do serviço" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="detSubtitulo"
                            onChange={(ev) => this.onChangeInput("detSubtitulo", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="detDesc">Descrição</Label>
                        <Input type="textarea"
                            value={detDesc}
                            name="detDesc"
                            id="detDesc"
                            className="form-control"
                            placeholder={dadosApi ? "Descrição do detalhe do serviço" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="detDesc"
                            onChange={(ev) => this.onChangeInput("detDesc", ev)}
                        />
                    </FormGroup>

                    <Link onClick={() => this.updateHomeDet()} to="#">
                        <SpinnerUp loading={loading} />
                    </Link>

                </Form>
            </>
        )
    }
}

const mapStateToProps = state => ({
    homeDetailsDet: state.home.homeDetailsDet
})

export default connect(mapStateToProps, actions)(UpdateHomeDet);