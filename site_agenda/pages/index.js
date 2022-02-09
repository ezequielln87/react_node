import Head from 'next/head';
import Link from 'next/link';

import Menu from '../components/Menu';
import Rodape from '../components/Rodape';

import { Jumbotron, Container } from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

function Home({ data }) {
    return (
        <div>
            <Head>
                <title>{data.seo.seoTitle}</title>
                <meta name='robots' content='index, follow' />
                <meta name="description" content={data.seo.seoDesc} />
                <meta name="author" content={data.seo.seoAutor} />
            </Head>
            <Menu />

            <Jumbotron fluid className="descr-top">
                <style>{`.descr-top{
                    background-image: url(` + data.url + data.home.topFileName + `);
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                    padding-top: 150px;
                    padding-bottom: 150px;
                    color: #FFF;
                    text-align: center;
                    margin-bottom: 0rem !important;
                }`}</style>
                <Container>
                    <h1 className="display-4">{data.home.topTitulo}</h1>
                    <p className="lead mb-4">{data.home.topSubtitulo}</p>
                        <a href={data.home.topLinkBtn} className="btn btn-outline-warning btn-lg">
                            {data.home.topTextBtn}
                        </a>
                </Container>
            </Jumbotron>

            <Jumbotron fluid className="servicos">
                <style>{`.servicos{
                padding-top: 80px;
                padding-bottom: 80px;
                background-color: #fff;
                margin-bottom: 0rem !important;
            }
            .circulo{
                width: 140px;
                height: 140px;
                background-color: #fed136;
                font-size: 52px;
                padding-top: 24px;
            }
            .centralizar{
                margin: 0 auto !important;
                float: none !important;
            }`}</style>
                <Container className="text-center">
                    <div>
                        <h2 className="display-4">{data.home.servTitulo}</h2>
                        <p className="lead pb-4">{data.home.servSubtitulo}</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="rounded-circle circulo centralizar">
                                <FontAwesomeIcon icon={data.home.servUmIcone} />
                            </div>
                            <h2 className="mt-4 mb-4">{data.home.servUmTitulo}</h2>
                            <p>{data.home.servUmDesc}</p>
                        </div>
                        <div className="col-lg-4">
                            <div className="rounded-circle circulo centralizar">
                                <FontAwesomeIcon icon={data.home.servDoisIcone} />
                            </div>
                            <h2 className="mt-4 mb-4">{data.home.servDoisTitulo}</h2>
                            <p>{data.home.servDoisDesc}</p>
                        </div>
                        <div className="col-lg-4">
                            <div className="rounded-circle circulo centralizar">
                                <FontAwesomeIcon icon={data.home.servTresIcone} />
                            </div>
                            <h2 className="mt-4 mb-4">{data.home.servTresTitulo}</h2>
                            <p>{data.home.servTresDesc}</p>
                        </div>
                    </div>

                </Container>
            </Jumbotron>

            <Jumbotron fluid className="descr-chamada">
                <style>{`.descr-chamada{
                    background-image: url(` + data.url + data.home.acaoFileName + `);
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                    padding-top: 150px;
                    padding-bottom: 150px;
                    color: #fff;
                    text-align:center;
                    margin-bottom: 0rem !important;
                }`}</style>
                <Container>
                    <h4 className="lead mb-4">{data.home.acaoTitulo}</h4>
                    <h2 className="display-4 mb-4">{data.home.acaoSubtitulo}</h2>
                    <p className="lead mb-4">{data.home.acaoDesc}</p>
                        <a href={data.home.acaoLinkBtn} className="btn btn-outline-warning">
                            {data.home.acaoTextBtn}
                        </a>
                </Container>
            </Jumbotron>

            <Jumbotron fluid className="serv-desc">
                <style>{`.serv-desc{
                padding-top: 80px;
                padding-bottom: 80px;
                background-color: #fff;
                margin-bottom: 0rem !important;
            }.titulo{
                padding-bottom: 60px;
            }`}</style>
                <Container>
                    <div>
                        <h2 className="display-4 text-center titulo">{data.home.detServTitulo}</h2>
                    </div>
                    <div className="row featurette">
                        <div className="col-md-7 order-md-2">
                            <h2 className="featurette-heading">{data.home.detSubtitulo} </h2>
                            <p className="lead">{data.home.detDesc}</p>
                        </div>
                        <div className="col-md-5 order-md-1">
                            <img src={data.url + data.home.detFileName} className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" />
                        </div>
                    </div>
                </Container>
            </Jumbotron>
            
            <Rodape data={data.rodape} />

        </div>
    );
};

export async function getServerSideProps() {
    const response = await fetch(`http://localhost:8080/home`);
    const data = await response.json();
    //console.log(data);

    return { props: { data } };
}

export default Home;