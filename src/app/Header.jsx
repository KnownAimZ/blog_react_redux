import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Header.scss';

const Header = () => {
    const token = useSelector(state => state.auth.token);
    
    return (
        <div className="Header">
            <ul>
                <Link to="/users"><li>All users</li></Link>
                <Link to="/posts"><li>All posts</li></Link>
                {token === null &&
                <>
                    <Link to="/login" style = {{marginLeft:'auto'}}><li>Login</li></Link>
                    <Link to="/register"><li>Register</li></Link>
                </>
                }
                {
                token !== null && 
                <Link to="/lc" style = {{marginLeft:'auto'}}><li>Account {<AccountCircleIcon />}</li></Link>
                }
            </ul>
        </div>
        
    );
}

export default Header;