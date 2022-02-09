import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import validator from 'validator';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/msgContatos';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import AlertDanger from "../../components/AlertDanger";
import AlertSuccess from "../../components/AlertSuccess";
import SpinnerCad from "../../components/SpinnerCad";

class CadMsgContato extends Component {

    state = {
        nome: "",
        email: "",
        assuntoMsg: "",
        conteudoMsg: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    cadMsgContato() {
        const { nome, email, assuntoMsg, conteudoMsg } = this.state;
        if (!this.validate()) return;

        this.setState({ loading: true });

        this.props.postMsgContato({ nome, email,  assuntoMsg, conteudoMsg }, (msg) => {
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
        const { nome, email,  assuntoMsg, conteudoMsg } = this.state;
        if (!nome) return this.setState({ erro: { message: "Preencha o campo nome!" } });
        if (!email) return this.setState({ erro: { message: "Preencha o campo e-mail!" } });
        if (!validator.isEmail(email)) return this.setState({ erro: { message: "Preencha com e-mail válido!" } });
        if (!assuntoMsg) return this.setState({ erro: { message: "Preencha o campo assunto!" } });
        if (!conteudoMsg) return this.setState({ erro: { message: "Preencha o campo conteúdo!" } });
        return true;
    }

    render() {
        const { nome, email, assuntoMsg, conteudoMsg, erro, success, loading, formSuccess } = this.state;

        if (formSuccess) {
            return <Redirect to={{
                pathname: '/msg-contato',
                state: { msg: 'Mensagem de contato cadastrada com sucesso!' }
            }} />
        }

        return (
            <>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Cadastrar Mensagem de Contato</h2>
                    </div>
                    <Link to={"msg-contato"}>
                        <button className="btn btn-outline-info btn-sm">
                            Listar
                        </button>
                    </Link>
                </div><hr />
                <AlertDanger erros={erro} />
                <AlertSuccess erros={success} />
                <Form>
                    <FormGroup>
                        <Label for="nome">Nome</Label>
                        <Input
                            type="text"
                            value={nome}
                            name="nome"
                            id="nome"
                            placeholder="Nome do usuário"
                            autoComplete="nome"
                            onChange={(ev) => this.onChangeInput("nome", ev)} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="email">E-mail</Label>
                        <Input
                            type="email"
                            value={email}
                            name="email"
                            id="email"
                            placeholder="Melhor e-mail do usuário"
                            autoComplete="email"
                            onChange={(ev) => this.onChangeInput("email", ev)} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="assuntoMsg">Assunto</Label>
                        <Input
                            type="text"
                            value={assuntoMsg}
                            name="assuntoMsg"
                            id="assuntoMsg"
                            placeholder="Assunto da mensagem"
                            autoComplete="assuntoMsg"
                            onChange={(ev) => this.onChangeInput("assuntoMsg", ev)} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="nome">Conteúdo</Label>
                        <Input
                            type="textarea"
                            value={conteudoMsg}
                            name="conteudoMsg"
                            id="conteudoMsg"
                            placeholder="Conteúdo da mensagem"
                            autoComplete="conteudoMsg"
                            onChange={(ev) => this.onChangeInput("conteudoMsg", ev)} />
                    </FormGroup>

                    <Link onClick={() => this.cadMsgContato()} to="#">
                        <SpinnerCad loading={loading} />
                    </Link>
                </Form>
            </>
        )
    }
}

export default connect(null, actions)(CadMsgContato);