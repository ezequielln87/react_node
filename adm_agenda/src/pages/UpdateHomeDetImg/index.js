import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/home';

import { Form, FormGroup, Label, Input } from 'reactstrap';
import iconeSobre from '../../assets/sobre.jpg';
import SpinnerUp from '../../components/SpinnerUp';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';

class UpdateHomeDetImg extends Component {

    state = {
        _id: "",
        file: null,
        detFileName: "",
        url: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false
    }  

    componentDidMount() {
        this.props.getViewHomeDetImg();
    }

    async componentDidUpdate(nextProps) {
        if (!this.props.home && nextProps.home) this.props.getViewHomeDetImg();
        await this.receberDadosApi();
    }

    componentWillUnmount() {
        this.props.limparHomeDetImg();
    }

    receberDadosApi() {
        if (typeof this.props.homeDetailsDetImg !== "undefined" && this.props.homeDetailsDetImg !== null && !this.state.dadosApi) {
            this.setState({ _id: this.props.homeDetailsDetImg._id });
            this.setState({ detFileName: this.props.homeDetailsDetImg.detFileName });
            this.setState({ url: this.props.homeDetailsDetImg.url });
            this.setState({ dadosApi: true });
        }
    }

    onChangeInputImg = (field, ev) => {
        this.setState({ [field]: ev.target.files[0] });
    }

    async updateHomeDetImg() {
        this.setState({ erro: "" });
        this.setState({ success: "" });

        await this.receberDadosForm();

        this.setState({ loading: true });
        
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('_id', this.state._id);

        this.props.putHomeDetImg(formData, (msg) => {
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
        const { _id, file, detFileName, url, loading, erro, success, formSuccess } = this.state;
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
                        <Label for="file">Foto (500 x 500)</Label>
                        <Input type="file"
                            name="file"
                            id="file"
                            autoComplete="file"
                            onChange={(ev) => this.onChangeInputImg("file", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        {file ? <img src={URL.createObjectURL(file)}  alt="magem Sobre" width="150" height="150" /> : detFileName ? <img src={url + detFileName}  alt="Imagem Sobre" width="150" height="150" /> : <img src={iconeSobre}  alt="Foto do perfil" width="150" height="150" />}
                    </FormGroup>

                    <Link onClick={() => this.updateHomeDetImg()} to="#">
                        <SpinnerUp loading={loading} />
                    </Link>

                </Form>
            </>
        )
    }
}

const mapStateToProps = state => ({
    homeDetailsDetImg: state.home.homeDetailsDetImg
})

export default connect(mapStateToProps, actions)(UpdateHomeDetImg);