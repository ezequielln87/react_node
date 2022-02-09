import { Router } from 'express';
import multer from 'multer';
import multerUpImgUsers from './app/middlewares/uploadImgUser';
import multerUpImgSobre from './app/middlewares/uploadImgSobre';
import multerUpImgHome from './app/middlewares/uploadImgHome';

import LoginController from './app/controllers/LoginController';
import RecuperarSenhaController from './app/controllers/RecuperarSenhaController';
import UserController from './app/controllers/UserController';
import PerfilController from './app/controllers/PerfilController';
import PerfilImagemController from './app/controllers/PerfilImagemController';

import HomeController from './app/controllers/HomeController';
import SobreController from './app/controllers/SobreController';
import ContatoController from './app/controllers/ContatoController';
import MsgContatoController from './app/controllers/MsgContatoController';

import AdmMsgContatoController from './app/controllers/AdmMsgContatoController';
import AdmSobreController from './app/controllers/AdmSobreController';
import AdmSobreImagemController from './app/controllers/AdmSobreImagemController';
import AdmContatoController from './app/controllers/AdmContatoController';
import AdmRodapeController from './app/controllers/AdmRodapeController';
import AdmHomeController from './app/controllers/AdmHomeController';
import AdmHomeTopoController from './app/controllers/AdmHomeTopoController';
import AdmHomeServController from './app/controllers/AdmHomeServController';
import AdmHomeAcaoController from './app/controllers/AdmHomeAcaoController';
import AdmHomeDetController from './app/controllers/AdmHomeDetController';
import AdmHomeTopoImgController from './app/controllers/AdmHomeTopoImgController';
import AdmHomeAcaoImgController from './app/controllers/AdmHomeAcaoImgController';
import AdmHomeDetImgController from './app/controllers/AdmHomeDetImgController';

import AdmSeoController from './app/controllers/AdmSeoController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const uploadImgUser = multer(multerUpImgUsers);
const uploadImgSobre = multer(multerUpImgSobre);
const uploadImgHome = multer(multerUpImgHome);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);
routes.delete('/users/:id', authMiddleware, UserController.delete);

routes.get('/perfil', authMiddleware, PerfilController.show);
routes.put('/perfil', authMiddleware, PerfilController.update);
routes.put('/perfil-img', authMiddleware, uploadImgUser.single('file'),  PerfilImagemController.update);

routes.post('/login', LoginController.store);

routes.post('/recuperar-senha', RecuperarSenhaController.store);
routes.get('/recuperar-senha/:recuperarSenha', RecuperarSenhaController.show);
routes.put('/recuperar-senha', RecuperarSenhaController.update);

routes.get('/home', HomeController.show);

routes.get('/sobre', SobreController.index);

routes.get('/contato', ContatoController.show);
routes.post('/msg-contato', MsgContatoController.store);

routes.get('/adm-msg-contato', authMiddleware, AdmMsgContatoController.index);
routes.get('/adm-msg-contato/:id', authMiddleware, AdmMsgContatoController.show);
routes.post('/adm-msg-contato', authMiddleware, AdmMsgContatoController.store);
routes.put('/adm-msg-contato', authMiddleware, AdmMsgContatoController.update);
routes.delete('/adm-msg-contato/:id', authMiddleware, AdmMsgContatoController.delete);

routes.get('/adm-sobre', authMiddleware, AdmSobreController.index);
routes.get('/adm-sobre/:id', authMiddleware, AdmSobreController.show);
routes.post('/adm-sobre', authMiddleware, uploadImgSobre.single('file'), AdmSobreController.store);
routes.put('/adm-sobre', authMiddleware, AdmSobreController.update);
routes.delete('/adm-sobre/:id', authMiddleware, AdmSobreController.delete);
routes.put('/adm-sobre-img', authMiddleware, uploadImgSobre.single('file'), AdmSobreImagemController.update);

routes.post('/adm-contato', authMiddleware, AdmContatoController.store);
routes.get('/adm-contato', authMiddleware, AdmContatoController.show);
routes.put('/adm-contato', authMiddleware, AdmContatoController.update);

routes.post('/adm-rodape', authMiddleware, AdmRodapeController.store);
routes.get('/adm-rodape', authMiddleware, AdmRodapeController.show);
routes.put('/adm-rodape', authMiddleware, AdmRodapeController.update);

routes.get('/adm-home', authMiddleware, AdmHomeController.show);
routes.post('/adm-home', authMiddleware, AdmHomeController.store);
routes.get('/adm-home-topo', authMiddleware, AdmHomeTopoController.show);
routes.put('/adm-home-topo', authMiddleware, AdmHomeTopoController.update);
routes.get('/adm-home-serv', authMiddleware, AdmHomeServController.show);
routes.put('/adm-home-serv', authMiddleware, AdmHomeServController.update);
routes.get('/adm-home-acao', authMiddleware, AdmHomeAcaoController.show);
routes.put('/adm-home-acao', authMiddleware, AdmHomeAcaoController.update);
routes.get('/adm-home-det', authMiddleware, AdmHomeDetController.show);
routes.put('/adm-home-det', authMiddleware, AdmHomeDetController.update);  
routes.get('/adm-home-topo-img', authMiddleware, AdmHomeTopoImgController.show);
routes.put('/adm-home-topo-img', authMiddleware, uploadImgHome.single('file'), AdmHomeTopoImgController.update);
routes.get('/adm-home-acao-img', authMiddleware, AdmHomeAcaoImgController.show);
routes.put('/adm-home-acao-img', authMiddleware, uploadImgHome.single('file'), AdmHomeAcaoImgController.update);
routes.get('/adm-home-det-img', authMiddleware, AdmHomeDetImgController.show);
routes.put('/adm-home-det-img', authMiddleware, uploadImgHome.single('file'), AdmHomeDetImgController.update);

routes.get('/adm-seo', authMiddleware, AdmSeoController.index);
routes.get('/adm-seo/:id', authMiddleware, AdmSeoController.show);
routes.post('/adm-seo', authMiddleware, AdmSeoController.store);
routes.put('/adm-seo', authMiddleware, AdmSeoController.update);
routes.delete('/adm-seo/:id', authMiddleware, AdmSeoController.delete);

export default routes;
