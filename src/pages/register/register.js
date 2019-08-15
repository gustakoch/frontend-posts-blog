import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

import './register.css';
import api from '../../services/api';
import Logo from '../../assets/new.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        if (name === '' || email === '' || password === '') {
          return swal({
            title: "Oops.. Houve um erro!",
            text: 'Por favor, preencha todos os campos solicitados!',
            icon: "error",
            button: "Fechar",
          });
        }

        await api.post('/usuario/cadastro',{ name, email, password })
            .then(response => {
                swal({
                  title: "Cadastro realizado com sucesso!",
                  text: `Seja bem vindo, ${response.data.data.name}`,
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
        <div className="register">
            <form method="post" onSubmit={handleSubmit}>
                <img src={Logo} alt="Novo Registro"/>
                <span>CADASTRAR NOVO USUÁRIO</span>
                <input
                    type="text"
                    placeholder="Informe seu nome completo..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Informe seu melhor e-mail..."
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Informe uma senha segura..."
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Cadastrar</button>
                <Link to="/">Já possui uma conta?</Link>
            </form>
        </div>
    );
}
