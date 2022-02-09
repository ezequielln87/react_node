import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/seo';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import AlertDanger from "../../components/AlertDanger";
import AlertSuccess from "../../components/AlertSuccess";
import SpinnerCad from "../../components/SpinnerCad";

class CadSeo extends Component {

    state = {
        seoPg: "",
        seoTitle: "",
        seoDesc: "",
        seoAutor: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    cadSeo() {
        const { seoPg, seoTitle, seoDesc, seoAutor } = this.state;
        if (!this.validate()) return;

        this.setState({ loading: true });

        this.props.postSeo({ seoPg, seoTitle, seoDesc, seoAutor }, (msg) => {
            if (msg.erro.error) {
                this.setState({ erro: { message: msg.erro.message } });
                this.setState({ success: "" });
                this.setState({ loading: false });
            } else {
                this.setState({ success: { message: msg.erro.message } });
                this.setState({ erro: "" });
                this.setState({ formSuccess: true });
                this.setState({ loading: false });
            }
        })
    }

    validate() {
        const { seoPg, seoTitle, seoDesc, seoAutor } = this.state;
        if (!seoPg) return this.setState({ erro: { message: "Preencha o campo página!" } });
        if (!seoTitle) return this.setState({ erro: { message: "Preencha o campo título!" } });
        if (!seoDesc) return this.setState({ erro: { message: "Preencha o campo descrição!" } });
        if (!seoAutor) return this.setState({ erro: { message: "Preencha o campo autor!" } });
        return true;
    }

    render() {
        const { seoPg, seoTitle, seoDesc, seoAutor, erro, success, loading, formSuccess } = this.state;

        if (formSuccess) {
            return <Redirect to={{
                pathname: '/seo',
                state: { msg: 'Seo da página cadastrado com sucesso!' }
            }} />
        }

        return (
            <>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Cadastrar Seo da Página</h2>
                    </div>
                    <Link to={"seo"}>
                        <button className="btn btn-outline-info btn-sm">
                            Listar
                        </button>
                    </Link>
                </div><hr />
                <AlertDanger erros={erro} />
                <AlertSuccess erros={success} />
                <Form>
                    <FormGroup>
                        <Label for="seoPg">Página</Label>
                        <Input
                            type="text"
                            value={seoPg}
                            name="seoPg"
                            id="seoPg"
                            placeholder="Nome da página na URL"
                            autoComplete="seoPg"
                            onChange={(ev) => this.onChangeInput("seoPg", ev)} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="seoTitle">Título</Label>
                        <Input
                            type="text"
                            value={seoTitle}
                            name="seoTitle"
                            id="seoTitle"
                            placeholder="Título da página"
                            autoComplete="seoTitle"
                            onChange={(ev) => this.onChangeInput("seoTitle", ev)} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="seoDesc">Descrição</Label>
                        <Input
                            type="textarea"
                            value={seoDesc}
                            name="seoDesc"
                            id="seoDesc"
                            placeholder="Descrição da página, no máximo 180 caracteres"
                            autoComplete="seoDesc"
                            onChange={(ev) => this.onChangeInput("seoDesc", ev)} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="seoAutor">Autor</Label>
                        <Input
                            type="text"
                            value={seoAutor}
                            name="seoAutor"
                            id="seoAutor"
                            placeholder="Autor da página"
                            autoComplete="seoAutor"
                            onChange={(ev) => this.onChangeInput("seoAutor", ev)} />
                    </FormGroup>

                    <Link onClick={() => this.cadSeo()} to="#">
                        <SpinnerCad loading={loading} />
                    </Link>
                </Form>
            </>
        )
    }
}

export default connect(null, actions)(CadSeo);