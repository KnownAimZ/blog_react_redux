import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import * as authActions from './auth.actions.js';
import './Register.scss';

const Register = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const myUser = useSelector(state => state.users.myUser);
    
    useEffect(()=>{
        if(myUser) {
            history.push('/login');
        }
    },[myUser]);

    const handleRegister = async() => {
        if(email.includes('@') && password.length > 4 && name!== '') {
            await dispatch(authActions.createUser(email, password, name));
            
        }
        else {
            alert('Error!');
        }
    }

    return (
        <div className="Page">
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
                <Link to="/login" style={{textDecoration: 'none'}}>
                        <p style={{textAlign:'center', color:'blue'}}>I am already have account</p>                        
                </Link>                
            </div>
        </div>
      );
};

export default Register;