import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

import api from '../../services/api';
import './postagens.css';

export default function Postagens({ history }) {
    const [postagens, setPostagens] = useState([]);

    const token = localStorage.getItem('TOKEN_KEY');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };
    
    useEffect(() => {
        async function loadPostagens() {
            await api.get('/postagens', config)
                .then(response => {
                    setPostagens(response.data);
                })
                .catch(error => {
                    swal({
                        title: "Oops... Houve um erro!",
                        text: error.response.data.error,
                        icon: "error",
                        button: "Fechar",
                    });
                    history.push('/');
                });
        }
        loadPostagens();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

            <div className="postagens-content">
                {postagens.length > 0 ? (
                    <ul>
                        {postagens.map(postagem => (
                            <li key={postagem._id}>
                                <img src={postagem.url_image} alt="Imagem não carregada :("/>
                                <section>
                                    <span>{postagem.title}</span>
                                    <p>{postagem.description}</p>
                                </section>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="empty">
                        <span>Você não possui postagens :(</span>
                    </div>
                )}
            </div>

        </div>
    );
    
}
