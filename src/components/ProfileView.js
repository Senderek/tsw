import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {Card, CardText, CardTitle} from 'material-ui/Card';
import ListViewComponent from './ListViewComponent.js';
import { Link, IndexLink } from 'react-router';

import PropTypes from 'prop-types';

const titleStyle = {
}

const ProfileView = ({ myRecipes, handleClickOnRecipeLink }) => (



    <Card className="container">
    <List>
        {myRecipes.length > 1&& <CardTitle style={titleStyle} title="Your recipes"/>}
        {myRecipes.length < 1&& <CardText style={{ fontSize: '16px', color: 'green' }}>You don't have any recipes added yet!</CardText>}
        <List>

        </List>
        {myRecipes.map(r =><div> <Link to={'/recipe/'+r._id}>{r.title}</Link><br/></div>)}
    </List>
    </Card>
);

ProfileView.propTypes = {
    myRecipes: PropTypes.array.isRequired,
    handleClickOnRecipeLink: PropTypes.func.isRequired
};


export default ProfileView;