import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login/login';
import Profile from './pages/profile/profile';
import Register from './pages/register/register';
import Postagens from './pages/postagens/postagens';
import NovaPostagem from './pages/nova_postagem/nova_postagem';
import Page404 from './pages/404';
import Logout from './components/logout';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/profile" component={Profile} />
                <Route path="/register" component={Register} />
                <Route path="/postagens" component={Postagens} />
                <Route path="/nova-postagem" component={NovaPostagem} />
                <Route path="/logout" component={Logout} />
                <Route path='*' component={Page404} />
            </Switch>
        </BrowserRouter>
    );
};
