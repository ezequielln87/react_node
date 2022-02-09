import * as Yup from 'yup';
import Home from '../models/Home';

class AdmHomeServController {

    async show(req, res) {
        Home.findOne({}, "_id servTitulo servSubtitulo servUmIcone servUmTitulo servUmDesc servDoisIcone servDoisTitulo servDoisDesc servTresIcone servTresTitulo servTresDesc").then((home) => {
            return res.json({
                error: false,
                home: home
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
    };

    async update(req, res) {

        const schema = Yup.object().shape({
            servTitulo: Yup.string()
                .required(),
            servSubtitulo: Yup.string()
                .required(),
            servUmIcone: Yup.string()
                .required(),
            servUmTitulo: Yup.string()
                .required(),
            servUmDesc: Yup.string()
                .required(),
            servDoisIcone: Yup.string()
                .required(),
            servDoisTitulo: Yup.string()
                .required(),
            servDoisDesc: Yup.string()
                .required(),
            servTresIcone: Yup.string()
                .required(),
            servTresTitulo: Yup.string()
                .required(),
            servTresDesc: Yup.string()
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

        const homeExiste = await Home.findOne({ _id: _id });

        if (!homeExiste) {
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: Conteúdo da página home não encontrado!"
            });
        };

        await Home.updateOne({ _id: _id }, req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Conteúdo da página home não editada com sucesso!"
            });

            return res.json({
                error: false,
                message: "Conteúdo da página home editado com sucesso!"
            });
        });
    };
};

export default new AdmHomeServController();