import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/ViewRecipe.js';


class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipe:
                {
                    title: "",
                    contentText: ""
                },
            isRandom: false,
        };
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:3001/randomRecipe');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // set the authorization HTTP header
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var rc = this.state.recipe;
                rc.contentText = xhr.response.text;
                rc.title = xhr.response.title;
                this.setState({
                    recipe: rc
                });
            }
        });
        xhr.send();
    }

    render() {
        return (
            <Dashboard recipe={this.state.recipe} />
        );
    }
}

export default DashboardPage;