import Sobre from '../models/Sobre';
import Rodape from '../models/Rodape';
import Seo from '../models/Seo';
import config from '../../config/config';

class SobreController {

    async index(req, res) {
        const url = config.url + "/files/sobre/";
        Sobre.find({}).then((sobre) => {
            Rodape.findOne({}).then((rodape) => {
                Seo.findOne({ seoPg: "sobre" }).then((seo) => {
                    return res.json({
                        error: false,
                        sobre: sobre,
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

export default new SobreController();