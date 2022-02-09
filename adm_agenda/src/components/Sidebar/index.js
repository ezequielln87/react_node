import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ active, handleLogout }) => (
    <nav className={active ? "sidebar" : "sidebar toggled"}   >
        <ul className="list-unstyled">
            <li><Link to="/dashboard"> Dashboard</Link></li>
            <li><Link to="/user"> Usuário</Link></li>
            <li><Link to="/view-home"> Página Home</Link></li>
            <li><Link to="/sobre"> Página Sobre</Link></li>
            <li><Link to="/view-contato"> Página Contato</Link></li>
            <li><Link to="/msg-contato"> Mensagem de Contato</Link></li>
            <li><Link to="/view-rodape"> Rodapé</Link></li>
            <li><Link to="/seo"> Seo das Páginas</Link></li>
            <li><Link to="#" onClick={() => handleLogout()}> Sair</Link></li>
        </ul>
    </nav>
);

export default Sidebar;