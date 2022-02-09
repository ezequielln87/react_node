import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/home';

import { UncontrolledButtonDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';

import DetailsHome from './DetailsHome';
import AlertSuccess from '../../components/AlertSuccess';
import AlertDanger from '../../components/AlertDanger';

class ViewHome extends Component {

    state = {
        msg: "",
        erro: "",
        success: ""
    }

    componentDidMount() {
        this.getHome();
    }

    componentDidUpdate(nextProps) {
        if (!this.props.home && nextProps.home) this.getHome();
    }

    componentWillUnmount() {
        this.props.limparHome();
    }

    getHome() {
        this.props.getViewHome();
        if (this.props.location.state) {
            this.setState({ msg: this.props.location.state.msg });
        }
    }

    cadHome() {
        this.setState({ erro: "" });
        this.setState({ success: "" });
        this.props.postHome((msg) => {
            if (msg.erro.error) {
                this.setState({ erro: { message: msg.erro.message } });
            } else {
                this.setState({ success: { message: msg.erro.message } });
                this.props.getViewHome();
            }
        });
    }

    render() {
        const { msg, erro, success } = this.state;

        return (
            <>

                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Conteúdo da Página Home</h2>
                    </div>

                    <span className="d-none d-md-block">
                        <button className="ml-1 mr-1 btn btn-outline-success btn-sm" onClick={() => this.cadHome()}>
                            Cadastrar
                        </button>
                    </span>
                    <div className="dropdown d-block d-md-none">
                        <UncontrolledButtonDropdown>
                            <DropdownToggle outline color="primary" size="sm" caret>
                                Ações
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={() => this.cadHome()}>Cadastrar</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>
                </div><hr />
                {msg ? <AlertSuccess erros={{ message: msg }} /> : ""}
                <AlertDanger erros={erro} />
                <AlertSuccess erros={success} />
                <DetailsHome />
            </>
        )
    }
}
const mapStateToProps = state => ({
    homeDetails: state.home.homeDetails
})

export default connect(mapStateToProps, actions)(ViewHome);