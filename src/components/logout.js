import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Logout() {
    localStorage.removeItem('TOKEN_KEY');
    return (
        <Redirect to="/" />
    );
}
