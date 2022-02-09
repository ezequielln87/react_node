import Home from '../models/Home';
import fs from 'fs';
import config from '../../config/config';

class AdmHomeAcaoImgController {    

    async show(req, res) {
        const url = config.url + "/files/home/";
        Home.findOne({}, "_id acaoOriginalName acaoFileName").then((home) => {
            const {_id, acaoOriginalName, acaoFileName} = home;
            return res.json({
                error: false,
                home: {_id, acaoOriginalName, acaoFileName, url}
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

        if (!req.file) {
            return res.status(400).json({
                error: true,
                code: 129,
                message: "Error: Selecione uma imagem válida JPEG ou PNG!"
            });
        };

        const dadosImagem = {
            acaoOriginalName: req.file.originalname,
            acaoFileName: req.file.filename
        }

        await Home.findOne({ _id: req.body._id }, '_id acaoFileName').then((home) => {
            req.dadosImgHome = home.acaoFileName;
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 128,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        })

        await Home.updateOne({ _id: req.body._id }, dadosImagem, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 129,
                message: "Erro: Imagem não editada com sucesso!"
            });
        });
        
        const imgAntiga = req.file.destination + "/" + req.dadosImgHome;

        fs.access(imgAntiga, (err) => {
            if (!err) {
                fs.unlink(imgAntiga, err => {
                    //Msg de imagem excluida sucesso
                })
            }
        })

        return res.json({
            error: false,
            message: "Imagem editada com sucesso!"
        });
    }
};

export default new AdmHomeAcaoImgController();