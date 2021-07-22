import React, {useState} from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import * as authActions from './auth.actions.js';
// import * as userActions from '../users/users.actions.js'
import './Login.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleLogin = () => {
        if(email.includes('@') && password.length > 4) {
            dispatch(authActions.authLogin(email, password));
        }
        else {
            alert('Error!');
        }
    }
    // const token = useSelector(state=> state.auth.token);
    // const test = () => {
    //     if (token) {
    //         dispatch(userActions.getUserByToken(token));
    //     }
    // }
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
            {/* <Button variant="contained" color="primary" onClick={test} style={{width: '100%'}}>
                Test
            </Button> */}
            {/* Link here */}
        </div>
    );
};

export default Login;