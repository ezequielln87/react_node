import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/rodape';

import { Form, FormGroup, Label, Input, UncontrolledButtonDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import SpinnerUp from '../../components/SpinnerUp';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';

class UpdateRodape extends Component {

    state = {
        _id: "",
        tituloPg: "",
        tituloCont: "",
        telCont: "",
        endCont: "",
        cnpjCont: "",
        tituloRedSoc: "",
        instTitulo: "",
        instLink: "",
        facTitulo: "",
        facLink: "",
        youtubeTitulo: "",
        youtubeLink: "",
        twiterTitulo: "",
        twiterLink: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false,
        dadosApi: false
    }

    componentDidMount() {
        this.props.getViewRodape();
    }

    async componentDidUpdate(nextProps) {
        if (!this.props.rodape && nextProps.rodape) this.props.getViewRodape();
        await this.receberDadosApi();
    }

    componentWillUnmount() {
        this.props.limparRodape();
    }

    receberDadosApi() {
        if (typeof this.props.rodapeDetails !== "undefined" && this.props.rodapeDetails !== null && !this.state.dadosApi) {
            this.setState({ _id: this.props.rodapeDetails._id });
            this.setState({ tituloPg: this.props.rodapeDetails.tituloPg });
            this.setState({ tituloCont: this.props.rodapeDetails.tituloCont });
            this.setState({ telCont: this.props.rodapeDetails.telCont });
            this.setState({ endCont: this.props.rodapeDetails.endCont });
            this.setState({ cnpjCont: this.props.rodapeDetails.cnpjCont });
            this.setState({ tituloRedSoc: this.props.rodapeDetails.tituloRedSoc });
            this.setState({ instTitulo: this.props.rodapeDetails.instTitulo });
            this.setState({ instLink: this.props.rodapeDetails.instLink });
            this.setState({ facTitulo: this.props.rodapeDetails.facTitulo });
            this.setState({ facLink: this.props.rodapeDetails.facLink });
            this.setState({ youtubeTitulo: this.props.rodapeDetails.youtubeTitulo });
            this.setState({ youtubeLink: this.props.rodapeDetails.youtubeLink });
            this.setState({ twiterTitulo: this.props.rodapeDetails.twiterTitulo });
            this.setState({ twiterLink: this.props.rodapeDetails.twiterLink });
            this.setState({ dadosApi: true });
        }
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    async updateRodape() {
        this.setState({ erro: "" });
        this.setState({ success: "" });

        await this.receberDadosForm();

        if (!this.validade()) return;

        this.setState({ loading: true });

        const { _id, tituloPg, tituloCont, telCont, endCont, cnpjCont, tituloRedSoc, instTitulo, instLink, facTitulo, facLink, youtubeTitulo, youtubeLink, twiterTitulo, twiterLink } = this.state;

        this.props.putRodape({ _id, tituloPg, tituloCont, telCont, endCont, cnpjCont, tituloRedSoc, instTitulo, instLink, facTitulo, facLink, youtubeTitulo, youtubeLink, twiterTitulo, twiterLink }, (msg) => {
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
        this.setState({ tituloPg: document.querySelector("#tituloPg").value });
        this.setState({ tituloCont: document.querySelector("#tituloCont").value });
        this.setState({ telCont: document.querySelector("#telCont").value });
        this.setState({ endCont: document.querySelector("#endCont").value });
        this.setState({ cnpjCont: document.querySelector("#cnpjCont").value });
        this.setState({ tituloRedSoc: document.querySelector("#tituloRedSoc").value });
        this.setState({ instTitulo: document.querySelector("#instTitulo").value });
        this.setState({ instLink: document.querySelector("#instLink").value });
        this.setState({ facTitulo: document.querySelector("#facTitulo").value });
        this.setState({ facLink: document.querySelector("#facLink").value });
        this.setState({ youtubeTitulo: document.querySelector("#youtubeTitulo").value });
        this.setState({ youtubeLink: document.querySelector("#youtubeLink").value });
        this.setState({ twiterTitulo: document.querySelector("#twiterTitulo").value });
        this.setState({ twiterLink: document.querySelector("#twiterLink").value });
    }

    validade() {// tituloPg, tituloCont, telCont, endCont, cnpjCont, tituloRedSoc, instTitulo, instLink, facTitulo, facLink, youtubeTitulo, youtubeLink, twiterTitulo, twiterLink
        const {tituloPg, tituloCont, telCont, endCont, cnpjCont, tituloRedSoc, instTitulo, instLink, facTitulo, facLink, youtubeTitulo, youtubeLink, twiterTitulo, twiterLink } = this.state;
        if (!tituloPg) return this.setState({ erro: { message: "Preencha o campo titulo da página!" } });
        if (!tituloCont) return this.setState({ erro: { message: "Preencha o campo titulo do conteúdo!" } });
        if (!telCont) return this.setState({ erro: { message: "Preencha o campo telefone de contato!" } });
        if (!endCont) return this.setState({ erro: { message: "Preencha o campo endereço!" } });
        if (!cnpjCont) return this.setState({ erro: { message: "Preencha o campo CNPJ!" } });
        if (!tituloRedSoc) return this.setState({ erro: { message: "Preencha o campo titulo das redes sociais!" } });
        if (!instTitulo) return this.setState({ erro: { message: "Preencha o campo titulo do Instagram!" } });
        if (!instLink) return this.setState({ erro: { message: "Preencha o campo link do Instagram!" } });
        if (!facTitulo) return this.setState({ erro: { message: "Preencha o campo titulo do Facebook!" } });
        if (!facLink) return this.setState({ erro: { message: "Preencha o campo link do Facebook!" } });
        if (!youtubeTitulo) return this.setState({ erro: { message: "Preencha o campo titulo do Youtube!" } });
        if (!youtubeLink) return this.setState({ erro: { message: "Preencha o campo link Youtube!" } });
        if (!twiterTitulo) return this.setState({ erro: { message: "Preencha o campo titulo do Twiter!" } });
        if (!twiterLink) return this.setState({ erro: { message: "Preencha o campo link do Twiter!" } });
        return true;
    }

    render() {
        const { _id, tituloPg, tituloCont, telCont, endCont, cnpjCont, tituloRedSoc, instTitulo, instLink, facTitulo, facLink, youtubeTitulo, youtubeLink, twiterTitulo, twiterLink, loading, dadosApi, erro, success, formSuccess } = this.state;

        if (formSuccess) {
            return <Redirect to={{
                pathname: '/view-rodape',
                state: { msg: 'Conteúdo do rodapé editada com sucesso!' }
            }} />
        }

        return (
            <>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Editar Conteúdo do Rodapé</h2>
                    </div>

                    <span className="d-none d-md-block">

                        <Link to={"/view-rodape"}>
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
                                <Link className="dropdown-item" to={"/view-rodape"}>Visualisar</Link>
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
                        <Label for="tituloPg">Título da Página</Label>
                        <Input type="text"
                            value={tituloPg}
                            name="tituloPg"
                            id="tituloPg"
                            className="form-control"
                            placeholder={dadosApi ? "Titulo da página" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="tituloPg"
                            onChange={(ev) => this.onChangeInput("tituloPg", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="tituloCont">Título do Conteúdo</Label>
                        <Input type="text"
                            value={tituloCont}
                            name="tituloCont"
                            id="tituloCont"
                            className="form-control"
                            placeholder={dadosApi ? "Título do conteúdo" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="tituloCont"
                            onChange={(ev) => this.onChangeInput("tituloCont", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="telCont">Telefone</Label>
                        <Input type="text"
                            value={telCont}
                            name="telCont"
                            id="telCont"
                            className="form-control"
                            placeholder={dadosApi ? "Telefone de contato" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="telCont"
                            onChange={(ev) => this.onChangeInput("telCont", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="endCont">Endereço </Label>
                        <Input type="text"
                            value={endCont}
                            name="endCont"
                            id="endCont"
                            className="form-control"
                            placeholder={dadosApi ? "Endereço" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="endCont"
                            onChange={(ev) => this.onChangeInput("endCont", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="cnpjCont">CNPJ </Label>
                        <Input type="text"
                            value={cnpjCont}
                            name="cnpjCont"
                            id="cnpjCont"
                            className="form-control"
                            placeholder={dadosApi ? "CNPJ ou outras informações" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="cnpjCont"
                            onChange={(ev) => this.onChangeInput("cnpjCont", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="tituloRedSoc">Título Redes Sociais </Label>
                        <Input type="text"
                            value={tituloRedSoc}
                            name="tituloRedSoc"
                            id="tituloRedSoc"
                            className="form-control"
                            placeholder={dadosApi ? "Título das redes sociais" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="tituloRedSoc"
                            onChange={(ev) => this.onChangeInput("tituloRedSoc", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="instTitulo">Instagram</Label>
                        <Input type="text"
                            value={instTitulo}
                            name="instTitulo"
                            id="instTitulo"
                            className="form-control"
                            placeholder={dadosApi ? "Título do Instagram" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="instTitulo"
                            onChange={(ev) => this.onChangeInput("instTitulo", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="instLink">Link do Instagram</Label>
                        <Input type="text"
                            value={instLink}
                            name="instLink"
                            id="instLink"
                            className="form-control"
                            placeholder={dadosApi ? "Link do Instagram" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="instLink"
                            onChange={(ev) => this.onChangeInput("instLink", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="facTitulo">Facebook</Label>
                        <Input type="text"
                            value={facTitulo}
                            name="facTitulo"
                            id="facTitulo"
                            className="form-control"
                            placeholder={dadosApi ? "Título do Facebook" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="facTitulo"
                            onChange={(ev) => this.onChangeInput("facTitulo", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="facLink">Link do Facebook</Label>
                        <Input type="text"
                            value={facLink}
                            name="facLink"
                            id="facLink"
                            className="form-control"
                            placeholder={dadosApi ? "Link do Facebook" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="facLink"
                            onChange={(ev) => this.onChangeInput("facLink", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="youtubeTitulo">Youtube</Label>
                        <Input type="text"
                            value={youtubeTitulo}
                            name="youtubeTitulo"
                            id="youtubeTitulo"
                            className="form-control"
                            placeholder={dadosApi ? "Título do Youtube" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="youtubeTitulo"
                            onChange={(ev) => this.onChangeInput("youtubeTitulo", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="youtubeLink">Link do Youtube</Label>
                        <Input type="text"
                            value={youtubeLink}
                            name="youtubeLink"
                            id="youtubeLink"
                            className="form-control"
                            placeholder={dadosApi ? "Link do Youtube" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="youtubeLink"
                            onChange={(ev) => this.onChangeInput("youtubeLink", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="twiterTitulo">Twiter</Label>
                        <Input type="text"
                            value={twiterTitulo}
                            name="twiterTitulo"
                            id="twiterTitulo"
                            className="form-control"
                            placeholder={dadosApi ? "Título do Youtube" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="twiterTitulo"
                            onChange={(ev) => this.onChangeInput("twiterTitulo", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="twiterLink">Link do Twiter</Label>
                        <Input type="text"
                            value={twiterLink}
                            name="twiterLink"
                            id="twiterLink"
                            className="form-control"
                            placeholder={dadosApi ? "Link do Twiter" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="twiterLink"
                            onChange={(ev) => this.onChangeInput("twiterLink", ev)}
                        />
                    </FormGroup>

                    <Link onClick={() => this.updateRodape()} to="#">
                        <SpinnerUp loading={loading} />
                    </Link>

                </Form>
            </>
        )
    }
}

const mapStateToProps = state => ({
    rodapeDetails: state.rodape.rodapeDetails
})

export default connect(mapStateToProps, actions)(UpdateRodape);