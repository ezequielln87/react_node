import Sobre from '../models/Sobre';
import fs from 'fs';

class AdmSobreImagemController {

    async update(req, res) {

        /*await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }*/

        if (!req.file) {
            return res.status(400).json({
                error: true,
                code: 129,
                message: "Error: Selecione uma imagem válida JPEG ou PNG!"
            });
        };

        const dadosImagem = {
            originalName: req.file.originalname,
            fileName: req.file.filename
        }

        await Sobre.findOne({ _id: req.body._id }, '_id fileName').then((sobre) => {
            req.dadosImgSobre = sobre.fileName;
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 128,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        })

        await Sobre.updateOne({ _id: req.body._id }, dadosImagem, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 129,
                message: "Erro: Imagem não editada com sucesso!"
            });
        });
        
        const imgAntiga = req.file.destination + "/" + req.dadosImgSobre;

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

export default new AdmSobreImagemController();