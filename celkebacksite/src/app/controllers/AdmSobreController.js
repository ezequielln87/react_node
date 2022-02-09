import * as Yup from 'yup';
import fs from 'fs';
import Sobre from '../models/Sobre';
import config from '../../config/config';

class AdmSobreController {

    async index(req, res) {

        /*await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }*/

        const { page = 1 } = req.query;
        const { limit = 40 } = req.query;
        await Sobre.paginate({}, { select: '_id titulo', page, limit, sort: '-createdAt' }).then((sobre) => {
            return res.json({
                error: false,
                sobre: sobre
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

        /*await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }*/
        const url = config.url + "/files/sobre/";
        Sobre.findOne({ _id: req.params.id }).then((sobre) => {
            const { _id, titulo, descricao, fileName, createdAt, updatedAt } = sobre;
            return res.json({
                error: false,
                sobre: { _id, titulo, descricao, fileName, createdAt, updatedAt, url }
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
            titulo: Yup.string()
                .required(),
            descricao: Yup.string()
                .required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            });
        };

        if (!req.file) {
            return res.status(400).json({
                error: true,
                code: 129,
                message: "Error: Selecione uma imagem válida JPEG ou PNG!"
            });
        };

        const dados = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            originalName: req.file.originalname,
            fileName: req.file.filename
        }

        await Sobre.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Sobre não cadastrado com sucesso!"
            });

            return res.status(200).json({
                error: false,
                message: "Sobre cadastrado com sucesso!"
            })
        });


    };

    async update(req, res) {
        /*await sleep(5000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }*/

        const schema = Yup.object().shape({
            titulo: Yup.string()
                .required(),
            descricao: Yup.string()
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

        const sobreExiste = await Sobre.findOne({ _id: _id });

        if (!sobreExiste) {
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: Sobre não encontrado!"
            });
        };

        await Sobre.updateOne({ _id: _id }, req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Sobre não editado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Sobre editado com sucesso!"
            });
        });
    };

    async delete(req, res) {

        /*await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }  */

        const sobreExiste = await Sobre.findOne({ _id: req.params.id });

        if (!sobreExiste) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Erro: Sobre não encontrado"
            });
        };

        await Sobre.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Sobre não apagado com sucesso!"
            });
        });

        const imgAntiga = "tmp/uploads/sobre/" + sobreExiste.fileName;

        fs.access(imgAntiga, (err) => {
            if (!err) {
                fs.unlink(imgAntiga, err => {
                    //Msg de imagem excluida sucesso
                })
            }
        })

        return res.json({
            error: false,
            message: "Sobre apagado com sucesso!"
        });
    };
};

export default new AdmSobreController();