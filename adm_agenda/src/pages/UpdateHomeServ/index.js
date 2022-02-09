import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/home';

import { Form, FormGroup, Label, Input, UncontrolledButtonDropdown, DropdownMenu, DropdownToggle, Row, Col } from 'reactstrap';
import SpinnerUp from '../../components/SpinnerUp';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';

class UpdateHomeServ extends Component {

    state = {
        _id: "",
        servTitulo: "",
        servSubtitulo: "",
        servUmIcone: "",
        servUmTitulo: "",
        servUmDesc: "",
        servDoisIcone: "",
        servDoisTitulo: "",
        servDoisDesc: "",
        servTresIcone: "",
        servTresTitulo: "",
        servTresDesc: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false,
        dadosApi: false
    }

    componentDidMount() {
        this.props.getViewHomeServ();
    }

    async componentDidUpdate(nextProps) {
        if (!this.props.home && nextProps.home) this.props.getViewHomeServ();
        await this.receberDadosApi();
    }

    componentWillUnmount() {
        this.props.limparHomeTopo();
    }

    receberDadosApi() {
        if (typeof this.props.homeDetailsServ !== "undefined" && this.props.homeDetailsServ !== null && !this.state.dadosApi) {
            this.setState({ _id: this.props.homeDetailsServ._id });
            this.setState({ servTitulo: this.props.homeDetailsServ.servTitulo });
            this.setState({ servSubtitulo: this.props.homeDetailsServ.servSubtitulo });
            this.setState({ servUmIcone: this.props.homeDetailsServ.servUmIcone });
            this.setState({ servUmTitulo: this.props.homeDetailsServ.servUmTitulo });
            this.setState({ servUmDesc: this.props.homeDetailsServ.servUmDesc });
            this.setState({ servDoisIcone: this.props.homeDetailsServ.servDoisIcone });
            this.setState({ servDoisTitulo: this.props.homeDetailsServ.servDoisTitulo });
            this.setState({ servDoisDesc: this.props.homeDetailsServ.servDoisDesc });
            this.setState({ servTresIcone: this.props.homeDetailsServ.servTresIcone });
            this.setState({ servTresTitulo: this.props.homeDetailsServ.servTresTitulo });
            this.setState({ servTresDesc: this.props.homeDetailsServ.servTresDesc });
            this.setState({ dadosApi: true });
        }
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    async updateHomeServ() {
        this.setState({ erro: "" });
        this.setState({ success: "" });

        await this.receberDadosForm();

        if (!this.validade()) return;

        this.setState({ loading: true });

        const { _id, servTitulo, servSubtitulo, servUmIcone, servUmTitulo, servUmDesc, servDoisIcone, servDoisTitulo, servDoisDesc, servTresIcone, servTresTitulo, servTresDesc } = this.state;

        this.props.putHomeServ({ _id, servTitulo, servSubtitulo, servUmIcone, servUmTitulo, servUmDesc, servDoisIcone, servDoisTitulo, servDoisDesc, servTresIcone, servTresTitulo, servTresDesc }, (msg) => {
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
        this.setState({ servTitulo: document.querySelector("#servTitulo").value });
        this.setState({ servSubtitulo: document.querySelector("#servSubtitulo").value });
        this.setState({ servUmIcone: document.querySelector("#servUmIcone").value });
        this.setState({ servUmTitulo: document.querySelector("#servUmTitulo").value });
        this.setState({ servUmDesc: document.querySelector("#servUmDesc").value });
        this.setState({ servDoisIcone: document.querySelector("#servDoisIcone").value });
        this.setState({ servDoisTitulo: document.querySelector("#servDoisTitulo").value });
        this.setState({ servDoisDesc: document.querySelector("#servDoisDesc").value });
        this.setState({ servTresIcone: document.querySelector("#servTresIcone").value });
        this.setState({ servTresTitulo: document.querySelector("#servTresTitulo").value });
        this.setState({ servTresDesc: document.querySelector("#servTresDesc").value });
    }

    validade() {
        const { servTitulo, servSubtitulo, servUmIcone, servUmTitulo, servUmDesc, servDoisIcone, servDoisTitulo, servDoisDesc, servTresIcone, servTresTitulo, servTresDesc } = this.state;
        if (!servTitulo) return this.setState({ erro: { message: "Preencha o campo Título!" } });
        if (!servSubtitulo) return this.setState({ erro: { message: "Preencha o campo Subtitulo!" } });
        if (!servUmIcone) return this.setState({ erro: { message: "Preencha o campo ícone um!" } });
        if (!servUmTitulo) return this.setState({ erro: { message: "Preencha o campo título do serviço um!" } });
        if (!servUmDesc) return this.setState({ erro: { message: "Preencha o campo descrição do serviço um!" } });
        if (!servDoisIcone) return this.setState({ erro: { message: "Preencha o campo ícone dois!" } });
        if (!servDoisTitulo) return this.setState({ erro: { message: "Preencha o campo título do serviço dois!" } });
        if (!servDoisDesc) return this.setState({ erro: { message: "Preencha o campo descrição do serviço dois!" } });
        if (!servTresIcone) return this.setState({ erro: { message: "Preencha o campo ícone do serviço três!" } });
        if (!servTresTitulo) return this.setState({ erro: { message: "Preencha o campo título do serviço três!" } });
        if (!servTresDesc) return this.setState({ erro: { message: "Preencha o campo descrição do serviço três!" } });
        return true;
    }

    render() {
        const { _id, servTitulo, servSubtitulo, servUmIcone, servUmTitulo, servUmDesc, servDoisIcone, servDoisTitulo, servDoisDesc, servTresIcone, servTresTitulo, servTresDesc, loading, dadosApi, erro, success, formSuccess } = this.state;

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
                        <Label for="servTitulo">Título</Label>
                        <Input type="text"
                            value={servTitulo}
                            name="servTitulo"
                            id="servTitulo"
                            className="form-control"
                            placeholder={dadosApi ? "Titulo dos serviços" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="servTitulo"
                            onChange={(ev) => this.onChangeInput("servTitulo", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="servSubtitulo">Subtitulo</Label>
                        <Input type="text"
                            value={servSubtitulo}
                            name="servSubtitulo"
                            id="servSubtitulo"
                            className="form-control"
                            placeholder={dadosApi ? "Subtitulo dos serviços" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="servSubtitulo"
                            onChange={(ev) => this.onChangeInput("servSubtitulo", ev)}
                        />
                    </FormGroup>

                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="servUmIcone">Ícone um</Label>
                                <Input type="text"
                                    value={servUmIcone}
                                    name="servUmIcone"
                                    id="servUmIcone"
                                    className="form-control"
                                    placeholder={dadosApi ? "Ícone do serviço um" : "Carregado..."}
                                    disabled={dadosApi ? false : true}
                                    autoComplete="servUmIcone"
                                    onChange={(ev) => this.onChangeInput("servUmIcone", ev)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="servUmTitulo">Título um</Label>
                                <Input type="text"
                                    value={servUmTitulo}
                                    name="servUmTitulo"
                                    id="servUmTitulo"
                                    className="form-control"
                                    placeholder={dadosApi ? "Título do serviço um" : "Carregado..."}
                                    disabled={dadosApi ? false : true}
                                    autoComplete="servUmTitulo"
                                    onChange={(ev) => this.onChangeInput("servUmTitulo", ev)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Label for="servUmDesc">Descrição um</Label>
                        <Input type="textarea"
                            value={servUmDesc}
                            name="servUmDesc"
                            id="servUmDesc"
                            className="form-control"
                            placeholder={dadosApi ? "Descrição do serviço um" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="servUmDesc"
                            onChange={(ev) => this.onChangeInput("servUmDesc", ev)}
                        />
                    </FormGroup>

                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="servDoisIcone">Ícone dois</Label>
                                <Input type="text"
                                    value={servDoisIcone}
                                    name="servDoisIcone"
                                    id="servDoisIcone"
                                    className="form-control"
                                    placeholder={dadosApi ? "Ícone do serviço dois" : "Carregado..."}
                                    disabled={dadosApi ? false : true}
                                    autoComplete="servDoisIcone"
                                    onChange={(ev) => this.onChangeInput("servDoisIcone", ev)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="servDoisTitulo">Título dois</Label>
                                <Input type="text"
                                    value={servDoisTitulo}
                                    name="servDoisTitulo"
                                    id="servDoisTitulo"
                                    className="form-control"
                                    placeholder={dadosApi ? "Título do serviço dois" : "Carregado..."}
                                    disabled={dadosApi ? false : true}
                                    autoComplete="servDoisTitulo"
                                    onChange={(ev) => this.onChangeInput("servDoisTitulo", ev)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Label for="servDoisDesc">Descrição dois</Label>
                        <Input type="textarea"
                            value={servDoisDesc}
                            name="servDoisDesc"
                            id="servDoisDesc"
                            className="form-control"
                            placeholder={dadosApi ? "Descrição do serviço dois" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="servDoisDesc"
                            onChange={(ev) => this.onChangeInput("servDoisDesc", ev)}
                        />
                    </FormGroup><Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="servTresIcone">Ícone Três</Label>
                                <Input type="text"
                                    value={servTresIcone}
                                    name="servTresIcone"
                                    id="servTresIcone"
                                    className="form-control"
                                    placeholder={dadosApi ? "Ícone do serviço três" : "Carregado..."}
                                    disabled={dadosApi ? false : true}
                                    autoComplete="servTresIcone"
                                    onChange={(ev) => this.onChangeInput("servTresIcone", ev)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="servTresTitulo">Título Três</Label>
                                <Input type="text"
                                    value={servTresTitulo}
                                    name="servTresTitulo"
                                    id="servTresTitulo"
                                    className="form-control"
                                    placeholder={dadosApi ? "Título do serviço três" : "Carregado..."}
                                    disabled={dadosApi ? false : true}
                                    autoComplete="servTresTitulo"
                                    onChange={(ev) => this.onChangeInput("servTresTitulo", ev)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Label for="servTresDesc">Descrição Três</Label>
                        <Input type="textarea"
                            value={servTresDesc}
                            name="servTresDesc"
                            id="servTresDesc"
                            className="form-control"
                            placeholder={dadosApi ? "Descrição do serviço três" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="servTresDesc"
                            onChange={(ev) => this.onChangeInput("servTresDesc", ev)}
                        />
                    </FormGroup>

                    <Link onClick={() => this.updateHomeServ()} to="#">
                        <SpinnerUp loading={loading} />
                    </Link>

                </Form>
            </>
        )
    }
}

const mapStateToProps = state => ({
    homeDetailsServ: state.home.homeDetailsServ
})

export default connect(mapStateToProps, actions)(UpdateHomeServ);