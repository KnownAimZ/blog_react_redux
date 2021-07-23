import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import * as authActions from './auth.actions.js';
import './Login.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    let history = useHistory();
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleLogin = async() => {
        if(email.includes('@') && password.length > 4) {
            await dispatch(authActions.authLogin(email, password));
            history.push('/lc');
        }
        else {
            alert('Error!');
        }
    }
    return (
        <div className="Login">
            <h2>Login</h2>
            <TextField
            required          
            label="Email"
            value={email}
            onChange={handleEmail}
            variant="outlined"
            />
            <TextField
            required          
            label="Password"
            value={password}
            onChange={handlePassword}
            type="password"
            variant="outlined"
            />
            <Button variant="contained" color="primary" onClick={handleLogin} style={{width: '100%'}}>
                Login
            </Button>
        </div>
    );
};

export default Login;