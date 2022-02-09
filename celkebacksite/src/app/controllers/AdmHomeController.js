import config from '../../config/config';
import Home from '../models/Home';

class AdmHomeController {

    async show(req, res) {

        const url = config.url + "/files/home/";
        Home.findOne({}).then((home) => {
            const { _id, topTitulo, topSubtitulo, topTextBtn, topLinkBtn, topOriginalName, topFileName, servTitulo, servSubtitulo, servUmIcone, servUmTitulo, servUmDesc, servDoisIcone, servDoisTitulo, servDoisDesc, servTresIcone, servTresTitulo, servTresDesc, acaoTitulo, acaoSubtitulo, acaoDesc, acaoTextBtn, acaoLinkBtn,acaoOriginalName, acaoFileName, detServTitulo, detSubtitulo, detDesc, detOriginalName, detFileName, createdAt, updatedAt } = home;
            return res.json({
                error: false,
                home: {_id, topTitulo, topSubtitulo, topTextBtn, topLinkBtn, topOriginalName, topFileName, servTitulo, servSubtitulo, servUmIcone, servUmTitulo, servUmDesc, servDoisIcone, servDoisTitulo, servDoisDesc, servTresIcone, servTresTitulo, servTresDesc, acaoTitulo, acaoSubtitulo, acaoDesc, acaoTextBtn, acaoLinkBtn,acaoOriginalName, acaoFileName, detServTitulo, detSubtitulo, detDesc, detOriginalName, detFileName, createdAt, updatedAt, url}
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
    };

    async store(req, res) {

        const homeExiste = await Home.findOne({});
        if (homeExiste) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Erro: A página home já possui um registro!"
            })
        }

        const dados = {
            "topTitulo": "Temos a solução que a sua empresa precisa!",
            "topSubtitulo": "This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.",
            "topTextBtn": "ENTRE EM CONTATO",
            "topLinkBtn": "http://localhost:3000/",
            "topOriginalName": "topo_home.jpg",
            "topFileName": "topo_home.jpg",

            "servTitulo": "Serviços",
            "servSubtitulo": "This is a simple hero unit.",
            "servUmIcone": "biking",
            "servUmTitulo": "Heading",
            "servUmDesc": "Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.",
            "servDoisIcone": "running",
            "servDoisTitulo": "Heading",
            "servDoisDesc": "Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.",
            "servTresIcone": "swimmer",
            "servTresTitulo": "Heading",
            "servTresDesc": "Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",

            "acaoTitulo": "ENCONTRE OS MELHORES SERVIÇOS",
            "acaoSubtitulo": "A solução sob medida para sua empresa!",
            "acaoDesc": "This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.",
            "acaoTextBtn": "ENTRE EM CONTATO",
            "acaoLinkBtn": "http://localhost:3000/",
            "acaoOriginalName": "topo_home.jpg",
            "acaoFileName": "topo_home.jpg",

            "detServTitulo": "Serviço mais completo",
            "detSubtitulo": "Oh yeah, it’s that good.",
            "detDesc": "Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.",
            "detOriginalName": "descr-serv.jpg",
            "detFileName": "descr-serv.jpg"
        }

        await Home.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 102,
                message: "Erro: Dados da página Home não cadastrado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Dados da página Home cadastrado com sucesso!"
            });
        });
    };
};

export default new AdmHomeController();