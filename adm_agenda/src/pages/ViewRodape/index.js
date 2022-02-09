import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/rodape';

import { UncontrolledButtonDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

import DetailsRodape from './DetailsRodape';
import AlertSuccess from '../../components/AlertSuccess';
import AlertDanger from '../../components/AlertDanger';

class ViewRodape extends Component {

    state = {
        msg: "",
        erro: "",
        success: ""
    }

    componentDidMount() {
        this.getRodape();
    }

    componentDidUpdate(nextProps) {
        if (!this.props.rodape && nextProps.rodape) this.getRodape();
    }

    componentWillUnmount() {
        this.props.limparRodape();
    }

    getRodape() {
        this.props.getViewRodape();
        if (this.props.location.state) {
            this.setState({ msg: this.props.location.state.msg });
        }
    }

    cadRodape() {
        this.setState({erro: ""});
        this.setState({success: ""});
        this.props.postRodape((msg) => {
            if (msg.erro.error) {
                this.setState({ erro: { message: msg.erro.message } });
            } else {
                this.setState({ success: { message: msg.erro.message } });
                this.props.getViewRodape();
            }
        });
    }

    render() {
        const { msg, erro, success } = this.state;

        return (
            <>

                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Detalhes do Rodapé</h2>
                    </div>

                    <span className="d-none d-md-block">

                        <Link to={"/update-rodape"}>
                            <button className="ml-1 mr-1 btn btn-outline-warning btn-sm">
                                Editar
                            </button>
                        </Link>


                        <button className="ml-1 mr-1 btn btn-outline-success btn-sm" onClick={() => this.cadRodape()}>
                            Cadastrar
                        </button>

                    </span>
                    <div className="dropdown d-block d-md-none">
                        <UncontrolledButtonDropdown>
                            <DropdownToggle outline color="primary" size="sm" caret>
                                Ações
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link className="dropdown-item" to={"/update-contato"}>Editar</Link>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>
                </div><hr />
                {msg ? <AlertSuccess erros={{ message: msg }} /> : ""}
                <AlertDanger erros={erro} />
                <AlertSuccess erros={success} />
                <DetailsRodape />
            </>
        )
    }
}
const mapStateToProps = state => ({
    rodapeDetails: state.rodape.rodapeDetails
})

export default connect(mapStateToProps, actions)(ViewRodape);