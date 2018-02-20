import React from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';
import PropTypes from 'prop-types';
import '../style.css';

const Base = ({ children }) => (
    <div>
        <div className="top-bar">
            <div className="top-bar-left">
                <IndexLink to="/">Food roulete</IndexLink>
            </div>

            {Auth.isUserAuthenticated() ? (
                <div className="top-bar-right">
                    <Link to="/recipe">Add new recipe</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/logout">Log out</Link>
                </div>
            ) : (
                <div className="top-bar-right">
                    <Link to="/login">Log in</Link>
                    <Link to="/signup">Sign up</Link>
                </div>
            )}

        </div>

        { /* child component will be rendered here */ }
        {children}

    </div>
);

Base.propTypes = {
    children: PropTypes.object.isRequired
};

export default Base;