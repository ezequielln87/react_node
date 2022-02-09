import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/home';

import { Form, FormGroup, Label, Input } from 'reactstrap';
import iconeSobre from '../../assets/sobre.jpg';
import SpinnerUp from '../../components/SpinnerUp';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';

class UpdateHomeAcaoImg extends Component {

    state = {
        _id: "",
        file: null,
        acaoFileName: "",
        url: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false
    }  

    componentDidMount() {
        this.props.getViewHomeAcaoImg();
    }

    async componentDidUpdate(nextProps) {
        if (!this.props.home && nextProps.home) this.props.getViewHomeAcaoImg();
        await this.receberDadosApi();
    }

    componentWillUnmount() {
        this.props.limparHomeAcaoImg();
    }

    receberDadosApi() {
        if (typeof this.props.homeDetailsAcaoImg !== "undefined" && this.props.homeDetailsAcaoImg !== null && !this.state.dadosApi) {
            this.setState({ _id: this.props.homeDetailsAcaoImg._id });
            this.setState({ acaoFileName: this.props.homeDetailsAcaoImg.acaoFileName });
            this.setState({ url: this.props.homeDetailsAcaoImg.url });
            this.setState({ dadosApi: true });
        }
    }

    onChangeInputImg = (field, ev) => {
        this.setState({ [field]: ev.target.files[0] });
    }

    async updateHomeAcaoImg() {
        this.setState({ erro: "" });
        this.setState({ success: "" });

        await this.receberDadosForm();

        this.setState({ loading: true });
        
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('_id', this.state._id);

        this.props.putHomeAcaoImg(formData, (msg) => {
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
    }

    render() {
        const { _id, file, acaoFileName, url, loading, erro, success, formSuccess } = this.state;
        if (formSuccess) {
            return <Redirect to={{
                pathname: '/view-home',
                state: { msg: 'Imagem editada com sucesso!' }
            }} />
        }

        return (
            <>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Editar Imagem Ação</h2>
                    </div>
                    <Link to={'/view-home'}>
                        <button className="btn btn-outline-primary btn-sm">Visualizar</button>
                    </Link>
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
                        <Label for="file">Foto (1280 x 720)</Label>
                        <Input type="file"
                            name="file"
                            id="file"
                            autoComplete="file"
                            onChange={(ev) => this.onChangeInputImg("file", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        {file ? <img src={URL.createObjectURL(file)}  alt="magem Sobre" width="250" height="141" /> : acaoFileName ? <img src={url + acaoFileName}  alt="Imagem Sobre" width="250" height="141" /> : <img src={iconeSobre}  alt="Foto do perfil" width="250" height="141" />}
                    </FormGroup>

                    <Link onClick={() => this.updateHomeAcaoImg()} to="#">
                        <SpinnerUp loading={loading} />
                    </Link>

                </Form>
            </>
        )
    }
}

const mapStateToProps = state => ({
    homeDetailsAcaoImg: state.home.homeDetailsAcaoImg
})

export default connect(mapStateToProps, actions)(UpdateHomeAcaoImg);