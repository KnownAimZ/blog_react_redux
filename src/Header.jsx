import React from 'react';
import {Link} from 'react-router-dom';
import './Header.scss';

const Header = () => {
    return (
        <div className="Header">
            <ul>
                <Link to="/users"><li>All users</li></Link>
                <Link to="/posts"><li>All posts</li></Link>
            </ul>
        </div>
        
    );
}

export default Header;