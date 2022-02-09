import React from 'react';

import { Container, Jumbotron } from 'reactstrap';
import Link from 'next/link';

const Rodape = (props) => {
    return (
        <div>            
            <Jumbotron fluid className="rodape">
                <style>{`
                .rodape{
                    padding-top: 30px;
                    padding-bottom: 30px;
                    background-color: #000;
                    margin-bottom: 0rem !important;
                    color: #fff;
                }
                .rodape ul li a.link-rodape{
                    color: #fff !important;
                }.rodape ul li a.link-rodape:hover{
                    color: #adaeaf !important;
                    text-decoration: none;
                }
                `}</style>
                <Container>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-4">
                            <h5>{props.data.tituloPg}</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <Link href="/">
                                        <a className="link-rodape">Home</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/sobre">
                                        <a className="link-rodape">Sobre Empresa</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contato">
                                        <a className="link-rodape">Contato</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-sm-12 col-md-4">
                            <h5>{props.data.tituloCont}</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="tel:XXXXXXXXXXX" className="link-rodape">
                                        {props.data.telCont}
                                    </a>
                                </li>
                                <li>
                                    <Link href="/contato">
                                        <a className="link-rodape">{props.data.endCont}</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contato">
                                        <a className="link-rodape">{props.data.cnpjCont}</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-sm-12 col-md-4">
                            <h5>{props.data.tituloRedSoc}</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a href={props.data.instLink} className="link-rodape" target="_blank">
                                        {props.data.instTitulo}
                                    </a>
                                </li>
                                <li>
                                    <a href={props.data.facLink} className="link-rodape" target="_blank">
                                        {props.data.facTitulo}
                                    </a>
                                </li>
                                <li>
                                    <a href={props.data.youtubeLink} className="link-rodape" target="_blank">
                                        {props.data.youtubeTitulo}
                                    </a>
                                </li>
                                <li>
                                    <a href={props.data.twiterLink} className="link-rodape" target="_blank">
                                        {props.data.twiterTitulo}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </Jumbotron>
        </div>
    )
}

export default Rodape;