import React from 'react';
import Profile from '../components/ProfileView.js';


class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        var array = [];
        this.state = {
            myRecipes: array
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <Profile myRecipes={this.state.myRecipes} />
        );
    }
}

export default ProfilePage;