import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

import api from '../../services/api';
import icon from '../../assets/icon.svg';
import './login.css';

export default function Login({ history }) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        await api.post('/usuario/autenticar', { email, password })
            .then(response => {

                localStorage.setItem('TOKEN_KEY', response.data.token);

                history.push('/profile');
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
        <div className="container">
            <form method="post">
                <img src={icon} alt="Login"/>
                <span>ACESSO LOGIN</span>
                <input
                    type="text"
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit" onClick={handleSubmit}>Acessar</button>
                <Link to="/register">Não possui uma conta?</Link>
            </form>
        </div>
    );
}
