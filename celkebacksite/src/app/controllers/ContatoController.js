import Contato from '../models/Contato';
import Rodape from '../models/Rodape';
import Seo from '../models/Seo';

class ContatoController {

    async show(req, res) {
        Contato.findOne({}).then((contato) => {
            Rodape.findOne({}).then((rodape) => {
                Seo.findOne({seoPg: "contato"}).then((seo) => {
                    return res.json({
                        error: false,
                        contato: contato,
                        rodape: rodape,
                        seo: seo
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

export default new ContatoController();