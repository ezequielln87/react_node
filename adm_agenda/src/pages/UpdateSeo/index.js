import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/seo';

import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import SpinnerUp from '../../components/SpinnerUp';
import SpinnerDeleteSimples from '../../components/SpinnerDeleteSimples';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';

class UpdateSeo extends Component {

    state = {
        _id: "",
        seoPg: "",
        seoTitle: "",
        seoDesc: "",
        seoAutor: "",
        erro: "",
        success: "",
        loading: false,
        formSuccess: false,
        deleteSuccess: false,
        dadosApi: false,
        openModal: false
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getViewSeo(id);
    }

    async componentDidUpdate(nextProps) {
        const { id } = this.props.match.params;
        if (!this.props.seo && nextProps.seo) this.props.getViewSeo(id);
        await this.receberDadosApi();
    }

    componentWillUnmount() {
        this.props.limparSeo();
    }

    receberDadosApi() {
        const { id } = this.props.match.params;
        if (typeof this.props.seoDetails !== "undefined" && this.props.seoDetails !== null && this.props.seoDetails._id === id && !this.state.dadosApi) {
            this.setState({ _id: this.props.seoDetails._id });
            this.setState({ seoPg: this.props.seoDetails.seoPg });
            this.setState({ seoTitle: this.props.seoDetails.seoTitle });
            this.setState({ seoDesc: this.props.seoDetails.seoDesc });
            this.setState({ seoAutor: this.props.seoDetails.seoAutor });
            this.setState({ dadosApi: true });
        }
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    async updateSeo() {
        this.setState({ erro: "" });
        this.setState({ success: "" });

        await this.receberDadosForm();

        if (!this.validade()) return;

        this.setState({ loading: true });

        const { _id, seoPg, seoTitle, seoDesc, seoAutor } = this.state;

        this.props.putSeo({ _id, seoPg, seoTitle, seoDesc, seoAutor }, (msg) => {
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
        this.setState({ seoPg: document.querySelector("#seoPg").value });
        this.setState({ seoTitle: document.querySelector("#seoTitle").value });
        this.setState({ seoDesc: document.querySelector("#seoDesc").value });
        this.setState({ seoAutor: document.querySelector("#seoAutor").value });
    }

    validade() {
        const { seoPg, seoTitle, seoDesc, seoAutor } = this.state;
        if (!seoPg) return this.setState({ erro: { message: "Preencha o campo página!" } });
        if (!seoTitle) return this.setState({ erro: { message: "Preencha o campo título!" } });
        if (!seoDesc) return this.setState({ erro: { message: "Preencha o campo descrição!" } });
        if (!seoAutor) return this.setState({ erro: { message: "Preencha o campo autor!" } });
        return true;
    }

    apagarSeo() {
        this.setState({ loading: true });
        const { _id } = this.state;
        this.props.deleteSeo(_id, (msg) => {
            if (msg.erro.error) {
                this.setState({ erro: { message: msg.erro.message } });
                this.setState({ loading: false });
            } else {
                this.setState({ success: { message: msg.erro.message } });
                this.setState({ loading: false });
                this.setState({ deleteSuccess: true });
            }
        })
    }

    openModal() {
        this.setState({ openModal: true });
    }

    closeModal() {
        this.setState({ openModal: false });
    }

    render() {
        const { _id, seoPg, seoTitle, seoDesc, seoAutor, loading, dadosApi, erro, success, formSuccess, deleteSuccess, openModal } = this.state;

        if (formSuccess) {
            return <Redirect to={{
                //pathname: '/user',
                pathname: '/view-seo/' + _id,
                state: { msg: 'Seo da página editado com sucesso!' }
            }} />
        }
        if (deleteSuccess) {
            return <Redirect to={{
                pathname: '/seo',
                state: { msg: 'Seo da página apagado com sucesso!' }
            }} />
        }

        return (
            <>
                <Modal isOpen={openModal}>
                    <ModalHeader className="bg-danger text-white">Confirmar</ModalHeader>
                    <ModalBody>
                        Você realmente deseja apagar esse seo da página?
                 </ModalBody>
                    <ModalFooter>
                        <Button outline color="primary" size="sm" onClick={() => this.closeModal()}>Cancelar</Button>
                        <span onClick={() => this.apagarSeo()}>
                            <SpinnerDeleteSimples loading={loading} />
                        </span>
                    </ModalFooter>
                </Modal>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Editar Seo da Página</h2>
                    </div>

                    <span className="d-none d-md-block">
                        <Link to={"/seo"}>
                            <button className="btn btn-outline-info btn-sm">
                                Listar
                        </button>
                        </Link>

                        <Link to={"/view-seo/" + this.props.match.params.id}>
                            <button className="ml-1 mr-1 btn btn-outline-primary btn-sm">
                                Visualisar
                        </button>
                        </Link>

                        <span onClick={() => this.openModal()}>
                            <SpinnerDeleteSimples loading={loading} />
                        </span>
                    </span>
                    <div className="dropdown d-block d-md-none">
                        <UncontrolledButtonDropdown>
                            <DropdownToggle outline color="primary" size="sm" caret>
                                Ações
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link className="dropdown-item" to={"/seo"}>Listar</Link>
                                <Link className="dropdown-item" to={"/view-seo/" + this.props.match.params.id}>Visualisar</Link>
                                <DropdownItem onClick={() => this.openModal()}>Apagar</DropdownItem>
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
                        <Label for="seoPg">Página</Label>
                        <Input type="text"
                            value={seoPg}
                            name="seoPg"
                            id="seoPg"
                            className="form-control"
                            placeholder={dadosApi ? "Nome da página na URL" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="seoPg"
                            onChange={(ev) => this.onChangeInput("seoPg", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="seoTitle">Título</Label>
                        <Input type="text"
                            value={seoTitle}
                            name="seoTitle"
                            id="seoTitle"
                            className="form-control"
                            placeholder={dadosApi ? "Título da página" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="seoTitle"
                            onChange={(ev) => this.onChangeInput("seoTitle", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="seoDesc">Descrição</Label>
                        <Input type="textarea"
                            value={seoDesc}
                            name="seoDesc"
                            id="seoDesc"
                            className="form-control"
                            placeholder={dadosApi ? "Descrição da página, no máximo 180 caracteres" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="seoDesc"
                            onChange={(ev) => this.onChangeInput("seoDesc", ev)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="seoAutor">Autor</Label>
                        <Input type="text"
                            value={seoAutor}
                            name="seoAutor"
                            id="seoAutor"
                            className="form-control"
                            placeholder={dadosApi ? "Autor da página" : "Carregado..."}
                            disabled={dadosApi ? false : true}
                            autoComplete="seoAutor"
                            onChange={(ev) => this.onChangeInput("seoAutor", ev)}
                        />
                    </FormGroup>

                    <Link onClick={() => this.updateSeo()} to="#">
                        <SpinnerUp loading={loading} />
                    </Link>

                </Form>
            </>
        )
    }
}

const mapStateToProps = state => ({
    seoDetails: state.seo.seoDetails
})

export default connect(mapStateToProps, actions)(UpdateSeo);