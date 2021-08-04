import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, Link} from 'react-router-dom';
import {TextField, Button} from '@material-ui/core';
import './Login.scss';
import { LOGIN_WATCHER } from './auth.actiontypes.js';

const Login = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token = useSelector(state => state.auth.token);

    useEffect(()=>{
        if(token) {
            history.push('/lc');
        }
    },[token, history]);

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleLogin = async() => {
        if(email.includes('@') && password.length > 4) {
            await dispatch({type: LOGIN_WATCHER, payload: {
                email,
                password
            }});
            // await console.log('Handle login work finished');            
        }
        else {
            alert('Error!');
        }
    };

    return (
        <div className="Page">
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
                    <Link to="/register" style={{textDecoration: 'none'}}>
                        <p style={{textAlign:'center', color:'blue'}}>I want to register</p>                        
                    </Link>
                </div>
        </div>
    );
};

export default Login;