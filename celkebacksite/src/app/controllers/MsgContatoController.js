import * as Yup from 'yup';
import nodemailer from 'nodemailer';
import configEmail from '../../config/email';

import MsgContato from '../models/MsgContato';

class SobreController {

    async store(req, res) {

        /*await sleep(3000);

        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }*/

        /*const dados = {
            "nome": "Cesar",
            "email": "cesar@celke.com.br",
            "assuntoMsg": "Assunto 1",
            "conteudoMsg": "Conteúdo 1"
        }*/

        const schema = Yup.object().shape({
            nome: Yup.string()
                .required(),
            email: Yup.string()
                .email()
                .required(),
            assuntoMsg: Yup.string()
                .required(),
            conteudoMsg: Yup.string()
                .required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos!"
            });
        };

        await MsgContato.create(req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 102,
                message: "Erro: Contato não enviado com sucesso!"
            });

            var transport = nodemailer.createTransport({
                host: configEmail.host,
                port: configEmail.port,
                auth: {
                    user: configEmail.user,
                    pass: configEmail.pass,
                }
            });

            const { nome, email, assuntoMsg, conteudoMsg } = req.body;

            var emailHtml = 'Prezado(a) ' + nome + '<br><br> Recebi a sua mensagem<br><br>Em breve estaremos respondendo';

            var emailTexto = 'Prezado(a) ' + nome + '\n\nRecebi a sua mensagem\n\nEm breve estaremos respondendo';

            var emailSerEnviado = {
                from: configEmail.from,
                to: email,
                subject: 'Recebi a sua mensagem',
                html: emailHtml,
                text: emailTexto
            }

            transport.sendMail(emailSerEnviado, function (error) {

                var emailHtmlAdm = 'Nova mensagem de contato<br><br>Nome: ' + nome + '<br>E-mail: ' + email + '<br>Assunto: ' + assuntoMsg + '<br>Conteúdo' + conteudoMsg;

                var emailTextoAdm = 'Nova mensagem de contato\n\nNome: ' + nome + '\nE-mail: ' + email + '\nAssunto: ' + assuntoMsg + '\nConteúdo: ' + conteudoMsg;

                var emailSerEnviado = {
                    from: configEmail.from,
                    to: configEmail.from,
                    subject: 'Nova mensagem',
                    html: emailHtmlAdm,
                    text: emailTextoAdm
                }

                transport.sendMail(emailSerEnviado, function (error) {

                });                
            });

            return res.json({
                error: false,
                message: "Contato enviado com sucesso!"
            });
        });
    };
};

export default new SobreController();