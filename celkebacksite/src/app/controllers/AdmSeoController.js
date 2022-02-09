import * as Yup from 'yup';
import Seo from '../models/Seo';

class AdmSeoController {

    async index(req, res) {

        const { page = 1 } = req.query;
        const { limit = 40 } = req.query;
        await Seo.paginate({}, { select: '_id seoPg', page, limit, sort: '-createdAt' }).then((seo) => {
            return res.json({
                error: false,
                seo: seo
            });
        }).catch((erro) => {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
    };

    async show(req, res) {
        Seo.findOne({ _id: req.params.id }).then((seo) => {
            return res.json({
                error: false,
                seo: seo
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 107,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        });
    };

    async store(req, res) {
        const schema = Yup.object().shape({
            seoPg: Yup.string()
                .required(),
            seoTitle: Yup.string()
                .required(),
            seoDesc: Yup.string()
                .required(),
            seoAutor: Yup.string()
                .required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            });
        };

        await Seo.create(req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Seo não cadastrado com sucesso!"
            });

            return res.status(200).json({
                error: false,
                message: "Seo cadastrado com sucesso!"
            })
        });


    };

    async update(req, res) {

        const schema = Yup.object().shape({
            seoPg: Yup.string()
                .required(),
            seoTitle: Yup.string()
                .required(),
            seoDesc: Yup.string()
                .required(),
            seoAutor: Yup.string()
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

        const seoExiste = await Seo.findOne({ _id: _id });

        if (!seoExiste) {
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: Seo não encontrado!"
            });
        };

        await Seo.updateOne({ _id: _id }, req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Seo não editado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Seo editado com sucesso!"
            });
        });
    };

    async delete(req, res) {

        const seoExiste = await Seo.findOne({ _id: req.params.id });

        if (!seoExiste) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Erro: Seo não encontrado"
            });
        };

        await Seo.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Seo não apagado com sucesso!"
            });
        });

        return res.json({
            error: false,
            message: "Seo apagado com sucesso!"
        });
    };
};

export default new AdmSeoController();