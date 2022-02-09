import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/users';
import validator from 'validator';

import { Form, FormGroup, Label, Input} from 'reactstrap';
import SpinnerUp from '../../components/SpinnerUp';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';

class UpdatePerfil extends Component {

    state = {
        _id: "",
        name: "",
        email: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false,
        dadosApi: false
    }

    componentDidMount(){
        this.receberDadosApi();
    }

    async componentDidUpdate(nextProps){
        if(!this.props.usuario && nextProps.usuario) this.props.getViewUser(this.state._id);
        await this.receberDadosApi();
    }

    receberDadosApi(){
        if(typeof this.props.usuario !== "undefined" && this.props.usuario !== null && !this.state.dadosApi){
            this.setState({_id: this.props.usuario._id});
            this.setState({name: this.props.usuario.name});
            this.setState({email: this.props.usuario.email});
            this.setState({dadosApi: true});
        }
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value});
    }

    updateUser(){
        this.setState({erro: ""});
        this.setState({success: ""});
        this.receberDadosForm();
        if(!this.validate()) return;
        const {name, email } = this.state;

        this.setState({loading: true});

        this.props.putPerfil({name, email}, (msg) => {
            if(msg.erro.error){
                this.setState({erro: {message: msg.erro.message}});
                this.setState({loading: false});
            }else{
                this.setState({success: {message: msg.erro.message}});                
                this.atualizarUser();
            }
        })
    }

    async atualizarUser(){
        await this.props.viewPerfil(() =>{
            this.setState({loading: false});
            this.setState({formSuccess: true});
        })
    }

    receberDadosForm(){
        this.setState({name: document.querySelector("#name").value});
        this.setState({email: document.querySelector("#email").value});
    }

    validate(){
        const { name, email } = this.state;
        if (!name) return this.setState({ erro: { message: "Preencha o campo nome!" } });
        if (!email) return this.setState({ erro: { message: "Preencha o campo e-mail!" } });
        if (!validator.isEmail(email)) return this.setState({ erro: { message: "Preencha com e-mail válido!" } });
        return true;
    }

    render() {
        const { name, email, loading, erro, success, formSuccess } = this.state;
        if(formSuccess){
            return <Redirect to={{
                pathname: '/perfil',
                state: {msg: 'Perfil editado com sucesso!'}
            }} />
        }
        return (
            <>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Editar Perfil</h2>
                    </div>
                    <Link to={"/perfil"}>
                        <button className="btn btn-outline-primary btn-sm">Perfil</button>
                    </Link>
                </div><hr />
                <AlertDanger erros={erro} />
                <AlertSuccess erros={success} />
                <Form>
                    <FormGroup>
                        <Label for="name">Nome</Label>
                        <Input type="text"
                            value={name}
                            name="name"
                            id="name"
                            className="form-control"
                            placeholder="Nome completo do usuário"
                            autoComplete="name"
                            onChange={(ev) => this.onChangeInput("name", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="email">E-mail</Label>
                        <Input type="email"
                            value={email}
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="Melhor e-mail do usuário"
                            autoComplete="email"
                            onChange={(ev) => this.onChangeInput("email", ev)}
                        />
                    </FormGroup>

                    <Link onClick={() => this.updateUser()} to="#">
                        <SpinnerUp loading={loading} />
                    </Link>

                </Form>
            </>
        )
    }
}

const mapStateToProps = state => ({
    usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(UpdatePerfil);