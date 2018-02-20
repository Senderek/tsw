import React  from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';

const ViewRecipe = ({ recipe }) => (

<Card className="container">
    <CardTitle
        title={recipe.title}
    />
    <CardText style={{ fontSize: '16px', color: 'green' }}>{recipe.contentText}</CardText>}
</Card>
);

ViewRecipe.propTypes = {
    recipe: PropTypes.object.isRequired,
};

export default ViewRecipe;