import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {Card, CardText} from 'material-ui/Card';

import PropTypes from 'prop-types';

const ProfileView = ({ myRecipes }) => (

    <Card className="container">
    <List>
        {myRecipes.length < 1&& <CardText style={{ fontSize: '16px', color: 'green' }}>You don't have any recipes added yet!</CardText>}
        {myRecipes.map(r => <ListItem primaryText={r.title}></ListItem>)}
    </List>
    </Card>
);

ProfileView.propTypes = {
    myRecipes: PropTypes.array.isRequired,
};

export default ProfileView;