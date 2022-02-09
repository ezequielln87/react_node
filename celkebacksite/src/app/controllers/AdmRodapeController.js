import * as Yup from 'yup';
import Rodape from '../models/Rodape';

class AdmRodapeController {

    async show(req, res) {
        Rodape.findOne({}).then((rodape) => {
            return res.json({
                error: false,
                rodape: rodape
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

        const rodapeExiste = await Rodape.findOne({});
        if (rodapeExiste) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Erro: O radapé já possui um registro!"
            })
        }

        const dados = {
            tituloPg: "Celke",
            tituloCont: "Contato",
            telCont: "(XX) XXXXX-XXXX",
            endCont: "Av. Winston Churchill",
            cnpjCont: "CNPJ: XX.XXX.XXX/XXXX-XX",
            tituloRedSoc: "Redes Sociais",
            instTitulo: "Instagram",
            instLink: "https://www.instagram.com/celkecursos",
            facTitulo: "Facebook",
            facLink: "https://www.facebook.com/celkecursos/",
            youtubeTitulo: "Youtube",
            youtubeLink: "https://www.youtube.com/channel/UC5ClMRHFl8o_MAaO4w7ZYug",
            twiterTitulo: "Twiter",
            twiterLink: "https://twitter.com/celkecursos"
        }

        await Rodape.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 102,
                message: "Erro: Dados do rodapé não cadastrado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Dados do rodapé cadastrado com sucesso!"
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
            tituloPg: Yup.string()
                .required(),
            tituloCont: Yup.string()
                .required(),
            telCont: Yup.string()
                .required(),
            endCont: Yup.string()
                .required(),
            cnpjCont: Yup.string()
                .required(),
            tituloRedSoc: Yup.string()
                .required(),
            instTitulo: Yup.string()
                .required(),
            instLink: Yup.string()
                .required(),
            facTitulo: Yup.string()
                .required(),
            facLink: Yup.string()
                .required(),
            youtubeTitulo: Yup.string()
                .required(),
            youtubeLink: Yup.string()
                .required(),
            twiterTitulo: Yup.string()
                .required(),
            twiterLink: Yup.string()
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

        const rodapeExiste = await Rodape.findOne({ _id: _id });

        if (!rodapeExiste) {
            return res.status(400).json({
                error: true,
                code: 109,
                message: "Erro: Conteúdo do rodapé não encontrado!"
            });
        };

        await Rodape.updateOne({ _id: _id }, req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 111,
                message: "Erro: Conteúdo do rodapé não editada com sucesso!"
            });

            return res.json({
                error: false,
                message: "Conteúdo drodapé editado com sucesso!"
            });
        });
    };
};

export default new AdmRodapeController();