import React from 'react';
import Profile from '../components/ProfileView.js';
import Auth from "../modules/Auth";


class ProfilePage extends React.Component {
    constructor(props,context) {
        super(props, context);
        console.log(context);
        var array = [];
        this.state = {
            myRecipes: array
        };
        this.handleClickOnRecipeLink = this.handleClickOnRecipeLink.bind(this);
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        const formData = `${Auth.getToken()}`;
        xhr.open('get', 'http://localhost:3001/api/myProfile/'+ formData);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // set the authorization HTTP header
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    myRecipes: xhr.response.recipes
                });
            }
        });
        xhr.send();
    }

    handleClickOnRecipeLink(id)
    {
        console.log(id);
        //this.context.router.redirect('/recipe/' + id);
    }

    render() {
        return (
            <Profile myRecipes={this.state.myRecipes} handleClickOnRecipeLink={this.handleClickOnRecipeLink}/>
        );
    }
}

export default ProfilePage;