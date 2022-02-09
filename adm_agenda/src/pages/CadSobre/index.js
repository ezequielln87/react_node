import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/sobre';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import iconeUsuario from '../../assets/sobre.jpg';
import AlertDanger from "../../components/AlertDanger";
import AlertSuccess from "../../components/AlertSuccess";
import SpinnerCad from "../../components/SpinnerCad";

class CadSobre extends Component {

    state = {
        titulo: "",
        descricao: "",
        file: null,
        erro: "",
        success: "",
        loading: false,
        formSuccess: false
    }


    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    onChangeInputImg = (field, ev) => {
        this.setState({ [field]: ev.target.files[0] });
    }

    async cadSobre() {
        if (!this.validate()) return;

        this.setState({ loading: true });
        
        const { titulo, descricao } = this.state;
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('titulo', titulo);
        formData.append('descricao', descricao);

        await this.props.postSobre(formData, (msg) => {
            if (msg.erro.error) {
                console.log(msg);
                this.setState({ erro: { message: msg.erro.message } });
                this.setState({ success: "" });
                this.setState({ loading: false });
            } else {
                this.setState({ success: { message: msg.erro.message } });
                this.setState({ erro: "" });
                this.setState({ formSuccess: true });
                this.setState({ loading: false });
            };
        });
    };

    validate() {
        const { titulo, descricao } = this.state;
        if (!titulo) return this.setState({ erro: { message: "Preencha o campo titulo!" } });
        if (!descricao) return this.setState({ erro: { message: "Preencha o campo descrição!" } });
        return true;
    }

    render() {
        const { titulo, descricao, file, erro, success, loading, formSuccess } = this.state;

        if (formSuccess) {
            return <Redirect to={{
                pathname: '/sobre',
                state: { msg: 'Sobre cadastrado com sucesso!' }
            }} />
        }

        return (
            <>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Cadastrar Sobre</h2>
                    </div>
                    <Link to={"sobre"}>
                        <button className="btn btn-outline-info btn-sm">
                            Listar
                        </button>
                    </Link>
                </div><hr />
                <AlertDanger erros={erro} />
                <AlertSuccess erros={success} />
                <Form>
                    <FormGroup>
                        <Label for="titulo">Titulo</Label>
                        <Input
                            type="text"
                            value={titulo}
                            name="titulo"
                            id="titulo"
                            placeholder="Titulo do sobre"
                            autoComplete="titulo"
                            onChange={(ev) => this.onChangeInput("titulo", ev)} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="descricao">Descrição</Label>
                        <Input
                            type="textarea"
                            value={descricao}
                            name="descricao"
                            id="descricao"
                            placeholder="Descrição do sobre"
                            autoComplete="descricao"
                            onChange={(ev) => this.onChangeInput("descricao", ev)} />
                    </FormGroup>

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
                        {file ? <img src={URL.createObjectURL(file)} alt="Foto do perfil" width="150" height="150" /> : <img src={iconeUsuario} alt="Foto do perfil" width="150" height="150" />}
                    </FormGroup>

                    <Link onClick={() => this.cadSobre()} to="#">
                        <SpinnerCad loading={loading} />
                    </Link>
                </Form>
            </>
        )
    }
}

export default connect(null, actions)(CadSobre);