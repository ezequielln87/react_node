import React from 'react';
import Head from 'next/head';

import Menu from '../components/Menu';
import Rodape from '../components/Rodape';

import { Jumbotron, Container } from 'reactstrap';

function Sobre({ data }) {
    return (
        <div>
            <Head>
                <title>{data.seo.seoTitle}</title>
                <meta name='robots' content='index, follow' />
                <meta name="description" content={data.seo.seoDesc} />
                <meta name="author" content={data.seo.seoAutor} />                
            </Head>
            <Menu />
            <Jumbotron fluid className="head-sobre">
                <style>{`.head-sobre{
                    padding-top: 100px;
                    padding-bottom: 80px;
                    background-color: #000;
                    color: #fff;
                    margin-bottom: 0rem !important;
                }`}</style>
                <Container>
                    <h1 className="text-center">Sobre a Empresa</h1>
                </Container>
            </Jumbotron>

            <Jumbotron fluid className="sobre">
                <style>{`.sobre{
                    padding-top: 80px;
                    padding-bottom: 80px;
                    background-color: #fff;
                    margin-bottom: 0rem !important;
                }.featurette-divider {
                    margin: 5rem 0; 
                  }`}</style>
                <Container>
                    {data.sobre.map(sobre => (
                        <div key={sobre._id}>
                            <div className="row featurette">
                                <div className="col-md-7 order-md-2">
                                    <h2 className="featurette-heading">{sobre.titulo}</h2>
                                    <p className="lead">{sobre.descricao}</p>
                                </div>
                                <div className="col-md-5 order-md-1">
                                    <img src={data.url + sobre.fileName} className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" alt={sobre.titulo} />
                                </div>
                            </div>

                            <hr className="featurette-divider" />
                        </div>
                    ))}

                </Container>
            </Jumbotron>

            <Rodape data={data.rodape} />
        </div>
    );
};

export async function getServerSideProps() {
    const response = await fetch(`http://localhost:8080/sobre`);
    const data = await response.json();
    //console.log(data);

    return { props: { data } };
}

export default Sobre;