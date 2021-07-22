import React from 'react';
import {Link} from 'react-router-dom';
import './Header.scss';

const Header = () => {
    return (
        <div className="Header">
            <ul>
                <Link to="/users"><li>All users</li></Link>
                <Link to="/posts"><li>All posts</li></Link>
                <Link to="/login"><li>Login</li></Link>
                <Link to="/register"><li>Register</li></Link>
                <Link to="/lc"><li>Account</li></Link>
            </ul>
        </div>
        
    );
}

export default Header;