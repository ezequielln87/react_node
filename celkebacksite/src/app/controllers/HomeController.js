import Home from '../models/Home';
import Rodape from '../models/Rodape';
import Seo from '../models/Seo';
import config from '../../config/config';

class HomeController {

    async show(req, res) {
        const url = config.url + "/files/home/";
        Home.findOne({}).then((home) => {
            Rodape.findOne({}).then((rodape) => {
                Seo.findOne({seoPg: "index"}).then((seo) => {
                    return res.json({
                        error: false,
                        home: home,
                        rodape: rodape,
                        seo: seo,
                        url
                    });
                }).catch((err) => {
                    return res.status(400).json({
                        error: true,
                        code: 106,
                        message: "Erro: Não foi possível executar a solicitação!"
                    });
                });
            }).catch((err) => {
                return res.status(400).json({
                    error: true,
                    code: 106,
                    message: "Erro: Não foi possível executar a solicitação!"
                });
            });

        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 101,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
    };    
};

export default new HomeController();