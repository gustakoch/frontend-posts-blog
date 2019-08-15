import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import './profile.css';

export default function Profile() {
    const token = localStorage.getItem('TOKEN_KEY');
    if (!token) return <Redirect to="/" />

    return (
        <div className="profile-container">

            <div className="main-header">
                <div className="logo">
                    <h1>Painel de configuração</h1>
                </div>

                <ul className="header-menu">
                    <li><Link to="/profile">Home</Link></li>
                    <li><Link to="/postagens">Minhas postagens</Link></li>
                    <li><Link to="/nova-postagem">Nova postagem</Link></li>
                    <li className="logout"><Link to="/logout">Logout</Link></li>
                </ul>
            </div>

            <div className="main-content">
                <div>
                    <h2>Seja bem vindo</h2>
                </div>
                <div className="boxes">
                    
                </div>
            </div>

        </div>
    );
}