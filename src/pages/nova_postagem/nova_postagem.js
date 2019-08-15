import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';

import api from '../../services/api';
import './nova_postagem.css';
import Logo from '../../assets/post.svg';

export default function NewPost() {
    const [title, setTitle] = useState('');
    const [url_image, setUrlImage] = useState('');
    const [description, setDescription] = useState('');

    const token = localStorage.getItem('TOKEN_KEY');
    if (!token) return <Redirect to="/" />

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();

        if (title === '' || url_image === '' || description === '') {
            return swal({
                title: "Oops.. Houve um erro!",
                text: 'Por favor, preencha todos os campos informados!',
                icon: "error",
                button: "Fechar",
            });
        }

        await api.post('/postagens', { title, url_image, description }, config)
            .then(() => {
                swal({
                    title: "Postagem cadastrada com sucesso!",
                    text: 'Verifique sua nova postagem em "Minhas postagens"',
                    icon: "success",
                    button: "Fechar",
                });
            })
            .catch(error => {
                swal({
                    title: "Oops.. Houve um erro!",
                    text: error.response.data.error,
                    icon: "error",
                    button: "Fechar",
                });
            });
    }

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

            <div className="register postagem">
                <form method="post" onSubmit={handleSubmit}>
                    <img src={Logo} alt="Novo Registro"/>
                    <span>CADASTRAR NOVA POSTAGEM</span>
                    <input
                        type="text"
                        placeholder="Informe o título da postagem..."
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Cole aqui a URL da imagem..."
                        value={url_image}
                        onChange={e => setUrlImage(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Escreva uma breve descrição sobre a imagem..."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
