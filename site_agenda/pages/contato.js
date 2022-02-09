import React, { useState } from 'react';
import Head from 'next/head';

import Menu from '../components/Menu';
import Rodape from '../components/Rodape';

import { Jumbotron, Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Contato = ({ data }) => {

    const [contato, setContato] = useState({
        nome: '',
        email: '',
        assuntoMsg: '',
        conteudoMsg: ''
    });

    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    })

    const onChangeInput = e => setContato({ ...contato, [e.target.name]: e.target.value });

    const enviarMsg = async e => {
        e.preventDefault();
        //console.log(contato);
        if(!validate()) return;

        setResponse({formSave: true});
        try {
            const res = await fetch('http://localhost:8080/msg-contato', {
                method: 'POST',
                body: JSON.stringify(contato),
                headers: { 'Content-Type': 'application/json' }
            });

            const responseEnv = await res.json();
            console.log(responseEnv);
            if(responseEnv.error){
                setResponse({
                    formSave: false,
                    type: 'error',
                    message: responseEnv.message
                });
            }else {
                setResponse({
                    formSave: false,
                    type: 'success',
                    message: responseEnv.message
                });
            }
        } catch (err) {
            setResponse({
                formSave: false,
                type: 'error',
                message: 'Erro: Mensagem não enviada com sucesso, tente mais tarde!'
            });
        };
    };

    const validate = () => {
        if(!contato.nome) return setResponse({type: 'error', message: 'Preencha o campo nome!'});
        if(!contato.email) return setResponse({type: 'error', message: 'Preencha o campo e-mail!'});
        if(!contato.assuntoMsg) return setResponse({type: 'error', message: 'Preencha o campo assunto da mensagem!'});
        if(!contato.conteudoMsg) return setResponse({type: 'error', message: 'Preencha o campo conteúdo da mensagem!'});

        return true;
    }

    return (
        <div>
            <Head>
                <title>{data.seo.seoTitle}</title>
                <meta name='robots' content='index, follow' />
                <meta name="description" content={data.seo.seoDesc} />
                <meta name="author" content={data.seo.seoAutor} /> 
            </Head>
            <Menu />

            <Jumbotron fluid className="contato">
                <style>{`.contato{
                    padding-top: 100px;
                    padding-bottom: 80px;
                    background-color: #000;
                    color: #fff;
                    margin-bottom: 0rem !important;
                }`}</style>
                <Container>
                    <h1 className="display-4 text-center">Contato</h1>
                </Container>
            </Jumbotron>

            <Jumbotron fluid className="form-contato">
                <style>{`.form-contato{
                padding-top: 80px;
                padding-bottom: 80px;
                background-color: #fff;
                margin-bottom: 0rem !important;
            }`}</style>
                <Container>
                    <div className="row featurette">
                        <div className="col-md-6">
                            {response.type === 'error' ? <div className='alert alert-danger'>{response.message}</div> : ""}
                            {response.type === 'success' ? <div className='alert alert-success'>{response.message}</div> : ""}
                            <Form onSubmit={enviarMsg}>
                                <FormGroup>
                                    <Label for="nome"><span className="text-danger">*</span> Nome:</Label>
                                    <Input type="text" name="nome" id="nome" placeholder="Nome completo" onChange={onChangeInput} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="email"><span className="text-danger">*</span> E-mail:</Label>
                                    <Input type="email" name="email" id="email" placeholder="Seu melhor e-mail" onChange={onChangeInput} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="assuntoMsg"><span className="text-danger">*</span> Assunto da Mensagem:</Label>
                                    <Input type="text" name="assuntoMsg" id="assuntoMsg" placeholder="Assunto da Mensagem" onChange={onChangeInput} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="conteudoMsg"><span className="text-danger">*</span> Conteúdo da Mensagem:</Label>
                                    <Input type="textarea" name="conteudoMsg" id="conteudoMsg" placeholder="Conteúdo da Mensagem" onChange={onChangeInput} />
                                </FormGroup>
                                <p><span className="text-danger">*</span> Deve preencher o campo</p>

                                {response.formSave ? <Button type="submit" outline color="warning" disabled>Enviando...</Button> : <Button type="submit" outline color="warning">Enviar</Button>}
                                
                            </Form>
                        </div>
                        <div className="col-md-6">
                            <h3 className="featurette-heading">{data.contato.tituloHorarioCont}</h3>
                            <p className="lead">{data.contato.horarioCont}</p>
                            <hr />
                            <address>
                                <strong>{data.contato.tituloEnd}</strong><br />
                                {data.contato.logradouroEnd}<br />
                                {data.contato.bairroEnd}<br />
                                {data.contato.telCont}<br />
                                {data.contato.whatsappCont}<br />
                            </address>
                        </div>
                    </div>
                </Container>
            </Jumbotron>

            <Rodape data={data.rodape} />

        </div>
    );
};

export async function getServerSideProps() {
    const response = await fetch(`http://localhost:8080/contato`);
    const data = await response.json();

    return { props: { data } };
}

export default Contato;