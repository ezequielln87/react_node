import * as Yup from 'yup';
import Contato from '../models/Contato';

class AdmContatoController {

    async show(req, res) {
        Contato.findOne({}).then((contato) => {
            return res.json({
                error: false,
                contato: contato
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

        const contatoExiste = await Contato.findOne({});
        if (contatoExiste) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Erro: A página contato já possui um registro!"
            })
        }

        const dados = {
            "tituloHorarioCont": "Entre em contato - ...",
            "horarioCont": "Segunda a Sexta: 08:30 às 12:00 e 13:30 às 18:00",
            "tituloEnd": "Endereço.",
            "logradouroEnd": "Avenida Winston Churchill, 936",
            "bairroEnd": "Capão Raso - Curitiba",
            "telCont": "(xx) xxxx-xxxx",
            "whatsappCont": "(xx) xxxx-xxxx"
        }

        await Contato.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 102,
                message: "Erro: Dados da página contato não cadastrado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Dados da página contato cadastrado com sucesso!"
            });
        });
    };

    async update(req, res) {
        /*await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }*/

        const schema = Yup.object().shape({
            tituloHorarioCont: Yup.string()
                .required(),
            horarioCont: Yup.string()
                .required(),
            tituloEnd: Yup.string()
                .required(),
            logradouroEnd: Yup.string()
                .required(),
            bairroEnd: Yup.string()
                .required(),
            telCont: Yup.string()
                .required(),
            whatsappCont: Yup.string()
                .required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Erro: Dados do formulário inválido!"
            });
        };

        const { _id } = req.body;

        const contatoExiste = await Contato.findOne({ _id: _id });

        if (!contatoExiste) {
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: Conteúdo da página contato não encontrado!"
            });
        };

        await Contato.updateOne({ _id: _id }, req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Conteúdo da página contato não editada com sucesso!"
            });

            return res.json({
                error: false,
                message: "Conteúdo da página de contato editado com sucesso!"
            });
        });
    };
};

export default new AdmContatoController();