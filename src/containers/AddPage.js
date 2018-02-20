import React  from 'react';
import Auth from '../modules/Auth.js';
import PropTypes from 'prop-types';
import AddForm from "../components/AddForm";
import ViewRecipe from "../components/ViewRecipe.js";

class AddPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props, context) {
        super(props, context);
        console.log(this.props.params.recipeId);

        const storedMessage = localStorage.getItem('successMessage');
        let successMessage = '';

        if (storedMessage) {
            successMessage = storedMessage;
            localStorage.removeItem('successMessage');
        }

        // set the initial component state
        this.state = {
            errors: {},
            successMessage,
            recipe: {
                title: '',
                contentText: '',
                recipeId: this.props.params.recipeId,
            },
            IsReadOnly: false,
            isNew: true,
        };

        this.processForm = this.processForm.bind(this);
        this.changeRecipe = this.changeRecipe.bind(this);
    }
    componentDidMount() {
        var recipe = this.state.recipe;
        console.log(recipe);
        if (!recipe || !recipe.recipeId || recipe.recipeId === 0) {
            recipe.recipeId = 0;
            return;
        }
        const xhr = new XMLHttpRequest();
        const formData = `${recipe.recipeId}&${Auth.getToken()}`;
        xhr.open('get', 'http://localhost:3001/api/recipe/' + formData);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // set the authorization HTTP header
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                recipe.title = xhr.response.recipe.title;
                recipe.contentText = xhr.response.recipe.text,
                recipe.recipeId = xhr.response.recipe._id;
                this.setState({
                    recipe: recipe,
                    isReadOnly: xhr.response.isReadOnly,
                    isNew: false
                });
            }
        });
        xhr.send();
    }
    /**
     * Process the form.
     *
     * @param {object} event - the JavaScript event object
     */
    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        // create a string for an HTTP body message
        const title = encodeURIComponent(this.state.recipe.title);
        const contentText = encodeURIComponent(this.state.recipe.contentText);
        const id = this.state.recipe.recipeId!= null &&this.state.recipe.recipeId && !this.state.isNew > 0 ? encodeURIComponent(this.state.recipe.contentText) : 0;
        const formData = `title=${title}&contentText=${contentText}&id=${id}&auth=${Auth.getToken()}`;
        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost:3001/api/addRecipe');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            console.log()
            if (xhr.status === 200) {
                this.context.router.redirect('/recipe/' + xhr.response._id);
            } else {
            }
        });
        xhr.send(formData);
    }

    /**
     * Change the user object.
     *
     * @param {object} event - the JavaScript event object
     */
    changeRecipe(event) {
        const field = event.target.name;
        const recipe = this.state.recipe;
        recipe[field] = event.target.value;

        this.setState({
            recipe
        });
    }


    /**
     * Render the component.
     */
    render() {
        if (this.state.isReadOnly)
            return <ViewRecipe
                recipe = {this.state.recipe}
                />
            else
        return (
            <AddForm
                onSubmit={this.processForm}
                onChange={this.changeRecipe}
                errors={this.state.errors}
                successMessage={this.state.successMessage}
                recipe={this.state.recipe}
                isNew={this.state.isNew}
            />
        );
    }

}

AddPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default AddPage;