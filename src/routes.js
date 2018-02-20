import Base from './components/Base.js';
import HomePage from './components/HomePage.js';
import DashboardPage from './containers/DashboardPage.js';
import LoginPage from './containers/LoginPage.js';
import SignUpPage from './containers/SignUpPage.js';
import AddPage from './containers/AddPage.js'
import Auth from './modules/Auth';
import ProfilePage from './containers/ProfilePage.js'

const routes = {
    // base component (wrapper for the whole application).
    component: Base,
    childRoutes: [

        {
            path: '/',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, DashboardPage);
                } else {
                    callback(null, HomePage);
                }
            }
        },

        {
            path: '/login',
            component: LoginPage
        },

        {
            path: '/signup',
            component: SignUpPage
        },

        {
            path: '/logout',
            onEnter: (nextState, replace) => {
                Auth.deauthenticateUser();

                // change the current URL to /
                replace('/');
            }
        },

        {
            path: '/profile',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, ProfilePage);
                } else {
                    callback(null, LoginPage);
                }
            }
        },

        {
            path: '/recipe',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, AddPage);
                } else {
                    callback(null, LoginPage);
                }
            }
        },
        {
            path: '/recipe/:recipeId',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, AddPage);
                } else {
                    callback(null, LoginPage);
                }
            }
        }

    ]
};

export default routes;