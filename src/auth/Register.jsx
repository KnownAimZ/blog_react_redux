import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import * as authActions from './auth.actions.js';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const handleRegister = () => {
        if(email.includes('@') && password.length > 4 && name!== '') {
            dispatch(authActions.createUser(email, password, name));
        }
        else {
            alert('Error!');
        }
    }
    return (
        <div className="Register">
            <h2>Register</h2>
            <TextField
            required          
            label="Email"
            value={email}
            onChange={(e=>setEmail(e.target.value))}
            variant="outlined"
            />
            <TextField
            required          
            label="Name"
            value={name}
            onChange={(e=>setName(e.target.value))}
            variant="outlined"
            />
            <TextField
            required          
            label="Password"
            value={password}
            onChange={(e=>setPassword(e.target.value))}
            type="password"
            variant="outlined"
            />
            <Button variant="contained" color="primary" onClick={handleRegister} style={{width: '100%'}}>
                Register
            </Button>
            {/* Link here */}
        </div>
    );
};

export default Register;